import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';

export type VisionBoardItemType = 'image' | 'text' | 'feature' | 'priceRange' | 'homeSize' | 'homeFeature' | 'neighborhoodFeature';

export interface VisionBoardItemContent {
  imageUrl?: string;
  title?: string;
  description?: string;
  tags?: string[];
  value?: [number, number];
  minSize?: string | number;
  maxSize?: string | number;
}

export interface VisionBoardItemPosition {
  x: number;
  y: number;
}

export interface VisionBoardItemSize {
  width: number;
  height: number | string;
}

export interface VisionBoardItem {
  id: string;
  type: VisionBoardItemType;
  content: VisionBoardItemContent;
  position: VisionBoardItemPosition;
  size: VisionBoardItemSize;
  order?: number; // Added order property for sorting
}

interface VisionBoardContextType {
  items: VisionBoardItem[];
  addItem: (item: Omit<VisionBoardItem, 'id'>) => void;
  updateItemPosition: (id: string, position: { x: number; y: number }) => void;
  reorderItems: (sourceId: string, destinationId: string) => void; // New reorder function
  removeItem: (id: string) => void;
}

const VisionBoardContext = createContext<VisionBoardContextType | undefined>(undefined);

const STORAGE_KEY = 'visionBoardItems';

// Generate a truly unique ID
function generateUniqueId(): string {
  return `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export const useVisionBoard = () => {
  const context = useContext(VisionBoardContext);
  if (!context) {
    throw new Error('useVisionBoard must be used within a VisionBoardProvider');
  }
  return context;
};

export const VisionBoardProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<VisionBoardItem[]>(() => {
    // Try to load items from localStorage on initial render
    try {
      const savedItems = localStorage.getItem(STORAGE_KEY);
      let parsedItems = savedItems ? JSON.parse(savedItems) : [];
      
      // Ensure all items have an order property and a unique ID
      parsedItems = parsedItems.map((item: VisionBoardItem, index: number) => {
        // If the item doesn't have a properly formatted ID (with random component),
        // generate a new one to prevent duplicate keys
        if (!item.id || !item.id.includes('-')) {
          return {
            ...item,
            id: generateUniqueId(),
            order: item.order !== undefined ? item.order : index
          };
        }
        return {
          ...item,
          order: item.order !== undefined ? item.order : index
        };
      });
      
      // Sort by order
      return parsedItems.sort((a: VisionBoardItem, b: VisionBoardItem) => 
        (a.order || 0) - (b.order || 0)
      );
    } catch (error) {
      console.error('Error loading vision board items from localStorage:', error);
      return [];
    }
  });

  // Save items to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving vision board items to localStorage:', error);
    }
  }, [items]);

  const addItem = useCallback((newItem: Omit<VisionBoardItem, 'id'>) => {
    // Generate a truly unique ID with a random component
    const id = generateUniqueId();
    
    // We no longer need random positioning, but keep the position property for compatibility
    const position = { x: 0, y: 0 };
    
    // Assign an order value to the new item (put at the end)
    const maxOrder = items.length > 0 
      ? Math.max(...items.map(item => item.order || 0)) 
      : -1;
    
    const item = { 
      ...newItem, 
      id, 
      position,
      order: newItem.order !== undefined ? newItem.order : maxOrder + 1
    };
    
    console.log('Adding new item to vision board:', item);
    
    setItems((prev) => [...prev, item]);
  }, [items]);

  const updateItemPosition = useCallback((id: string, position: { x: number; y: number }) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, position } 
          : item
      )
    );
  }, []);
  
  const reorderItems = useCallback((sourceId: string, destinationId: string) => {
    if (sourceId === destinationId) return;
    
    console.log(`Reordering items: Moving ${sourceId} to position of ${destinationId}`);
    
    setItems(prevItems => {
      // Find the source and destination items
      const sourceItem = prevItems.find(item => item.id === sourceId);
      const destinationItem = prevItems.find(item => item.id === destinationId);
      
      if (!sourceItem || !destinationItem) {
        console.warn("Source or destination item not found for reordering");
        return prevItems;
      }
      
      // Get the current orders
      const sourceOrder = sourceItem.order || 0;
      const destinationOrder = destinationItem.order || 0;
      
      console.log(`Source order: ${sourceOrder}, Destination order: ${destinationOrder}`);
      
      // Create a new array with updated orders
      const reorderedItems = prevItems.map(item => {
        // If this is the item we're moving
        if (item.id === sourceId) {
          return { ...item, order: destinationOrder };
        }
        
        // If we're moving an item forward (e.g., from index 0 to index 2)
        // Decrement the order of items between the source and destination
        if (sourceOrder < destinationOrder && 
            (item.order || 0) > sourceOrder && 
            (item.order || 0) <= destinationOrder) {
          return { ...item, order: (item.order || 0) - 1 };
        }
        
        // If we're moving an item backward (e.g., from index 2 to index 0)
        // Increment the order of items between the destination and source
        if (sourceOrder > destinationOrder && 
            (item.order || 0) >= destinationOrder && 
            (item.order || 0) < sourceOrder) {
          return { ...item, order: (item.order || 0) + 1 };
        }
        
        // Otherwise, keep the item as is
        return item;
      });
      
      // Sort the items by order for consistency
      return reorderedItems.sort((a, b) => (a.order || 0) - (b.order || 0));
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    console.log('Removing item from vision board:', id);
    setItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === id);
      if (!itemToRemove) return prevItems;
      
      const removedOrder = itemToRemove.order || 0;
      
      return prevItems
        .filter(item => item.id !== id)
        .map(item => {
          // Decrement the order of all items that come after the removed item
          if ((item.order || 0) > removedOrder) {
            return { ...item, order: (item.order || 0) - 1 };
          }
          return item;
        });
    });
  }, []);

  const contextValue = React.useMemo(
    () => ({ items, addItem, updateItemPosition, reorderItems, removeItem }),
    [items, addItem, updateItemPosition, reorderItems, removeItem]
  );

  return (
    <VisionBoardContext.Provider value={contextValue}>
      {children}
    </VisionBoardContext.Provider>
  );
};
