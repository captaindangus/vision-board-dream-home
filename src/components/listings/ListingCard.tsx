
import React, { useState } from 'react';
import { Heart } from 'lucide-react';

interface Listing {
  id: number;
  price: string;
  address: string;
  beds: number;
  baths: number;
  sqft: string;
  imageUrl: string;
  timeAgo: string;
  mapCoordinates?: { lat: number; lng: number };
}

interface ListingCardProps {
  listing: Listing;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isHighlighted?: boolean;
}

export function ListingCard({ listing, onMouseEnter, onMouseLeave, isHighlighted = false }: ListingCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div 
      className={`flex flex-col bg-white rounded-xl overflow-hidden border border-[#e7e7e9] transition-all ${
        isHighlighted ? 'shadow-[inset_0_0_0_2px_#0c0f24]' : 'shadow-sm'
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative">
        <img 
          src={listing.imageUrl} 
          alt={listing.address} 
          className="w-full h-[220px] object-cover"
        />
        <button 
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
          onClick={() => setIsFavorite(!isFavorite)}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart 
            size={20} 
            className={isFavorite ? "fill-black text-black" : "text-black"} 
          />
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="text-2xl font-bold">{listing.price}</div>
          <div className="text-sm text-gray-500">{listing.timeAgo}</div>
        </div>
        <div className="text-gray-700 mb-3">{listing.address}</div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <span className="font-medium">{listing.beds}</span> Bd
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">{listing.baths}</span> Ba
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">{listing.sqft}</span> sqft
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-500">MLS® C8463776 · Homelife New World</div>
      </div>
    </div>
  );
}
