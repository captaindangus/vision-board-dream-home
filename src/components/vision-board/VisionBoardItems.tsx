
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
}

export function VisionBoardItems({ 
  items, 
  draggedItemId, 
  onItemMouseDown, 
  onItemRemove,
  onItemReorder
}: VisionBoardItemsProps) {
  if (items.length === 0) {
    return <EmptyBoardState />;
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetItemId: string) => {
    e.preventDefault();
    
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
        <div key={item.id} className="h-fit w-full">
          <VisionBoardItemComponent
            item={item}
            onMouseDown={(e) => onItemMouseDown(e, item.id)}
            onRemove={() => onItemRemove(item.id)}
            isDragging={draggedItemId === item.id}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, item.id)}
          />
        </div>
      ))}
    </>
  );
}
