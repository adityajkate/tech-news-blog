import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BlogProvider } from './contexts/BlogContext';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BlogProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </BlogProvider>
  );
}

export default App;
