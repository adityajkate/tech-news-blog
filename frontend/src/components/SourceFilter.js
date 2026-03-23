import React from 'react';

const SourceFilter = ({ onSourceSelect, selectedSource }) => {
  const sources = ['TechCrunch', 'HackerNews', 'Wired'];

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
      <h3 className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
        Filter by Source
      </h3>
      <div className="flex flex-wrap gap-2">
        <button
          className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
            selectedSource === ''
              ? 'bg-light-accent dark:bg-dark-accent text-white border-light-accent dark:border-dark-accent'
              : 'bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary border-light-border dark:border-dark-border hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
          onClick={() => onSourceSelect('')}
        >
          All Sources
        </button>
        {sources.map((source) => (
          <button
            key={source}
            className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
              selectedSource === source
                ? 'bg-light-accent dark:bg-dark-accent text-white border-light-accent dark:border-dark-accent'
                : 'bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary border-light-border dark:border-dark-border hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
            onClick={() => handleSourceClick(source)}
          >
            {source}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SourceFilter;
