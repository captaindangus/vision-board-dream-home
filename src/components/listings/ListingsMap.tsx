
import React from 'react';

export function ListingsMap() {
  return (
    <div className="relative w-full h-full bg-gray-100 rounded-[20px]">
      {/* Map background */}
      <div className="absolute inset-0 bg-[#E8ECEF] rounded-[20px]">
        {/* Simple map illustration with horizontal and vertical lines */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={`h-${i}`} 
              className="absolute left-0 right-0 h-px bg-gray-400" 
              style={{ top: `${i * 5}%` }} 
            />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={`v-${i}`} 
              className="absolute top-0 bottom-0 w-px bg-gray-400" 
              style={{ left: `${i * 5}%` }} 
            />
          ))}
        </div>
        
        {/* Property markers */}
        <div className="absolute top-[25%] left-[35%] w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">12</div>
        <div className="absolute top-[40%] left-[70%] w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">25</div>
        <div className="absolute top-[70%] left-[45%] w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">8</div>
        <div className="absolute top-[50%] left-[20%] w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">7</div>
        <div className="absolute top-[80%] left-[55%] w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">4</div>
      </div>

      {/* Search input positioned at the top */}
      <div className="absolute top-4 left-4 right-4">
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
