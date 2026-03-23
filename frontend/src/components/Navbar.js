import React, { useState, useEffect } from 'react';
import { ThemeToggle } from './ui/ThemeToggle';
import { Newspaper } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 py-4 ${
        scrolled 
          ? 'bg-light-surface/70 dark:bg-dark-surface/70 backdrop-blur-lg shadow-sm border-b border-light-border/50 dark:border-dark-border/50' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a 
            href="/" 
            className="flex items-center space-x-3 group"
          >
            <div className="p-2 rounded-xl bg-light-accent dark:bg-dark-accent text-white group-hover:rotate-12 transition-transform duration-300">
              <Newspaper size={20} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-light-text-primary dark:text-dark-text-primary">
              Tech News<span className="text-light-accent dark:text-dark-accent">.</span>AI
            </h1>
          </a>
          
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-1 text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary transition-colors cursor-pointer">
              <span>AI Aggregator</span>
            </div>
            <div className="h-4 w-px bg-light-border dark:bg-dark-border hidden md:block" />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
