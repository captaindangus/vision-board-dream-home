
import React from 'react';
import { VisionBoardItemComponent } from './VisionBoardItemComponent';
import { VisionBoardItem } from '@/context/VisionBoardContext';
import { toast } from 'sonner';

interface VisionBoardItemsProps {
  items: VisionBoardItem[];
  draggedItemId: string | null;
  onItemMouseDown: (e: React.MouseEvent<HTMLDivElement>, id: string) => void;
  onItemRemove: (id: string) => void;
  onItemReorder: (sourceId: string, destinationId: string) => void;
  onItemDragStart?: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  onDragEnd?: () => void;
}

export function VisionBoardItems({ 
  items, 
  draggedItemId, 
  onItemMouseDown, 
  onItemRemove,
  onItemReorder,
  onItemDragStart,
  onDragEnd
}: VisionBoardItemsProps) {
  // No need to show empty state here as it's now handled in VisionBoardGrid
  if (items.length === 0) {
    return null;
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, itemId: string) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
    
    // Add a visual indicator for the current drop target
    const target = e.currentTarget;
    target.classList.add('bg-blue-100', 'border-blue-300', 'border');
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    // Remove the visual indicator when leaving the drop target
    const target = e.currentTarget;
    target.classList.remove('bg-blue-100', 'border-blue-300', 'border');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetItemId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Always clear drag effects immediately
    if (onDragEnd) {
      onDragEnd();
    }
    
    // Remove any visual indicators
    const target = e.currentTarget;
    target.classList.remove('bg-blue-100', 'border-blue-300', 'border');
    
    try {
      const data = e.dataTransfer.getData('application/json');
      if (!data) return;
      
      const parsedData = JSON.parse(data);
      console.log("Item drop detected with data:", parsedData);
      
      // Handle reordering of existing board items
      if (parsedData.action === 'reorder' && parsedData.id) {
        // Don't reorder if dropping onto itself
        if (parsedData.id !== targetItemId) {
          console.log(`Reordering: Moving ${parsedData.id} to ${targetItemId}`);
          onItemReorder(parsedData.id, targetItemId);
          toast.success('Item reordered');
        }
        
        return;
      }
      
      // Handle dropping new items from the sidebar between existing items
      if (parsedData.type && !parsedData.action) {
        // Create a custom event to handle this special case
        const dropEvent = new CustomEvent('visionboard:drop', {
          detail: {
            data: {
              ...parsedData,
              position: { x: 0, y: 0 },
              // Give it an order that places it before the current target
              order: items.find(item => item.id === targetItemId)?.order - 0.5
            }
          }
        });
        
        // Dispatch the event to be caught by the container
        const container = document.querySelector('[data-vision-board-container="true"]');
        if (container) {
          container.dispatchEvent(dropEvent);
        }
      }
    } catch (error) {
      console.error('Error handling drop:', error);
    }
  };

  // Sort items by order before rendering
  const sortedItems = [...items].sort((a, b) => (a.order || 0) - (b.order || 0));

  // Determine classes for different item types to create mosaic layout
  const getItemClasses = (item: VisionBoardItem) => {
    // Base classes
    let classes = "masonry-item";
    
    // Apply different sizing based on content type
    if (item.type === 'image') {
      // Images can be different sizes based on aspect ratio
      const hasTitle = item.content.title && item.content.title.length > 0;
      classes += hasTitle ? " masonry-item-medium" : " masonry-item-large";
    } else if (item.type === 'homeFeature') {
      classes += " masonry-item-medium";
    } else {
      // Text notes are smaller
      classes += " masonry-item-small";
    }
    
    return classes;
  };

  return (
    <>
      {sortedItems.map((item) => (
        <div 
          key={`vision-item-${item.id}`} 
          className={getItemClasses(item)}
          data-item-id={item.id}
        >
          <VisionBoardItemComponent
            item={item}
            onMouseDown={(e) => onItemMouseDown(e, item.id)}
            onRemove={() => onItemRemove(item.id)}
            isDragging={draggedItemId === item.id}
            onDragOver={(e) => handleDragOver(e, item.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, item.id)}
            onDragStart={onItemDragStart}
            onDragEnd={onDragEnd}
          />
        </div>
      ))}
    </>
  );
}
