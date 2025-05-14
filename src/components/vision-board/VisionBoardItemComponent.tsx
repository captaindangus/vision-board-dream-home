
import React from 'react';
import { X } from 'lucide-react';
import { VisionBoardItem } from '@/context/VisionBoardContext';

interface VisionBoardItemComponentProps {
  item: VisionBoardItem;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  onRemove: () => void;
  isDragging: boolean;
}

export function VisionBoardItemComponent({ 
  item, 
  onMouseDown, 
  onRemove,
  isDragging
}: VisionBoardItemComponentProps) {
  return (
    <div
      className={`absolute rounded-xl overflow-hidden shadow-md bg-white cursor-move ${
        isDragging ? 'z-50 opacity-90' : 'z-10'
      }`}
      style={{
        left: `${item.position.x}px`,
        top: `${item.position.y}px`,
        width: item.size?.width || 'auto',
        height: item.size?.height || 'auto',
      }}
      onMouseDown={onMouseDown}
    >
      <div className="relative">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute top-1 right-1 bg-white rounded-full p-1 z-20 opacity-80 hover:opacity-100"
          aria-label="Remove item"
        >
          <X className="w-4 h-4" />
        </button>
        
        {item.type === 'image' || item.type === 'homeFeature' ? (
          <div className="relative">
            <img
              src={item.content.imageUrl}
              alt={item.content.title || "Vision board image"}
              className="w-full h-full object-cover"
              style={{ minHeight: '120px', minWidth: '150px' }}
            />
            {item.content.title && (
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 px-2 py-1 rounded text-white text-xs">
                {item.content.title}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-[#F3F3F4] p-3 rounded-xl min-w-[200px]">
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
