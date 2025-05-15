
import React from 'react';
import { VisionBoardHeader } from '@/components/vision-board/VisionBoardHeader';
import { ListingsView } from '@/components/listings/ListingsView';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';

export default function Listings() {
  return (
    <div className="h-screen overflow-hidden">
      <VisionBoardHeader />
      <ListingsView />
      <Toaster />
      <SonnerToaster />
      
      {/* Add Mapbox CSS */}
      <style>
        {`
        .mapboxgl-ctrl-logo, .mapboxgl-ctrl-attrib {
          display: none !important;
        }
        
        .mapboxgl-popup-content {
          padding: 12px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .mapboxgl-ctrl-group {
          border-radius: 8px !important;
          overflow: hidden;
          box-shadow: 0 1px 4px rgba(0,0,0,0.1) !important;
        }
        
        .mapboxgl-ctrl button {
          width: 32px !important;
          height: 32px !important;
        }
        
        .map-marker {
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
        `}
      </style>
    </div>
  );
}
