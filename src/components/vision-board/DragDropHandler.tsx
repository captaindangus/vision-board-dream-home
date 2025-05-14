
import React, { useRef, useState, useEffect } from 'react';
import { useVisionBoard, VisionBoardItem } from '@/context/VisionBoardContext';
import { calculateSnapToGrid } from './GridSystem';

interface DragDropHandlerProps {
  containerRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
  columns?: number;
}

export function useDragDrop(containerRef: React.RefObject<HTMLDivElement>, columns: number = 12) {
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
    
    // Apply snap-to-grid calculation before updating position
    const { x: snappedX, y: snappedY } = calculateSnapToGrid(x, y, containerRef, columns);
    
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
      const x = e.clientX - containerRect.left;
      const y = e.clientY - containerRect.top + (containerRef.current.scrollTop || 0);
      
      // Apply snap-to-grid before adding the item
      const { x: snappedX, y: snappedY } = calculateSnapToGrid(x, y, containerRef, columns);
      
      addItem({
        ...parsedData,
        position: { x: snappedX, y: snappedY }
      });
    } catch (err) {
      console.error('Error parsing dragged data:', err);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    // This is crucial to enable dropping
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  // Add event listener for custom drop events
  useEffect(() => {
    const handleCustomDrop = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { data, position } = customEvent.detail;
      
      if (containerRef.current) {
        // Apply snap-to-grid to custom drop events
        const { x: snappedX, y: snappedY } = calculateSnapToGrid(
          position.x, 
          position.y, 
          containerRef, 
          columns
        );
        
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
  }, [addItem, containerRef, columns]);

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

export function DragDropHandler({ containerRef, children, columns = 12 }: DragDropHandlerProps) {
  const {
    handleMouseMove,
    handleMouseUp,
    handleDrop,
    handleDragOver
  } = useDragDrop(containerRef, columns);

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
