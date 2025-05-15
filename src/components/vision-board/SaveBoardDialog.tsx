
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { X } from 'lucide-react';

interface SaveBoardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SaveBoardDialog({ open, onOpenChange }: SaveBoardDialogProps) {
  const [boardName, setBoardName] = useState('Untitled Vision Board');
  const navigate = useNavigate();

  const handleSave = () => {
    // Simulate saving the board
    toast.success(`Vision board "${boardName}" saved!`);
    onOpenChange(false);
    // Navigate to the home page to see the board in the list
    navigate('/');
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-md p-6 rounded-[24px] relative">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Save Vision Board</h3>
          <button 
            onClick={() => onOpenChange(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="board-name" className="block text-sm font-medium text-gray-700 mb-1">
              Board Name
            </label>
            <Input
              id="board-name"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              className="w-full border-gray-300 rounded-md"
            />
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
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
