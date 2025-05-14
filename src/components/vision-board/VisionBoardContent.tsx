
import React, { useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { VisionBoardTitle } from './VisionBoardTitle';
import { VisionBoardItems } from './VisionBoardItems';
import { UploadButton } from './UploadButton';
import { useDragDrop } from './DragDropHandler';
import { GridSystem } from './GridSystem';

export function VisionBoardContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    draggedItem,
    items,
    removeItem,
    handleItemMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleDrop,
    handleDragOver
  } = useDragDrop(containerRef);

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
        <GridSystem gridSize={50} gridGap={10}>
          <VisionBoardItems 
            items={items}
            draggedItemId={draggedItem?.id || null}
            onItemMouseDown={handleItemMouseDown}
            onItemRemove={removeItem}
          />
        </GridSystem>
      </ScrollArea>
    </main>
  );
}
