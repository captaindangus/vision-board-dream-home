
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
      
      {/* Add Mapbox CSS */}
      <style jsx global>{`
        .mapboxgl-ctrl-logo, .mapboxgl-ctrl-attrib {
          display: none !important;
        }
        
        .mapboxgl-popup-content {
          padding: 12px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
}
