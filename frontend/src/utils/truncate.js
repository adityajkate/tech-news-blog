/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @param {string} suffix - Suffix to add (default: '...')
 * @returns {string} - Truncated text
 */
export const truncate = (text, maxLength, suffix = '...') => {
  if (!text) return '';
  if (text.length <= maxLength) return text;

  return text.substring(0, maxLength).trim() + suffix;
};

/**
 * Truncate text by words
 * @param {string} text - Text to truncate
 * @param {number} maxWords - Maximum number of words
 * @param {string} suffix - Suffix to add (default: '...')
 * @returns {string} - Truncated text
 */
export const truncateWords = (text, maxWords, suffix = '...') => {
  if (!text) return '';

  const words = text.split(' ');
  if (words.length <= maxWords) return text;

  return words.slice(0, maxWords).join(' ') + suffix;
};
