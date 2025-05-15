
import React, { useState } from 'react';

export function HomeSizeInput() {
  const [minSize, setMinSize] = useState<string>("");
  const [maxSize, setMaxSize] = useState<string>("2,000");

  const handleDragStart = (e: React.DragEvent) => {
    console.log('Dragging home size widget');
    
    // Set the drag data
    e.dataTransfer.setData("application/json", JSON.stringify({
      type: 'homeSize',
      content: {
        title: '📏 Home Size',
        minSize: minSize || 'No Min',
        maxSize: maxSize || 'No Max'
      },
      size: { width: 250, height: 'auto' }
    }));
    e.dataTransfer.effectAllowed = "copy";
    
    // Create a drag image
    const element = e.currentTarget;
    const dragImage = element.cloneNode(true) as HTMLElement;
    dragImage.style.width = element.clientWidth + 'px';
    dragImage.style.opacity = '0.8';
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    document.body.appendChild(dragImage);
    
    // Set the drag image
    e.dataTransfer.setDragImage(dragImage, 40, 40);
    
    // Remove the drag image after
    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);
  };

  return (
    <div 
      className="flex w-full flex-col items-start gap-3 bg-[#F3F3F4] px-3.5 py-[18px] rounded-xl cursor-grab"
      draggable="true"
      onDragStart={handleDragStart}
    >
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
