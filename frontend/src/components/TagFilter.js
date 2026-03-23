import React, { useState, useEffect } from 'react';
import { fetchTags } from '../services/api';
import { Tag } from './ui/Tag';

const TagFilter = ({ onTagSelect, selectedTags = [] }) => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTags = async () => {
      try {
        const data = await fetchTags();
        // Show top 20 most popular tags
        setTags(data.tags.slice(0, 20));
      } catch (error) {
        console.error('Error loading tags:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTags();
  }, []);

  const handleTagClick = (tagName) => {
    onTagSelect(tagName);
  };

  if (loading) {
    return (
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-7 w-20 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
        Popular Tags
      </h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Tag
            key={tag.name}
            variant="interactive"
            onClick={() => handleTagClick(tag.name)}
            className={selectedTags.includes(tag.name) ? 'bg-light-accent dark:bg-dark-accent text-white' : ''}
          >
            {tag.name} ({tag.count})
          </Tag>
        ))}
      </div>
    </div>
  );
};

export default TagFilter;
