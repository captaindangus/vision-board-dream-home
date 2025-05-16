
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
  }, []);

  return (
    <div className="h-screen overflow-hidden">
      <VisionBoard />
      <Toaster />
    </div>
  );
}
