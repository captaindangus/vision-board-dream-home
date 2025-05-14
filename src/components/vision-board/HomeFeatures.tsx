
import React from 'react';

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
      imageUrl: "/lovable-uploads/3cc34a99-58d4-4b5e-8e69-d6a2e85aa6c9.png", 
      type: "Bathroom"
    },
    { 
      id: 5, 
      imageUrl: "/lovable-uploads/edc4f5ac-e0ea-4e33-8927-76659277b28e.png", 
      type: "Kitchen"
    },
    { 
      id: 6, 
      imageUrl: "/lovable-uploads/f9797142-2f9e-442c-ba71-a1f02e9ecfd2.png",
      type: "Office"
    }
  ];

  const handleDragStart = (e: React.DragEvent, feature: any) => {
    console.log('Drag started for feature:', feature);
    
    // Create a clone of the feature card for the drag image
    const featureElement = e.currentTarget.cloneNode(true) as HTMLElement;
    featureElement.style.width = `${e.currentTarget.offsetWidth}px`;
    featureElement.style.opacity = '0.8';
    featureElement.style.position = 'absolute';
    featureElement.style.top = '-1000px'; // Position off-screen
    document.body.appendChild(featureElement);
    
    // Use the feature card as drag image
    e.dataTransfer.setDragImage(featureElement, e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    
    e.dataTransfer.setData("application/json", JSON.stringify({
      type: 'homeFeature',
      content: {
        imageUrl: feature.imageUrl,
        title: feature.type
      },
      size: { width: 200, height: 150 }
    }));
    e.dataTransfer.effectAllowed = "copy";
    
    // Remove the clone after a short delay
    setTimeout(() => {
      document.body.removeChild(featureElement);
    }, 0);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 w-full">
      {features.map((feature) => (
        <div 
          key={feature.id} 
          className="relative group cursor-grab active:cursor-grabbing"
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
      ))}
    </div>
  );
}
