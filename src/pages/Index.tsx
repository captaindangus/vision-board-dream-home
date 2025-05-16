
import React from 'react';
import { VisionBoard } from '@/components/vision-board/VisionBoard';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

export default function Index() {
  React.useEffect(() => {
    // Show initial toast message only
    toast.info(
      "Drag items from the sidebar and drop them onto your vision board!",
      {
        duration: 5000,
      }
    );
    
    // Check if we're in a "new board" state by checking localStorage
    // If there's no data in the localStorage, we'll consider this a new board
    const visionBoardItems = localStorage.getItem('visionBoardItems');
    if (!visionBoardItems || visionBoardItems === '[]') {
      // This is a new board, the empty state will be handled by VisionBoardGrid component
      console.log('New board - empty state should display');
    }
  }, []);

  return (
    <div className="h-screen overflow-hidden">
      <VisionBoard />
      <Toaster />
    </div>
  );
}
