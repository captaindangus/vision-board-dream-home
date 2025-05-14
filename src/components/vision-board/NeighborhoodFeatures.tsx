
import React from 'react';
import { FeatureCard } from './FeatureCard';
import { Bus, ShoppingCart } from 'lucide-react';
import { useVisionBoard } from '@/context/VisionBoardContext';

export function NeighborhoodFeatures() {
  const { addItem } = useVisionBoard();
  
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
    },
    {
      id: 3,
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      title: "🚌 Public Transport",
      description: "Bus & train stations within walking distance",
      icon: <Bus size={18} className="mr-1" />
    },
    {
      id: 4,
      imageUrl: "https://images.unsplash.com/photo-1460574283810-2aab119d8511",
      title: "🛒 Groceries & Shopping",
      description: "Supermarkets and shopping centers nearby",
      icon: <ShoppingCart size={18} className="mr-1" />
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
          draggable
          featureData={feature}
        />
      ))}
    </div>
  );
}
