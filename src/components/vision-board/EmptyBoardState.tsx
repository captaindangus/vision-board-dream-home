
import React from 'react';
import { Image, Star } from 'lucide-react';

export function EmptyBoardState() {
  return (
    <div className="flex flex-col justify-center items-center gap-6 w-full h-full py-10 col-span-3">
      <div className="flex flex-col items-center">
        <div className="mb-6 text-gray-300 relative">
          <Image className="w-24 h-24" strokeWidth={1} />
          <Star className="w-8 h-8 text-amber-400 absolute -top-2 -right-2" />
        </div>
        <h1 className="text-center text-[#0C0F24] text-2xl font-bold">Welcome to Your Vision Board ✨</h1>
        <p className="text-center text-[#0C0F24] text-base mt-3">
          This is where your dream home comes to life! Drag items from the sidebar or upload images to get started.
        </p>
        <div className="mt-6 flex flex-col items-center">
          <p className="text-gray-500 text-sm mb-2">Tip: Try adding home features you love</p>
          <div className="flex items-center gap-2 text-gray-600">
            <span className="bg-blue-100 px-3 py-1 rounded-full text-xs">Open floor plan</span>
            <span className="bg-green-100 px-3 py-1 rounded-full text-xs">Natural light</span>
            <span className="bg-orange-100 px-3 py-1 rounded-full text-xs">Modern kitchen</span>
          </div>
        </div>
      </div>
    </div>
  );
}
