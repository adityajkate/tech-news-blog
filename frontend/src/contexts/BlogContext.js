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

  filtersRef.current = filters;
  searchQueryRef.current = searchQuery;

  // Track the current in-flight request so we can cancel stale ones
  const currentRequestId = useRef(0);

  const fetchPosts = useCallback(async (params = {}) => {
    // Increment request ID — any older in-flight request becomes stale
    const requestId = ++currentRequestId.current;

    // Only show loading skeletons if there are no posts yet (first load)
    if (posts.length === 0) {
      setLoading(true);
    }
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

      // Only update state if this is still the latest request
      if (requestId === currentRequestId.current) {
        setPosts(data.posts);
        setLoading(false);
        return data;
      }
      return null;

    } catch (err) {
      if (requestId === currentRequestId.current) {
        setError(err.message);
        setLoading(false);
      }
      return null;
    }
  // posts.length is read via closure but we intentionally exclude it
  // from deps to keep fetchPosts identity stable
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
