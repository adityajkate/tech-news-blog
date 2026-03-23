const mongoose = require('mongoose');

const fetchJobLogSchema = new mongoose.Schema({
  jobId: {
    type: String,
    required: true,
    unique: true
  },
  startedAt: {
    type: Date,
    required: true
  },
  completedAt: Date,
  status: {
    type: String,
    required: true,
    enum: ['running', 'completed', 'failed'],
    default: 'running'
  },
  feedsProcessed: {
    type: Number,
    default: 0,
    min: 0
  },
  articlesFetched: {
    type: Number,
    default: 0,
    min: 0
  },
  articlesPublished: {
    type: Number,
    default: 0,
    min: 0
  },
  duplicatesSkipped: {
    type: Number,
    default: 0,
    min: 0
  },
  errors: [{
    feedName: String,
    error: String,
    timestamp: Date
  }],
  duration: {
    type: Number,
    min: 0
  }
}, {
  timestamps: { createdAt: true, updatedAt: false }
});

fetchJobLogSchema.index({ startedAt: -1 });
fetchJobLogSchema.index({ status: 1 });

module.exports = mongoose.model('FetchJobLog', fetchJobLogSchema);
