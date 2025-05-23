
import React from 'react';
import { VisionBoardItems } from './VisionBoardItems';
import { VisionBoardItem } from '@/context/VisionBoardContext';
import { EmptyBoardState } from './EmptyBoardState';

interface VisionBoardGridProps {
  items: VisionBoardItem[];
  draggedItemId: string | null;
  onItemMouseDown: (e: React.MouseEvent<HTMLDivElement>, id: string) => void;
  onItemRemove: (id: string) => void;
  onItemReorder: (sourceId: string, destinationId: string) => void;
  onItemDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd?: () => void; // Added drag end handler
  gridRef: React.RefObject<HTMLDivElement>;
  isDragging: boolean;
}

export function VisionBoardGrid({
  items,
  draggedItemId,
  onItemMouseDown,
  onItemRemove,
  onItemReorder,
  onItemDragStart,
  onDragOver,
  onDrop,
  onDragEnd, // Handle drag end
  gridRef,
  isDragging
}: VisionBoardGridProps) {
  const handleGridDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDragOver(e);
  };

  const handleGridDrop = (e: React.DragEvent<HTMLDivElement>) => {
    // Always clear drag state immediately
    if (onDragEnd) {
      onDragEnd();
    }
    
    // Check if the drop is directly on the grid (not on an item)
    const target = e.target as HTMLElement;
    const closestItem = target.closest('[data-item-id]');
    
    if (!closestItem) {
      // Only handle drop if it's directly on the grid
      onDrop(e);
    }
  };
  
  // Calculate a minimum height - either 700px or full viewport height
  const minHeight = Math.max(700, window.innerHeight - 200) + 'px';
  
  return (
    <>
      <div 
        className="relative p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min"
        style={{ minHeight }}
        ref={gridRef}
        onDragOver={handleGridDragOver}
        onDrop={handleGridDrop}
        data-vision-board-container="true"
      >
        <VisionBoardItems 
          items={items}
          draggedItemId={draggedItemId}
          onItemMouseDown={onItemMouseDown}
          onItemRemove={onItemRemove}
          onItemReorder={onItemReorder}
          onItemDragStart={onItemDragStart}
          onDragEnd={onDragEnd} // Pass drag end handler to items
        />
        
        {/* Empty state that shows when no items */}
        {items.length === 0 && <EmptyBoardState />}
        
        {/* This is a full-size drop area that covers the entire container */}
        <div 
          className="absolute inset-0 pointer-events-auto" 
          onDragOver={handleGridDragOver}
          onDrop={handleGridDrop}
          style={{ zIndex: -1 }}
        />
      </div>
      
      {isDragging && (
        <DragOverlay />
      )}
    </>
  );
}

function DragOverlay() {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-10 pointer-events-none z-40 flex items-center justify-center">
      <div className="bg-white px-4 py-2 rounded-md shadow-lg text-sm">
        Drag to reposition
      </div>
    </div>
  );
}
