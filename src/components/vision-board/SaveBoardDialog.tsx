import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { X } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { VisionBoardProvider, useVisionBoard } from '@/context/VisionBoardContext';
import { saveNewVisionBoard, STORAGE_KEY, defaultBoards, getBoardTitle, setBoardTitle } from '@/utils/visionBoardUtils';

interface SaveBoardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Create a wrapped component that uses the context
function SaveBoardDialogContent({ open, onOpenChange }: SaveBoardDialogProps) {
  const [boardName, setBoardName] = useState(getBoardTitle());
  const [notificationPreference, setNotificationPreference] = useState('daily');
  const navigate = useNavigate();
  const { items } = useVisionBoard();

  // Update the board name whenever the dialog opens to get the latest title
  useEffect(() => {
    if (open) {
      setBoardName(getBoardTitle());
    }
  }, [open]);

  const handleSave = () => {
    // Check if we're updating an existing board
    const currentBoardId = localStorage.getItem('currentBoardId');
    
    // Extract up to 4 image URLs from the vision board items
    const boardImages = items
      .filter(item => item.content.imageUrl)
      .map(item => item.content.imageUrl)
      .slice(0, 4);

    // If we don't have 4 images, fill with defaults
    while (boardImages.length < 4) {
      boardImages.push('/lovable-uploads/d6cec2fd-12d6-4b45-ae92-5f10fec33156.png');
    }
    
    // Save the updated board title
    setBoardTitle(boardName);
    
    // If we have a current board ID, update it instead of creating a new one
    let newBoardId = currentBoardId;
    
    if (currentBoardId) {
      // Update existing board
      const boards = localStorage.getItem(STORAGE_KEY);
      const parsedBoards = boards ? JSON.parse(boards) : defaultBoards;
      const updatedBoards = parsedBoards.map(board => {
        if (board.id === currentBoardId) {
          return {
            ...board,
            name: boardName,
            images: boardImages
          };
        }
        return board;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBoards));
      toast.success(`Vision board "${boardName}" updated!`);
    } else {
      // Save as a new board
      newBoardId = saveNewVisionBoard({
        name: boardName,
        images: boardImages,
        notificationPreference
      });
      
      // Set this as the current board
      localStorage.setItem('currentBoardId', newBoardId);
      toast.success(`Vision board "${boardName}" saved!`);
    }
    
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-md p-6 rounded-[24px] relative">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">
            {localStorage.getItem('currentBoardId') ? 'Update Vision Board' : 'Save Vision Board'}
          </h3>
          <button 
            onClick={() => onOpenChange(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="board-name" className="block text-sm font-medium text-gray-700 mb-1">
              Board Name
            </label>
            <Input
              id="board-name"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              className="w-full border-gray-300 rounded-[100px]"
            />
          </div>
          
          <div>
            <label htmlFor="notification-preference" className="block text-sm font-medium text-gray-700 mb-1">
              Notify me when new listings are added matching my search criteria
            </label>
            <Select 
              value={notificationPreference} 
              onValueChange={setNotificationPreference}
            >
              <SelectTrigger className="w-full rounded-[100px]" id="notification-preference">
                <SelectValue placeholder="Select notification frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Alert</SelectItem>
                <SelectItem value="instant">Instant</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="rounded-full px-5"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              className="rounded-full px-5 bg-black hover:bg-gray-800"
            >
              {localStorage.getItem('currentBoardId') ? 'Update' : 'Save'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Create the main component that wraps the content with the VisionBoardProvider
export function SaveBoardDialog(props: SaveBoardDialogProps) {
  // If the dialog is not open, don't render anything
  if (!props.open) return null;
  
  // Wrap the content with VisionBoardProvider when the dialog is open
  return (
    <VisionBoardProvider>
      <SaveBoardDialogContent {...props} />
    </VisionBoardProvider>
  );
}
