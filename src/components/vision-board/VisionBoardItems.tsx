
import React from 'react';
import { VisionBoardItemComponent } from './VisionBoardItemComponent';
import { EmptyBoardState } from './EmptyBoardState';
import { VisionBoardItem } from '@/context/VisionBoardContext';

interface VisionBoardItemsProps {
  items: VisionBoardItem[];
  draggedItemId: string | null;
  onItemMouseDown: (e: React.MouseEvent<HTMLDivElement>, id: string) => void;
  onItemRemove: (id: string) => void;
}

export function VisionBoardItems({ 
  items, 
  draggedItemId, 
  onItemMouseDown, 
  onItemRemove 
}: VisionBoardItemsProps) {
  if (items.length === 0) {
    return <EmptyBoardState />;
  }

  return (
    <>
      {items.map((item) => (
        <VisionBoardItemComponent
          key={item.id}
          item={item}
          onMouseDown={(e) => onItemMouseDown(e, item.id)}
          onRemove={() => onItemRemove(item.id)}
          isDragging={draggedItemId === item.id}
        />
      ))}
    </>
  );
}
