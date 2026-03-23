const mongoose = require('mongoose');

const feedSourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  feedUrl: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+/.test(v);
      },
      message: 'Invalid URL format'
    }
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  lastFetchedAt: Date,
  lastError: {
    type: String,
    maxlength: 500
  },
  errorCount: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

feedSourceSchema.index({ status: 1 });

module.exports = mongoose.model('FeedSource', feedSourceSchema);
