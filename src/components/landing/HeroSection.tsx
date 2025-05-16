
import React from 'react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onCreateNewBoard: () => void;
}

const HeroSection = ({ onCreateNewBoard }: HeroSectionProps) => {
  return (
    <div className="text-center mb-16">
      <div className="mx-auto" style={{ maxWidth: '608px' }}>
        <h1 className="text-[76px] font-semibold mb-5 leading-[76px]" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Vision Board To Dream Home
        </h1>
        <p className="text-xl text-gray-600">
          Create a vision board of your dream home—style, layout, vibes— and our AI finds real listings that match your vision!
        </p>
      </div>
      <div className="mt-8">
        <Button 
          className="rounded-full px-6 py-6 text-lg bg-black hover:bg-gray-800"
          onClick={onCreateNewBoard}
        >
          Create a New Board
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
