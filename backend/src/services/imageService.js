const axios = require('axios');
const cheerio = require('cheerio');
const env = require('../config/env');
const logger = require('../utils/logger');

/**
 * Extract image from article HTML
 * @param {string} articleUrl - URL of the article
 * @returns {Promise<string|null>} - Image URL or null
 */
const extractImage = async (articleUrl) => {
  try {
    logger.info(`Extracting image from: ${articleUrl}`);

    const { data } = await axios.get(articleUrl, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const $ = cheerio.load(data);

    // Priority 1: Open Graph image
    let image = $('meta[property="og:image"]').attr('content');
    if (image) {
      logger.info(`Found og:image: ${image}`);
      return image;
    }

    // Priority 2: Twitter card image
    image = $('meta[name="twitter:image"]').attr('content');
    if (image) {
      logger.info(`Found twitter:image: ${image}`);
      return image;
    }

    // Priority 3: First large image in article
    const images = $('article img, .content img, .post img, .entry-content img');
    for (let i = 0; i < images.length; i++) {
      const src = $(images[i]).attr('src');
      if (src && !src.includes('icon') && !src.includes('logo') && !src.includes('avatar')) {
        logger.info(`Found content image: ${src}`);
        return src;
      }
    }

    logger.info('No image found in article');
    return null;

  } catch (error) {
    logger.error(`Error extracting image from ${articleUrl}: ${error.message}`);
    return null;
  }
};

/**
 * Fetch image from Unsplash API based on keywords
 * @param {string[]} keywords - Search keywords
 * @returns {Promise<string|null>} - Image URL or null
 */
const fetchUnsplashImage = async (keywords) => {
  try {
    if (!env.UNSPLASH_ACCESS_KEY) {
      logger.warn('Unsplash API key not configured');
      return null;
    }

    const query = keywords.slice(0, 3).join(' ');
    logger.info(`Searching Unsplash for: ${query}`);

    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: query,
        per_page: 1,
        orientation: 'landscape'
      },
      headers: {
        'Authorization': `Client-ID ${env.UNSPLASH_ACCESS_KEY}`
      },
      timeout: 10000
    });

    if (response.data.results && response.data.results.length > 0) {
      const imageUrl = response.data.results[0].urls.regular;
      logger.info(`Found Unsplash image: ${imageUrl}`);
      return imageUrl;
    }

    logger.info('No Unsplash image found');
    return null;

  } catch (error) {
    logger.error(`Error fetching Unsplash image: ${error.message}`);
    return null;
  }
};

/**
 * Get image for article (extract or fallback to Unsplash)
 * @param {string} articleUrl - URL of the article
 * @param {string[]} keywords - Keywords for Unsplash search
 * @returns {Promise<string|null>} - Image URL or null
 */
const getImage = async (articleUrl, keywords) => {
  // Try to extract from article first
  let imageUrl = await extractImage(articleUrl);

  // Fallback to Unsplash if extraction failed
  if (!imageUrl && keywords && keywords.length > 0) {
    imageUrl = await fetchUnsplashImage(keywords);
  }

  return imageUrl;
};

module.exports = {
  extractImage,
  fetchUnsplashImage,
  getImage
};
