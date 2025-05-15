
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
  url?: string;
}

interface ListingCardProps {
  listing: Listing;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isHighlighted?: boolean;
  url?: string;
}

export function ListingCard({ listing, onMouseEnter, onMouseLeave, isHighlighted = false, url }: ListingCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleCardClick = () => {
    if (listing.url) {
      window.open(listing.url, '_blank');
    }
  };
  
  return (
    <div 
      className={`relative flex flex-col bg-white rounded-xl overflow-hidden border border-[#e7e7e9] transition-all shadow-sm cursor-pointer`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={handleCardClick}
      style={{
        // Apply inset shadow when highlighted instead of border
        boxShadow: isHighlighted ? 'inset 0 0 0 2px #0c0f24' : ''
      }}
    >
      <div className="relative">
        <img 
          src={listing.imageUrl} 
          alt={listing.address} 
          className="w-full h-[220px] object-cover"
        />
        <button 
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click when clicking the heart
            setIsFavorite(!isFavorite);
          }}
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
