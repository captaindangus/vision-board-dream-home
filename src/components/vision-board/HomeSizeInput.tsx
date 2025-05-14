
import React, { useState } from 'react';

export function HomeSizeInput() {
  const [minSize, setMinSize] = useState<string>("");
  const [maxSize, setMaxSize] = useState<string>("2,000");

  return (
    <div className="flex w-full flex-col items-start gap-3 bg-[#F3F3F4] px-3.5 py-[18px] rounded-xl">
      <div className="text-black text-sm font-bold">
        📏 Home Size (sqft)
      </div>
      <div className="flex items-center gap-1 w-full">
        <div className="flex items-center gap-1 flex-1 bg-white px-2 py-[9px] rounded-lg border-[1px_solid_#D1D1D2]">
          <input
            type="text"
            value={minSize}
            onChange={(e) => setMinSize(e.target.value)}
            placeholder="No Min"
            className="text-[rgba(133,135,145,1)] text-xs bg-transparent border-none outline-none w-full"
          />
        </div>
        <div className="text-[rgba(12,15,36,1)] text-xs">-</div>
        <div className="flex items-center gap-1 flex-1 bg-white px-2 py-[9px] rounded-lg border-[1px_solid_#D1D1D2]">
          <input
            type="text"
            value={maxSize}
            onChange={(e) => setMaxSize(e.target.value)}
            className="text-[rgba(12,15,36,1)] text-xs bg-transparent border-none outline-none w-full"
          />
        </div>
      </div>
    </div>
  );
}
