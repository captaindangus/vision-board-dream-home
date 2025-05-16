
import React from 'react';
import { VisionBoard } from '@/components/vision-board/VisionBoard';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

export default function Index() {
  React.useEffect(() => {
    // Show initial toast message
    toast.info(
      "Drag items from the sidebar and drop them onto your vision board!",
      {
        duration: 5000,
      }
    );
    
    // Add a slight delay before showing the second toast
    const timer = setTimeout(() => {
      toast.info(
        "Click the 'Summarize✨' button to see a summary of your vision board!",
        {
          duration: 5000,
        }
      );
    }, 6000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen overflow-hidden">
      <VisionBoard />
      <Toaster />
    </div>
  );
}
