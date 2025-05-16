
import React from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useVisionBoard } from '@/context/VisionBoardContext';
import { SummaryPopup } from './SummaryPopup';

export function SummarizeButton() {
  const { items } = useVisionBoard();
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline"
          className="text-base font-medium flex items-center gap-2 px-4 py-2.5 h-10 rounded-[100px] border border-[#0C0F24]"
        >
          Summarize✨
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-6 rounded-[24px]" 
        align="end" 
        sideOffset={16}
      >
        <SummaryPopup items={items} />
      </PopoverContent>
    </Popover>
  );
}
