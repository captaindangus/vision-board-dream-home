
import React, { useRef, useEffect } from 'react';
import { Upload } from 'lucide-react';
import { useVisionBoard } from '@/context/VisionBoardContext';
import { useToast } from '@/hooks/use-toast';

// List of possible tags to randomly assign to images
const possibleTags = [
  "Modern Design",
  "Spacious",
  "Bright",
  "Natural Lighting",
  "Neutral Tones",
  "Hardwood Flooring",
  "Open"
];

// Helper to get random tags
function getRandomTags(count = 2) {
  const shuffled = [...possibleTags].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function UploadButton() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addItem } = useVisionBoard();
  const { toast } = useToast();
  
  // Handle paste events on the document
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const blob = items[i].getAsFile();
          if (blob) {
            processFile(blob);
          }
        }
      }
    };
    
    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, []);
  
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload only image files.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      
      // Generate random tags for the image
      const tags = getRandomTags();
      
      // Add image to vision board with tags
      addItem({
        type: 'image',
        content: {
          imageUrl,
          title: file.name,
          tags: tags,
        },
        position: {
          x: Math.floor(Math.random() * 200) + 50,
          y: Math.floor(Math.random() * 200) + 50,
        },
        size: {
          width: 250,
          height: 200,
        },
      });

      toast({
        title: "Image added",
        description: "Your image has been added to the vision board.",
      });
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      processFile(file);
    });

    // Reset the file input value so the same file can be uploaded again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <button 
        onClick={handleClick}
        className="text-white text-base font-medium flex items-center gap-2 bg-[#0C0F24] px-6 py-2.5 rounded-[100px]"
        aria-label="Upload images"
      >
        <Upload size={18} />
        Upload
      </button>
      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        aria-hidden="true"
      />
    </>
  );
}
