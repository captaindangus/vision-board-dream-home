
import React from 'react';
import { VisionBoardItems } from './VisionBoardItems';
import { VisionBoardItem } from '@/context/VisionBoardContext';

interface VisionBoardGridProps {
  items: VisionBoardItem[];
  draggedItemId: string | null;
  onItemMouseDown: (e: React.MouseEvent<HTMLDivElement>, id: string) => void;
  onItemRemove: (id: string) => void;
  onItemReorder: (sourceId: string, destinationId: string) => void;
  onItemDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
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
  gridRef,
  isDragging
}: VisionBoardGridProps) {
  return (
    <>
      <div 
        className="min-h-[500px] relative p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min"
        ref={gridRef}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <VisionBoardItems 
          items={items}
          draggedItemId={draggedItemId}
          onItemMouseDown={onItemMouseDown}
          onItemRemove={onItemRemove}
          onItemReorder={onItemReorder}
          onItemDragStart={onItemDragStart}
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
