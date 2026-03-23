const Post = require('../models/Post');
const { generateContentHash, isDuplicate } = require('./duplicateService');
const logger = require('../utils/logger');

/**
 * Create a new post
 * @param {Object} postData - Post data
 * @returns {Promise<Object>} - Created post
 */
const createPost = async (postData) => {
  try {
    const { title, summary, hotTakes, tags, imageUrl, sourceUrl, source, publishedAt } = postData;

    // Generate content hash
    const contentHash = generateContentHash(title, sourceUrl);

    // Create post
    const post = await Post.create({
      title,
      summary,
      hotTakes,
      tags,
      imageUrl,
      sourceUrl,
      source,
      contentHash,
      publishedAt
    });

    logger.info(`Created post: ${post.title} (${post._id})`);
    return post;

  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      logger.warn(`Duplicate post detected: ${postData.title}`);
      throw new Error('Duplicate post');
    }
    logger.error(`Error creating post: ${error.message}`);
    throw error;
  }
};

/**
 * Check if post is duplicate
 * @param {string} title - Article title
 * @param {string} url - Article URL
 * @returns {Promise<boolean>} - True if duplicate
 */
const checkDuplicate = async (title, url) => {
  return await isDuplicate(Post, title, url);
};

/**
 * Query posts with filters
 * @param {Object} filters - Query filters
 * @returns {Promise<Object>} - Posts and pagination info
 */
const queryPosts = async (filters = {}) => {
  try {
    const {
      page = 1,
      limit = 20,
      source,
      tags,
      search
    } = filters;

    const query = {};

    // Filter by source
    if (source) {
      query.source = source;
    }

    // Filter by tags
    if (tags && tags.length > 0) {
      query.tags = { $in: tags };
    }

    // Full-text search
    if (search) {
      query.$text = { $search: search };
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute query
    const posts = await Post.find(query)
      .sort(search ? { score: { $meta: 'textScore' } } : { createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count
    const total = await Post.countDocuments(query);

    return {
      posts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalPosts: total,
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1
      }
    };

  } catch (error) {
    logger.error(`Error querying posts: ${error.message}`);
    throw error;
  }
};

/**
 * Get post by ID
 * @param {string} id - Post ID
 * @returns {Promise<Object>} - Post
 */
const getPostById = async (id) => {
  try {
    const post = await Post.findById(id).lean();
    if (!post) {
      throw new Error('Post not found');
    }
    return post;
  } catch (error) {
    logger.error(`Error getting post by ID: ${error.message}`);
    throw error;
  }
};

module.exports = {
  createPost,
  checkDuplicate,
  queryPosts,
  getPostById
};
