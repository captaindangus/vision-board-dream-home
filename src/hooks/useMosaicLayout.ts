
import { useState, useCallback } from 'react';
import { VisionBoardItem } from '@/context/VisionBoardContext';

interface MosaicLayoutConfig {
  enableMosaic: boolean;
  layoutPattern: 'standard' | 'dynamic';
  gapSize: number;
}

export function useMosaicLayout() {
  const [config, setConfig] = useState<MosaicLayoutConfig>({
    enableMosaic: true,
    layoutPattern: 'standard',
    gapSize: 16, // 1rem gap
  });

  const toggleMosaicLayout = useCallback(() => {
    setConfig(prev => ({
      ...prev,
      enableMosaic: !prev.enableMosaic
    }));
  }, []);

  const setLayoutPattern = useCallback((pattern: 'standard' | 'dynamic') => {
    setConfig(prev => ({
      ...prev,
      layoutPattern: pattern
    }));
  }, []);

  const setGapSize = useCallback((size: number) => {
    setConfig(prev => ({
      ...prev,
      gapSize: size
    }));
  }, []);

  // Calculate optimal item sizes based on count and container width
  const calculateOptimalLayout = useCallback((items: VisionBoardItem[], containerWidth: number) => {
    if (!config.enableMosaic) {
      return {
        rows: items.map(item => [item]),
        heights: items.map(() => 250)
      };
    }

    // For standard pattern
    if (config.layoutPattern === 'standard') {
      const rows: VisionBoardItem[][] = [];
      const heights: number[] = [];
      
      let currentRow: VisionBoardItem[] = [];
      let itemsProcessed = 0;
      
      while (itemsProcessed < items.length) {
        // First row pattern: 3 items
        if (rows.length % 3 === 0) {
          const rowItems = items.slice(itemsProcessed, itemsProcessed + 3);
          rows.push(rowItems);
          heights.push(200);
          itemsProcessed += rowItems.length;
        }
        // Second row pattern: 2 items
        else if (rows.length % 3 === 1) {
          const rowItems = items.slice(itemsProcessed, itemsProcessed + 2);
          rows.push(rowItems);
          heights.push(300);
          itemsProcessed += rowItems.length;
        }
        // Third row pattern: 3 items
        else {
          const rowItems = items.slice(itemsProcessed, itemsProcessed + 3);
          rows.push(rowItems);
          heights.push(250);
          itemsProcessed += rowItems.length;
        }
      }
      
      return { rows, heights };
    }
    
    // For dynamic pattern (adjust based on content)
    const rows: VisionBoardItem[][] = [];
    const heights: number[] = [];
    let itemsProcessed = 0;
    
    while (itemsProcessed < items.length) {
      const remainingItems = items.length - itemsProcessed;
      
      if (remainingItems >= 3) {
        // Full row of 3
        rows.push(items.slice(itemsProcessed, itemsProcessed + 3));
        heights.push(220);
        itemsProcessed += 3;
      } else if (remainingItems === 2) {
        // Row of 2
        rows.push(items.slice(itemsProcessed, itemsProcessed + 2));
        heights.push(280);
        itemsProcessed += 2;
      } else {
        // Single item row
        rows.push([items[itemsProcessed]]);
        heights.push(300);
        itemsProcessed += 1;
      }
    }
    
    return { rows, heights };
  }, [config.enableMosaic, config.layoutPattern]);

  return {
    config,
    toggleMosaicLayout,
    setLayoutPattern,
    setGapSize,
    calculateOptimalLayout
  };
}
