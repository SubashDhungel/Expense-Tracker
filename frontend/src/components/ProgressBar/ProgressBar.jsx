// src/components/TopProgressBar.js
import React, { useState, useEffect } from 'react';

const ProgressBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress when visible
    let interval;
    if (isVisible) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) return 95;
          return prev + Math.floor(Math.random() * 10);
        });
      }, 300);
    }
    
    return () => clearInterval(interval);
  }, [isVisible]);

  useEffect(() => {
    // Global event listeners
    const show = () => {
      setIsVisible(true);
      setProgress(10);
    };

    const hide = () => {
      setProgress(100);
      setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
      }, 300);
    };

    // Add event listeners
    window.addEventListener('navigation-start', show);
    window.addEventListener('api-start', show);
    window.addEventListener('navigation-complete', hide);
    window.addEventListener('api-complete', hide);

    return () => {
      window.removeEventListener('navigation-start', show);
      window.removeEventListener('api-start', show);
      window.removeEventListener('navigation-complete', hide);
      window.removeEventListener('api-complete', hide);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div style={styles.progressBar}>
      <div style={{ ...styles.progress, width: `${progress}%` }} />
    </div>
  );
};

const styles = {
  progressBar: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '3px',
    width: '100%',
    backgroundColor: 'transparent',
    zIndex: 9999
  },
  progress: {
    height: '100%',
    backgroundColor: '#FF0000', // YouTube red color
    transition: 'width 0.3s ease',
    boxShadow: '0 0 10px rgba(255,0,0,0.7)'
  }
};

export default ProgressBar;