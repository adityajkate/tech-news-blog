require('dotenv').config();
const mongoose = require('mongoose');
const FeedSource = require('../src/models/FeedSource');
const logger = require('../src/utils/logger');

// Seed data
// Seed data
const top100 = [
  "TheVerge", "ArsTechnica", 
  "Engadget", "CNET", "TechRadar", "VentureBeat", "ZDNet",
  "Computerworld", "Gizmodo", "DigitalTrends", "Mashable", "PCWorld",
  "TheNextWeb", "GeekWire", "MITTechnologyReview", "Recode", "ReadWrite",
  "Techmeme", "Gadgets360", "AppleInsider", "MacRumors", "9to5Mac",
  "AndroidAuthority", "AndroidCentral", "Tom'sHardware", "AnandTech", "TechSpot",
  "ExtremeTech", "TweakTown", "Guru3D", "Wccftech", "Neowin",
  "Betanews", "BleepingComputer", "DarkReading", "KrebsOnSecurity", "TheHackerNews",
  "InfoQ", "DZone", "SmashingMagazine", "AListApart", "CSS-Tricks",
  "SitePoint", "HackerNoon", "FreeCodeCamp", "Dev.to", "Hashnode",
  "Slashdot", "YCombinator", "ProductHunt", "IndieHackers", "TechRepublic",
  "TechTarget", "InformationWeek", "CIO", "CSO", "NetworkWorld",
  "Spiceworks", "Gigaom", "PandoDaily", "SiliconANGLE", "TechInAsia", 
  "e27", "DealStreetAsia", "KrASIA", "TechNode", "TechEU", 
  "Sifted", "Maddyness", "TechNative", "CloudPro", "ITPro", 
  "ComputerWeekly", "ZDNetUK", "TechRadarPro", "Techworld", "V3",
  "TheInquirer", "Hexus", "Bit-Tech", "Overclock3D", "KitGuru",
  "Phoronix", "LinuxInsider", "LWN", "OMG!Ubuntu!", "LinuxJournal",
  "FOSSbytes", "ItsFOSS", "Unixmen", "Techaeris", "Ubergizmo", 
  "SlashGear", "PocketLint", "TrustedReviews", "Stuff", "T3"
];

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
  },
  ...top100.map(name => ({
    name,
    feedUrl: `https://${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com/feed/`,
    status: 'active'
  }))
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
