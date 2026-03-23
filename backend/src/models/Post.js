const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  summary: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  hotTakes: [{
    type: String,
    required: true,
    trim: true
  }],
  tags: [{
    type: String,
    required: true,
    lowercase: true,
    trim: true
  }],
  imageUrl: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: 'Invalid URL format'
    }
  },
  sourceUrl: {
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
  source: {
    type: String,
    required: true
  },
  contentHash: {
    type: String,
    required: true,
    unique: true
  },
  publishedAt: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

// Indexes
postSchema.index({ title: 'text', summary: 'text' });
postSchema.index({ source: 1, publishedAt: -1 });
postSchema.index({ tags: 1 });
postSchema.index({ createdAt: -1 });

// Validation
postSchema.path('hotTakes').validate(function(value) {
  return value.length >= 2 && value.length <= 5;
}, 'hotTakes must have 2-5 items');

postSchema.path('tags').validate(function(value) {
  return value.length >= 3 && value.length <= 10;
}, 'tags must have 3-10 items');

module.exports = mongoose.model('Post', postSchema);
