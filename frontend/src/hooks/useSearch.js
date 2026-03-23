import { useState, useCallback } from 'react';
import { useBlog } from '../contexts/BlogContext';

const useSearch = () => {
  const { setSearchQuery, fetchPosts } = useBlog();
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = useCallback(async (query) => {
    setIsSearching(true);
    setSearchQuery(query);
    await fetchPosts({ page: 1 });
    setIsSearching(false);
  }, [setSearchQuery, fetchPosts]);

  return {
    performSearch,
    isSearching
  };
};

export default useSearch;
