
import React from 'react';
import { FeatureCard } from './FeatureCard';

export function NeighborhoodFeatures() {
  // In a real application, these would come from an API or state
  const features = [
    {
      id: 1,
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/3847a0e9e172e5ef67bda0dd5a5eee9a109a9bc3",
      title: "🏞 Parks",
      description: "Parks & green spaces nearby"
    },
    {
      id: 2,
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/2d8ec8d94f43747d00d92dfb9567fd8871f92884",
      title: "🏫 Nearby Schools",
      description: "Top-rated schools within 1 mile"
    }
  ];

  return (
    <div className="flex flex-col items-start gap-3 w-full">
      {features.map((feature) => (
        <FeatureCard
          key={feature.id}
          imageUrl={feature.imageUrl}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
}
