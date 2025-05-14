import React, { ReactNode } from 'react';

interface FeatureSectionProps {
  title: string;
  children: ReactNode;
}

export function FeatureSection({ title, children }: FeatureSectionProps) {
  return (
    <section className="flex flex-col items-start gap-3 w-full">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-[rgba(12,15,36,1)] text-base font-medium">
          {title}
        </h2>
        <div className="flex items-center gap-0.5">
          <button className="text-[rgba(12,15,36,1)] text-xs font-bold">
            All
          </button>
          <div>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  "<svg id=\"43:889\" layer-name=\"Arrow back ios\" width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"w-[12px] h-[12px]\"> <g clip-path=\"url(#clip0_43_889)\"> <path d=\"M3.24496 10.065L4.13496 10.95L9.07996 6L4.12996 1.05L3.24496 1.935L7.30996 6L3.24496 10.065Z\" fill=\"black\"></path> </g> <defs> <clipPath id=\"clip0_43_889\"> <rect width=\"12\" height=\"12\" fill=\"white\" transform=\"matrix(-1 0 0 -1 12 12)\"></rect> </clipPath> </defs> </svg>",
              }}
            />
          </div>
        </div>
      </div>
      {children}
    </section>
  );
}
