
import React, { useRef, useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { VisionBoardTitle } from './VisionBoardTitle';
import { VisionBoardItems } from './VisionBoardItems';
import { UploadButton } from './UploadButton';
import { useVisionBoard } from '@/context/VisionBoardContext';
import { toast } from 'sonner';

export function VisionBoardContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { items, addItem, removeItem, reorderItems, updateItemPosition } = useVisionBoard();
  const [draggedItem, setDraggedItem] = useState<{id: string, offsetX: number, offsetY: number} | null>(null);
  const [isDragging, setIsDragging] = useState(false);

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
    if (!containerRef.current) return;
    
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    
    // Calculate offset within the item where the mouse was clicked
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    
    setDraggedItem({ id, offsetX, offsetY });
  };

  // Handler for drag start, supporting both reordering and positioning
  const handleItemDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    // Set data for either free positioning or reordering
    // We'll determine which one in the drop handler
    e.dataTransfer.setData('application/json', JSON.stringify({
      id,
      action: 'position' // Default to position action
    }));
    
    setIsDragging(true);
    
    // Create a clone of the entire dragged element as the drag image
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const dragImage = element.cloneNode(true) as HTMLElement;
    
    dragImage.style.width = rect.width + 'px';
    dragImage.style.opacity = '0.8';
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    document.body.appendChild(dragImage);
    
    e.dataTransfer.setDragImage(
      dragImage, 
      e.clientX - rect.left, 
      e.clientY - rect.top
    );
    
    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only used for tracking dragged item if needed
  };

  const handleMouseUp = () => {
    setDraggedItem(null);
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    // Set the dropEffect based on the type of dragged content
    try {
      const dataTransfer = e.dataTransfer;
      const data = JSON.parse(dataTransfer.getData('application/json') || '{}');
      
      if (data.action === 'reorder' || data.action === 'position') {
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
    setIsDragging(false);
    
    if (!containerRef.current) return;
    
    const data = e.dataTransfer.getData('application/json');
    if (!data) return;
    
    try {
      const parsedData = JSON.parse(data);
      console.log("Drop event detected with data:", parsedData);
      
      // Handle positioning if the drop is directly on the board (not on an item)
      if (parsedData.action === 'position' && parsedData.id) {
        // Only apply free positioning if dropped directly on the board area
        // and not on another item
        const dropTarget = e.target as HTMLElement;
        const isOnBoard = !dropTarget.closest('[data-item-id]');
        
        if (isOnBoard) {
          const boardRect = containerRef.current.getBoundingClientRect();
          const dropX = e.clientX - boardRect.left;
          const dropY = e.clientY - boardRect.top + containerRef.current.scrollTop;
          
          updateItemPosition(parsedData.id, { x: dropX, y: dropY });
          toast.success('Item repositioned');
          return;
        }
      }
      
      // Handle reordering if that's what this drop is for
      if (parsedData.action === 'reorder' && parsedData.id) {
        // This case is handled by VisionBoardItemComponent's onDrop
        return;
      }
      
      // For external items being added to the vision board
      // Directly call addItem instead of dispatching an event
      if (!parsedData.action && parsedData.type) {
        addItem(parsedData);
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
        <div className="min-h-[500px] relative p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min">
          <VisionBoardItems 
            items={items}
            draggedItemId={draggedItem?.id || null}
            onItemMouseDown={handleItemMouseDown}
            onItemRemove={removeItem}
            onItemReorder={(sourceId, destinationId) => {
              reorderItems(sourceId, destinationId);
              toast.success('Item reordered');
            }}
            onItemDragStart={handleItemDragStart}
          />
        </div>
        
        {isDragging && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-10 pointer-events-none z-40 flex items-center justify-center">
            <div className="bg-white px-4 py-2 rounded-md shadow-lg text-sm">
              Release to position item
            </div>
          </div>
        )}
      </ScrollArea>
    </main>
  );
}
