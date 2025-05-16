
import React from 'react';
import { Button } from '@/components/ui/button';
import { CircleX } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useVisionBoard } from '@/context/VisionBoardContext';
import { SummaryPopup } from './SummaryPopup';

export function SummarizeButton() {
  const { items } = useVisionBoard();
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          className="fixed bottom-6 right-6 bg-[#9b87f5] hover:bg-[#7E69AB] shadow-md"
        >
          Summarize
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-2" 
        align="end" 
        sideOffset={16}
      >
        <SummaryPopup items={items} />
      </PopoverContent>
    </Popover>
  );
}
