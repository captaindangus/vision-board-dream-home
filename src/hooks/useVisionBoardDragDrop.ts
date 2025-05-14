
import { useState, useRef, useEffect } from 'react';
import { useVisionBoard } from '@/context/VisionBoardContext';
import { toast } from 'sonner';

export function useVisionBoardDragDrop() {
  const [draggedItem, setDraggedItem] = useState<{id: string} | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { items, addItem, removeItem, reorderItems } = useVisionBoard();
  const containerRef = useRef<HTMLDivElement>(null);

  // Store the drag type to differentiate between reordering and adding new items
  const [dragOperation, setDragOperation] = useState<'reorder' | 'add' | null>(null);

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
    // Set data for reordering - this is crucial for the drag operation
    const dragData = {
      id,
      action: 'reorder'
    };
    
    // Important: Set the data in the dragstart event
    e.dataTransfer.setData('application/json', JSON.stringify(dragData));
    e.dataTransfer.effectAllowed = "move";
    
    setIsDragging(true);
    setDraggedItem({ id });
    setDragOperation('reorder');
    
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
    setDragOperation(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    // Default drop effect
    let dropEffect = "copy";
    
    // Try to detect if this is a reordering operation
    const types = Array.from(e.dataTransfer.types);
    if (types.includes('application/json')) {
      // This could be a reorder operation, try to confirm
      if (dragOperation === 'reorder' || draggedItem !== null) {
        dropEffect = "move";
      }
    }
    
    e.dataTransfer.dropEffect = dropEffect as DataTransfer['dropEffect'];
  };

  const handleGridDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (!containerRef.current) return;
    
    try {
      const data = e.dataTransfer.getData('application/json');
      if (!data) return;
      
      const parsedData = JSON.parse(data);
      console.log("Drop event detected with data:", parsedData);
      
      // For external items being added to the vision board
      if (parsedData.type && !parsedData.action) {
        // Determine insertion position
        const dropTarget = e.target as HTMLElement;
        const closestItemElement = dropTarget.closest('[data-item-id]');
        
        if (closestItemElement) {
          // Dropped near an existing item - insert before or after it
          const targetItemId = closestItemElement.getAttribute('data-item-id');
          if (targetItemId) {
            const targetItem = items.find(item => item.id === targetItemId);
            if (targetItem) {
              // Add item with an order value that puts it right after the target
              addItem({
                ...parsedData,
                position: { x: 0, y: 0 },
                order: (targetItem.order || 0) + 0.5 // Position between items
              });
              
              // Now normalize all order values
              setTimeout(() => {
                const tempItems = [...items].sort((a, b) => (a.order || 0) - (b.order || 0));
                tempItems.forEach((item, index) => {
                  if (item.order !== index) {
                    // Use a direct reorder to normalize
                    const sourceId = item.id;
                    const destinationId = tempItems.find(i => (i.order || 0) === index)?.id;
                    if (destinationId && sourceId !== destinationId) {
                      reorderItems(sourceId, destinationId);
                    }
                  }
                });
              }, 10);
              
              toast.success('Item added to vision board');
              return;
            }
          }
        }
        
        // If not dropped on an item or we couldn't determine position, add to the end
        addItem({
          ...parsedData,
          position: { x: 0, y: 0 }
        });
        toast.success('Item added to vision board');
      }
      
      // For reordering - check if we're moving an existing item
      if (parsedData.action === 'reorder' && parsedData.id) {
        // Check if we're dropping directly on the grid, not on an item
        const dropTarget = e.target as HTMLElement;
        const closestItem = dropTarget.closest('[data-item-id]');
        
        if (!closestItem) {
          // If dropped on empty grid space, move to the end
          const lastItem = [...items].sort((a, b) => (b.order || 0) - (a.order || 0))[0];
          if (lastItem && lastItem.id !== parsedData.id) {
            // Move to the end with an order value higher than the current highest
            reorderItems(parsedData.id, lastItem.id);
            toast.success('Item moved to the end');
          }
        }
      }
    } catch (err) {
      console.error('Error parsing dragged data:', err);
    }
    
    setDragOperation(null);
  };

  return {
    containerRef,
    draggedItem: draggedItem?.id || null,
    isDragging,
    items,
    handleItemMouseDown,
    handleItemDragStart,
    handleMouseUp,
    handleDragOver,
    handleGridDrop
  };
}
