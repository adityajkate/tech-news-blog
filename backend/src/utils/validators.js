const mongoose = require('mongoose');

// Validate MongoDB ObjectId
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// Validate pagination parameters
const validatePagination = (page, limit) => {
  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 20;

  if (pageNum < 1) {
    throw new Error('Page number must be greater than 0');
  }

  if (limitNum < 1 || limitNum > 100) {
    throw new Error('Limit must be between 1 and 100');
  }

  return { page: pageNum, limit: limitNum };
};

// Validate source parameter
const validateSource = (source) => {
  if (typeof source !== 'string' && source !== undefined && source !== null) {
    throw new Error('Source must be a string');
  }
  return source;
};

// Sanitize search query
const sanitizeSearchQuery = (query) => {
  if (!query) return '';
  // Remove special regex characters to prevent injection
  return query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').trim();
};

module.exports = {
  isValidObjectId,
  validatePagination,
  validateSource,
  sanitizeSearchQuery
};
