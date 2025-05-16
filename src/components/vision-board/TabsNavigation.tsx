
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function TabsNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>(location.pathname);
  
  // On initial mount, check localStorage for the last active tab
  useEffect(() => {
    const lastTab = localStorage.getItem('lastActiveTab');
    // Only navigate if we're on a different path than the stored one
    if (lastTab && lastTab !== location.pathname) {
      navigate(lastTab);
    } else {
      setActiveTab(location.pathname);
    }
  }, []);
  
  // Update localStorage and state when the path changes
  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === '/board' || currentPath === '/listings') {
      localStorage.setItem('lastActiveTab', currentPath);
      setActiveTab(currentPath);
    }
  }, [location.pathname]);

  const isListingsPage = activeTab === '/listings';

  return (
    <div className="flex items-center bg-[#F0F0F0] p-2 rounded-2xl">
      <button 
        className={`text-[rgba(12,15,36,1)] text-base font-${isListingsPage ? 'medium' : 'bold'} gap-2.5 ${!isListingsPage ? 'bg-white shadow-[0px_2px_10px_0px_rgba(0,0,0,0.08)]' : ''} px-6 py-2.5 rounded-xl`}
        onClick={() => navigate('/board')}
      >
        Vision Board
      </button>
      <button 
        className={`text-[rgba(12,15,36,1)] text-base font-${isListingsPage ? 'bold' : 'medium'} gap-2.5 ${isListingsPage ? 'bg-white shadow-[0px_2px_10px_0px_rgba(0,0,0,0.08)]' : ''} px-6 py-2.5 rounded-xl`}
        onClick={() => navigate('/listings')}
      >
        Listings
      </button>
    </div>
  );
}
