require('dotenv').config();

const env = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/tech-news-blog',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,
  CRON_SCHEDULE: process.env.CRON_SCHEDULE || '0 * * * *',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info'
};

// Validate required environment variables
const requiredEnvVars = ['GEMINI_API_KEY', 'UNSPLASH_ACCESS_KEY'];

const missingEnvVars = requiredEnvVars.filter(varName => !env[varName]);

if (missingEnvVars.length > 0 && env.NODE_ENV === 'production') {
  console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

module.exports = env;
