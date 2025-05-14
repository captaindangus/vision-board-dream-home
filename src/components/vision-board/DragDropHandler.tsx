import React, { useRef, useState } from 'react';
import { useVisionBoard, VisionBoardItem } from '@/context/VisionBoardContext';

export function useDragDrop(containerRef: React.RefObject<HTMLDivElement>) {
  const [draggedItem, setDraggedItem] = useState<{id: string, offsetX: number, offsetY: number} | null>(null);
  const { items, updateItemPosition, removeItem, addItem, reorderItems } = useVisionBoard();

  const handleItemMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    id: string
  ) => {
    if (!containerRef.current) return;
    
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    
    // Calculate offset within the item where the mouse was clicked
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    
    setDraggedItem({ id, offsetX, offsetY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // We no longer need to calculate absolute position since we're using a grid
    // Just indicate which item is being dragged
  };

  const handleMouseUp = () => {
    setDraggedItem(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    const data = e.dataTransfer.getData('application/json');
    if (!data || !containerRef.current) return;
    
    try {
      const parsedData = JSON.parse(data);
      console.log("Drop event detected with data:", parsedData);
      
      // Handle reordering if that's what this drop is for
      if (parsedData.action === 'reorder' && parsedData.id) {
        // This case is handled by VisionBoardItemComponent's onDrop
        return;
      }
      
      // For external items being added to the vision board
      // Add the item to the end of the list
      addItem({
        ...parsedData,
        position: { x: 0, y: 0 } // Position doesn't matter for grid layout
      });
    } catch (err) {
      console.error('Error parsing dragged data:', err);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    // Set the dropEffect based on the type of dragged content
    try {
      const dataTransfer = e.dataTransfer;
      const data = JSON.parse(dataTransfer.getData('application/json') || '{}');
      
      if (data.action === 'reorder') {
        dataTransfer.dropEffect = "move"; // We're moving items within the board
      } else {
        dataTransfer.dropEffect = "copy"; // We're copying in new items
      }
    } catch {
      // Default to copy if we can't determine
      e.dataTransfer.dropEffect = "copy";
    }
  };

  return {
    draggedItem,
    items,
    removeItem,
    reorderItems,
    handleItemMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleDrop,
    handleDragOver
  };
}

// Keep this component for backwards compatibility, but our solution doesn't use it
export function DragDropHandler({ containerRef, children }: { containerRef: React.RefObject<HTMLDivElement>, children: React.ReactNode }) {
  const {
    handleMouseMove,
    handleMouseUp,
    handleDrop,
    handleDragOver
  } = useDragDrop(containerRef);

  return (
    <div
      className="flex flex-col w-full h-full bg-white px-6 py-8 rounded-[20px]"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
}
