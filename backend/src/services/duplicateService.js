const crypto = require('crypto');
const fuzz = require('fuzzball');
const logger = require('../utils/logger');

/**
 * Generate SHA-256 hash for duplicate detection
 * @param {string} title - Article title
 * @param {string} url - Article URL
 * @returns {string} - SHA-256 hash
 */
const generateContentHash = (title, url) => {
  return crypto
    .createHash('sha256')
    .update(title + url)
    .digest('hex');
};

/**
 * Check if two titles are similar using fuzzy matching
 * @param {string} title1 - First title
 * @param {string} title2 - Second title
 * @param {number} threshold - Similarity threshold (0-100)
 * @returns {boolean} - True if titles are similar
 */
const fuzzyTitleMatch = (title1, title2, threshold = 85) => {
  const score = fuzz.token_sort_ratio(title1, title2);
  logger.debug(`Fuzzy match score for "${title1}" vs "${title2}": ${score}`);
  return score >= threshold;
};

/**
 * Check if article is duplicate based on URL hash
 * @param {Object} Post - Post model
 * @param {string} contentHash - Content hash to check
 * @returns {Promise<boolean>} - True if duplicate exists
 */
const isDuplicateByHash = async (Post, contentHash) => {
  try {
    const existing = await Post.findOne({ contentHash });
    return !!existing;
  } catch (error) {
    logger.error(`Error checking duplicate by hash: ${error.message}`);
    return false;
  }
};

/**
 * Check if article is duplicate based on fuzzy title matching
 * @param {Object} Post - Post model
 * @param {string} title - Article title
 * @param {number} daysBack - Number of days to check back
 * @returns {Promise<boolean>} - True if duplicate exists
 */
const isDuplicateByTitle = async (Post, title, daysBack = 7) => {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysBack);

    // Get recent posts to compare
    const recentPosts = await Post.find({
      createdAt: { $gte: cutoffDate }
    }).select('title').lean();

    // Check fuzzy match against each recent post
    for (const post of recentPosts) {
      if (fuzzyTitleMatch(title, post.title)) {
        logger.info(`Fuzzy duplicate detected: "${title}" matches "${post.title}"`);
        return true;
      }
    }

    return false;
  } catch (error) {
    logger.error(`Error checking duplicate by title: ${error.message}`);
    return false;
  }
};

/**
 * Check if article is duplicate (hash + fuzzy title)
 * @param {Object} Post - Post model
 * @param {string} title - Article title
 * @param {string} url - Article URL
 * @returns {Promise<boolean>} - True if duplicate exists
 */
const isDuplicate = async (Post, title, url) => {
  // Check exact hash match first (faster)
  const contentHash = generateContentHash(title, url);
  const hashDuplicate = await isDuplicateByHash(Post, contentHash);

  if (hashDuplicate) {
    logger.info(`Exact duplicate detected by hash: ${url}`);
    return true;
  }

  // Check fuzzy title match
  const titleDuplicate = await isDuplicateByTitle(Post, title);

  if (titleDuplicate) {
    logger.info(`Fuzzy duplicate detected by title: ${title}`);
    return true;
  }

  return false;
};

module.exports = {
  generateContentHash,
  fuzzyTitleMatch,
  isDuplicateByHash,
  isDuplicateByTitle,
  isDuplicate
};
