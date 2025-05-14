
import React from 'react';
import { SearchBar } from './SearchBar';
import { FeatureSection } from './FeatureSection';
import { HomeFeatures } from './HomeFeatures';
import { NeighborhoodFeatures } from './NeighborhoodFeatures';
import { HomeDetails } from './HomeDetails';
import { ScrollArea } from '@/components/ui/scroll-area';

export function VisionBoardSidebar() {
  return (
    <aside className="flex flex-col w-full h-full bg-white p-5 rounded-[20px] max-md:w-full overflow-hidden">
      <SearchBar />
      <ScrollArea className="flex-1 mt-5 pr-2 max-h-[calc(100vh-180px)]">
        <div className="flex flex-col gap-10 pb-4">
          <FeatureSection title="Home Features" defaultOpen={true}>
            <HomeFeatures />
          </FeatureSection>
          <div className="border-t border-gray-100"></div>
          <FeatureSection title="Neighbourhood Features">
            <NeighborhoodFeatures />
          </FeatureSection>
          <div className="border-t border-gray-100"></div>
          <FeatureSection title="Home Details">
            <HomeDetails />
          </FeatureSection>
        </div>
      </ScrollArea>
    </aside>
  );
}
