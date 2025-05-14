import React from 'react';
import { SearchBar } from './SearchBar';
import { FeatureSection } from './FeatureSection';
import { HomeFeatures } from './HomeFeatures';
import { NeighborhoodFeatures } from './NeighborhoodFeatures';
import { HomeDetails } from './HomeDetails';

export function VisionBoardSidebar() {
  return (
    <aside className="flex w-[351px] h-[fit] flex-col items-end gap-10 bg-white p-5 rounded-[20px] max-md:w-full">
      <SearchBar />
      <FeatureSection title="Home Features">
        <HomeFeatures />
      </FeatureSection>
      <FeatureSection title="Neighbourhood Features">
        <NeighborhoodFeatures />
      </FeatureSection>
      <FeatureSection title="Home Details">
        <HomeDetails />
      </FeatureSection>
    </aside>
  );
}
