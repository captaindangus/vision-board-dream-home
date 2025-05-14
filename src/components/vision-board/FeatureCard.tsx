
import React, { useRef } from 'react';

interface FeatureCardProps {
  imageUrl: string;
  title: string;
  description: string;
  onClick?: () => void;
  draggable?: boolean;
  featureData?: any;
}

export function FeatureCard({ 
  imageUrl, 
  title, 
  description, 
  onClick, 
  draggable = false,
  featureData
}: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleDragStart = (e: React.DragEvent) => {
    if (!draggable) return;
    
    // Set the drag data
    e.dataTransfer.setData("application/json", JSON.stringify({
      type: 'neighborhoodFeature',
      content: {
        imageUrl,
        title,
        description
      },
      size: { width: 250, height: 'auto' }
    }));
    e.dataTransfer.effectAllowed = "copy";
    
    // Create a proper drag image that better represents the card
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      
      // Create a clone of the card to use as the drag image
      const dragImage = cardRef.current.cloneNode(true) as HTMLElement;
      
      // Set the exact same styles to ensure it looks identical
      dragImage.style.width = `${rect.width}px`;
      dragImage.style.height = `${rect.height}px`;
      dragImage.style.borderRadius = '0.75rem'; // rounded-xl
      dragImage.style.overflow = 'hidden';
      dragImage.style.background = '#F3F3F4';
      dragImage.style.padding = '12px';
      dragImage.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
      dragImage.style.opacity = '0.9';
      dragImage.style.position = 'absolute';
      dragImage.style.top = '-1000px';
      dragImage.style.left = '0';
      dragImage.style.pointerEvents = 'none';
      dragImage.style.zIndex = '9999';
      
      document.body.appendChild(dragImage);
      
      // Calculate proper offset to make dragging feel natural
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      
      e.dataTransfer.setDragImage(dragImage, offsetX, offsetY);
      
      // Remove the drag image after the drag operation
      setTimeout(() => {
        document.body.removeChild(dragImage);
      }, 0);
    }
  };
  
  return (
    <div 
      ref={cardRef}
      className={`flex w-full h-[80px] items-center gap-2 bg-[#F3F3F4] p-3 rounded-xl hover:bg-gray-100 transition-colors ${draggable ? 'cursor-grab' : 'cursor-pointer'}`}
      onClick={onClick}
      draggable={draggable}
      onDragStart={handleDragStart}
    >
      <img
        src={imageUrl}
        alt={title}
        className="h-full w-[80px] object-cover rounded-[8px]"
      />
      <div className="flex flex-1 flex-col items-start gap-2">
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
