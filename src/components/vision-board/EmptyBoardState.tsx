
import React from 'react';
import { Image } from 'lucide-react';

export function EmptyBoardState() {
  return (
    <div className="flex flex-col justify-center items-center gap-6 w-full h-full py-10 col-span-3">
      <div className="flex flex-col items-center">
        <div className="mb-6 text-gray-300">
          <Image className="w-24 h-24" strokeWidth={1} />
        </div>
        <h1 className="text-center text-[#0C0F24] text-2xl font-bold">Add Your First Image ✨</h1>
        <p className="text-center text-[#0C0F24] text-base mt-3">
          Drag items from the sidebar or upload an image to get started!
        </p>
      </div>
    </div>
  );
}
