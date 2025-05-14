
import React, { createContext, useContext, useState, ReactNode } from 'react';

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
  addItem: (item: Omit<VisionBoardItem, 'id' | 'position'>) => void;
  updateItemPosition: (id: string, position: { x: number; y: number }) => void;
  removeItem: (id: string) => void;
}

const VisionBoardContext = createContext<VisionBoardContextType | undefined>(undefined);

export const useVisionBoard = () => {
  const context = useContext(VisionBoardContext);
  if (!context) {
    throw new Error('useVisionBoard must be used within a VisionBoardProvider');
  }
  return context;
};

export const VisionBoardProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<VisionBoardItem[]>([]);

  const addItem = (newItem: Omit<VisionBoardItem, 'id' | 'position'>) => {
    const id = `item-${Date.now()}`;
    // Set initial position with some randomness to avoid perfect stacking
    const position = {
      x: Math.floor(Math.random() * 100),
      y: Math.floor(Math.random() * 100),
    };

    setItems((prev) => [...prev, { ...newItem, id, position }]);
  };

  const updateItemPosition = (id: string, position: { x: number; y: number }) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, position } : item))
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <VisionBoardContext.Provider value={{ items, addItem, updateItemPosition, removeItem }}>
      {children}
    </VisionBoardContext.Provider>
  );
};
