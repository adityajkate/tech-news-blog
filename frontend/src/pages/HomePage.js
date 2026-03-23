import React, { useEffect } from 'react';
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
    <div className="min-h-screen flex flex-col bg-light-bg dark:bg-dark-bg">
      <Navbar />
      <main className="flex-grow py-8 sm:py-12">
        <Container>
          <div className="mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
              Latest Tech News
            </h2>
            <p className="text-base text-light-text-secondary dark:text-dark-text-secondary">
              AI-generated summaries and insights from top tech sources
            </p>
          </div>

          <div className="space-y-6 mb-8">
            <SearchBar onSearch={handleSearch} />

            <SourceFilter
              onSourceSelect={handleSourceSelect}
              selectedSource={filters.source}
            />

            <TagFilter
              onTagSelect={handleTagSelect}
              selectedTags={filters.tags}
            />
          </div>

          <PostList pagination={pagination} onPageChange={goToPage} />
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
