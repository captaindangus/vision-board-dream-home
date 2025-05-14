
import React, { useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { VisionBoardTitle } from './VisionBoardTitle';
import { VisionBoardItems } from './VisionBoardItems';
import { UploadButton } from './UploadButton';
import { useDragDrop } from './DragDropHandler';
import { GridSystem } from './GridSystem';
import { useIsMobile } from '@/hooks/use-mobile';

export function VisionBoardContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  // Use responsive column count based on screen size
  const columnCount = isMobile ? 6 : 12;
  
  const {
    draggedItem,
    items,
    removeItem,
    handleItemMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleDrop,
    handleDragOver
  } = useDragDrop(containerRef, columnCount);

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
        <div className="min-h-[800px]">
          <GridSystem columns={columnCount}>
            <VisionBoardItems 
              items={items}
              draggedItemId={draggedItem?.id || null}
              onItemMouseDown={handleItemMouseDown}
              onItemRemove={removeItem}
            />
          </GridSystem>
        </div>
      </ScrollArea>
    </main>
  );
}
