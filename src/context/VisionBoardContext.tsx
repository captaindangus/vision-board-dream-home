import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';

export interface VisionBoardItem {
  id: string;
  type: 'image' | 'feature' | 'homeFeature' | 'neighborhoodFeature';
  content: {
    imageUrl?: string;
    title?: string;
    description?: string;
  };
  position: {
    x: number;
    y: number;
  };
  size?: {
    width: number;
    height: number;
  };
}

interface VisionBoardContextType {
  items: VisionBoardItem[];
  addItem: (item: Omit<VisionBoardItem, 'id'>) => void;
  updateItemPosition: (id: string, position: { x: number; y: number }) => void;
  removeItem: (id: string) => void;
}

const VisionBoardContext = createContext<VisionBoardContextType | undefined>(undefined);

const STORAGE_KEY = 'visionBoardItems';

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
      return savedItems ? JSON.parse(savedItems) : [];
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
    const id = `item-${Date.now()}`;
    
    // We no longer need random positioning, but keep the position property for compatibility
    const position = { x: 0, y: 0 };

    const item = { ...newItem, id, position };
    console.log('Adding new item to vision board:', item);
    
    setItems((prev) => [...prev, item]);
  }, []);

  const updateItemPosition = useCallback((id: string, position: { x: number; y: number }) => {
    // We no longer need this for grid layout, but keep the method for compatibility
    console.log('Position updates are ignored in grid layout');
  }, []);

  const removeItem = useCallback((id: string) => {
    console.log('Removing item from vision board:', id);
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const contextValue = React.useMemo(
    () => ({ items, addItem, updateItemPosition, removeItem }),
    [items, addItem, updateItemPosition, removeItem]
  );

  return (
    <VisionBoardContext.Provider value={contextValue}>
      {children}
    </VisionBoardContext.Provider>
  );
};
