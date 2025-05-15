
import React, { useState } from 'react';
import { ListingCard } from './ListingCard';
import { ScrollArea } from '@/components/ui/scroll-area';

// Extended listings data with more properties and URLs
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
    url: "https://www.exprealty.com/new-york-ny-real-estate/154-14-avenue"
  },
  {
    id: 2,
    price: "$3,495,000",
    address: "972 Bay Ridge Avenue, New York, NY",
    beds: 4,
    baths: 3,
    sqft: "2200-2400",
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80",
    timeAgo: "2 hours ago",
    mapCoordinates: { lat: 40.725, lng: -73.965 },
    url: "https://www.exprealty.com/new-york-ny-real-estate/972-bay-ridge-avenue"
  },
  {
    id: 3,
    price: "$4,280,000",
    address: "Apt 12i, 252 7th Ave, New York, NY",
    beds: 3,
    baths: 2,
    sqft: "1800-2000",
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80",
    timeAgo: "1 day ago",
    mapCoordinates: { lat: 40.755, lng: -73.975 },
    url: "https://www.exprealty.com/new-york-ny-real-estate/apt-12i-252-7th-ave"
  },
  {
    id: 4,
    price: "$5,780,000",
    address: "258 83rd Avenue, New York, NY",
    beds: 3,
    baths: 1,
    sqft: "2100-2300",
    imageUrl: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2025&q=80",
    timeAgo: "3 days ago",
    mapCoordinates: { lat: 40.775, lng: -73.965 },
    url: "https://www.exprealty.com/new-york-ny-real-estate/30abc-255-e-49th-st"
  },
  {
    id: 5,
    price: "$6,995,000",
    address: "pH2b 314 E 41st St, New York, NY",
    beds: 2,
    baths: 2,
    sqft: "1500-1650",
    imageUrl: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    timeAgo: "6 hours ago",
    mapCoordinates: { lat: 40.855, lng: -73.925 },
    url: "https://www.exprealty.com/new-york-ny-real-estate/tudor-city/ph2b-314-e-41st-st"
  },
  {
    id: 6,
    price: "$1,995,000",
    address: "123 West End Avenue, New York, NY",
    beds: 3,
    baths: 2,
    sqft: "1500-1650",
    imageUrl: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    timeAgo: "1 day ago",
    mapCoordinates: { lat: 40.835, lng: -73.945 },
    url: "https://www.exprealty.com/new-york-ny-real-estate/154-14-avenue"
  },
  {
    id: 7,
    price: "$2,750,000",
    address: "456 Park Avenue, New York, NY",
    beds: 2,
    baths: 1,
    sqft: "1200-1350",
    imageUrl: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    timeAgo: "2 days ago",
    mapCoordinates: { lat: 40.815, lng: -73.985 },
    url: "https://www.exprealty.com/new-york-ny-real-estate/972-bay-ridge-avenue"
  },
  {
    id: 8,
    price: "$3,250,000",
    address: "789 Broadway, New York, NY",
    beds: 4,
    baths: 3,
    sqft: "2000-2200",
    imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    timeAgo: "5 days ago",
    mapCoordinates: { lat: 40.795, lng: -73.975 },
    url: "https://www.exprealty.com/new-york-ny-real-estate/apt-12i-252-7th-ave"
  },
  {
    id: 9,
    price: "$1,850,000",
    address: "321 Wall Street, New York, NY",
    beds: 1,
    baths: 1,
    sqft: "800-950",
    imageUrl: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    timeAgo: "2 hours ago",
    mapCoordinates: { lat: 40.775, lng: -73.945 },
    url: "https://www.exprealty.com/new-york-ny-real-estate/30abc-255-e-49th-st"
  },
  {
    id: 10,
    price: "$5,150,000",
    address: "654 Madison Avenue, New York, NY",
    beds: 3,
    baths: 2.5,
    sqft: "2200-2400",
    imageUrl: "https://images.unsplash.com/photo-1628744448923-a18f9d9a799b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    timeAgo: "Just listed",
    mapCoordinates: { lat: 40.755, lng: -73.965 },
    url: "https://www.exprealty.com/new-york-ny-real-estate/tudor-city/ph2b-314-e-41st-st"
  },
  {
    id: 11,
    price: "$1,950,000",
    address: "987 Columbus Avenue, New York, NY",
    beds: 2,
    baths: 1,
    sqft: "950-1100",
    imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    timeAgo: "3 days ago",
    mapCoordinates: { lat: 40.825, lng: -73.965 },
    url: "https://www.exprealty.com/new-york-ny-real-estate/154-14-avenue"
  },
  {
    id: 12,
    price: "$4,850,000",
    address: "159 Lexington Avenue, New York, NY",
    beds: 5,
    baths: 4,
    sqft: "3200-3500",
    imageUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    timeAgo: "1 week ago",
    mapCoordinates: { lat: 40.785, lng: -73.985 },
    url: "https://www.exprealty.com/new-york-ny-real-estate/972-bay-ridge-avenue"
  },
  {
    id: 13,
    price: "$2,450,000",
    address: "753 5th Avenue, New York, NY",
    beds: 3,
    baths: 2,
    sqft: "1800-1950",
    imageUrl: "https://images.unsplash.com/photo-1604014238170-4def1e4e6fcf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    timeAgo: "4 days ago",
    mapCoordinates: { lat: 40.765, lng: -73.975 },
    url: "https://www.exprealty.com/new-york-ny-real-estate/apt-12i-252-7th-ave"
  },
  {
    id: 14,
    price: "$3,650,000",
    address: "429 Central Park West, New York, NY",
    beds: 3,
    baths: 3,
    sqft: "2100-2300",
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    timeAgo: "2 days ago",
    mapCoordinates: { lat: 40.745, lng: -73.985 },
    url: "https://www.exprealty.com/new-york-ny-real-estate/30abc-255-e-49th-st"
  },
  {
    id: 15,
    price: "$7,950,000",
    address: "852 Park Avenue, New York, NY",
    beds: 4,
    baths: 3.5,
    sqft: "3100-3400",
    imageUrl: "https://images.unsplash.com/photo-1605146768851-eda79da39897?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    timeAgo: "5 days ago",
    mapCoordinates: { lat: 40.725, lng: -73.995 },
    url: "https://www.exprealty.com/new-york-ny-real-estate/tudor-city/ph2b-314-e-41st-st"
  },
  {
    id: 16,
    price: "$1,990,000",
    address: "136 East 55th Street, New York, NY",
    beds: 2,
    baths: 1,
    sqft: "1000-1200",
    imageUrl: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    timeAgo: "3 days ago",
    mapCoordinates: { lat: 40.705, lng: -73.985 },
    url: "https://www.exprealty.com/new-york-ny-real-estate/154-14-avenue"
  }
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
            url={listing.url}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
