import React, { createContext, useState, useContext, useEffect } from 'react';

const ProgressBarContext = createContext();

export const ProgressBarProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const simulateYouTubeProgress = () => {
    // Clear any existing interval
    if (intervalId) clearInterval(intervalId);
    
    // Start new simulation
    const id = setInterval(() => {
      setProgress(prev => {
        // YouTube-like random increments
        const jump = Math.random() * 15; // Random jump between 0-15%
        const newProgress = prev + jump;
        
        // Never go above 90% automatically (YouTube behavior)
        return Math.min(newProgress, 90);
      });
    }, 500); // Update every 500ms

    setIntervalId(id);
  };

  const startProgress = () => {
    setIsVisible(true);
    setProgress(10);
    simulateYouTubeProgress();
  };

  const stopProgress = () => {
    // Clear the simulation interval
    if (intervalId) clearInterval(intervalId);
    
    // Jump to 100% and fade out
    setProgress(100);
    setTimeout(() => {
      setIsVisible(false);
      setProgress(0);
    }, 300);
  };

  const resetProgress = () => {
    if (intervalId) clearInterval(intervalId);
    setIsVisible(false);
    setProgress(0);
  };

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <ProgressBarContext.Provider 
      value={{ startProgress, stopProgress, resetProgress }}
    >
      {children}
      {isVisible && (
        <div className="progress-bar">
          <div 
            className="progress-bar-inner" 
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </ProgressBarContext.Provider>
  );
};

export const useProgressBar = () => useContext(ProgressBarContext);