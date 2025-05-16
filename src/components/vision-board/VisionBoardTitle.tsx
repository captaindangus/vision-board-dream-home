
import React, { useState, useEffect } from 'react';
import { getBoardTitle } from '@/utils/visionBoardUtils';

interface VisionBoardTitleProps {
  initialTitle?: string;
}

export function VisionBoardTitle({ initialTitle }: VisionBoardTitleProps) {
  const [title, setTitle] = useState(() => initialTitle || getBoardTitle());

  // Listen for title changes from other components
  useEffect(() => {
    const checkTitle = () => {
      const currentTitle = getBoardTitle();
      if (currentTitle !== title) {
        setTitle(currentTitle);
      }
    };
    
    // Check initially
    checkTitle();
    
    // Set up an interval to check periodically
    const intervalId = setInterval(checkTitle, 1000);
    
    return () => clearInterval(intervalId);
  }, [title]);

  return (
    <div className="flex items-center">
      <h1 className="text-[rgba(12,15,36,1)] text-2xl font-bold">
        {title}
      </h1>
    </div>
  );
}
