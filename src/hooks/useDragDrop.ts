
import { useState } from 'react';
import { useVisionBoard } from '@/context/VisionBoardContext';
import { calculateSnapToGrid } from '@/components/vision-board/GridSystem';
import { useDragImage } from './useDragImage';
import { useCustomDrop } from './useCustomDrop';

/**
 * Main hook for handling drag and drop functionality on the vision board
 */
export function useDragDrop(containerRef: React.RefObject<HTMLDivElement>, columns: number = 12) {
  const [draggedItem, setDraggedItem] = useState<{id: string, offsetX: number, offsetY: number} | null>(null);
  const { items, updateItemPosition, removeItem, addItem } = useVisionBoard();
  const { createDragImage, updateDragImagePosition, removeDragImage } = useDragImage();

  // Setup custom drop event handling
  useCustomDrop({ containerRef, columns, addItem });

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
    
    // Create drag image
    createDragImage(
      e.currentTarget as HTMLElement, 
      e.clientX, 
      e.clientY, 
      offsetX, 
      offsetY
    );
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
    
    // Update drag image position
    updateDragImagePosition(e.clientX, e.clientY, draggedItem.offsetX, draggedItem.offsetY);
  };

  const handleMouseUp = () => {
    setDraggedItem(null);
    removeDragImage();
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
      
      // Add padding to ensure items don't overlap
      const paddedX = snappedX + 8;
      const paddedY = snappedY + 8;
      
      addItem({
        ...parsedData,
        position: { x: paddedX, y: paddedY }
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
