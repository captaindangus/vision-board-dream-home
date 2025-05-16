
import React, { useMemo, useState } from 'react';
import { VisionBoardItem } from '@/context/VisionBoardContext';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SummaryPopupProps {
  items: VisionBoardItem[];
}

interface SummaryTag {
  id: string;
  text: string;
  category: 'feature' | 'neighborhood' | 'detail';
}

export function SummaryPopup({ items }: SummaryPopupProps) {
  const [removedTags, setRemovedTags] = useState<string[]>([]);

  // Extract all tags from the items on the board
  const extractedTags = useMemo(() => {
    const tags: SummaryTag[] = [];
    
    items.forEach(item => {
      // Extract home feature tags
      if (item.type === 'homeFeature' && item.content.tags) {
        item.content.tags.forEach((tag, index) => {
          tags.push({
            id: `${item.id}-tag-${index}`,
            text: tag,
            category: 'feature'
          });
        });
      }
      
      // Extract neighborhood features
      if (item.type === 'neighborhoodFeature' && item.content.title) {
        tags.push({
          id: `${item.id}-neighborhood`,
          text: item.content.title,
          category: 'neighborhood'
        });
      }
      
      // Extract home details like price range and size
      if (item.type === 'priceRange' && item.content.value) {
        const [min, max] = item.content.value;
        tags.push({
          id: `${item.id}-price`,
          text: `Price: $${min.toLocaleString()} - $${max.toLocaleString()}`,
          category: 'detail'
        });
      }
      
      if (item.type === 'homeSize') {
        const minSize = item.content.minSize || 'No Min';
        const maxSize = item.content.maxSize || 'No Max';
        tags.push({
          id: `${item.id}-size`,
          text: `Size: ${minSize} - ${maxSize} sqft`,
          category: 'detail'
        });
      }
    });
    
    return tags;
  }, [items]);
  
  // Filter out removed tags
  const visibleTags = extractedTags.filter(tag => !removedTags.includes(tag.id));
  
  const handleRemoveTag = (id: string) => {
    setRemovedTags(prev => [...prev, id]);
  };

  // Group tags by category
  const featureTags = visibleTags.filter(tag => tag.category === 'feature');
  const neighborhoodTags = visibleTags.filter(tag => tag.category === 'neighborhood');
  const detailTags = visibleTags.filter(tag => tag.category === 'detail');

  if (visibleTags.length === 0) {
    return (
      <div className="text-center p-4 text-gray-500">
        No items to summarize. Add some items to your vision board first.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-medium text-sm">Vision Board Summary</h3>
      <ScrollArea className="max-h-[300px]">
        <div className="flex flex-col gap-4">
          {detailTags.length > 0 && (
            <div className="flex flex-col gap-2">
              <h4 className="text-xs text-gray-500 font-medium">Home Details</h4>
              <div className="flex flex-wrap gap-2">
                {detailTags.map((tag) => (
                  <SummaryChip 
                    key={tag.id} 
                    text={tag.text} 
                    onRemove={() => handleRemoveTag(tag.id)} 
                  />
                ))}
              </div>
            </div>
          )}
          
          {featureTags.length > 0 && (
            <div className="flex flex-col gap-2">
              <h4 className="text-xs text-gray-500 font-medium">Home Features</h4>
              <div className="flex flex-wrap gap-2">
                {featureTags.map((tag) => (
                  <SummaryChip 
                    key={tag.id} 
                    text={tag.text} 
                    onRemove={() => handleRemoveTag(tag.id)} 
                  />
                ))}
              </div>
            </div>
          )}
          
          {neighborhoodTags.length > 0 && (
            <div className="flex flex-col gap-2">
              <h4 className="text-xs text-gray-500 font-medium">Neighborhood Features</h4>
              <div className="flex flex-wrap gap-2">
                {neighborhoodTags.map((tag) => (
                  <SummaryChip 
                    key={tag.id} 
                    text={tag.text} 
                    onRemove={() => handleRemoveTag(tag.id)} 
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

interface SummaryChipProps {
  text: string;
  onRemove: () => void;
}

function SummaryChip({ text, onRemove }: SummaryChipProps) {
  return (
    <Badge className="flex items-center gap-1 px-2 py-1 bg-[#F3F3F4] text-black hover:bg-[#E9E9EA]">
      <span className="text-xs">{text}</span>
      <button 
        className="ml-1 rounded-full hover:bg-gray-300/50 p-0.5" 
        onClick={onRemove}
      >
        <X size={12} />
      </button>
    </Badge>
  );
}
