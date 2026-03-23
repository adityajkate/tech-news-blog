import React, { useState } from 'react';
import { Tag } from './ui/Tag';

const PostCard = ({ post }) => {
  const [imageError, setImageError] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncate = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <article className="group bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col h-full">
      {post.imageUrl && !imageError ? (
        <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-800 overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="relative w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12 text-gray-400 dark:text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </div>
      )}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between text-xs text-light-text-secondary dark:text-dark-text-secondary mb-3">
          <span className="font-medium">{post.source}</span>
          <div className="flex items-center space-x-2">
            <span>{formatDate(post.publishedAt)}</span>
            <span>•</span>
            <span>{calculateReadingTime(post.summary)}</span>
          </div>
        </div>
        <h2 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-2 line-clamp-2 group-hover:text-light-accent dark:group-hover:text-dark-accent transition-colors">
          <a href={`/post/${post._id}`} className="hover:underline">
            {post.title}
          </a>
        </h2>
        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-4 line-clamp-3 flex-grow">
          {truncate(post.summary, 200)}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {post.tags.slice(0, 5).map((tag, index) => (
            <Tag key={index} variant="default">
              {tag}
            </Tag>
          ))}
        </div>
      </div>
    </article>
  );
};

export default PostCard;
