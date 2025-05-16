
import React, { useState } from 'react';
import { TabsNavigation } from './TabsNavigation';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import { SaveBoardDialog } from './SaveBoardDialog';
import { useNavigate, useLocation } from 'react-router-dom';

export function VisionBoardHeader() {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSave = () => {
    setSaveDialogOpen(true);
  };

  const handleBackToHome = () => {
    // Before navigating away, ensure the last tab is saved
    const currentPath = location.pathname;
    if (currentPath === '/board' || currentPath === '/listings') {
      localStorage.setItem('lastActiveTab', currentPath);
    }
    navigate('/');
  };

  return (
    <header className="flex w-full justify-between items-center bg-[#F7F7F8] h-[90px] px-5 py-4">
      <div className="flex items-center gap-8">
        <BackButton onClick={handleBackToHome} />
        {/* Auto-save indicator removed */}
      </div>
      <div className="flex-1 flex justify-center">
        <TabsNavigation />
      </div>
      <div className="flex justify-end items-center">
        <button 
          onClick={handleSave}
          className="flex items-center text-[rgba(12,15,36,1)] text-base font-medium gap-2.5 px-6 py-2.5 rounded-[100px] border-[1px] border-solid border-[#0C0F24]"
          style={{
            display: "flex",
            padding: "10px 24px",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            borderRadius: "100px"
          }}
        >
          <Save size={18} />
          Save Board
        </button>
      </div>

      <SaveBoardDialog 
        open={saveDialogOpen}
        onOpenChange={setSaveDialogOpen}
      />
    </header>
  );
}

interface BackButtonProps {
  onClick: () => void;
}

function BackButton({ onClick }: BackButtonProps) {
  return (
    <button 
      className="flex w-10 h-10 justify-center items-center bg-white shadow-[0px_2px_10px_0px_rgba(0,0,0,0.10)] p-2.5 rounded-[100px]"
      onClick={onClick}
    >
      <div
        dangerouslySetInnerHTML={{
          __html:
            "<svg id=\"I52:194;50:152\" layer-name=\"Arrow back ios\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"w-[20px] h-[20px]\"> <g clip-path=\"url(#clip0_63_232)\"> <path d=\"M14.5917 3.225L13.1084 1.75L4.8667 10L13.1167 18.25L14.5917 16.775L7.8167 10L14.5917 3.225Z\" fill=\"black\"></path> </g> <defs> <clipPath id=\"clip0_63_232\"> <rect width=\"20\" height=\"20\" fill=\"white\"></rect> </clipPath> </defs> </svg>",
        }}
      />
    </button>
  );
}
