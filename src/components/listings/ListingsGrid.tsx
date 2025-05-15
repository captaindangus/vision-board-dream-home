
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
    id: 2,
    price: "$27,480,000",
    address: "258 83rd Avenue, New York, NY",
    beds: 3,
    baths: 1,
    sqft: "700-800",
    imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    timeAgo: "58 mins ago",
    mapCoordinates: { lat: 40.735, lng: -74.005 },
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
    id: 5,
    price: "$18,950,000",
    address: "122 West 57th St, New York, NY",
    beds: 4,
    baths: 3,
    sqft: "1200-1500",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    timeAgo: "2 hours ago",
    mapCoordinates: { lat: 40.795, lng: -73.955 },
  },
  {
    id: 6,
    price: "$12,750,000",
    address: "54 East 66th St, New York, NY",
    beds: 5,
    baths: 4,
    sqft: "2500-3000",
    imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    timeAgo: "3 hours ago",
    mapCoordinates: { lat: 40.815, lng: -73.945 },
  },
  {
    id: 7,
    price: "$8,225,000",
    address: "210 Central Park South, New York, NY",
    beds: 3,
    baths: 2,
    sqft: "1800-2000",
    imageUrl: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    timeAgo: "5 hours ago",
    mapCoordinates: { lat: 40.835, lng: -73.935 },
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
  {
    id: 9,
    price: "$5,875,000",
    address: "340 East 72nd St, New York, NY",
    beds: 3,
    baths: 3,
    sqft: "1650-1800",
    imageUrl: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    timeAgo: "8 hours ago",
    mapCoordinates: { lat: 40.875, lng: -73.915 },
  },
  {
    id: 10,
    price: "$4,750,000",
    address: "189 Madison Avenue, New York, NY",
    beds: 2,
    baths: 2,
    sqft: "1200-1350",
    imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    timeAgo: "12 hours ago",
    mapCoordinates: { lat: 40.895, lng: -73.905 },
  },
  {
    id: 11,
    price: "$3,950,000",
    address: "425 West End Avenue, New York, NY",
    beds: 2,
    baths: 1,
    sqft: "1000-1200",
    imageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    timeAgo: "1 day ago",
    mapCoordinates: { lat: 40.915, lng: -73.895 },
  },
  {
    id: 12,
    price: "$2,850,000",
    address: "240 East 10th St, New York, NY",
    beds: 1,
    baths: 1,
    sqft: "800-900",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    timeAgo: "2 days ago",
    mapCoordinates: { lat: 40.935, lng: -73.885 },
  }
];

export function ListingsGrid() {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
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
