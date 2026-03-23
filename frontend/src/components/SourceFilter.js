import React, { useState, useEffect } from 'react';
import { Newspaper } from 'lucide-react';
import { fetchSources } from '../services/api';

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
      <div className="flex flex-wrap gap-2">
        <button
          className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 hover:-translate-y-0.5 transform ${
            selectedSource === ''
              ? 'bg-light-accent dark:bg-dark-accent text-white shadow-md shadow-light-accent/20 dark:shadow-dark-accent/20'
              : 'bg-light-surface dark:bg-dark-surface text-light-text-secondary dark:text-dark-text-secondary border border-light-border dark:border-dark-border hover:border-light-accent/50 dark:hover:border-dark-accent/50 hover:text-light-text-primary dark:hover:text-dark-text-primary'
          }`}
          onClick={() => onSourceSelect('')}
        >
          All Sources
        </button>
        {sources.map((sourceObj) => {
          const sourceName = typeof sourceObj === 'string' ? sourceObj : (sourceObj.name || sourceObj._id);
          return (
            <button
              key={sourceName}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 hover:-translate-y-0.5 transform ${
                selectedSource === sourceName
                  ? 'bg-light-accent dark:bg-dark-accent text-white shadow-md shadow-light-accent/20 dark:shadow-dark-accent/20'
                  : 'bg-light-surface dark:bg-dark-surface text-light-text-secondary dark:text-dark-text-secondary border border-light-border dark:border-dark-border hover:border-light-accent/50 dark:hover:border-dark-accent/50 hover:text-light-text-primary dark:hover:text-dark-text-primary'
              }`}
              onClick={() => handleSourceClick(sourceName)}
            >
              {sourceName}
            </button>
          )
        })}
      </div>
    </div>
  );
};

export default SourceFilter;
