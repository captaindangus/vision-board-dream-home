
import React from 'react';
import { ListingsMap } from './ListingsMap';
import { ListingsGrid } from './ListingsGrid';
import { ListingsHeader } from './ListingsHeader';
import { useMediaQuery } from '@/hooks/use-media-query';

export function ListingsView() {
  const isWideScreen = useMediaQuery("(min-width: 1000px)");
  
  return (
    <div className="flex flex-col h-full">
      <ListingsHeader />
      <div className="flex flex-1 gap-5 p-5 pb-5 overflow-hidden">
        {/* Map in its own container */}
        <div className="w-[40%] rounded-[20px] overflow-hidden shadow-sm min-h-[500px]">
          <ListingsMap />
        </div>
        
        {/* Listings in their own white container with rounded corners */}
        <div className="w-[60%] bg-white rounded-[20px] p-4 shadow-sm overflow-hidden">
          <ListingsGrid isWideScreen={isWideScreen} />
        </div>
      </div>
    </div>
  );
}
