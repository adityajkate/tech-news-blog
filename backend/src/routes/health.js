const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// GET /api/health
router.get('/', async (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';

  res.status(dbStatus === 'connected' ? 200 : 503).json({
    status: dbStatus === 'connected' ? 'ok' : 'error',
    timestamp: new Date().toISOString(),
    database: dbStatus
  });
});

module.exports = router;
