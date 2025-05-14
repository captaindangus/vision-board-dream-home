
import React, { useState } from 'react';
import { ListingsMap } from './ListingsMap';
import { ListingsGrid } from './ListingsGrid';
import { ListingsHeader } from './ListingsHeader';

export function ListingsView() {
  const [viewMode, setViewMode] = useState<'grid' | 'swipe'>('grid');

  return (
    <div className="flex flex-col h-full">
      <ListingsHeader viewMode={viewMode} setViewMode={setViewMode} />
      <div className="flex flex-1 gap-5 p-5 pb-5 overflow-hidden">
        <div className="w-1/2 rounded-[20px] overflow-hidden shadow-sm">
          <ListingsMap />
        </div>
        <div className="w-1/2 overflow-hidden">
          <ListingsGrid viewMode={viewMode} />
        </div>
      </div>
    </div>
  );
}
