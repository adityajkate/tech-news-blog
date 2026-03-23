const express = require('express');
const Post = require('../models/Post');
const logger = require('../utils/logger');

const router = express.Router();

// GET /api/tags
router.get('/', async (req, res, next) => {
  try {
    logger.info('Fetching all tags with counts');

    // Aggregate tags with counts
    const tags = await Post.aggregate([
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $project: { _id: 0, name: '$_id', count: 1 } }
    ]);

    res.json({
      tags
    });

  } catch (error) {
    logger.error(`Error fetching tags: ${error.message}`);
    next(error);
  }
});

module.exports = router;
