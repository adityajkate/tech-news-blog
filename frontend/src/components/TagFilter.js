import React, { useState, useEffect } from 'react';
import { fetchTags } from '../services/api';
import { motion } from 'framer-motion';
import { Tag as TagIcon } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const TagFilter = ({ onTagSelect, selectedTags = [] }) => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTags = async () => {
      try {
        const data = await fetchTags();
        setTags(data.tags.slice(0, 15)); // Show top 15 tags
      } catch (error) {
        console.error('Error loading tags:', error);
      } finally {
        setLoading(false);
      }
    };
    loadTags();
  }, []);

  if (loading) {
    return (
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary flex items-center gap-2">
          <TagIcon size={16} className="text-light-accent dark:text-dark-accent" />
          Trending Topics
        </h3>
        <div className="flex flex-wrap gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-8 w-20 bg-light-border dark:bg-dark-border rounded-full animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (tags.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary flex items-center gap-2">
        <TagIcon size={16} className="text-light-accent dark:text-dark-accent" />
        Trending Topics
      </h3>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-wrap gap-2"
      >
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag.name);
          return (
            <motion.button
              variants={item}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={tag.name}
              onClick={() => onTagSelect(tag.name)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-200 ${
                isSelected
                  ? 'bg-light-accent dark:bg-dark-accent text-white border-transparent shadow-md shadow-light-accent/20 dark:shadow-dark-accent/20'
                  : 'bg-light-surface dark:bg-dark-surface text-light-text-secondary dark:text-dark-text-secondary border-light-border dark:border-dark-border hover:border-light-accent/50 dark:hover:border-dark-accent/50 hover:text-light-text-primary dark:hover:text-dark-text-primary'
              }`}
            >
              {tag.name} <span className="opacity-60 ml-1">({tag.count})</span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};

export default TagFilter;
