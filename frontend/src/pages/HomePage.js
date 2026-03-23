import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import PostList from '../components/PostList';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import TagFilter from '../components/TagFilter';
import SourceFilter from '../components/SourceFilter';
import { Container } from '../components/layout/Container';
import usePosts from '../hooks/usePosts';
import useSearch from '../hooks/useSearch';
import { useBlog } from '../contexts/BlogContext';

const HomePage = () => {
  const { pagination, goToPage } = usePosts();
  const { performSearch } = useSearch();
  const { filters, setFilters, fetchPosts } = useBlog();

  // Refetch when filters change
  useEffect(() => {
    fetchPosts({ page: 1 });
  }, [filters, fetchPosts]);

  const handleSearch = (query) => {
    performSearch(query);
  };

  const handleTagSelect = (tagName) => {
    const newTags = filters.tags.includes(tagName)
      ? filters.tags.filter(t => t !== tagName)
      : [...filters.tags, tagName];

    setFilters({ ...filters, tags: newTags });
  };

  const handleSourceSelect = (source) => {
    setFilters({ ...filters, source });
  };

  return (
    <div className="min-h-screen flex flex-col bg-light-bg dark:bg-dark-bg selection:bg-light-accent/30 selection:text-light-accent dark:selection:bg-dark-accent/30 dark:selection:text-dark-accent">
      <Navbar />
      <main className="flex-grow pt-28 pb-8 sm:pb-12 relative overflow-hidden">
        {/* Minimalist Background Blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-light-accent/5 dark:bg-dark-accent/5 blur-[100px] rounded-full pointer-events-none -z-10" />
        
        <Container>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-12 sm:mb-16 text-center max-w-2xl mx-auto"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-light-text-primary dark:text-dark-text-primary mb-4 tracking-tight">
              Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-light-accent to-blue-400 dark:from-dark-accent dark:to-blue-300">Tech Intelligence</span>
            </h2>
            <p className="text-lg sm:text-xl text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
              AI-driven insights and essential updates from the world's most trusted technology sources.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="space-y-6 mb-12 bg-light-surface/50 dark:bg-dark-surface/50 p-6 rounded-2xl border border-light-border/50 dark:border-dark-border/50 backdrop-blur-sm"
          >
            <SearchBar onSearch={handleSearch} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SourceFilter
                onSourceSelect={handleSourceSelect}
                selectedSource={filters.source}
              />
              <TagFilter
                onTagSelect={handleTagSelect}
                selectedTags={filters.tags}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <PostList pagination={pagination} onPageChange={goToPage} />
          </motion.div>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
