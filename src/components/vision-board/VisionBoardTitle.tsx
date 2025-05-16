
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Check, Pencil } from 'lucide-react';
import { getBoardTitle, setBoardTitle } from '@/utils/visionBoardUtils';

interface VisionBoardTitleProps {
  initialTitle?: string;
}

export function VisionBoardTitle({ initialTitle }: VisionBoardTitleProps) {
  const [title, setTitle] = useState(() => initialTitle || getBoardTitle());
  const [isEditing, setIsEditing] = useState(false);

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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const toggleEditing = () => {
    if (isEditing) {
      // Save the title when finishing edit
      setBoardTitle(title);
    }
    setIsEditing(!isEditing);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setBoardTitle(title);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <Input
          type="text"
          value={title}
          onChange={handleTitleChange}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            setBoardTitle(title);
            toggleEditing();
          }}
          autoFocus
          className="text-[rgba(12,15,36,1)] text-2xl font-bold h-auto py-1"
        />
      ) : (
        <h1 className="text-[rgba(12,15,36,1)] text-2xl font-bold">
          {title}
        </h1>
      )}
      <button 
        onClick={toggleEditing}
        className="p-1 rounded-full hover:bg-gray-100"
        aria-label={isEditing ? "Save title" : "Edit title"}
      >
        {isEditing ? (
          <Check className="w-5 h-5 text-[rgba(12,15,36,1)]" />
        ) : (
          <Pencil className="w-5 h-5 text-[rgba(12,15,36,1)]" />
        )}
      </button>
    </div>
  );
}
