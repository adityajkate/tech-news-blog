import { useState, useCallback } from 'react';
import { useBlog } from '../contexts/BlogContext';

const useSearch = () => {
  const { setSearchQuery } = useBlog();
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = useCallback(async (query) => {
    setIsSearching(true);
    setSearchQuery(query);
    setIsSearching(false);
  }, [setSearchQuery]);

  return {
    performSearch,
    isSearching
  };
};

export default useSearch;
