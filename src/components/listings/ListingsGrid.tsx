
import React, { useState } from 'react';
import { ListingCard } from './ListingCard';
import { ScrollArea } from '@/components/ui/scroll-area';

// Extended listings data with more properties
const listingsData = [
  {
    id: 1,
    price: "$27,480,000",
    address: "258 83rd Avenue, New York, NY",
    beds: 3,
    baths: 1,
    sqft: "700-800",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    timeAgo: "58 mins ago",
    mapCoordinates: { lat: 40.715, lng: -73.985 },
  },
  {
    id: 3,
    price: "$27,480,000",
    address: "258 83rd Avenue, New York, NY",
    beds: 3,
    baths: 1,
    sqft: "700-800",
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80",
    timeAgo: "58 mins ago",
    mapCoordinates: { lat: 40.755, lng: -73.975 },
  },
  {
    id: 4,
    price: "$27,480,000",
    address: "258 83rd Avenue, New York, NY",
    beds: 3,
    baths: 1,
    sqft: "700-800",
    imageUrl: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2025&q=80",
    timeAgo: "58 mins ago",
    mapCoordinates: { lat: 40.775, lng: -73.965 },
  },
  {
    id: 8,
    price: "$6,995,000",
    address: "77 Park Avenue, New York, NY",
    beds: 2,
    baths: 2,
    sqft: "1500-1650",
    imageUrl: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    timeAgo: "6 hours ago",
    mapCoordinates: { lat: 40.855, lng: -73.925 },
  },
  // Only showing 4 listings to match markers
];

interface ListingsGridProps {
  isWideScreen?: boolean;
}

export function ListingsGrid({ isWideScreen = true }: ListingsGridProps) {
  const [hoveredListing, setHoveredListing] = useState<number | null>(null);
  
  // Pass the hovered listing ID to the parent for map interaction
  const handleListingHover = (id: number | null) => {
    setHoveredListing(id);
    // Use a custom event to communicate with the map
    document.dispatchEvent(
      new CustomEvent("listingHover", { detail: id })
    );
  };

  return (
    <ScrollArea className="h-full pr-2">
      <div className={`grid ${isWideScreen ? 'grid-cols-2' : 'grid-cols-1'} gap-4 pb-24`}>
        {listingsData.map((listing) => (
          <ListingCard 
            key={listing.id} 
            listing={listing} 
            onMouseEnter={() => handleListingHover(listing.id)}
            onMouseLeave={() => handleListingHover(null)}
            isHighlighted={hoveredListing === listing.id}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
