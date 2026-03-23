import React from 'react';
import { ThemeToggle } from './ui/ThemeToggle';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-light-surface/80 dark:bg-dark-surface/80 backdrop-blur-md border-b border-light-border dark:border-dark-border">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <h1 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">
              Tech News AI
            </h1>
          </a>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block text-sm text-light-text-secondary dark:text-dark-text-secondary">
              AI-Powered Tech News Aggregator
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
