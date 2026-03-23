import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center space-y-2 text-center">
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
            &copy; 2026 Tech News AI. Powered by Gemini AI.
          </p>
          <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
            Sources: TechCrunch, HackerNews, Wired
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
