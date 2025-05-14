
import React, { useState } from 'react';
import { Slider } from "@/components/ui/slider";

export function PriceRangeSlider() {
  const [priceRange, setPriceRange] = useState<number[]>([0, 1100000]);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("1.1M");

  const handleSliderChange = (value: number[]) => {
    setPriceRange(value);
    
    // Update text inputs based on slider position
    const minValue = value[0];
    const maxValue = value[1];
    
    // Format the input values
    setMinPrice(minValue === 0 ? "" : formatPrice(minValue));
    setMaxPrice(formatPrice(maxValue));
  };

  const formatPrice = (price: number): string => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `${(price / 1000).toFixed(0)}K`;
    }
    return price.toString();
  };

  const parsePrice = (price: string): number => {
    if (!price) return 0;
    
    if (price.endsWith('M')) {
      return parseFloat(price.replace('M', '')) * 1000000;
    } else if (price.endsWith('K')) {
      return parseFloat(price.replace('K', '')) * 1000;
    }
    return parseFloat(price) || 0;
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value);
    
    if (value) {
      const parsedValue = parsePrice(value);
      setPriceRange([parsedValue, priceRange[1]]);
    } else {
      setPriceRange([0, priceRange[1]]);
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value);
    
    const parsedValue = value ? parsePrice(value) : 1100000;
    setPriceRange([priceRange[0], parsedValue]);
  };

  return (
    <div className="flex w-full flex-col items-start gap-3 bg-[#F3F3F4] px-3.5 py-[18px] rounded-xl">
      <div className="w-full text-black text-sm font-bold">
        💰Price
      </div>
      <div className="w-full px-1 py-2">
        <Slider 
          defaultValue={priceRange} 
          max={2000000} 
          step={50000}
          value={priceRange}
          onValueChange={handleSliderChange}
          className="w-full"
        />
      </div>
      <div className="flex items-center gap-1 w-full">
        <div className="flex items-center gap-1 flex-1 bg-white px-2 py-[9px] rounded-lg border-[1px_solid_#D1D1D2]">
          <div className="text-[rgba(12,15,36,1)] text-xs">$</div>
          <input
            type="text"
            value={minPrice}
            onChange={handleMinPriceChange}
            placeholder="No Min"
            className="text-[rgba(133,135,145,1)] text-xs bg-transparent border-none outline-none w-full"
          />
        </div>
        <div className="text-[rgba(12,15,36,1)] text-xs">-</div>
        <div className="flex items-center gap-1 flex-1 bg-white px-2 py-[9px] rounded-lg border-[1px_solid_#D1D1D2]">
          <div className="text-[rgba(12,15,36,1)] text-xs">$</div>
          <input
            type="text"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="text-[rgba(12,15,36,1)] text-xs bg-transparent border-none outline-none w-full"
          />
        </div>
      </div>
    </div>
  );
}
