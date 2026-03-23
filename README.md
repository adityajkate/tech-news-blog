<div align="center">

# Tech News AI

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Geist&weight=600&size=28&duration=3000&pause=1000&color=0070F3&center=true&vCenter=true&width=600&lines=Automated+Tech+News+Aggregator;AI-Powered+Summaries+%26+Insights;Built+with+Gemini+AI" alt="Typing SVG" />
</p>

An AI-powered tech news aggregator that automatically fetches articles from top tech sources, generates insightful summaries and hot takes using Google Gemini AI, and presents them in a clean, modern blog interface.

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/React-19+-61DAFB?style=flat&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/MongoDB-6+-47A248?style=flat&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tailwind-3.4+-06B6D4?style=flat&logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Gemini-AI-4285F4?style=flat&logo=google&logoColor=white" alt="Gemini AI" />
</p>

</div>

---

## Features

### Backend
- **Automated RSS Fetching**: Hourly fetching from TechCrunch, HackerNews, and Wired
- **AI Content Generation**: Gemini AI generates summaries, insights, and tags
- **Smart Duplicate Detection**: URL hash + fuzzy title matching (85% threshold)
- **Image Handling**: Extracts from articles or fetches from Unsplash
- **RESTful API**: Pagination, filtering, search, and tag aggregation
- **Robust Error Handling**: Graceful degradation when feeds or APIs fail

### Frontend
- **Modern React UI**: Clean, responsive design with Tailwind CSS
- **Dark/Light Theme**: Persistent theme switching with no flash
- **Real-time Search**: Debounced search with instant results
- **Multi-filter Support**: Filter by source, tags, or search query
- **Reading Progress**: Visual indicator showing article progress
- **Post Details**: Full articles with AI-generated insights
- **Mobile-Friendly**: Responsive design for all devices
- **Performance Optimized**: LCP < 2.5s, lazy loading, skeleton loaders

---

## Tech Stack

<table>
<tr>
<td width="50%">

### Backend
- Node.js 18+ with Express
- MongoDB 6+ with Mongoose
- Google Gemini AI API
- Unsplash API
- node-cron for scheduling
- RSS parsing, fuzzy matching

</td>
<td width="50%">

### Frontend
- React 19+
- React Router v7
- Tailwind CSS 3.4+
- Headless UI
- Context API
- Geist font

</td>
</tr>
</table>

---

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB 6+
- Gemini API key (Get one at https://ai.google.dev/)
- Unsplash API key (Get one at https://unsplash.com/developers)

### Installation

**1. Clone the repository**
```bash
git clone <repository-url>
cd tech-news-blog
```

**2. Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your API keys
npm run seed
npm run dev
```

**3. Setup Frontend (in a new terminal)**
```bash
cd frontend
npm install
cp .env.example .env
npm start
```

**4. Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3000/api

---

## Environment Variables

### Backend (.env)
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/tech-news-blog
GEMINI_API_KEY=your_gemini_api_key_here
UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
CRON_SCHEDULE=0 * * * *
LOG_LEVEL=info
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:3000/api
```

---

## API Documentation

### Endpoints

**Health Check**
```
GET /api/health
```

**Posts**
```
GET /api/posts?page=1&limit=20&source=TechCrunch&tags=ai,apple&search=iphone
GET /api/posts/:id
```

**Tags**
```
GET /api/tags
```

**Sources**
```
GET /api/sources
```

---

## How It Works

1. **Automated Fetching**: Every hour, the system fetches articles from configured RSS feeds
2. **AI Processing**: Each article is sent to Gemini AI to generate:
   - Concise summary (2-3 sentences)
   - Key insights and hot takes (2-4 points)
   - Relevant tags (3-5 keywords)
3. **Duplicate Detection**: Articles are checked against existing posts using:
   - SHA-256 hash of title + URL (exact match)
   - Fuzzy title matching with 85% similarity threshold
4. **Image Handling**: System attempts to:
   - Extract image from article (og:image, twitter:image, or first large image)
   - Fallback to Unsplash API with keyword search
5. **Publishing**: Unique articles are saved to MongoDB and immediately available via API

---

## Project Structure

```
tech-news-blog/
├── backend/                 # Node.js API server
│   ├── src/
│   │   ├── models/         # Mongoose schemas
│   │   ├── services/       # Business logic
│   │   ├── routes/         # API routes
│   │   ├── jobs/           # Cron jobs
│   │   ├── utils/          # Helpers
│   │   └── config/         # Configuration
│   ├── scripts/            # Seed scripts
│   └── tests/              # Tests
│
├── frontend/               # React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # Context providers
│   │   ├── services/      # API client
│   │   ├── hooks/         # Custom hooks
│   │   └── utils/         # Utilities
│   └── public/            # Static assets
│
└── .gitignore             # Git ignore rules
```

---

## Performance

<div align="center">

| Metric | Target | Status |
|--------|--------|--------|
| Lighthouse Performance | 95+ | ✓ |
| Largest Contentful Paint | < 2.5s | ✓ |
| Cumulative Layout Shift | < 0.1 | ✓ |
| First Input Delay | < 100ms | ✓ |
| Bundle Size (JS) | 85.3 KB | ✓ |
| Bundle Size (CSS) | 4.45 KB | ✓ |

</div>

---

## Success Metrics

- 10+ posts published per day automatically
- Page load < 2 seconds
- Search/filter results < 1-2 seconds
- 80%+ article processing success rate
- Duplicate prevention working
- 90%+ posts with images
- Resilient to single feed failures

---

## Development

### Backend Development
```bash
cd backend
npm run dev        # Start with nodemon
npm run lint       # Run ESLint
npm run seed       # Seed database
```

### Frontend Development
```bash
cd frontend
npm start          # Start dev server
npm run build      # Production build
npm run lint       # Run ESLint
```

---

## Accessibility

- WCAG AA compliant
- Keyboard navigation support
- Screen reader compatible
- 4.5:1 contrast ratios for text
- 44x44px minimum touch targets on mobile

---

## License

MIT

---

<div align="center">

## Credits

Powered by [Google Gemini AI](https://ai.google.dev/) | Images from [Unsplash](https://unsplash.com/)

News sources: TechCrunch, HackerNews, Wired

Design inspired by Vercel, Linear, and Raycast

---

<p align="center">Made with ❤️ for the tech community</p>

</div>
