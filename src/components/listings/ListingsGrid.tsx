
import React from 'react';
import { ListingCard } from './ListingCard';
import { ScrollArea } from '@/components/ui/scroll-area';

// Sample listing data based on the image
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
  },
];

interface ListingsGridProps {
  viewMode: 'grid' | 'swipe';
}

export function ListingsGrid({ viewMode }: ListingsGridProps) {
  return (
    <ScrollArea className="h-full pr-2">
      <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 gap-4' : 'grid-cols-1'} pb-4`}>
        {listingsData.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </ScrollArea>
  );
}
