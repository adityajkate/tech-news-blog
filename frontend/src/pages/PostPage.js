import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Container } from '../components/layout/Container';
import { Tag } from '../components/ui/Tag';
import { ReadingProgress } from '../components/post/ReadingProgress';
import { fetchPostById } from '../services/api';

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        const data = await fetchPostById(id);
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
        <Navbar />
        <Container maxWidth="content" className="py-12">
          <div className="text-center text-light-text-secondary dark:text-dark-text-secondary">
            Loading post...
          </div>
        </Container>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
        <Navbar />
        <Container maxWidth="content" className="py-12">
          <div className="text-center text-red-600 dark:text-red-400">
            Error: {error}
          </div>
        </Container>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
        <Navbar />
        <Container maxWidth="content" className="py-12">
          <div className="text-center text-light-text-secondary dark:text-dark-text-secondary">
            Post not found
          </div>
        </Container>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <ReadingProgress />
      <Navbar />
      <main className="py-12">
        <Container maxWidth="content">
          <article>
            {/* Meta information */}
            <div className="flex items-center gap-3 text-sm text-light-text-secondary dark:text-dark-text-secondary mb-4">
              <span className="font-medium text-light-accent dark:text-dark-accent">
                {post.source}
              </span>
              <span>•</span>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-light-text-primary dark:text-dark-text-primary mb-8 leading-tight">
              {post.title}
            </h1>

            {/* Cover image */}
            {post.imageUrl && (
              <div className="mb-8 rounded-lg overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* Content sections */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
                  Summary
                </h2>
                <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                  {post.summary}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
                  Key Insights
                </h2>
                <ul className="space-y-3">
                  {post.hotTakes.map((take, index) => (
                    <li
                      key={index}
                      className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed"
                    >
                      {take}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
                  Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <Tag key={index} variant="default">
                      {tag}
                    </Tag>
                  ))}
                </div>
              </section>

              <section className="pt-6 border-t border-gray-200 dark:border-gray-800">
                <a
                  href={post.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-light-accent dark:text-dark-accent hover:underline font-medium"
                >
                  Read Original Article →
                </a>
              </section>
            </div>
          </article>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default PostPage;
