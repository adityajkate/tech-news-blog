import React from 'react';
import PostCard from './PostCard';
import { Pagination } from './ui/Pagination';
import { useBlog } from '../contexts/BlogContext';

const SkeletonCard = () => (
  <div className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg overflow-hidden animate-pulse">
    <div className="w-full h-48 bg-gray-200 dark:bg-gray-700" />
    <div className="p-5 space-y-3">
      <div className="flex justify-between">
        <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
      <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
      <div className="h-5 w-full bg-gray-200 dark:bg-gray-700 rounded" />
      <div className="space-y-2">
        <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
      <div className="flex gap-2">
        <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-6 w-14 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>
  </div>
);

const PostList = ({ pagination, onPageChange }) => {
  const { posts, loading, error } = useBlog();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12 text-red-500 mb-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
        <p className="text-lg font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
          Error loading posts
        </p>
        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
          {error}
        </p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12 text-light-text-secondary dark:text-dark-text-secondary mb-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
        <p className="text-lg font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
          No posts found
        </p>
        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
          Try adjusting your filters or check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>

      <Pagination pagination={pagination} onPageChange={onPageChange} />
    </div>
  );
};

export default PostList;
