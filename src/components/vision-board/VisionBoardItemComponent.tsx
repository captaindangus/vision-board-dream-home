
import React from 'react';
import { X } from 'lucide-react';
import { VisionBoardItem } from '@/context/VisionBoardContext';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface VisionBoardItemComponentProps {
  item: VisionBoardItem;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  onRemove: () => void;
  isDragging: boolean;
  dragMode?: 'reorder' | 'reposition';
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
}

export function VisionBoardItemComponent({ 
  item, 
  onMouseDown, 
  onRemove,
  isDragging,
  dragMode = 'reorder',
  onDragOver,
  onDrop
}: VisionBoardItemComponentProps) {
  // Only make items draggable for reordering if we're not in reposition mode
  const isDraggable = dragMode !== 'reposition';
  
  // Draggable items for reordering
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (!isDraggable) return;
    
    e.dataTransfer.setData('application/json', JSON.stringify({
      id: item.id,
      action: 'reorder'
    }));
    e.dataTransfer.effectAllowed = 'move';
  };

  const cursorClass = isDraggable ? 'cursor-grab active:cursor-grabbing' : 'cursor-move';
  const positioningClass = dragMode === 'reposition' && isDragging ? 'z-50 opacity-90' : '';

  return (
    <div
      className={`rounded-xl overflow-hidden shadow-md bg-white ${cursorClass} ${
        isDragging ? 'z-50 opacity-90' : 'z-10'
      } ${positioningClass}`}
      onMouseDown={onMouseDown}
      draggable={isDraggable ? "true" : "false"}
      onDragStart={handleDragStart}
      onDragOver={isDraggable ? onDragOver : undefined}
      onDrop={isDraggable ? onDrop : undefined}
      data-item-id={item.id}
    >
      <div className="relative">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute top-1 right-1 bg-white rounded-full p-1 z-20 opacity-80 hover:opacity-100 shadow-sm"
          aria-label="Remove item"
        >
          <X className="w-4 h-4" />
        </button>
        
        {item.type === 'image' || item.type === 'homeFeature' ? (
          <div className="relative">
            <AspectRatio ratio={4/3} className="w-full">
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
