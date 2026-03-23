const express = require('express');
const FeedSource = require('../models/FeedSource');
const logger = require('../utils/logger');

const router = express.Router();

// GET /api/sources
router.get('/', async (req, res, next) => {
  try {
    logger.info('Fetching all feed sources');

    const sources = await FeedSource.find().sort({ name: 1 }).lean();

    res.json({
      sources
    });

  } catch (error) {
    logger.error(`Error fetching sources: ${error.message}`);
    next(error);
  }
});

module.exports = router;
