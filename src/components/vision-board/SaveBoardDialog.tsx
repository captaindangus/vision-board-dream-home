
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';

interface SaveBoardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SaveBoardDialog({ open, onOpenChange }: SaveBoardDialogProps) {
  const [boardName, setBoardName] = useState<string>("My Vision Board 1");
  const [notificationFrequency, setNotificationFrequency] = useState<string>("daily");

  const handleSave = () => {
    // In a real app, we would save the board name and notification preference to a database
    toast.success("Board saved successfully!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-lg p-6 bg-white">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-6 top-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Close</span>
        </button>
        
        <DialogHeader>
          <DialogTitle className="text-3xl font-medium">Save Board</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col mt-6 gap-6">
          <Input
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            className="h-14 rounded-full border border-gray-300 px-6 text-lg"
            placeholder="Enter board name"
          />
          
          <div className="text-lg">
            Notify me when new listings are added matching my search criteria.
          </div>
          
          <Select
            value={notificationFrequency}
            onValueChange={setNotificationFrequency}
          >
            <SelectTrigger className="h-14 rounded-full border border-gray-300 px-6 text-lg">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No Alerts</SelectItem>
              <SelectItem value="instant">Instant</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
            </SelectContent>
          </Select>
          
          <button
            onClick={handleSave}
            className="h-14 rounded-full text-lg font-medium text-white bg-[#1A1F2C] hover:bg-black transition-colors"
          >
            Save Board
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
