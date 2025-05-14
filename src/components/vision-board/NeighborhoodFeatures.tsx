
import React from 'react';
import { useSearch } from './SearchBar';

export function NeighborhoodFeatures() {
  const { searchQuery } = useSearch();
  
  const features = [
    { 
      id: 1, 
      imageUrl: "https://images.unsplash.com/photo-1517457210348-703079e57d4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", 
      type: "Urban" 
    },
    { 
      id: 2, 
      imageUrl: "https://images.unsplash.com/photo-1531761535209-180857e963b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", 
      type: "Suburban" 
    },
    { 
      id: 3, 
      imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", 
      type: "Rural" 
    },
    { 
      id: 4, 
      imageUrl: "https://images.unsplash.com/photo-1581056771107-24247a210b28?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", 
      type: "School District" 
    },
    { 
      id: 5, 
      imageUrl: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", 
      type: "Park Nearby" 
    },
    { 
      id: 6, 
      imageUrl: "https://images.unsplash.com/photo-1511322586174-c207ab4e2bfe?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", 
      type: "Shopping" 
    }
  ];

  // Filter features based on search query
  const filteredFeatures = searchQuery.trim() 
    ? features.filter(feature => 
        feature.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : features;

  const handleDragStart = (e: React.DragEvent, feature: any) => {
    console.log('Drag started for feature:', feature);
    
    // Set the drag data
    e.dataTransfer.setData("application/json", JSON.stringify({
      type: 'neighborhoodFeature',
      content: {
        imageUrl: feature.imageUrl,
        title: feature.type
      },
      size: { width: 200, height: 150 }
    }));
    e.dataTransfer.effectAllowed = "copy";
    
    // Create a drag image that represents the item
    const imgElement = e.currentTarget;
    if (imgElement) {
      // Create a clone of the image element to use as the drag image
      const dragImage = imgElement.cloneNode(true) as HTMLElement;
      
      // Style the drag image
      dragImage.style.width = imgElement.clientWidth + 'px';
      dragImage.style.height = imgElement.clientHeight + 'px';
      dragImage.style.opacity = '0.8';
      dragImage.style.position = 'absolute';
      dragImage.style.top = '-1000px';
      document.body.appendChild(dragImage);
      
      // Set the drag image
      e.dataTransfer.setDragImage(
        dragImage, 
        e.clientX - imgElement.getBoundingClientRect().left, 
        e.clientY - imgElement.getBoundingClientRect().top
      );
      
      // Remove the drag image after the drag operation
      setTimeout(() => {
        document.body.removeChild(dragImage);
      }, 0);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 w-full">
      {filteredFeatures.length > 0 ? (
        filteredFeatures.map((feature) => (
          <div 
            key={feature.id} 
            className="relative group cursor-grab"
            draggable
            onDragStart={(e) => handleDragStart(e, feature)}
          >
            <img
              src={feature.imageUrl}
              alt={feature.type}
              className="w-[144px] h-[109px] object-cover rounded-[8px] transition-all duration-200 group-hover:brightness-90"
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 px-2 py-1 rounded text-white text-xs">
              {feature.type}
            </div>
          </div>
        ))
      ) : (
        <div className="w-full text-center py-4 text-gray-500">
          No matching neighborhood features found
        </div>
      )}
    </div>
  );
}
