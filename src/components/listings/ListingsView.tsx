
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
        {/* Map directly on the background */}
        <div className="w-[40%] overflow-hidden rounded-[20px]">
          <ListingsMap />
        </div>
        {/* Listings in a white container */}
        <div className="w-[60%] bg-white rounded-[20px] overflow-hidden shadow-sm">
          <ListingsGrid isWideScreen={isWideScreen} />
        </div>
      </div>
    </div>
  );
}
