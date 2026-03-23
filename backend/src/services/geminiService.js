const { GoogleGenerativeAI } = require('@google/generative-ai');
const env = require('../config/env');
const logger = require('../utils/logger');

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

/**
 * Sleep helper for retry delays
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generate hybrid post content using Gemini API
 * @param {string} title - Article title
 * @param {string} content - Article content
 * @param {number} retries - Number of retry attempts
 * @returns {Promise<Object>} - Generated content with summary, hotTakes, and tags
 */
const generateContent = async (title, content, retries = 3) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `Analyze this tech news article and generate:
1. A concise summary (2-3 sentences, max 200 words)
2. Key insights or "hot takes" (2-4 bullet points analyzing implications, trends, or opinions)
3. 3-5 relevant tags (lowercase, single words or short phrases)

Title: ${title}
Content: ${content.substring(0, 1000)}

Format your response as JSON:
{
  "summary": "...",
  "hotTakes": ["...", "..."],
  "tags": ["...", "..."]
}`;

  for (let i = 0; i < retries; i++) {
    try {
      logger.info(`Generating content with Gemini (attempt ${i + 1}/${retries})`);

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Try to parse JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);

        // Validate response structure
        if (parsed.summary && parsed.hotTakes && parsed.tags) {
          logger.info('Successfully generated content with Gemini');
          return {
            summary: parsed.summary.trim(),
            hotTakes: parsed.hotTakes.map(ht => ht.trim()),
            tags: parsed.tags.map(tag => tag.toLowerCase().trim())
          };
        }
      }

      // If parsing failed, throw error to retry
      throw new Error('Invalid response format from Gemini');

    } catch (error) {
      logger.error(`Gemini API error (attempt ${i + 1}): ${error.message}`);

      if (error.message && error.message.includes('429')) {
        // Rate limit - exponential backoff
        const delay = Math.pow(2, i) * 1000;
        logger.warn(`Rate limited, waiting ${delay}ms before retry`);
        await sleep(delay);
      } else if (error.message && error.message.includes('500')) {
        // Server error - retry with delay
        logger.warn('Server error, waiting 1s before retry');
        await sleep(1000);
      } else if (i === retries - 1) {
        // Last retry failed
        throw new Error(`Failed to generate content after ${retries} attempts: ${error.message}`);
      } else {
        // Other error - wait before retry
        await sleep(1000);
      }
    }
  }

  throw new Error('Failed to generate content with Gemini');
};

module.exports = {
  generateContent
};
