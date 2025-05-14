
import React from 'react';
import { useSearch } from './SearchBar';
import { FeatureCard } from './FeatureCard';

export function NeighborhoodFeatures() {
  const { searchQuery } = useSearch();
  
  const features = [
    { 
      id: 1, 
      imageUrl: "https://images.unsplash.com/photo-1517457210348-703079e57d4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", 
      type: "Urban",
      description: "City living with vibrant streets and amenities"
    },
    { 
      id: 2, 
      imageUrl: "https://images.unsplash.com/photo-1531761535209-180857e963b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", 
      type: "Suburban",
      description: "Peaceful residential areas with more space" 
    },
    { 
      id: 3, 
      imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", 
      type: "Rural",
      description: "Countryside living with natural surroundings" 
    },
    { 
      id: 4, 
      imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", 
      type: "School District",
      description: "Neighborhoods with quality educational options" 
    },
    { 
      id: 5, 
      imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", 
      type: "Park Nearby",
      description: "Homes with easy access to green spaces" 
    },
    { 
      id: 6, 
      imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", 
      type: "Shopping",
      description: "Close to retail centers and shopping options" 
    }
  ];

  // Filter features based on search query
  const filteredFeatures = searchQuery.trim() 
    ? features.filter(feature => 
        feature.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : features;

  return (
    <div className="flex flex-col gap-2 w-full">
      {filteredFeatures.length > 0 ? (
        filteredFeatures.map((feature) => (
          <FeatureCard
            key={feature.id}
            imageUrl={feature.imageUrl}
            title={feature.type}
            description={feature.description}
            draggable={true}
            featureData={feature}
          />
        ))
      ) : (
        <div className="w-full text-center py-4 text-gray-500">
          No matching neighborhood features found
        </div>
      )}
    </div>
  );
}
