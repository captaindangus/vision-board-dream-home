
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { VisionBoardTitle } from './VisionBoardTitle';
import { UploadButton } from './UploadButton';
import { useVisionBoard } from '@/context/VisionBoardContext';
import { VisionBoardGrid } from './VisionBoardGrid';
import { useVisionBoardDragDrop } from '@/hooks/useVisionBoardDragDrop';

export function VisionBoardContent() {
  const { removeItem, reorderItems } = useVisionBoard();
  const {
    containerRef,
    draggedItem,
    isDragging,
    items,
    handleItemMouseDown,
    handleItemDragStart,
    handleMouseUp,
    handleDragOver,
    handleGridDrop,
    handleDragEnd
  } = useVisionBoardDragDrop();

  return (
    <main 
      className="flex flex-col w-full h-full bg-white px-6 py-8 rounded-[20px]"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="flex justify-between items-center w-full mb-4">
        <VisionBoardTitle />
        <UploadButton />
      </div>
      <ScrollArea className="flex-1 relative" ref={containerRef}>
        <VisionBoardGrid
          items={items}
          draggedItemId={draggedItem}
          onItemMouseDown={handleItemMouseDown}
          onItemRemove={removeItem}
          onItemReorder={reorderItems}
          onItemDragStart={handleItemDragStart}
          onDragOver={handleDragOver}
          onDrop={handleGridDrop}
          gridRef={React.useRef<HTMLDivElement>(null)}
          isDragging={isDragging}
        />
      </ScrollArea>
    </main>
  );
}
