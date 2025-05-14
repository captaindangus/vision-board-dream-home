import React from 'react';

interface FeatureCardProps {
  imageUrl: string;
  title: string;
  description: string;
}

export function FeatureCard({ imageUrl, title, description }: FeatureCardProps) {
  return (
    <div className="flex w-[234px] h-[71px] items-center gap-2 bg-[#F3F3F4] p-2 rounded-xl">
      <img
        src={imageUrl}
        alt=""
        className="flex-1 h-full rounded-[8px]"
      />
      <div className="flex w-[145px] flex-col items-start gap-2">
        <div className="w-full text-black text-sm font-bold">
          {title}
        </div>
        <div className="w-full text-black text-[10px]">
          {description}
        </div>
      </div>
    </div>
  );
}
