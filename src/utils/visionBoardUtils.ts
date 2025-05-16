import { toast } from 'sonner';
import { VisionBoard } from '@/components/landing/VisionBoardGrid';

export const STORAGE_KEY = 'visionBoards';
export const VISION_BOARD_ITEMS_KEY = 'visionBoardItems';
export const BOARD_TITLE_KEY = 'currentBoardTitle';

// Default boards for new users
export const defaultBoards: VisionBoard[] = [
  {
    id: '1',
    name: 'My Vision Board 1',
    days: 2,
    createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
    images: [
      '/lovable-uploads/d6cec2fd-12d6-4b45-ae92-5f10fec33156.png',
      '/lovable-uploads/63b9a3a1-d1bc-4bcf-a807-a2aec8728e6f.png',
      '/lovable-uploads/853d956f-993b-4666-bbd3-20838e6e1588.png',
      '/lovable-uploads/ab124023-9d45-4962-8b9a-f9ed70f10fcf.png',
    ]
  },
  {
    id: '2',
    name: 'My Vision Board 2',
    days: 2,
    createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
    images: [
      '/lovable-uploads/322397c6-7177-4095-bf9e-7d62eca30dbc.png',
      '/lovable-uploads/fc39b9f3-6a99-4d62-869d-a1a7498dc9f5.png',
      '/lovable-uploads/b1d62892-cf6f-41ad-b366-89cb39168cd9.png',
      '/lovable-uploads/d9c579f3-a709-4010-b98a-1eb2b3b21174.png',
    ]
  }
];

// Interface for board creation
interface NewVisionBoard {
  name: string;
  images: string[];
  notificationPreference?: string;
}

// Load vision boards from localStorage
export const loadVisionBoards = (): VisionBoard[] => {
  try {
    const storedBoards = localStorage.getItem(STORAGE_KEY);
    if (storedBoards) {
      return JSON.parse(storedBoards);
    }
    // First time user - set default boards
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultBoards));
    return defaultBoards;
  } catch (error) {
    console.error('Error loading vision boards:', error);
    // Fallback to default boards if there's an error
    return defaultBoards;
  }
};

// Save a new vision board and return its ID
export const saveNewVisionBoard = (newBoard: NewVisionBoard): string => {
  try {
    // Load existing boards
    const boards = loadVisionBoards();
    
    // Generate a unique ID
    const boardId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Create the new board with current timestamp
    const now = Date.now();
    const createdBoard: VisionBoard = {
      id: boardId,
      name: newBoard.name,
      days: 0, // Just created
      createdAt: now,
      images: newBoard.images
    };
    
    // Save all items for this board
    const currentItems = localStorage.getItem(VISION_BOARD_ITEMS_KEY);
    if (currentItems) {
      localStorage.setItem(`${VISION_BOARD_ITEMS_KEY}_${boardId}`, currentItems);
    }
    
    // Add the new board to the list and save
    const updatedBoards = [createdBoard, ...boards];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBoards));
    
    // Save notification preference if provided
    if (newBoard.notificationPreference) {
      localStorage.setItem(`notification_${boardId}`, newBoard.notificationPreference);
    }
    
    // Clear the current board title after saving
    localStorage.removeItem(BOARD_TITLE_KEY);
    
    return boardId;
  } catch (error) {
    console.error('Error saving new vision board:', error);
    toast.error('Failed to save vision board');
    return '';
  }
};

// Delete a vision board
export const deleteVisionBoard = (boards: VisionBoard[], boardId: string): VisionBoard[] => {
  try {
    const updatedBoards = boards.filter(board => board.id !== boardId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBoards));
    
    // Clean up associated data
    localStorage.removeItem(`${VISION_BOARD_ITEMS_KEY}_${boardId}`);
    localStorage.removeItem(`notification_${boardId}`);
    localStorage.removeItem(`lastActiveTab_${boardId}`);
    
    toast.success('Vision board deleted successfully');
    return updatedBoards;
  } catch (error) {
    console.error('Error deleting vision board:', error);
    toast.error('Failed to delete vision board');
    return boards;
  }
};

// Create a new board (clear existing vision board items)
export const prepareNewBoard = () => {
  localStorage.removeItem(VISION_BOARD_ITEMS_KEY);
  // Remove currentBoardId to ensure we start fresh
  localStorage.removeItem('currentBoardId');
  
  // Set default board title for a new board
  setBoardTitle("Untitled Vision Board 🌟");
};

// Load vision board items for a specific board
export const loadVisionBoardItems = (boardId: string) => {
  if (!boardId) return null;
  
  try {
    const items = localStorage.getItem(`${VISION_BOARD_ITEMS_KEY}_${boardId}`);
    return items ? JSON.parse(items) : null;
  } catch (error) {
    console.error('Error loading vision board items:', error);
    return null;
  }
};

// Board title management functions
export const getBoardTitle = (): string => {
  const savedTitle = localStorage.getItem(BOARD_TITLE_KEY);
  return savedTitle || "Untitled Vision Board 🌟";
};

export const setBoardTitle = (title: string): void => {
  localStorage.setItem(BOARD_TITLE_KEY, title);
};

// Load a board's title when switching boards
export const loadBoardTitle = (boardId: string): string => {
  if (!boardId) return "Untitled Vision Board 🌟";
  
  try {
    const boards = loadVisionBoards();
    const board = boards.find(b => b.id === boardId);
    if (board) {
      // Set the current board title in localStorage
      localStorage.setItem(BOARD_TITLE_KEY, board.name);
      return board.name;
    }
    return "Untitled Vision Board 🌟";
  } catch (error) {
    console.error('Error loading board title:', error);
    return "Untitled Vision Board 🌟";
  }
};
