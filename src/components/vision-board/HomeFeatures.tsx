
import React, { useRef } from 'react';
import { useSearch } from './SearchBar';

export function HomeFeatures() {
  const { searchQuery } = useSearch();
  
  // More diverse set of home features with different types and tags
  const features = [
    { 
      id: 1, 
      imageUrl: "/lovable-uploads/4c0986af-8c7c-4c53-adb0-d0cf70b3959f.png",
      type: "Living Room",
      tags: ["Floor-to-Ceiling Windows", "Hardwood Flooring", "Modern Design"]
    },
    { 
      id: 2, 
      imageUrl: "/lovable-uploads/fc4f717f-e4db-49b7-8aa6-fcd82c66bff2.png", 
      type: "Bedroom",
      tags: ["Large Window", "Hardwood Flooring", "Modern Design"]
    },
    { 
      id: 3, 
      imageUrl: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", 
      type: "Swimming",
      tags: ["Pool", "Rooftop", "Skyline View"]
    },
    { 
      id: 4, 
      imageUrl: "/lovable-uploads/3cc34a99-58d4-4b5e-8e69-d6a2e85aa6c9.png", 
      type: "Bathroom",
      tags: ["Concrete Finishes", "Minimalism", "Tall Vertical Window"]
    },
    { 
      id: 5, 
      imageUrl: "/lovable-uploads/edc4f5ac-e0ea-4e33-8927-76659277b28e.png", 
      type: "Kitchen",
      tags: ["U-Shaped Layout", "Open Shelving"]
    },
    { 
      id: 6, 
      imageUrl: "/lovable-uploads/f9797142-2f9e-442c-ba71-a1f02e9ecfd2.png",
      type: "Office",
      tags: ["Hardwood Flooring", "Large Window", "Workspace"]
    }
  ];

  // Filter features based on search query
  const filteredFeatures = searchQuery.trim() 
    ? features.filter(feature => 
        feature.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feature.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : features;

  const handleDragStart = (e: React.DragEvent, feature: any) => {
    console.log('Drag started for feature:', feature);
    
    // Set the drag data with tags included
    e.dataTransfer.setData("application/json", JSON.stringify({
      type: 'homeFeature',
      content: {
        imageUrl: feature.imageUrl,
        title: feature.type,
        tags: feature.tags
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
            {/* Removed the dark overlay chip */}
          </div>
        ))
      ) : (
        <div className="w-full text-center py-4 text-gray-500">
          No matching home features found
        </div>
      )}
    </div>
  );
}
