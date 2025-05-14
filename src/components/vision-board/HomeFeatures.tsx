
import React from 'react';
import { Bed, Bath, Sofa, Home, LampFloor } from 'lucide-react';

export function HomeFeatures() {
  // More diverse set of home features with different types
  const features = [
    { 
      id: 1, 
      imageUrl: "/lovable-uploads/3373eae3-ed71-4b48-b291-1980584aa937.png",
      type: "Living Room" 
    },
    { 
      id: 2, 
      imageUrl: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", 
      type: "Bedroom"
    },
    { 
      id: 3, 
      imageUrl: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", 
      type: "Swimming" 
    },
    { 
      id: 4, 
      imageUrl: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", 
      type: "House Front"
    },
    { 
      id: 5, 
      imageUrl: "/lovable-uploads/edc4f5ac-e0ea-4e33-8927-76659277b28e.png", 
      type: "Kitchen"
    },
    { 
      id: 6, 
      imageUrl: "https://images.unsplash.com/photo-1581467825644-16917330e7af?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      type: "Office"
    }
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 w-full">
      {features.map((feature) => (
        <div key={feature.id} className="relative group">
          <img
            src={feature.imageUrl}
            alt={feature.type}
            className="w-[144px] h-[109px] object-cover rounded-[8px] transition-all duration-200 group-hover:brightness-90"
          />
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 px-2 py-1 rounded text-white text-xs">
            {feature.type}
          </div>
        </div>
      ))}
    </div>
  );
}
