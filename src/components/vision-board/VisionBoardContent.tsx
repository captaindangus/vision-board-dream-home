
import React, { useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { VisionBoardTitle } from './VisionBoardTitle';
import { VisionBoardItems } from './VisionBoardItems';
import { UploadButton } from './UploadButton';
import { useDragDrop } from './DragDropHandler';
import { toast } from 'sonner';

export function VisionBoardContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    draggedItem,
    items,
    removeItem,
    reorderItems,
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
        <div className="min-h-[500px] relative p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min">
          <VisionBoardItems 
            items={items}
            draggedItemId={draggedItem?.id || null}
            onItemMouseDown={handleItemMouseDown}
            onItemRemove={removeItem}
            onItemReorder={(sourceId, destinationId) => {
              reorderItems(sourceId, destinationId);
            }}
          />
        </div>
      </ScrollArea>
    </main>
  );
}
