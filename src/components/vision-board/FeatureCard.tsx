
import React from 'react';

interface FeatureCardProps {
  imageUrl: string;
  title: string;
  description: string;
  onClick?: () => void;
}

export function FeatureCard({ imageUrl, title, description, onClick }: FeatureCardProps) {
  return (
    <div 
      className="flex w-[234px] h-[71px] items-center gap-2 bg-[#F3F3F4] p-2 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <img
        src={imageUrl}
        alt={title}
        className="flex-1 h-full object-cover rounded-[8px]"
      />
      <div className="flex w-[145px] flex-col items-start gap-2">
        <div className="w-full text-black text-sm font-bold truncate">
          {title}
        </div>
        <div className="w-full text-black text-[10px] line-clamp-2">
          {description}
        </div>
      </div>
    </div>
  );
}
