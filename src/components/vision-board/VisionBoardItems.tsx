
import React from 'react';
import { VisionBoardItemComponent } from './VisionBoardItemComponent';
import { EmptyBoardState } from './EmptyBoardState';
import { VisionBoardItem } from '@/context/VisionBoardContext';
import { toast } from 'sonner';

interface VisionBoardItemsProps {
  items: VisionBoardItem[];
  draggedItemId: string | null;
  onItemMouseDown: (e: React.MouseEvent<HTMLDivElement>, id: string) => void;
  onItemRemove: (id: string) => void;
  onItemReorder: (sourceId: string, destinationId: string) => void;
  onItemDragStart?: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
}

export function VisionBoardItems({ 
  items, 
  draggedItemId, 
  onItemMouseDown, 
  onItemRemove,
  onItemReorder,
  onItemDragStart
}: VisionBoardItemsProps) {
  if (items.length === 0) {
    return <EmptyBoardState />;
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, itemId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    // Add a visual indicator for the current drop target
    const target = e.currentTarget;
    target.classList.add('bg-blue-100', 'border-blue-300', 'border');
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    // Remove the visual indicator when leaving the drop target
    const target = e.currentTarget;
    target.classList.remove('bg-blue-100', 'border-blue-300', 'border');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetItemId: string) => {
    e.preventDefault();
    
    // Remove any visual indicators
    const target = e.currentTarget;
    target.classList.remove('bg-blue-100', 'border-blue-300', 'border');
    
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      
      if (data.action === 'reorder' && data.id) {
        // Don't reorder if dropping onto itself
        if (data.id !== targetItemId) {
          onItemReorder(data.id, targetItemId);
          toast.success('Item reordered');
        }
      }
    } catch (error) {
      console.error('Error handling drop for reordering:', error);
    }
  };

  // Sort items by order before rendering
  const sortedItems = [...items].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <>
      {sortedItems.map((item) => (
        <div 
          key={item.id} 
          className="h-fit w-full transition-all duration-200"
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
          />
        </div>
      ))}
    </>
  );
}
