
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function TabsNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const isListingsPage = location.pathname === '/listings';
  
  // Handle tab navigation with state preservation
  const handleTabChange = (path: string) => {
    // Get current board ID to save tab preference per board
    const currentBoardId = localStorage.getItem('currentBoardId');
    
    if (currentBoardId) {
      // Save tab preference for this specific board
      localStorage.setItem(`lastActiveTab_${currentBoardId}`, path);
    } else {
      // Fallback if no board ID is available
      localStorage.setItem('lastActiveTab', path);
    }
    
    // Navigate to the selected tab
    navigate(path);
  };

  return (
    <div className="flex items-center bg-[#F0F0F0] p-2 rounded-2xl">
      <button 
        className={`text-[rgba(12,15,36,1)] text-base font-${isListingsPage ? 'medium' : 'bold'} gap-2.5 ${!isListingsPage ? 'bg-white shadow-[0px_2px_10px_0px_rgba(0,0,0,0.08)]' : ''} px-6 py-2.5 rounded-xl`}
        onClick={() => handleTabChange('/board')}
      >
        Vision Board
      </button>
      <button 
        className={`text-[rgba(12,15,36,1)] text-base font-${isListingsPage ? 'bold' : 'medium'} gap-2.5 ${isListingsPage ? 'bg-white shadow-[0px_2px_10px_0px_rgba(0,0,0,0.08)]' : ''} px-6 py-2.5 rounded-xl`}
        onClick={() => handleTabChange('/listings')}
      >
        Listings
      </button>
    </div>
  );
}
