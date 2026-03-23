const cron = require('node-cron');
const crypto = require('crypto');
const FeedSource = require('../models/FeedSource');
const FetchJobLog = require('../models/FetchJobLog');
const { parseFeed, extractArticleData } = require('../services/rssService');
const { generateContent } = require('../services/geminiService');
const { getImage } = require('../services/imageService');
const { checkDuplicate } = require('../services/postService');
const { createPost } = require('../services/postService');
const logger = require('../utils/logger');
const env = require('../config/env');

let isJobRunning = false;

/**
 * Process a single article
 * @param {Object} article - Article data
 * @returns {Promise<Object|null>} - Created post or null
 */
const processArticle = async (article) => {
  try {
    const { title, url, content, publishedAt, source } = article;

    // Check for duplicates
    const isDuplicate = await checkDuplicate(title, url);
    if (isDuplicate) {
      logger.info(`Skipping duplicate article: ${title}`);
      return null;
    }

    // Generate AI content
    logger.info(`Generating AI content for: ${title}`);
    const aiContent = await generateContent(title, content);

    // Get image
    logger.info(`Fetching image for: ${title}`);
    const imageUrl = await getImage(url, aiContent.tags);

    // Create post
    const post = await createPost({
      title,
      summary: aiContent.summary,
      hotTakes: aiContent.hotTakes,
      tags: aiContent.tags,
      imageUrl,
      sourceUrl: url,
      source,
      publishedAt
    });

    logger.info(`Successfully published post: ${title}`);
    return post;

  } catch (error) {
    logger.error(`Error processing article "${article.title}": ${error.message}`);
    return null;
  }
};

/**
 * Fetch and process articles from all active feeds
 */
const fetchAndProcessArticles = async () => {
  const jobId = crypto.randomUUID();
  const startTime = Date.now();

  logger.info(`Starting fetch job ${jobId}`);

  // Create job log
  const jobLog = await FetchJobLog.create({
    jobId,
    startedAt: new Date(),
    status: 'running'
  });

  let feedsProcessed = 0;
  let articlesFetched = 0;
  let articlesPublished = 0;
  let duplicatesSkipped = 0;
  const errors = [];

  try {
    // Get all active feed sources
    const feedSources = await FeedSource.find({ status: 'active' });
    logger.info(`Found ${feedSources.length} active feed sources`);

    // Process each feed
    for (const feedSource of feedSources) {
      try {
        logger.info(`Processing feed: ${feedSource.name}`);

        // Parse RSS feed
        const feed = await parseFeed(feedSource.feedUrl);
        articlesFetched += feed.items.length;

        // Process articles (limit to first 10 per feed to avoid overwhelming)
        const articlesToProcess = feed.items.slice(0, 10);

        for (const item of articlesToProcess) {
          const article = extractArticleData(item, feedSource.name);
          const post = await processArticle(article);

          if (post) {
            articlesPublished++;
          } else {
            duplicatesSkipped++;
          }
        }

        // Update feed source
        await FeedSource.findByIdAndUpdate(feedSource._id, {
          lastFetchedAt: new Date(),
          errorCount: 0,
          lastError: null
        });

        feedsProcessed++;
        logger.info(`Successfully processed feed: ${feedSource.name}`);

      } catch (error) {
        logger.error(`Error processing feed ${feedSource.name}: ${error.message}`);

        errors.push({
          feedName: feedSource.name,
          error: error.message,
          timestamp: new Date()
        });

        // Update feed source error count
        await FeedSource.findByIdAndUpdate(feedSource._id, {
          $inc: { errorCount: 1 },
          lastError: error.message
        });
      }
    }

    // Update job log
    const duration = Date.now() - startTime;
    await FetchJobLog.findByIdAndUpdate(jobLog._id, {
      completedAt: new Date(),
      status: 'completed',
      feedsProcessed,
      articlesFetched,
      articlesPublished,
      duplicatesSkipped,
      errors,
      duration
    });

    logger.info(`Fetch job ${jobId} completed in ${duration}ms`);
    logger.info(`Stats: ${feedsProcessed} feeds, ${articlesFetched} articles fetched, ${articlesPublished} published, ${duplicatesSkipped} duplicates skipped`);

  } catch (error) {
    logger.error(`Fatal error in fetch job ${jobId}: ${error.message}`);

    await FetchJobLog.findByIdAndUpdate(jobLog._id, {
      completedAt: new Date(),
      status: 'failed',
      feedsProcessed,
      articlesFetched,
      articlesPublished,
      duplicatesSkipped,
      errors: [...errors, { feedName: 'System', error: error.message, timestamp: new Date() }],
      duration: Date.now() - startTime
    });
  }
};

/**
 * Start the cron job
 */
const startCronJob = () => {
  const schedule = env.CRON_SCHEDULE;
  logger.info(`Starting cron job with schedule: ${schedule}`);

  cron.schedule(schedule, async () => {
    if (isJobRunning) {
      logger.warn('Previous job still running, skipping this execution');
      return;
    }

    isJobRunning = true;
    try {
      await fetchAndProcessArticles();
    } catch (error) {
      logger.error(`Error in cron job: ${error.message}`);
    } finally {
      isJobRunning = false;
    }
  }, {
    scheduled: true,
    timezone: 'America/New_York'
  });

  logger.info('Cron job started successfully');
};

module.exports = {
  startCronJob,
  fetchAndProcessArticles
};
