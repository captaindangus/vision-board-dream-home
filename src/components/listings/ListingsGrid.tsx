
import React, { useState } from 'react';
import { ListingCard } from './ListingCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMediaQuery } from '@/hooks/use-media-query';

// URLs for listings
const listingUrls = [
  "https://www.exprealty.com/new-york-ny-real-estate/154-14-avenue",
  "https://www.exprealty.com/new-york-ny-real-estate/972-bay-ridge-avenue",
  "https://www.exprealty.com/new-york-ny-real-estate/apt-12i-252-7th-ave",
  "https://www.exprealty.com/new-york-ny-real-estate/30abc-255-e-49th-st",
  "https://www.exprealty.com/new-york-ny-real-estate/tudor-city/ph2b-314-e-41st-st"
];

// Modern house images - updated with user's uploaded images
const modernHouseImages = [
  "/lovable-uploads/a4cf1096-4ae7-4027-ac2c-5de53e2df454.png", // Interior living room
  "/lovable-uploads/be882628-dbbb-4ad6-bc23-07d81132903f.png", // Traditional white house with porch
  "/lovable-uploads/805f4962-6e13-43ab-8fcd-22afd2faf7de.png", // Modern flat-roof house
  "/lovable-uploads/ec0985ba-50ac-436f-bc6a-ecc987898244.png", // Office interior
  "/lovable-uploads/274c6613-2f93-466d-8948-264e637525af.png", // Modern concrete house
  "/lovable-uploads/f7bf4fb4-9c37-4727-9e28-15798ba0fc36.png", // Traditional shingle house
  "/lovable-uploads/b29e0fe0-7b0f-47d2-91bc-32ceba52b380.png", // White house with balcony
  "/lovable-uploads/23b54c84-da98-47cf-9323-16f2cee93947.png", // Living room with couch
  "/lovable-uploads/8e5f042a-5f6b-49ad-8f3c-80eb25f0e152.png", // Modern interior living/dining
  "/lovable-uploads/6a5b7d5f-2114-44ca-867c-1dafa8b871ea.png"  // White living room
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
    imageUrl: modernHouseImages[6],
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
    imageUrl: modernHouseImages[7],
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
    imageUrl: modernHouseImages[8],
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
    imageUrl: modernHouseImages[9],
    timeAgo: "12 hrs ago",
    url: listingUrls[4]
  },
  // The remaining listings will use the same set of images (cycling back to the beginning)
  {
    id: 13,
    price: "$5,395,000",
    address: "50 Gramercy Park North PH-A, New York, NY",
    beds: 4,
    baths: 3.5,
    sqft: "2800-3000",
    imageUrl: modernHouseImages[0],
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
    imageUrl: modernHouseImages[1],
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
    imageUrl: modernHouseImages[2],
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
    imageUrl: modernHouseImages[3],
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
    imageUrl: modernHouseImages[4],
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
    imageUrl: modernHouseImages[5],
    timeAgo: "3 days ago",
    url: listingUrls[0]
  }
];

interface ListingsGridProps {
  isWideScreen?: boolean;
}

export function ListingsGrid({ isWideScreen = true }: ListingsGridProps) {
  const [hoveredListing, setHoveredListing] = useState<number | null>(null);
  const isUltraWideScreen = useMediaQuery("(min-width: 1920px)");
  
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

  // Determine number of columns based on screen width
  const getGridColumns = () => {
    if (isUltraWideScreen) return 'grid-cols-3';
    if (isWideScreen) return 'grid-cols-2';
    return 'grid-cols-1';
  };

  return (
    <ScrollArea className="h-full pr-2">
      <div className={`grid ${getGridColumns()} gap-4 pb-24`}>
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
