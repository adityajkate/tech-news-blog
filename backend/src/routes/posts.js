const express = require('express');
const { queryPosts, getPostById } = require('../services/postService');
const { validatePagination, validateSource, sanitizeSearchQuery, isValidObjectId } = require('../utils/validators');
const logger = require('../utils/logger');

const router = express.Router();

// GET /api/posts
router.get('/', async (req, res, next) => {
  try {
    const { page, limit, source, tags, search } = req.query;

    // Validate and sanitize inputs
    const pagination = validatePagination(page, limit);
    const validatedSource = source ? validateSource(source) : null;
    const sanitizedSearch = search ? sanitizeSearchQuery(search) : null;
    const tagArray = tags ? tags.split(',').map(t => t.trim().toLowerCase()) : [];

    logger.info(`Querying posts: page=${pagination.page}, limit=${pagination.limit}, source=${validatedSource}, tags=${tagArray.join(',')}, search=${sanitizedSearch}`);

    const result = await queryPosts({
      page: pagination.page,
      limit: pagination.limit,
      source: validatedSource,
      tags: tagArray,
      search: sanitizedSearch
    });

    res.json(result);

  } catch (error) {
    if (error.message.includes('must be')) {
      error.statusCode = 400;
    }
    logger.error(`Error querying posts: ${error.message}`);
    next(error);
  }
});

// GET /api/posts/:id
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      const error = new Error('Invalid post ID format');
      error.statusCode = 400;
      throw error;
    }

    logger.info(`Fetching post by ID: ${id}`);

    const post = await getPostById(id);

    res.json(post);

  } catch (error) {
    if (error.message === 'Post not found') {
      error.statusCode = 404;
    }
    logger.error(`Error fetching post: ${error.message}`);
    next(error);
  }
});

module.exports = router;
