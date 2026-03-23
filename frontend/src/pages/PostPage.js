import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Container } from '../components/layout/Container';
import { Tag } from '../components/ui/Tag';
import { ReadingProgress } from '../components/post/ReadingProgress';
import { fetchPostById } from '../services/api';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Calendar, Clock } from 'lucide-react';

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

  const calculateReadingTime = (text) => {
    if (!text) return '1 min';
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex flex-col">
        <Navbar />
        <Container maxWidth="content" className="flex-grow pt-32 pb-12 flex items-center justify-center">
          <div className="flex space-x-2 justify-center items-center">
            <div className="h-3 w-3 bg-light-accent dark:bg-dark-accent rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-3 w-3 bg-light-accent dark:bg-dark-accent rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-3 w-3 bg-light-accent dark:bg-dark-accent rounded-full animate-bounce"></div>
          </div>
        </Container>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex flex-col">
        <Navbar />
        <Container maxWidth="content" className="flex-grow pt-32 pb-12 flex items-center justify-center text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <h2 className="text-2xl font-bold mb-4">{error ? 'An error occurred' : 'Post not found'}</h2>
            <p className="text-light-text-secondary dark:text-dark-text-secondary">{error || 'The article you are looking for does not exist.'}</p>
            <Link to="/" className="mt-6 inline-flex items-center text-light-accent dark:text-dark-accent font-medium hover:underline">
              <ArrowLeft size={16} className="mr-2" /> Back to Home
            </Link>
          </motion.div>
        </Container>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg font-sans selection:bg-light-accent/30 selection:text-light-accent dark:selection:bg-dark-accent/30 dark:selection:text-dark-accent">
      <ReadingProgress />
      <Navbar />
      <main className="pt-28 pb-16">
        <Container maxWidth="content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Link to="/" className="inline-flex items-center text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent dark:hover:text-dark-accent mb-8 transition-colors group">
              <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to articles
            </Link>

            <article>
              {/* Meta information */}
              <div className="flex items-center gap-4 text-sm text-light-text-secondary dark:text-dark-text-secondary mb-6 tracking-wide">
                <span className="font-bold text-light-accent dark:text-dark-accent uppercase tracking-wider text-xs px-2.5 py-1 bg-light-accent/10 dark:bg-dark-accent/10 rounded-full">
                  {post.source}
                </span>
                <div className="flex items-center gap-3 opacity-80">
                  <span className="flex items-center"><Calendar size={14} className="mr-1.5" /> <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time></span>
                  <span className="flex items-center"><Clock size={14} className="mr-1.5" /> {calculateReadingTime(post.summary)}</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-light-text-primary dark:text-dark-text-primary mb-8 leading-[1.15] tracking-tight">
                {post.title}
              </h1>

              {/* Cover image */}
              {post.imageUrl && (
                <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 0.7, delay: 0.2 }}
                   className="mb-12 rounded-2xl overflow-hidden shadow-2xl shadow-light-accent/10 dark:shadow-dark-accent/10"
                >
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-auto object-cover max-h-[500px]"
                  />
                </motion.div>
              )}

              {/* Content sections */}
              <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ duration: 0.6, delay: 0.4 }}
                 className="prose prose-lg sm:prose-xl prose-gray dark:prose-invert max-w-none text-light-text-secondary dark:text-dark-text-secondary"
              >
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6 flex items-center">
                    <span className="w-8 h-1 bg-light-accent dark:bg-dark-accent rounded-full mr-4 inline-block"></span>
                    Summary
                  </h2>
                  <p className="leading-relaxed text-lg mb-8 bg-light-surface/50 dark:bg-dark-surface/50 p-6 sm:p-8 rounded-2xl border border-light-border/50 dark:border-dark-border/50 shadow-sm">
                    {post.summary}
                  </p>
                </section>

                {post.hotTakes && post.hotTakes.length > 0 && (
                  <section className="mb-12">
                    <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6 flex items-center">
                      <span className="w-8 h-1 bg-light-accent dark:bg-dark-accent rounded-full mr-4 inline-block"></span>
                      Key Insights
                    </h2>
                    <ul className="space-y-4 list-none pl-0">
                      {post.hotTakes.map((take, index) => (
                        <li
                          key={index}
                          className="flex items-start text-lg leading-relaxed bg-white/50 dark:bg-black/20 p-4 rounded-xl"
                        >
                          <span className="mr-4 mt-1.5 flex flex-shrink-0 items-center justify-center w-6 h-6 rounded-full bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent text-sm font-bold">
                            {index + 1}
                          </span>
                          <span>{take}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                <section className="mb-12">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <Tag key={index} variant="default" className="text-sm px-3 py-1">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                </section>

                <section className="mt-16 pt-8 border-t border-light-border/50 dark:border-dark-border/50 flex justify-center sm:justify-start">
                  <a
                    href={post.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-light-text-primary dark:bg-dark-text-primary text-light-bg dark:text-dark-bg hover:opacity-90 rounded-xl font-medium transition-all hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Read Original Article
                    <ExternalLink size={18} />
                  </a>
                </section>
              </motion.div>
            </article>
          </motion.div>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default PostPage;
