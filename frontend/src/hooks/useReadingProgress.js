import { useState, useEffect } from 'react';

export function useReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = null;
    let ticking = false;

    const updateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // Calculate progress percentage
      const scrollableHeight = documentHeight - windowHeight;
      const scrollPercentage = scrollableHeight > 0
        ? (scrollTop / scrollableHeight) * 100
        : 0;

      setProgress(Math.min(100, Math.max(0, scrollPercentage)));
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    // Initial calculation
    updateProgress();

    // Add passive scroll listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Recalculate on resize
    window.addEventListener('resize', updateProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateProgress);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return progress;
}
