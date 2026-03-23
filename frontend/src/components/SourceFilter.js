import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Newspaper } from 'lucide-react';
import { fetchSources } from '../services/api';

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

const SourceFilter = ({ onSourceSelect, selectedSource }) => {
  const [sources, setSources] = useState(['TechCrunch', 'HackerNews', 'Wired', 'TheVerge', 'ArsTechnica']);

  useEffect(() => {
    const loadSources = async () => {
      try {
        const data = await fetchSources();
        if (data && data.sources && data.sources.length > 0) {
          setSources(data.sources.slice(0, 10)); // Top 10 sources
        }
      } catch (error) {
        console.error('Error loading sources:', error);
      }
    };
    loadSources();
  }, []);

  const handleSourceClick = (source) => {
    // Toggle source selection
    if (selectedSource === source) {
      onSourceSelect(''); // Deselect if already selected
    } else {
      onSourceSelect(source);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary flex items-center gap-2">
        <Newspaper size={16} className="text-light-accent dark:text-dark-accent" />
        Top Sources
      </h3>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-wrap gap-2"
      >
        <motion.button
          variants={item}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-200 ${
            selectedSource === ''
              ? 'bg-light-accent dark:bg-dark-accent text-white border-transparent shadow-md shadow-light-accent/20 dark:shadow-dark-accent/20'
              : 'bg-light-surface dark:bg-dark-surface text-light-text-secondary dark:text-dark-text-secondary border-light-border dark:border-dark-border hover:border-light-accent/50 dark:hover:border-dark-accent/50 hover:text-light-text-primary dark:hover:text-dark-text-primary'
          }`}
          onClick={() => onSourceSelect('')}
        >
          All Sources
        </motion.button>
        {sources.map((sourceObj) => {
          const sourceName = typeof sourceObj === 'string' ? sourceObj : (sourceObj.name || sourceObj._id);
          return (
            <motion.button
              variants={item}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={sourceName}
              className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-200 ${
                selectedSource === sourceName
                  ? 'bg-light-accent dark:bg-dark-accent text-white border-transparent shadow-md shadow-light-accent/20 dark:shadow-dark-accent/20'
                  : 'bg-light-surface dark:bg-dark-surface text-light-text-secondary dark:text-dark-text-secondary border-light-border dark:border-dark-border hover:border-light-accent/50 dark:hover:border-dark-accent/50 hover:text-light-text-primary dark:hover:text-dark-text-primary'
              }`}
              onClick={() => handleSourceClick(sourceName)}
            >
              {sourceName}
            </motion.button>
          )
        })}
      </motion.div>
    </div>
  );
};

export default SourceFilter;
