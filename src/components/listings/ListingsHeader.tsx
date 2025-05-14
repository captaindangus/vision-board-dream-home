
import React from 'react';

interface ListingsHeaderProps {
  viewMode: 'grid' | 'swipe';
  setViewMode: React.Dispatch<React.SetStateAction<'grid' | 'swipe'>>;
}

export function ListingsHeader({ viewMode, setViewMode }: ListingsHeaderProps) {
  return (
    <div className="flex justify-end p-4">
      <div className="flex items-center bg-[#F0F0F0] p-1 rounded-md">
        <button
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            viewMode === 'swipe' ? 'bg-white shadow-sm' : 'text-gray-600'
          }`}
          onClick={() => setViewMode('swipe')}
        >
          Swipe
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-600'
          }`}
          onClick={() => setViewMode('grid')}
        >
          Grid
        </button>
      </div>
    </div>
  );
}
