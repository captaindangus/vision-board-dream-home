
import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { useVisionBoard } from '@/context/VisionBoardContext';
import { useToast } from '@/hooks/use-toast';

export function UploadButton() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addItem } = useVisionBoard();
  const { toast } = useToast();

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
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
        
        // Add image to vision board
        addItem({
          type: 'image',
          content: {
            imageUrl,
            title: file.name,
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
          title: "Image uploaded",
          description: "Your image has been added to the vision board.",
        });
      };

      reader.readAsDataURL(file);
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
