
import React from 'react';
import { Toggle } from '@/components/ui/toggle';
import { Grid2X2, Grid3X3 } from 'lucide-react';

interface MosaicToggleProps {
  isMosaicEnabled: boolean;
  onToggle: () => void;
}

export function MosaicToggle({ isMosaicEnabled, onToggle }: MosaicToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Layout:</span>
      <Toggle
        pressed={isMosaicEnabled}
        onPressedChange={onToggle}
        aria-label="Toggle mosaic layout"
        className="data-[state=on]:bg-blue-100 data-[state=on]:text-blue-600"
      >
        {isMosaicEnabled ? <Grid3X3 size={16} /> : <Grid2X2 size={16} />}
      </Toggle>
    </div>
  );
}
