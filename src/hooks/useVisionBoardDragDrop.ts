
import { useState, useRef, useEffect } from 'react';
import { useVisionBoard } from '@/context/VisionBoardContext';
import { toast } from 'sonner';

export function useVisionBoardDragDrop() {
  const [draggedItem, setDraggedItem] = useState<{id: string} | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { items, addItem, removeItem, reorderItems } = useVisionBoard();
  const containerRef = useRef<HTMLDivElement>(null);
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
    console.log('Drag start for item:', id);
    
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
    
    // Create a clone of the dragged element as the drag image
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const dragImage = element.cloneNode(true) as HTMLElement;
    
    dragImage.style.width = rect.width + 'px';
    dragImage.style.height = rect.height + 'px';
    dragImage.style.opacity = '0.8';
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    dragImage.style.left = '0';
    dragImage.style.margin = '0';
    dragImage.style.transform = 'none';
    dragImage.className = 'rounded-xl overflow-hidden shadow-md bg-white';
    
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

  // Add a handler for drag end to ensure scrim is removed
  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedItem(null);
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
    console.log('Grid drop detected');
    
    // Ensure we immediately reset the dragging state
    setIsDragging(false);
    setDraggedItem(null);
    setDragOperation(null);
    
    try {
      const data = e.dataTransfer.getData('application/json');
      if (!data) {
        console.log('No data found in drop');
        return;
      }
      
      const parsedData = JSON.parse(data);
      console.log("Grid drop event detected with data:", parsedData);
      
      // For external items being added to the vision board
      if (parsedData.type && !parsedData.action) {
        // Find which column the drop occurred in to place it at the bottom of that column
        const grid = document.querySelector('.masonry-grid');
        const target = e.target as HTMLElement;
        
        if (grid) {
          // Find the column directly under the drop point
          const dropX = e.clientX;
          const gridRect = grid.getBoundingClientRect();
          const relativeX = dropX - gridRect.left;
          
          // Get all items in the grid to determine column structure
          const allItems = Array.from(document.querySelectorAll('.masonry-item')) as HTMLElement[];
          
          if (allItems.length > 0) {
            // Find the last item in the column where the drop occurred
            let lastItemInColumn: HTMLElement | null = null;
            let lastOrder = -1;
            
            allItems.forEach(item => {
              const itemRect = item.getBoundingClientRect();
              const itemX = itemRect.left + itemRect.width / 2;
              
              // Check if this item is in the same column as the drop point
              if (Math.abs(itemX - dropX) < 100) { // 100px threshold to catch the column
                const itemId = item.getAttribute('data-item-id');
                const itemData = items.find(i => i.id === itemId);
                
                if (itemData && (itemData.order || 0) > lastOrder) {
                  lastItemInColumn = item;
                  lastOrder = itemData.order || 0;
                }
              }
            });
            
            if (lastItemInColumn) {
              // If we found the last item in this column, add after it
              const lastItemId = lastItemInColumn.getAttribute('data-item-id');
              if (lastItemId) {
                const lastItem = items.find(i => i.id === lastItemId);
                if (lastItem) {
                  addItem({
                    ...parsedData,
                    position: { x: 0, y: 0 },
                    order: (lastItem.order || 0) + 1
                  });
                  toast.success('Item added to vision board');
                  return;
                }
              }
            }
          }
        }
        
        // Fallback to adding at the end of all items if we couldn't determine column
        const maxOrder = items.length > 0 
          ? Math.max(...items.map(item => item.order || 0)) 
          : -1;
        
        addItem({
          ...parsedData,
          position: { x: 0, y: 0 },
          order: maxOrder + 1
        });
        toast.success('Item added to vision board');
      }
      
      // For reordering - handle item moves
      if (parsedData.action === 'reorder' && parsedData.id) {
        // If we have items, move to the end
        if (items.length > 0) {
          // Find the last item by order
          const sortedItems = [...items].sort((a, b) => (a.order || 0) - (b.order || 0));
          const lastItem = sortedItems[sortedItems.length - 1];
          
          if (lastItem && lastItem.id !== parsedData.id) {
            console.log(`Moving item ${parsedData.id} to the end after ${lastItem.id}`);
            reorderItems(parsedData.id, lastItem.id);
            toast.success('Item moved to the end');
          }
        }
      }
    } catch (err) {
      console.error('Error parsing dragged data:', err);
    }
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
    handleGridDrop,
    handleDragEnd
  };
}
