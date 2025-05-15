
import React from 'react';
import { Upload } from 'lucide-react';

export function EmptyBoardState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center text-gray-500 h-[400px] border-2 border-dashed border-gray-200 rounded-xl p-8">
      <Upload className="h-12 w-12 mb-4 text-gray-400" />
      <p className="text-center">
        Upload or paste an image, or drag one in from the sidebar to get started!
      </p>
    </div>
  );
}
