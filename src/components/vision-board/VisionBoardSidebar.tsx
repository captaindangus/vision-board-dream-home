
import React from 'react';
import { SearchBar } from './SearchBar';
import { FeatureSection } from './FeatureSection';
import { HomeFeatures } from './HomeFeatures';
import { NeighborhoodFeatures } from './NeighborhoodFeatures';
import { HomeDetails } from './HomeDetails';
import { ScrollArea } from '@/components/ui/scroll-area';

export function VisionBoardSidebar() {
  return (
    <aside className="flex flex-col w-full h-full bg-white p-5 rounded-[20px] max-md:w-full">
      <SearchBar />
      <ScrollArea className="flex-1 mt-5 pr-2">
        <div className="flex flex-col gap-8 pb-4">
          <FeatureSection title="Home Features">
            <HomeFeatures />
          </FeatureSection>
          <FeatureSection title="Neighbourhood Features">
            <NeighborhoodFeatures />
          </FeatureSection>
          <FeatureSection title="Home Details">
            <HomeDetails />
          </FeatureSection>
        </div>
      </ScrollArea>
    </aside>
  );
}
