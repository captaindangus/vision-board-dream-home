
import React from 'react';
import { useDragDrop } from '@/hooks/useDragDrop';

interface DragDropHandlerProps {
  containerRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
  columns?: number;
}

export function DragDropHandler({ containerRef, children, columns = 12 }: DragDropHandlerProps) {
  const {
    handleMouseMove,
    handleMouseUp,
    handleDrop,
    handleDragOver
  } = useDragDrop(containerRef, columns);

  return (
    <div
      className="flex flex-col w-full h-full bg-white px-6 py-8 rounded-[20px]"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
}

// Re-export the hook for convenient importing
export { useDragDrop } from '@/hooks/useDragDrop';
