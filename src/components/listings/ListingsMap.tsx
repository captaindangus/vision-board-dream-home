
import React, { useState, useEffect } from 'react';

// Define markers data with positions relative to container
const markers = [
  { id: 1, position: { top: "15%", left: "35%" } },
  { id: 2, position: { top: "20%", left: "25%" } },
  { id: 3, position: { top: "25%", left: "70%" } },
  { id: 4, position: { top: "40%", left: "55%" } },
  { id: 5, position: { top: "30%", left: "45%" } },
  { id: 6, position: { top: "55%", left: "30%" } },
  { id: 7, position: { top: "50%", left: "65%" } },
  { id: 8, position: { top: "70%", left: "85%" } },
  { id: 9, position: { top: "60%", left: "20%" } },
  { id: 10, position: { top: "75%", left: "40%" } },
  { id: 11, position: { top: "35%", left: "75%" } },
  { id: 12, position: { top: "65%", left: "50%" } },
  { id: 13, position: { top: "45%", left: "15%" } },
  { id: 14, position: { top: "80%", left: "70%" } },
  { id: 15, position: { top: "85%", left: "25%" } },
  { id: 16, position: { top: "10%", left: "60%" } }
];

export function ListingsMap() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Listen for hover events from the listing cards
  useEffect(() => {
    const handleListingHover = (e: Event) => {
      const id = (e as CustomEvent).detail as number | null;
      setHoveredId(id);
    };
    
    document.addEventListener('listingHover', handleListingHover);
    
    return () => {
      document.removeEventListener('listingHover', handleListingHover);
    };
  }, []);

  // Handle marker hover effect
  const handleMarkerHover = (id: number | null) => {
    setHoveredId(id);
    
    // Dispatch event to highlight the corresponding listing card
    if (id !== null) {
      document.dispatchEvent(
        new CustomEvent("markerHover", { detail: id })
      );
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* Map image container */}
      <div className="absolute inset-0 bg-[#E8ECEF] rounded-[20px] overflow-hidden">
        <img 
          src="/lovable-uploads/157448d1-0bc6-45cb-9972-beac1f4d2227.png" 
          alt="New York Map" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Search input positioned at the top */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="relative">
          <input
            type="text"
            placeholder="Search locations"
            defaultValue="New York"
            className="w-full h-12 px-10 rounded-full bg-white shadow-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute left-3 top-3.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 21L16.65 16.65" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Map markers */}
      {markers.map((marker) => (
        <div
          key={marker.id}
          className="absolute map-marker"
          style={{
            top: marker.position.top,
            left: marker.position.left,
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: hoveredId === marker.id ? '#0c0f24' : '#1b489b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '14px',
            transition: 'all 0.3s ease',
            transform: hoveredId === marker.id ? 'scale(1.2)' : 'scale(1)',
            zIndex: hoveredId === marker.id ? 1 : 0,
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
            cursor: 'pointer'
          }}
          onMouseEnter={() => handleMarkerHover(marker.id)}
          onMouseLeave={() => handleMarkerHover(null)}
        >
          {marker.id}
        </div>
      ))}
    </div>
  );
}
