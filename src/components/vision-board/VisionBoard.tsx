
import React, { useState, useRef } from 'react';
import { VisionBoardHeader } from './VisionBoardHeader';
import { VisionBoardSidebar } from './VisionBoardSidebar';
import { VisionBoardContent } from './VisionBoardContent';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { VisionBoardProvider } from '@/context/VisionBoardContext';

export function VisionBoard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex flex-col w-full h-screen bg-[#F7F7F8] overflow-hidden">
      <VisionBoardHeader />
      <div className="flex flex-1 gap-5 p-5 pb-5 max-md:flex-col relative overflow-hidden">
        <VisionBoardProvider>
          <div className={`transition-all duration-300 ${sidebarCollapsed ? 'w-0 overflow-hidden' : 'w-[351px] max-md:w-full'}`}>
            <VisionBoardSidebar />
          </div>
          <div className="flex-1 overflow-hidden">
            <VisionBoardContent />
          </div>
          <SidebarToggle isCollapsed={sidebarCollapsed} onClick={toggleSidebar} />
        </VisionBoardProvider>
      </div>
    </div>
  );
}

function SidebarToggle({ isCollapsed, onClick }: { isCollapsed: boolean; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center justify-center bg-white shadow-[0px_2px_10px_0px_rgba(0,0,0,0.10)] absolute w-6 h-9 px-1.5 py-3 rounded-xl top-1/2 -translate-y-1/2 z-10 left-[356px] max-md:hidden"
      style={{ left: isCollapsed ? '5px' : '356px' }}
      aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
    >
      {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
    </button>
  );
}
