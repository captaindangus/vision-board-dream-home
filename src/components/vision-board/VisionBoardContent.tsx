import React, { useRef, useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { VisionBoardTitle } from './VisionBoardTitle';
import { VisionBoardItems } from './VisionBoardItems';
import { UploadButton } from './UploadButton';
import { useVisionBoard } from '@/context/VisionBoardContext';
import { toast } from 'sonner';

export function VisionBoardContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const { items, addItem, removeItem, reorderItems, updateItemPosition } = useVisionBoard();
  const [draggedItem, setDraggedItem] = useState<{
    id: string, 
    initialX: number, 
    initialY: number,
    currentX: number,
    currentY: number,
    offsetX: number,
    offsetY: number
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragMode, setDragMode] = useState<'reorder' | 'reposition'>('reorder');

  // Add event listener for custom drop events
  useEffect(() => {
    if (!containerRef.current) return;
    
    const handleVisionBoardDrop = (e: CustomEvent) => {
      const { data } = e.detail;
      console.log('Custom drop event handled with data:', data);
      
      if (data) {
        addItem(data);
        toast.success('Item added to vision board');
      }
    };
    
    // Add event listener for the custom event
    containerRef.current.addEventListener('visionboard:drop', handleVisionBoardDrop as EventListener);
    
    // Clean up the event listener when component unmounts
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('visionboard:drop', handleVisionBoardDrop as EventListener);
      }
    };
  }, [addItem]);

  const handleItemMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    id: string
  ) => {
    if (!boardRef.current) return;
    
    // Get the item element
    const itemElement = (e.currentTarget as HTMLElement);
    const rect = itemElement.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();
    
    // Prevent default to avoid text selection during drag
    e.preventDefault();
    
    // Calculate offset within the item where the mouse was clicked
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    
    // Store initial positions
    const initialX = rect.left - boardRect.left;
    const initialY = rect.top - boardRect.top;
    
    setDraggedItem({
      id,
      initialX,
      initialY,
      currentX: initialX,
      currentY: initialY,
      offsetX,
      offsetY
    });
    
    // Use Alt key (or Option on Mac) to toggle between reorder and reposition modes
    if (e.altKey) {
      setDragMode('reposition');
      setIsDragging(true);
      
      // Apply styles to indicate repositioning mode
      itemElement.style.zIndex = '50';
      itemElement.style.opacity = '0.8';
      itemElement.style.position = 'absolute';
      itemElement.style.width = `${rect.width}px`;
      itemElement.style.left = `${initialX}px`;
      itemElement.style.top = `${initialY}px`;
    } else {
      setDragMode('reorder');
      // No need to set isDragging for reordering as that's handled by the native drag events
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!draggedItem || !isDragging || dragMode !== 'reposition' || !boardRef.current) return;
    
    const boardRect = boardRef.current.getBoundingClientRect();
    
    // Calculate the new position relative to the board
    const newX = e.clientX - boardRect.left - draggedItem.offsetX;
    const newY = e.clientY - boardRect.top - draggedItem.offsetY;
    
    // Update the dragged item's position
    setDraggedItem({
      ...draggedItem,
      currentX: newX,
      currentY: newY
    });
    
    // Find the dragged element and update its visual position
    const draggedElement = boardRef.current.querySelector(`[data-item-id="${draggedItem.id}"]`) as HTMLElement;
    if (draggedElement) {
      draggedElement.style.left = `${newX}px`;
      draggedElement.style.top = `${newY}px`;
    }
  };

  const handleMouseUp = () => {
    if (!draggedItem || !isDragging) return;
    
    // Only process if we were in repositioning mode
    if (dragMode === 'reposition') {
      // Save the new position to the context
      updateItemPosition(draggedItem.id, { 
        x: draggedItem.currentX, 
        y: draggedItem.currentY 
      });
      
      // Reset the dragged element's styles
      const draggedElement = boardRef.current?.querySelector(`[data-item-id="${draggedItem.id}"]`) as HTMLElement;
      if (draggedElement) {
        // Reset styles but keep the absolute positioning for precise placement
        draggedElement.style.zIndex = '';
        draggedElement.style.opacity = '';
        // We keep position absolute and left/top to maintain the item's new position
      }
      
      toast.success('Item repositioned');
    }
    
    // Reset drag state
    setIsDragging(false);
    setDraggedItem(null);
    setDragMode('reorder');
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
      // Directly call addItem instead of dispatching an event
      if (parsedData) {
        // Get drop position relative to the board
        if (boardRef.current) {
          const boardRect = boardRef.current.getBoundingClientRect();
          const dropX = e.clientX - boardRect.left;
          const dropY = e.clientY - boardRect.top;
          
          // Add the item with the calculated position
          addItem({
            ...parsedData,
            position: { x: dropX, y: dropY }
          });
        } else {
          // Fallback if board ref is not available
          addItem(parsedData);
        }
        toast.success('Item added to vision board');
      }
    } catch (err) {
      console.error('Error parsing dragged data:', err);
    }
  };

  return (
    <main 
      className="flex flex-col w-full h-full bg-white px-6 py-8 rounded-[20px]"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex justify-between items-center w-full mb-4">
        <VisionBoardTitle initialTitle="MyVisionBoard 1 🌟" />
        <UploadButton />
      </div>
      <ScrollArea className="flex-1 relative" ref={containerRef}>
        <div 
          ref={boardRef}
          className="min-h-[500px] relative p-4"
          style={{ position: 'relative' }}
        >
          <VisionBoardItems 
            items={items}
            draggedItemId={draggedItem?.id || null}
            onItemMouseDown={handleItemMouseDown}
            onItemRemove={removeItem}
            onItemReorder={(sourceId, destinationId) => {
              reorderItems(sourceId, destinationId);
              toast.success('Item reordered');
            }}
            dragMode={dragMode}
          />
        </div>
      </ScrollArea>

      <div className="mt-4 text-center text-sm text-gray-500">
        <p>Tip: Hold <kbd className="px-1 py-0.5 bg-gray-100 rounded">Alt</kbd> key while dragging to freely position items</p>
      </div>
    </main>
  );
}
