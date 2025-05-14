
import React from 'react';
import { VisionBoardHeader } from '@/components/vision-board/VisionBoardHeader';
import { ListingsView } from '@/components/listings/ListingsView';
import { Toaster } from '@/components/ui/sonner';

export default function Listings() {
  return (
    <div className="h-screen overflow-hidden">
      <VisionBoardHeader />
      <ListingsView />
      <Toaster />
    </div>
  );
}
