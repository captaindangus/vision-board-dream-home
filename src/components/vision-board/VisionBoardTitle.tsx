
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Check, Pencil } from 'lucide-react';

interface VisionBoardTitleProps {
  initialTitle?: string;
}

export function VisionBoardTitle({ initialTitle = "Untitled Vision Board 🌟" }: VisionBoardTitleProps) {
  const [title, setTitle] = useState(initialTitle);
  const [isEditing, setIsEditing] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
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
          onBlur={toggleEditing}
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
