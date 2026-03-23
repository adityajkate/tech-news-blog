import { useState, useEffect } from 'react';
import { useBlog } from '../contexts/BlogContext';

const usePosts = (initialPage = 1, initialLimit = 20) => {
  const { fetchPosts } = useBlog();
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(initialLimit);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchPosts({ page, limit });
      if (data) {
        setPagination(data.pagination);
      }
    };

    loadPosts();
  }, [page, limit, fetchPosts]);

  const nextPage = () => {
    if (pagination && pagination.hasNextPage) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (pagination && pagination.hasPrevPage) {
      setPage(page - 1);
    }
  };

  const goToPage = (pageNum) => {
    setPage(pageNum);
  };

  return {
    page,
    pagination,
    nextPage,
    prevPage,
    goToPage
  };
};

export default usePosts;
