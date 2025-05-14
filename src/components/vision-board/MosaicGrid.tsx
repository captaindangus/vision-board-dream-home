
import React, { useState } from 'react';
import { VisionBoardItem } from '@/context/VisionBoardContext';

interface MosaicGridProps {
  items: VisionBoardItem[];
  onItemDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  onDragEnd?: () => void;
  onItemMouseDown: (e: React.MouseEvent<HTMLDivElement>, id: string) => void;
  onItemRemove: (id: string) => void;
  draggedItemId: string | null;
  isDragging: boolean;
}

export function MosaicGrid({
  items,
  onItemDragStart,
  onDragEnd,
  onItemMouseDown,
  onItemRemove,
  draggedItemId,
  isDragging
}: MosaicGridProps) {
  // Sort items by order
  const sortedItems = [...items].sort((a, b) => (a.order || 0) - (b.order || 0));
  
  // Group items into rows (for a mosaic-style layout)
  const [rowsConfig] = useState([
    { itemCount: 3, height: 200 }, // First row: 3 items
    { itemCount: 2, height: 250 }, // Second row: 2 items
    { itemCount: 3, height: 200 }, // Third row: 3 items
    // Pattern repeats
  ]);
  
  // Create rows based on the configuration
  const rows: VisionBoardItem[][] = [];
  let itemIndex = 0;
  
  while (itemIndex < sortedItems.length) {
    for (const rowConfig of rowsConfig) {
      const rowItems = sortedItems.slice(itemIndex, itemIndex + rowConfig.itemCount);
      if (rowItems.length > 0) {
        rows.push(rowItems);
        itemIndex += rowConfig.itemCount;
      }
      
      if (itemIndex >= sortedItems.length) break;
    }
    
    // If we've gone through all configs but still have items, repeat
    if (itemIndex < sortedItems.length && rows.length % rowsConfig.length === 0) {
      continue;
    }
  }
  
  return (
    <div className="w-full">
      {rows.map((row, rowIndex) => {
        const rowConfig = rowsConfig[rowIndex % rowsConfig.length];
        const rowHeight = rowConfig.height;
        
        return (
          <div 
            key={`mosaic-row-${rowIndex}`}
            className="flex w-full mb-4"
            style={{ height: `${rowHeight}px` }}
          >
            {row.map((item, colIndex) => {
              const isLastInRow = colIndex === row.length - 1;
              const flexGrow = rowConfig.itemCount === row.length ? 1 : (isLastInRow ? rowConfig.itemCount - row.length + 1 : 1);
              
              return (
                <div 
                  key={item.id}
                  className={`h-full relative ${!isLastInRow ? 'mr-4' : ''}`}
                  style={{ flex: `${flexGrow} 1 0%` }}
                  data-item-id={item.id}
                >
                  <MosaicItem 
                    item={item}
                    onDragStart={onItemDragStart}
                    onDragEnd={onDragEnd}
                    onMouseDown={(e) => onItemMouseDown(e, item.id)}
                    onRemove={() => onItemRemove(item.id)}
                    isDragging={draggedItemId === item.id}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

interface MosaicItemProps {
  item: VisionBoardItem;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  onDragEnd?: () => void;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  onRemove: () => void;
  isDragging: boolean;
}

function MosaicItem({
  item,
  onDragStart,
  onDragEnd,
  onMouseDown,
  onRemove,
  isDragging
}: MosaicItemProps) {
  const [isHovering, setIsHovering] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    
    // Call the parent drag start handler
    if (onDragStart) {
      onDragStart(e, item.id);
    }
    
    // Create a perfect clone of the element as the drag image
    const dragElement = e.currentTarget;
    const rect = dragElement.getBoundingClientRect();
    
    // Create a clone of the element to use as the drag image
    const dragImage = dragElement.cloneNode(true) as HTMLElement;
    
    // Set the exact same styles to ensure it looks identical
    dragImage.style.width = `${rect.width}px`;
    dragImage.style.height = `${rect.height}px`;
    dragImage.style.borderRadius = '0.75rem'; // rounded-xl
    dragImage.style.overflow = 'hidden';
    dragImage.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    dragImage.style.opacity = '0.9';
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    dragImage.style.left = '0';
    dragImage.style.pointerEvents = 'none';
    dragImage.style.zIndex = '9999';
    
    // Add the clone to the body temporarily
    document.body.appendChild(dragImage);
    
    // Position the drag image exactly where the mouse is within the original element
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    
    e.dataTransfer.setDragImage(dragImage, offsetX, offsetY);
    
    // Remove the drag image element after the drag operation has started
    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);
  };

  return (
    <div
      className={`rounded-xl overflow-hidden shadow-md bg-white cursor-move w-full h-full ${
        isDragging ? 'z-50 opacity-90' : 'z-10'
      }`}
      onMouseDown={onMouseDown}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      data-item-id={item.id}
    >
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
      
      {(item.type === 'image' || item.type === 'homeFeature') ? (
        <div className="w-full h-full">
          <img
            src={item.content.imageUrl}
            alt={item.content.title || "Vision board image"}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback for broken images
              (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/png';
            }}
          />
          {item.content.title && (
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 px-2 py-1 rounded text-white text-xs">
              {item.content.title}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-[#F3F3F4] p-3 h-full w-full">
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
  );
}

// Import the X icon at the top
import { X } from 'lucide-react';

