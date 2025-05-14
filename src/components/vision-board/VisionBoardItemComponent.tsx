
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { VisionBoardItem } from '@/context/VisionBoardContext';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface VisionBoardItemComponentProps {
  item: VisionBoardItem;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  onRemove: () => void;
  isDragging: boolean;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  onDragEnd?: () => void;
}

export function VisionBoardItemComponent({ 
  item, 
  onMouseDown, 
  onRemove,
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragStart,
  onDragEnd
}: VisionBoardItemComponentProps) {
  const [isHovering, setIsHovering] = useState(false);
  
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    
    // Call external drag start handler if provided
    if (onDragStart) {
      onDragStart(e, item.id);
      return;
    }
    
    // Set drag data for this item
    const dragData = {
      id: item.id,
      action: 'reorder'
    };
    
    e.dataTransfer.setData('application/json', JSON.stringify(dragData));
    e.dataTransfer.effectAllowed = "move";
    
    // Create a copy of the element as the drag image
    const dragImage = e.currentTarget.cloneNode(true) as HTMLElement;
    dragImage.style.width = e.currentTarget.offsetWidth + 'px';
    dragImage.style.opacity = '0.8';
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    document.body.appendChild(dragImage);
    
    e.dataTransfer.setDragImage(
      dragImage, 
      e.clientX - e.currentTarget.getBoundingClientRect().left, 
      e.clientY - e.currentTarget.getBoundingClientRect().top
    );
    
    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    if (onDragEnd) {
      onDragEnd();
    }
  };

  // Determine if this is a neighborhood feature
  const isNeighborhoodFeature = item.type === 'neighborhoodFeature';
  
  // Set aspect ratio based on item type
  const aspectRatio = isNeighborhoodFeature ? 16/9 : 4/3;

  return (
    <div
      className={`rounded-xl overflow-hidden shadow-md bg-white cursor-move w-full ${
        isDragging ? 'z-50 opacity-90' : 'z-10'
      }`}
      onMouseDown={onMouseDown}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      data-item-id={item.id}
    >
      <div className="relative">
        {isHovering && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="absolute top-1 right-1 bg-white rounded-full p-1 z-20 opacity-80 hover:opacity-100 shadow-sm transition-opacity"
            aria-label="Remove item"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        
        {(item.type === 'image' || item.type === 'homeFeature' || item.type === 'neighborhoodFeature') ? (
          <div className="relative">
            <AspectRatio ratio={aspectRatio} className="w-full">
              <img
                src={item.content.imageUrl}
                alt={item.content.title || "Vision board image"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback for broken images
                  (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/png';
                }}
              />
            </AspectRatio>
            {item.content.title && (
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 px-2 py-1 rounded text-white text-xs">
                {item.content.title}
              </div>
            )}
            {isNeighborhoodFeature && item.content.description && (
              <div className="absolute bottom-8 left-2 right-2 bg-black bg-opacity-60 px-2 py-1 rounded text-white text-xs line-clamp-2">
                {item.content.description}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-[#F3F3F4] p-3 rounded-xl w-full">
            <div className="text-black text-sm font-bold truncate mb-1">
              {item.content.title}
            </div>
            {item.content.description && (
              <div className="text-black text-xs">
                {item.content.description}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
