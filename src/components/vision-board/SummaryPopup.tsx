import React, { useMemo, useState, useEffect } from 'react';
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

// Create a key for localStorage to persist removed tags
const REMOVED_TAGS_STORAGE_KEY = 'visionboard-removed-summary-tags';

export function SummaryPopup({ items }: SummaryPopupProps) {
  // Initialize state from localStorage if available
  const [removedTags, setRemovedTags] = useState<string[]>(() => {
    const savedRemovedTags = localStorage.getItem(REMOVED_TAGS_STORAGE_KEY);
    return savedRemovedTags ? JSON.parse(savedRemovedTags) : [];
  });

  // Save to localStorage whenever removedTags changes
  useEffect(() => {
    localStorage.setItem(REMOVED_TAGS_STORAGE_KEY, JSON.stringify(removedTags));
  }, [removedTags]);

  // Extract all tags from the items on the board
  const extractedTags = useMemo(() => {
    const tags: SummaryTag[] = [];
    const uniqueTagTexts = new Set<string>();
    
    items.forEach(item => {
      // Extract home feature tags
      if (item.type === 'homeFeature' && item.content.tags) {
        item.content.tags.forEach((tag, index) => {
          // Only add the tag if we haven't seen this text before
          if (!uniqueTagTexts.has(tag)) {
            uniqueTagTexts.add(tag);
            tags.push({
              id: `${item.id}-tag-${index}`,
              text: tag,
              category: 'feature'
            });
          }
        });
      }
      
      // Extract neighborhood features
      if (item.type === 'neighborhoodFeature' && item.content.title) {
        const title = item.content.title;
        if (!uniqueTagTexts.has(title)) {
          uniqueTagTexts.add(title);
          tags.push({
            id: `${item.id}-neighborhood`,
            text: title,
            category: 'neighborhood'
          });
        }
      }
      
      // Extract home details like price range and size
      if (item.type === 'priceRange' && item.content.value) {
        const [min, max] = item.content.value;
        const priceText = `Price: $${min.toLocaleString()} - $${max.toLocaleString()}`;
        if (!uniqueTagTexts.has(priceText)) {
          uniqueTagTexts.add(priceText);
          tags.push({
            id: `${item.id}-price`,
            text: priceText,
            category: 'detail'
          });
        }
      }
      
      if (item.type === 'homeSize') {
        const minSize = item.content.minSize || 'No Min';
        const maxSize = item.content.maxSize || 'No Max';
        const sizeText = `Size: ${minSize} - ${maxSize} sqft`;
        if (!uniqueTagTexts.has(sizeText)) {
          uniqueTagTexts.add(sizeText);
          tags.push({
            id: `${item.id}-size`,
            text: sizeText,
            category: 'detail'
          });
        }
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
      <ScrollArea className="max-h-[300px] pr-2 pb-2 overflow-y-auto">
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
