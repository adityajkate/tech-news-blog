import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  // Use useEffect for debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 400); // 400ms debounce
    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="relative group w-full" onSubmit={handleSubmit}>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-light-text-secondary dark:text-dark-text-secondary group-focus-within:text-light-accent dark:group-focus-within:text-dark-accent transition-colors">
        <Search size={20} />
      </div>
      <input
        type="text"
        className="w-full pl-12 pr-24 py-4 md:py-5 bg-white dark:bg-black/40 border border-light-border dark:border-dark-border rounded-2xl text-light-text-primary dark:text-dark-text-primary placeholder-light-text-secondary/70 dark:placeholder-dark-text-secondary/70 focus:outline-none focus:ring-2 focus:ring-light-accent/50 dark:focus:ring-dark-accent/50 shadow-sm focus:shadow-md transition-all text-base sm:text-lg"
        placeholder="What kind of tech news are you looking for?"
        value={query}
        onChange={handleChange}
      />
      <div className="absolute inset-y-0 right-2 flex items-center">
        <button
          type="submit"
          className="px-5 py-2.5 bg-light-text-primary dark:bg-dark-text-primary text-light-bg dark:text-dark-bg text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transform transition-all"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
