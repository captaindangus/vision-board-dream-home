
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Check, Pencil } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export function VisionBoardContent() {
  const [title, setTitle] = useState("MyVisionBoard 1 🌟");
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
    <main className="flex flex-col w-full h-full bg-white px-6 py-8 rounded-[20px]">
      <div className="flex justify-between items-center w-full mb-4">
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
        <button className="text-white text-base font-medium gap-2.5 bg-[#0C0F24] px-6 py-2.5 rounded-[100px]">
          Upload
        </button>
      </div>
      <ScrollArea className="flex-1">
        <EmptyState />
      </ScrollArea>
    </main>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col justify-center items-center gap-9 w-full h-full py-10">
      <div className="max-w-full flex flex-col items-center">
        <h1 className="text-center text-[#0C0F24] text-2xl font-bold mt-6">Add Your First Image ✨</h1>
        <p className="text-center text-[#0C0F24] text-base mt-3">
          Upload or paste an image, or drag one in from the gallery to get started!
        </p>
      </div>
    </div>
  );
}
