
import React, { useState, useRef } from 'react';
import { VisionBoardHeader } from './VisionBoardHeader';
import { VisionBoardSidebar } from './VisionBoardSidebar';
import { VisionBoardContent } from './VisionBoardContent';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { VisionBoardProvider, useVisionBoard } from '@/context/VisionBoardContext';

export function VisionBoard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    const data = e.dataTransfer.getData('application/json');
    if (!data) return;
    
    try {
      const parsedData = JSON.parse(data);
      
      if (contentRef.current) {
        // We're forwarding this drop event to VisionBoardContent
        const customEvent = new CustomEvent('visionboard:drop', {
          detail: {
            data: parsedData,
            position: { 
              x: e.clientX - contentRef.current.getBoundingClientRect().left, 
              y: e.clientY - contentRef.current.getBoundingClientRect().top + contentRef.current.scrollTop
            }
          }
        });
        contentRef.current.dispatchEvent(customEvent);
      }
    } catch (err) {
      console.error('Error parsing dragged data:', err);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  return (
    <VisionBoardProvider>
      <div className="flex flex-col w-full h-screen bg-[#F7F7F8]">
        <VisionBoardHeader />
        <div className="flex flex-1 gap-5 p-5 pb-5 max-md:flex-col relative overflow-hidden">
          <div className={`transition-all duration-300 ${sidebarCollapsed ? 'w-0 overflow-hidden' : 'w-[351px] max-md:w-full'}`}>
            <VisionBoardSidebar />
          </div>
          <div 
            className="flex-1 overflow-auto" 
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            ref={contentRef}
          >
            <VisionBoardDropZone />
          </div>
          <SidebarToggle isCollapsed={sidebarCollapsed} onClick={toggleSidebar} />
        </div>
      </div>
    </VisionBoardProvider>
  );
}

function VisionBoardDropZone() {
  const { addItem } = useVisionBoard();
  const contentRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleCustomDrop = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { data, position } = customEvent.detail;
      
      addItem({
        ...data,
        position
      });
    };

    const element = contentRef.current;
    if (element) {
      element.addEventListener('visionboard:drop', handleCustomDrop);
      
      return () => {
        element.removeEventListener('visionboard:drop', handleCustomDrop);
      };
    }
  }, [addItem]);

  return (
    <div ref={contentRef} className="h-full">
      <VisionBoardContent />
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
