import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [debounceTimer, setDebounceTimer] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Clear existing timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Set new timer for debounced search (300ms)
    const timer = setTimeout(() => {
      onSearch(value);
    }, 300);

    setDebounceTimer(timer);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    onSearch(query);
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <div className="relative flex-grow">
        <input
          type="text"
          className="w-full px-4 py-2 pl-10 text-sm border border-light-border dark:border-dark-border rounded-lg bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary placeholder-light-text-secondary dark:placeholder-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
          placeholder="Search tech news..."
          value={query}
          onChange={handleChange}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
      <button
        type="submit"
        className="px-4 py-2 text-sm font-medium text-white bg-light-accent dark:bg-dark-accent rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:ring-offset-2 focus:ring-offset-light-bg dark:focus:ring-offset-dark-bg"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
