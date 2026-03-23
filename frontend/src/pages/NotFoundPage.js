import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Container } from '../components/layout/Container';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-light-bg dark:bg-dark-bg">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <Container maxWidth="content">
          <div className="text-center py-12 px-4">
            <h1 className="text-9xl font-bold text-blue-600 dark:text-blue-500 mb-4">
              404
            </h1>
            <h2 className="text-3xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary mb-8">
              The page you're looking for doesn't exist.
            </p>
            <Link
              to="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-lg transition-colors"
            >
              Go Back Home
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
