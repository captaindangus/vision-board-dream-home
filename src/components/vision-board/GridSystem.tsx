
import React from 'react';

interface GridSystemProps {
  children: React.ReactNode;
  columns: number;
}

export function GridSystem({ children, columns = 12 }: GridSystemProps) {
  return (
    <div 
      className="grid-system relative w-full min-h-[500px]" 
      style={{ 
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '8px',
      }}
    >
      {/* Optional: Grid column visualization */}
      <div className="absolute inset-0 pointer-events-none z-0 flex">
        {Array.from({ length: columns }).map((_, index) => (
          <div 
            key={`column-${index}`} 
            className="flex-1 border-r border-gray-100 last:border-r-0"
          />
        ))}
      </div>
      {children}
    </div>
  );
}

export function calculateSnapToGrid(x: number, y: number, containerRef: React.RefObject<HTMLDivElement>, columns: number = 12) {
  if (!containerRef.current) return { x, y };
  
  const containerWidth = containerRef.current.clientWidth;
  const columnWidth = containerWidth / columns;
  
  // Calculate which column the element should snap to
  const columnIndex = Math.round(x / columnWidth);
  const snappedX = Math.max(0, Math.min(columnIndex * columnWidth, containerWidth - 100));
  
  return {
    x: snappedX,
    y: y
  };
}
