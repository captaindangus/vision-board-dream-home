
import React, { useRef, useState, useEffect } from 'react';

interface GridSystemProps {
  children: React.ReactNode;
  gridGap: number;
  gridSize: number;
}

export function GridSystem({ children, gridGap = 10, gridSize = 50 }: GridSystemProps) {
  const [showGrid, setShowGrid] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  
  // Toggle grid visibility for debugging
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'g' && e.altKey) {
        setShowGrid(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div 
      ref={gridRef}
      className="relative w-full h-full min-h-[600px]" 
      style={{ 
        backgroundSize: `${gridSize}px ${gridSize}px`,
        backgroundImage: showGrid ? 'linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)' : 'none',
      }}
      data-grid-size={gridSize}
      data-grid-gap={gridGap}
    >
      {children}
    </div>
  );
}

// Helper functions for grid snapping
export function snapToGrid(x: number, y: number, gridSize: number): [number, number] {
  const snappedX = Math.round(x / gridSize) * gridSize;
  const snappedY = Math.round(y / gridSize) * gridSize;
  return [snappedX, snappedY];
}

export function getGridSizeFromElement(element: HTMLElement | null): number {
  if (!element) return 50; // Default grid size
  const gridDataset = element.closest('[data-grid-size]');
  return gridDataset ? Number(gridDataset.getAttribute('data-grid-size')) : 50;
}
