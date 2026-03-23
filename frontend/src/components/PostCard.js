import React, { useState } from 'react';
import { Tag } from './ui/Tag';
import { motion } from 'framer-motion';
import { Calendar, Clock, ImageOff, ArrowRight } from 'lucide-react';

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
    return `${minutes} min`;
  };

  return (
    <motion.article 
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group bg-light-surface dark:bg-dark-surface border border-light-border/50 dark:border-dark-border/50 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-light-accent/5 dark:hover:shadow-dark-accent/5 transition-all duration-300 flex flex-col h-full"
    >
      {post.imageUrl && !imageError ? (
        <div className="relative w-full h-52 bg-gray-100 dark:bg-gray-800 overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      ) : (
        <div className="relative w-full h-52 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex flex-col items-center justify-center">
          <ImageOff className="w-10 h-10 text-gray-400 dark:text-gray-600 mb-2" strokeWidth={1} />
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between text-xs text-light-text-secondary dark:text-dark-text-secondary mb-4">
          <span className="font-semibold tracking-wide text-light-accent dark:text-dark-accent uppercase text-[10px]">
            {post.source}
          </span>
          <div className="flex items-center space-x-3 opacity-80">
            <span className="flex items-center"><Calendar size={12} className="mr-1" />{formatDate(post.publishedAt)}</span>
            <span className="flex items-center"><Clock size={12} className="mr-1" />{calculateReadingTime(post.summary)}</span>
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary mb-3 line-clamp-2 group-hover:text-light-accent dark:group-hover:text-dark-accent transition-colors">
          <a href={`/post/${post._id}`} className="hover:underline decoration-light-accent/30 dark:decoration-dark-accent/30 underline-offset-4">
            {post.title}
          </a>
        </h2>
        
        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-6 line-clamp-3 flex-grow leading-relaxed">
          {truncate(post.summary, 160)}
        </p>
        
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag, index) => (
              <Tag key={index} variant="default" className="text-[10px] px-2 py-0.5 rounded-full">
                {tag}
              </Tag>
            ))}
          </div>
          
          <a href={`/post/${post._id}`} className="inline-flex items-center text-sm font-semibold text-light-accent dark:text-dark-accent group/btn">
            Read Full Article 
            <ArrowRight size={16} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </motion.article>
  );
};

export default PostCard;
