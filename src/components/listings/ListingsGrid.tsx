
import React, { useState } from 'react';
import { ListingCard } from './ListingCard';
import { ScrollArea } from '@/components/ui/scroll-area';

// URLs for listings
const listingUrls = [
  "https://www.exprealty.com/new-york-ny-real-estate/154-14-avenue",
  "https://www.exprealty.com/new-york-ny-real-estate/972-bay-ridge-avenue",
  "https://www.exprealty.com/new-york-ny-real-estate/apt-12i-252-7th-ave",
  "https://www.exprealty.com/new-york-ny-real-estate/30abc-255-e-49th-st",
  "https://www.exprealty.com/new-york-ny-real-estate/tudor-city/ph2b-314-e-41st-st"
];

// Modern house images
const modernHouseImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80",
  "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2025&q=80",
  "https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1592595896551-12b371d546d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
];

// Function to get URL and image for listings
const getUrlAndImage = (index: number) => {
  // URL selection - wrap around to reuse URLs
  const url = listingUrls[index % listingUrls.length];
  
  // Image selection - wrap around to reuse images
  const imageUrl = modernHouseImages[index % modernHouseImages.length];
  
  return { url, imageUrl };
};

// Extended listings data with more properties
const listingsData = [
  {
    id: 1,
    price: "$27,480,000",
    address: "154 14th Avenue, New York, NY",
    beds: 3,
    baths: 1,
    sqft: "700-800",
    imageUrl: modernHouseImages[0],
    timeAgo: "58 mins ago",
    mapCoordinates: { lat: 40.715, lng: -73.985 },
    url: listingUrls[0]
  },
  {
    id: 3,
    price: "$5,675,000",
    address: "972 Bay Ridge Avenue, New York, NY",
    beds: 3,
    baths: 1,
    sqft: "700-800",
    imageUrl: modernHouseImages[1],
    timeAgo: "1 hr ago",
    mapCoordinates: { lat: 40.755, lng: -73.975 },
    url: listingUrls[1]
  },
  {
    id: 4,
    price: "$4,750,000",
    address: "Apt 12i, 252 7th Ave, New York, NY",
    beds: 3,
    baths: 1,
    sqft: "700-800",
    imageUrl: modernHouseImages[2],
    timeAgo: "58 mins ago",
    mapCoordinates: { lat: 40.775, lng: -73.965 },
    url: listingUrls[2]
  },
  {
    id: 8,
    price: "$6,995,000",
    address: "30ABC 255 E 49th St, New York, NY",
    beds: 2,
    baths: 2,
    sqft: "1500-1650",
    imageUrl: modernHouseImages[3],
    timeAgo: "6 hours ago",
    mapCoordinates: { lat: 40.855, lng: -73.925 },
    url: listingUrls[3]
  },
  {
    id: 5,
    price: "$3,495,000",
    address: "PH2B 314 E 41st St, Tudor City, NY",
    beds: 4,
    baths: 3,
    sqft: "2100-2300",
    imageUrl: modernHouseImages[4],
    timeAgo: "2 hrs ago",
    url: listingUrls[4]
  },
  {
    id: 6,
    price: "$4,250,000",
    address: "75 Wall St APT 27G, New York, NY",
    beds: 3,
    baths: 2.5,
    sqft: "1800-1950",
    imageUrl: modernHouseImages[5],
    timeAgo: "3 hrs ago",
    url: listingUrls[0]
  },
  {
    id: 7,
    price: "$2,875,000",
    address: "160 E 22nd St #14C, New York, NY",
    beds: 2,
    baths: 2,
    sqft: "1250-1300",
    imageUrl: modernHouseImages[0],
    timeAgo: "4 hrs ago",
    url: listingUrls[1]
  },
  {
    id: 10,
    price: "$3,199,000",
    address: "101 Warren St APT 2210, New York, NY",
    beds: 2,
    baths: 2,
    sqft: "1300-1450",
    imageUrl: modernHouseImages[1],
    timeAgo: "8 hrs ago",
    url: listingUrls[2]
  },
  {
    id: 11,
    price: "$4,675,000",
    address: "255 E Houston St PHB, New York, NY",
    beds: 3,
    baths: 3.5,
    sqft: "2500-2700",
    imageUrl: modernHouseImages[2],
    timeAgo: "10 hrs ago",
    url: listingUrls[3]
  },
  {
    id: 12,
    price: "$2,950,000",
    address: "21 Astor Pl APT 11A, New York, NY",
    beds: 2,
    baths: 2,
    sqft: "1500-1600",
    imageUrl: modernHouseImages[3],
    timeAgo: "12 hrs ago",
    url: listingUrls[4]
  },
  {
    id: 13,
    price: "$5,395,000",
    address: "50 Gramercy Park North PH-A, New York, NY",
    beds: 4,
    baths: 3.5,
    sqft: "2800-3000",
    imageUrl: modernHouseImages[4],
    timeAgo: "1 day ago",
    url: listingUrls[0]
  },
  {
    id: 14,
    price: "$3,875,000",
    address: "15 William St APT 26A, New York, NY",
    beds: 3,
    baths: 3,
    sqft: "1900-2050",
    imageUrl: modernHouseImages[5],
    timeAgo: "1 day ago",
    url: listingUrls[1]
  },
  {
    id: 15,
    price: "$6,250,000",
    address: "400 Park Avenue South #37A, New York, NY",
    beds: 4,
    baths: 4,
    sqft: "3100-3300",
    imageUrl: modernHouseImages[0],
    timeAgo: "2 days ago",
    url: listingUrls[2]
  },
  {
    id: 16,
    price: "$4,995,000",
    address: "56 Leonard St #26A West, New York, NY",
    beds: 3,
    baths: 3.5,
    sqft: "2400-2600",
    imageUrl: modernHouseImages[1],
    timeAgo: "2 days ago",
    url: listingUrls[3]
  },
  {
    id: 17,
    price: "$3,750,000",
    address: "60 E 8th St PH-D, New York, NY",
    beds: 3,
    baths: 2.5,
    sqft: "1850-2000",
    imageUrl: modernHouseImages[2],
    timeAgo: "3 days ago",
    url: listingUrls[4]
  },
  {
    id: 18,
    price: "$7,200,000",
    address: "157 W 57th St #45B, New York, NY",
    beds: 4,
    baths: 4.5,
    sqft: "3400-3600",
    imageUrl: modernHouseImages[3],
    timeAgo: "3 days ago",
    url: listingUrls[0]
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

  // Listen for map marker hover events
  React.useEffect(() => {
    const handleMarkerHover = (e: Event) => {
      const id = (e as CustomEvent).detail as number | null;
      setHoveredListing(id);
    };
    
    document.addEventListener('markerHover', handleMarkerHover);
    
    return () => {
      document.removeEventListener('markerHover', handleMarkerHover);
    };
  }, []);

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
