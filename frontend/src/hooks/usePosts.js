import { useState, useEffect } from 'react';
import { useBlog } from '../contexts/BlogContext';

const usePosts = (initialPage = 1, initialLimit = 20) => {
  const { fetchPosts, filters, searchQuery } = useBlog();
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(initialLimit);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchPosts({ page, limit });
      if (data) setPagination(data.pagination);
    };
    loadPosts();
  // filters + searchQuery trigger page re-fetch when they change
  }, [page, limit, fetchPosts, filters, searchQuery]);

  const nextPage = () => { if (pagination?.hasNextPage) setPage(p => p + 1); };
  const prevPage = () => { if (pagination?.hasPrevPage) setPage(p => p - 1); };
  const goToPage = (pageNum) => setPage(pageNum);

  return { page, pagination, nextPage, prevPage, goToPage };
};

export default usePosts;
