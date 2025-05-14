
import React, { useRef, useState, useEffect } from 'react';
import { useVisionBoard, VisionBoardItem } from '@/context/VisionBoardContext';
import { getGridSizeFromElement, snapToGrid } from './GridSystem';

interface DragDropHandlerProps {
  containerRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
}

export function useDragDrop(containerRef: React.RefObject<HTMLDivElement>) {
  const [draggedItem, setDraggedItem] = useState<{id: string, offsetX: number, offsetY: number} | null>(null);
  const { items, updateItemPosition, removeItem, addItem } = useVisionBoard();

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
    if (!draggedItem || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const scrollTop = containerRef.current.scrollTop;
    
    // Calculate position relative to the container, accounting for scroll and click offset
    const x = e.clientX - containerRect.left - draggedItem.offsetX;
    const y = e.clientY - containerRect.top - draggedItem.offsetY + scrollTop;
    
    // Get grid size from container
    const gridSize = getGridSizeFromElement(containerRef.current);
    
    // Snap to grid
    const [snappedX, snappedY] = snapToGrid(x, y, gridSize);
    
    // Ensure item stays within container bounds
    const boundedX = Math.max(0, Math.min(snappedX, containerRect.width - 150));
    const boundedY = Math.max(0, snappedY);
    
    updateItemPosition(draggedItem.id, { x: boundedX, y: boundedY });
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
      
      // Calculate position relative to the container
      const containerRect = containerRef.current.getBoundingClientRect();
      let x = e.clientX - containerRect.left;
      let y = e.clientY - containerRect.top + (containerRef.current.scrollTop || 0);
      
      // Snap to grid
      const gridSize = getGridSizeFromElement(containerRef.current);
      const [snappedX, snappedY] = snapToGrid(x, y, gridSize);
      
      addItem({
        ...parsedData,
        position: { x: snappedX, y: snappedY }
      });
    } catch (err) {
      console.error('Error parsing dragged data:', err);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  // Add event listener for custom drop events
  useEffect(() => {
    const handleCustomDrop = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { data, position } = customEvent.detail;
      
      if (containerRef.current) {
        const gridSize = getGridSizeFromElement(containerRef.current);
        const [snappedX, snappedY] = snapToGrid(position.x, position.y, gridSize);
        
        addItem({
          ...data,
          position: { x: snappedX, y: snappedY }
        });
      }
    };

    const element = containerRef.current;
    if (element) {
      element.addEventListener('visionboard:drop', handleCustomDrop);
      
      return () => {
        element.removeEventListener('visionboard:drop', handleCustomDrop);
      };
    }
  }, [addItem]);

  return {
    draggedItem,
    items,
    removeItem,
    handleItemMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleDrop,
    handleDragOver
  };
}

export function DragDropHandler({ containerRef, children }: DragDropHandlerProps) {
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
