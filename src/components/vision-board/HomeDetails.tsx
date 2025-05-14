import React from 'react';
import { PriceRangeSlider } from './PriceRangeSlider';
import { HomeSizeInput } from './HomeSizeInput';

export function HomeDetails() {
  return (
    <div className="flex items-start gap-2 w-full overflow-x-auto">
      <PriceRangeSlider />
      <HomeSizeInput />
    </div>
  );
}
