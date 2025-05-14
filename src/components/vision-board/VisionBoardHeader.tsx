import React from 'react';
import { TabsNavigation } from './TabsNavigation';

export function VisionBoardHeader() {
  return (
    <header className="flex w-full justify-between items-center bg-[#F7F7F8] h-[90px] px-5 py-4">
      <div className="flex items-center gap-8">
        <BackButton />
        <AutoSaveIndicator />
      </div>
      <TabsNavigation />
      <div className="flex w-[193px] justify-end items-center gap-2.5">
        <button className="text-[rgba(12,15,36,1)] text-base font-medium gap-2.5 px-6 py-2.5 rounded-[100px] border-[1px_solid_rgba(12,15,36,1)]">
          Share
        </button>
      </div>
    </header>
  );
}

function BackButton() {
  return (
    <button className="flex w-10 h-10 justify-center items-center bg-white shadow-[0px_2px_10px_0px_rgba(0,0,0,0.10)] p-2.5 rounded-[100px]">
      <div
        dangerouslySetInnerHTML={{
          __html:
            "<svg id=\"I52:194;50:152\" layer-name=\"Arrow back ios\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"w-[20px] h-[20px]\"> <g clip-path=\"url(#clip0_63_232)\"> <path d=\"M14.5917 3.225L13.1084 1.75L4.8667 10L13.1167 18.25L14.5917 16.775L7.8167 10L14.5917 3.225Z\" fill=\"black\"></path> </g> <defs> <clipPath id=\"clip0_63_232\"> <rect width=\"20\" height=\"20\" fill=\"white\"></rect> </clipPath> </defs> </svg>",
        }}
      />
    </button>
  );
}

function AutoSaveIndicator() {
  return (
    <div className="flex items-center gap-2">
      <div>
        <div
          dangerouslySetInnerHTML={{
            __html:
              "<svg id=\"I52:194;50:168\" layer-name=\"Check circle outline\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"w-[16px] h-[16px]\"> <g clip-path=\"url(#clip0_63_236)\"> <path d=\"M8.00004 1.33334C4.32004 1.33334 1.33337 4.32 1.33337 8C1.33337 11.68 4.32004 14.6667 8.00004 14.6667C11.68 14.6667 14.6667 11.68 14.6667 8C14.6667 4.32 11.68 1.33334 8.00004 1.33334ZM8.00004 13.3333C5.06004 13.3333 2.66671 10.94 2.66671 8C2.66671 5.06 5.06004 2.66667 8.00004 2.66667C10.94 2.66667 13.3334 5.06 13.3334 8C13.3334 10.94 10.94 13.3333 8.00004 13.3333ZM11.06 5.05334L6.66671 9.44667L4.94004 7.72667L4.00004 8.66667L6.66671 11.3333L12 6L11.06 5.05334Z\" fill=\"#6D6F7C\"></path> </g> <defs> <clipPath id=\"clip0_63_236\"> <rect width=\"16\" height=\"16\" fill=\"white\"></rect> </clipPath> </defs> </svg>",
          }}
        />
      </div>
      <div className="text-[rgba(61,63,80,1)] text-base font-medium">
        Auto-Saved
      </div>
    </div>
  );
}
