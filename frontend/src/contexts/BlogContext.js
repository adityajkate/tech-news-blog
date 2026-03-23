import React, { createContext, useState, useContext, useRef, useCallback } from 'react';

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [filters, setFilters] = useState({ source: '', tags: [] });
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use refs so fetchPosts never needs to change its identity
  const filtersRef = useRef(filters);
  const searchQueryRef = useRef(searchQuery);

  // Keep refs in sync silently (no re-render)
  filtersRef.current = filters;
  searchQueryRef.current = searchQuery;

  // Stable fetchPosts — never changes identity, reads latest state from refs
  const fetchPosts = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();
      const f = filtersRef.current;
      const q = searchQueryRef.current;

      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      if (f.source) queryParams.append('source', f.source);
      if (f.tags.length > 0) queryParams.append('tags', f.tags.join(','));
      if (q) queryParams.append('search', q);

      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
      const response = await fetch(`${apiUrl}/posts?${queryParams}`);

      if (!response.ok) throw new Error('Failed to fetch posts');

      const data = await response.json();
      setPosts(data.posts);
      return data;

    } catch (err) {
      setError(err.message);
      console.error('Error fetching posts:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []); // ← empty deps: fetchPosts is now truly stable

  const value = {
    posts, setPosts,
    filters, setFilters,
    searchQuery, setSearchQuery,
    loading, error,
    fetchPosts
  };

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) throw new Error('useBlog must be used within a BlogProvider');
  return context;
};
