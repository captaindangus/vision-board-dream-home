
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
      <div className={`flex flex-1 gap-5 p-5 pb-5 overflow-hidden ${isWideScreen ? 'flex-row' : 'flex-col'}`}>
        <div className={`${isWideScreen ? 'w-1/2' : 'w-full h-[300px]'} rounded-[20px] overflow-hidden shadow-sm`}>
          <ListingsMap />
        </div>
        <div className={`${isWideScreen ? 'w-1/2' : 'w-full'} overflow-hidden`}>
          <ListingsGrid isWideScreen={isWideScreen} />
        </div>
      </div>
    </div>
  );
}
