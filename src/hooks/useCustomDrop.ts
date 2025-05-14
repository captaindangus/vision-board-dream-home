
import { useEffect } from 'react';
import { calculateSnapToGrid } from '@/components/vision-board/GridSystem';

interface UseCustomDropOptions {
  containerRef: React.RefObject<HTMLDivElement>;
  columns: number;
  addItem: (item: any) => void;
}

/**
 * Hook for handling custom drop events
 */
export function useCustomDrop({ containerRef, columns, addItem }: UseCustomDropOptions) {
  useEffect(() => {
    const handleCustomDrop = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { data, position } = customEvent.detail;
      
      if (containerRef.current) {
        // Apply snap-to-grid to custom drop events
        const { x: snappedX, y: snappedY } = calculateSnapToGrid(
          position.x, 
          position.y, 
          containerRef, 
          columns
        );
        
        // Add padding to ensure items don't overlap
        const paddedX = snappedX + 8;
        const paddedY = snappedY + 8;
        
        addItem({
          ...data,
          position: { x: paddedX, y: paddedY }
        });
      }
    };

    const element = containerRef.current;
    if (element) {
      element.addEventListener('visionboard:drop', handleCustomDrop);
      
      return () => {
        element.removeEventListener('visionboard:drop', handleCustomDrop);
      };
    }
  }, [addItem, containerRef, columns]);
}
