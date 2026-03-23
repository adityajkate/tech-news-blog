const express = require('express');
const cors = require('cors');
const path = require('path');
const env = require('./config/env');
const connectDB = require('./config/database');
const logger = require('./utils/logger');
const { errorHandler, notFound } = require('./utils/errorHandler');

const app = express();

// Connect to MongoDB
connectDB();

// Start cron job
const { startCronJob } = require('./jobs/fetchJob');
startCronJob();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  logger.http(`${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api/health', require('./routes/health'));
app.use('/api/sources', require('./routes/sources'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/tags', require('./routes/tags'));

// Serve static files from React build
const frontendBuildPath = path.join(__dirname, '../../frontend/build');
app.use(express.static(frontendBuildPath));

// Serve React app for all non-API routes (must be after API routes)
app.use((req, res, next) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  } else {
    next();
  }
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = env.PORT;

app.listen(PORT, () => {
  logger.info(`Server running in ${env.NODE_ENV} mode on port ${PORT}`);
});

module.exports = app;
