const Parser = require('rss-parser');
const logger = require('../utils/logger');

const parser = new Parser({
  timeout: 10000,
  maxRedirects: 5,
  customFields: {
    item: ['media:content', 'media:thumbnail', 'content:encoded']
  }
});

/**
 * Parse RSS feed from URL
 * @param {string} url - RSS feed URL
 * @returns {Promise<Object>} - Parsed feed with items
 */
const parseFeed = async (url) => {
  try {
    logger.info(`Fetching RSS feed from: ${url}`);
    const feed = await parser.parseURL(url);
    logger.info(`Successfully parsed ${feed.items.length} items from ${url}`);
    return feed;
  } catch (error) {
    if (error.code === 'ENOTFOUND') {
      logger.error(`DNS/Network error fetching feed: ${url}`);
      throw new Error(`Feed not found: ${url}`);
    } else if (error.message.includes('Invalid XML')) {
      logger.error(`Malformed XML in feed: ${url}`);
      throw new Error(`Invalid XML in feed: ${url}`);
    } else if (error.code === 'ETIMEDOUT') {
      logger.error(`Timeout fetching feed: ${url}`);
      throw new Error(`Timeout fetching feed: ${url}`);
    } else {
      logger.error(`Error parsing feed ${url}: ${error.message}`);
      throw error;
    }
  }
};

/**
 * Extract article data from feed item
 * @param {Object} item - RSS feed item
 * @param {string} sourceName - Name of the feed source
 * @returns {Object} - Extracted article data
 */
const extractArticleData = (item, sourceName) => {
  return {
    title: item.title || 'Untitled',
    url: item.link || item.guid,
    content: item.contentSnippet || item.content || item.summary || '',
    publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
    source: sourceName
  };
};

module.exports = {
  parseFeed,
  extractArticleData
};
