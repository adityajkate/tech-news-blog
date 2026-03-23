require('dotenv').config();
const mongoose = require('mongoose');
const FeedSource = require('../src/models/FeedSource');
const logger = require('../src/utils/logger');

// Seed data
const feedSources = [
  {
    name: 'TechCrunch',
    feedUrl: 'https://techcrunch.com/feed/',
    status: 'active'
  },
  {
    name: 'HackerNews',
    feedUrl: 'https://hnrss.org/frontpage',
    status: 'active'
  },
  {
    name: 'Wired',
    feedUrl: 'https://www.wired.com/feed/rss',
    status: 'active'
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    logger.info('Connected to MongoDB');

    // Clear existing feed sources
    await FeedSource.deleteMany({});
    logger.info('Cleared existing feed sources');

    // Insert seed data
    await FeedSource.insertMany(feedSources);
    logger.info(`Seeded ${feedSources.length} feed sources`);

    logger.info('Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    logger.error(`Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
