import React from 'react';
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
  const { filters, setFilters } = useBlog();

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
      <main className="flex-grow pt-28 pb-12 sm:pb-16">
        <Container>
          <div className="mb-12 sm:mb-16 text-center max-w-2xl mx-auto">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-light-text-primary dark:text-dark-text-primary mb-4 tracking-tighter">
              Curated <span className="text-light-accent dark:text-dark-accent">Tech Intelligence</span>
            </h2>
            <p className="text-lg sm:text-xl text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
              AI-driven insights and essential updates from the world's most trusted technology sources.
            </p>
          </div>

          <div className="space-y-6 mb-12 bg-light-surface dark:bg-dark-surface p-6 sm:p-8 rounded-2xl border border-light-border dark:border-dark-border shadow-sm">
            <SearchBar onSearch={handleSearch} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <SourceFilter onSourceSelect={handleSourceSelect} selectedSource={filters.source} />
              <TagFilter onTagSelect={handleTagSelect} selectedTags={filters.tags} />
            </div>
          </div>

          <PostList pagination={pagination} onPageChange={goToPage} />
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
