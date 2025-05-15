
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Define markers data
const markers = [
  { id: 1, lngLat: [-73.985, 40.715] as [number, number] },
  { id: 3, lngLat: [-73.975, 40.755] as [number, number] },
  { id: 4, lngLat: [-73.965, 40.775] as [number, number] },
  { id: 8, lngLat: [-73.925, 40.855] as [number, number] },
];

export function ListingsMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{[key: number]: mapboxgl.Marker}>({});
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;
    
    mapboxgl.accessToken = "pk.eyJ1IjoiZGVtby11c2VyIiwiYSI6ImNrZHhjbXk4cTB1c3cycnBmZzFmNnhrNWIifQ.6X8GEhFLcJapugXFPRj37w";
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-73.98, 40.76], // New York City coordinates
      zoom: 12,
      dragRotate: false, // Disable rotation for better UX
      attributionControl: false // Hide attribution for cleaner look
    });
    
    map.current.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');

    // Add markers once the map has loaded
    map.current.on('load', () => {
      markers.forEach(marker => {
        // Create a DOM element for the marker
        const markerEl = document.createElement('div');
        markerEl.className = 'map-marker';
        markerEl.style.width = '30px';
        markerEl.style.height = '30px';
        markerEl.style.borderRadius = '50%';
        markerEl.style.backgroundColor = '#1b489b';
        markerEl.style.cursor = 'pointer';
        markerEl.style.transition = 'all 0.3s ease';
        markerEl.style.display = 'flex';
        markerEl.style.alignItems = 'center';
        markerEl.style.justifyContent = 'center';
        markerEl.style.color = 'white';
        markerEl.style.fontWeight = 'bold';
        markerEl.style.fontSize = '14px';
        markerEl.textContent = marker.id.toString();
        markerEl.dataset.id = marker.id.toString();
        
        // Create and add the marker
        const mapMarker = new mapboxgl.Marker(markerEl)
          .setLngLat(marker.lngLat)
          .addTo(map.current!);
        
        // Store reference to the marker
        markersRef.current[marker.id] = mapMarker;
      });
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);
  
  // Listen for hover events from the listing cards
  useEffect(() => {
    const handleListingHover = (e: Event) => {
      const id = (e as CustomEvent).detail as number | null;
      setHoveredId(id);
      
      // Update marker styles based on hover state
      Object.entries(markersRef.current).forEach(([markerIdStr, marker]) => {
        const markerId = parseInt(markerIdStr);
        const element = marker.getElement();
        
        if (id === null) {
          // Reset all markers
          element.style.backgroundColor = '#1b489b';
          element.style.zIndex = '0';
          element.style.transform = 'scale(1)';
        } else if (markerId === id) {
          // Highlight the hovered marker
          element.style.backgroundColor = '#0c0f24';
          element.style.zIndex = '1';
          element.style.transform = 'scale(1.2)';
        } else {
          // Dim the non-hovered markers
          element.style.backgroundColor = '#1b489b';
          element.style.zIndex = '0';
          element.style.transform = 'scale(1)';
        }
      });
    };
    
    document.addEventListener('listingHover', handleListingHover);
    
    return () => {
      document.removeEventListener('listingHover', handleListingHover);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Mapbox container */}
      <div ref={mapContainer} className="absolute inset-0 bg-[#E8ECEF] rounded-[20px]"></div>
      
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
    </div>
  );
}
