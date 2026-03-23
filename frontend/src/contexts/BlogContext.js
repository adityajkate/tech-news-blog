import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [filters, setFilters] = useState({
    source: '',
    tags: []
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();

      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      if (filters.source) queryParams.append('source', filters.source);
      if (filters.tags.length > 0) queryParams.append('tags', filters.tags.join(','));
      if (searchQuery) queryParams.append('search', searchQuery);

      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
      const response = await fetch(`${apiUrl}/posts?${queryParams}`);

      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

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
  }, [filters, searchQuery]);

  // Only fetch on initial mount
  useEffect(() => {
    fetchPosts({ page: 1 });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    posts,
    setPosts,
    filters,
    setFilters,
    searchQuery,
    setSearchQuery,
    loading,
    error,
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
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
