import React from 'react';
import { VisionBoardHeader } from './VisionBoardHeader';
import { VisionBoardSidebar } from './VisionBoardSidebar';
import { VisionBoardContent } from './VisionBoardContent';

export function VisionBoard() {
  return (
    <div className="w-full min-h-[screen] bg-[#F7F7F8]">
      <VisionBoardHeader />
      <div className="flex gap-5 p-5 max-md:flex-col">
        <VisionBoardSidebar />
        <VisionBoardContent />
      </div>
      <SidebarToggle />
    </div>
  );
}

function SidebarToggle() {
  return (
    <div className="flex items-center gap-2.5 bg-white shadow-[0px_2px_10px_0px_rgba(0,0,0,0.10)] absolute w-6 h-9 px-1.5 py-3 rounded-xl left-[360px] top-[420px] max-md:hidden">
      <div>
        <div
          dangerouslySetInnerHTML={{
            __html:
              "<svg id=\"43:948\" layer-name=\"Arrow back ios\" width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"w-[12px] h-[12px]\"> <g clip-path=\"url(#clip0_43_948)\"> <path d=\"M8.75504 1.93499L7.86504 1.04999L2.92004 5.99999L7.87004 10.95L8.75504 10.065L4.69004 5.99999L8.75504 1.93499Z\" fill=\"black\"></path> </g> <defs> <clipPath id=\"clip0_43_948\"> <rect width=\"12\" height=\"12\" fill=\"white\"></rect> </clipPath> </defs> </svg>",
          }}
        />
      </div>
    </div>
  );
}
