
import React, { useRef, useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { VisionBoardTitle } from './VisionBoardTitle';
import { VisionBoardItems } from './VisionBoardItems';
import { UploadButton } from './UploadButton';
import { useVisionBoard } from '@/context/VisionBoardContext';
import { toast } from 'sonner';

export function VisionBoardContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { items, addItem, removeItem, reorderItems } = useVisionBoard();
  const [draggedItem, setDraggedItem] = useState<{id: string} | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const gridContainerRef = useRef<HTMLDivElement>(null);

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
    setDraggedItem({ id });
  };

  // Handler for drag start, supporting reordering
  const handleItemDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    // Set data for reordering
    e.dataTransfer.setData('application/json', JSON.stringify({
      id,
      action: 'reorder'
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

  const handleMouseUp = () => {
    setDraggedItem(null);
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleGridDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (!gridContainerRef.current) return;
    
    const data = e.dataTransfer.getData('application/json');
    if (!data) return;
    
    try {
      const parsedData = JSON.parse(data);
      console.log("Drop event detected with data:", parsedData);
      
      // For external items being added to the vision board
      if (!parsedData.action && parsedData.type) {
        addItem(parsedData);
        toast.success('Item added to vision board');
      }
      
      // For reordering - but only if dropped directly on the grid, not on an item
      if (parsedData.action === 'reorder' && parsedData.id) {
        // Check if we're dropping directly on the grid, not on an item
        const dropTarget = e.target as HTMLElement;
        const closestItem = dropTarget.closest('[data-item-id]');
        
        if (!closestItem) {
          // If dropped on empty grid space, move to the end
          const lastItem = [...items].sort((a, b) => (b.order || 0) - (a.order || 0))[0];
          if (lastItem && lastItem.id !== parsedData.id) {
            // Move to the end with an order value higher than the current highest
            const newOrder = (lastItem.order || 0) + 1;
            reorderItems(parsedData.id, lastItem.id);
            toast.success('Item moved to the end');
          }
        }
      }
    } catch (err) {
      console.error('Error parsing dragged data:', err);
    }
  };

  return (
    <main 
      className="flex flex-col w-full h-full bg-white px-6 py-8 rounded-[20px]"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="flex justify-between items-center w-full mb-4">
        <VisionBoardTitle initialTitle="MyVisionBoard 1 🌟" />
        <UploadButton />
      </div>
      <ScrollArea className="flex-1 relative" ref={containerRef}>
        <div 
          className="min-h-[500px] relative p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min"
          ref={gridContainerRef}
          onDragOver={handleDragOver}
          onDrop={handleGridDrop}
        >
          <VisionBoardItems 
            items={items}
            draggedItemId={draggedItem?.id || null}
            onItemMouseDown={handleItemMouseDown}
            onItemRemove={removeItem}
            onItemReorder={reorderItems}
            onItemDragStart={handleItemDragStart}
          />
        </div>
        
        {isDragging && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-10 pointer-events-none z-40 flex items-center justify-center">
            <div className="bg-white px-4 py-2 rounded-md shadow-lg text-sm">
              Drag to reposition
            </div>
          </div>
        )}
      </ScrollArea>
    </main>
  );
}
