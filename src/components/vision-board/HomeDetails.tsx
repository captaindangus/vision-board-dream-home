
import React from 'react';
import { PriceRangeSlider } from './PriceRangeSlider';
import { HomeSizeInput } from './HomeSizeInput';

export function HomeDetails() {
  return (
    <div className="flex flex-col items-start gap-3 w-full">
      <PriceRangeSlider />
      <HomeSizeInput />
    </div>
  );
}
