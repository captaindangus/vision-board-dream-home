
import React, { useState } from 'react';
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

interface SaveBoardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SaveBoardDialog({ open, onOpenChange }: SaveBoardDialogProps) {
  const [boardName, setBoardName] = useState('Untitled Vision Board');
  const [notificationPreference, setNotificationPreference] = useState('daily');
  const navigate = useNavigate();

  const handleSave = () => {
    // Simulate saving the board
    toast.success(`Vision board "${boardName}" saved!`);
    onOpenChange(false);
    // Remove navigation to home page to stay on current page
    // navigate('/');
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
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
