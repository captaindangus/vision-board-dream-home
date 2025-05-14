
import React, { useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { VisionBoardTitle } from './VisionBoardTitle';
import { VisionBoardItems } from './VisionBoardItems';
import { UploadButton } from './UploadButton';
import { useVisionBoard } from '@/context/VisionBoardContext';
import { toast } from 'sonner';

export function VisionBoardContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { items, addItem, removeItem, reorderItems } = useVisionBoard();
  const [draggedItem, setDraggedItem] = React.useState<{id: string, offsetX: number, offsetY: number} | null>(null);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Just indicate which item is being dragged
  };

  const handleMouseUp = () => {
    setDraggedItem(null);
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
          />
        </div>
      </ScrollArea>
    </main>
  );
}
