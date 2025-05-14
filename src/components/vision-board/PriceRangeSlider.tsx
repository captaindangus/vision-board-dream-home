import React, { useState } from 'react';

export function PriceRangeSlider() {
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("1.1M");

  return (
    <div className="flex w-[234px] flex-col items-start gap-3 bg-[#F3F3F4] px-3.5 py-[18px] rounded-xl">
      <div className="w-full text-black text-sm font-bold">
        💰Price
      </div>
      <div>
        <div
          dangerouslySetInnerHTML={{
            __html:
              "<svg id=\"43:926\" layer-name=\"slider\" width=\"208\" height=\"24\" viewBox=\"0 0 208 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"w-[204px] h-[16px]\"> <line x1=\"5\" y1=\"11\" x2=\"208\" y2=\"11\" stroke=\"#E7E7E9\" stroke-width=\"2\"></line> <line x1=\"5\" y1=\"11\" x2=\"109\" y2=\"11\" stroke=\"#3D3F50\" stroke-width=\"2\"></line> <g filter=\"url(#filter0_d_43_926)\"> <circle cx=\"12\" cy=\"11\" r=\"8\" fill=\"white\"></circle> <circle cx=\"12\" cy=\"11\" r=\"7.5\" stroke=\"#3D3F50\"></circle> </g> <g filter=\"url(#filter1_d_43_926)\"> <circle cx=\"107\" cy=\"11\" r=\"8\" fill=\"white\"></circle> <circle cx=\"107\" cy=\"11\" r=\"7.5\" stroke=\"#3D3F50\"></circle> </g> <defs> <filter id=\"filter0_d_43_926\" x=\"0\" y=\"0\" width=\"24\" height=\"24\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\"> <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"></feFlood> <feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\"></feColorMatrix> <feOffset dy=\"1\"></feOffset> <feGaussianBlur stdDeviation=\"2\"></feGaussianBlur> <feComposite in2=\"hardAlpha\" operator=\"out\"></feComposite> <feColorMatrix type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0\"></feColorMatrix> <feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_43_926\"></feBlend> <feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow_43_926\" result=\"shape\"></feBlend> </filter> <filter id=\"filter1_d_43_926\" x=\"95\" y=\"0\" width=\"24\" height=\"24\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\"> <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"></feFlood> <feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\"></feColorMatrix> <feOffset dy=\"1\"></feOffset> <feGaussianBlur stdDeviation=\"2\"></feGaussianBlur> <feComposite in2=\"hardAlpha\" operator=\"out\"></feComposite> <feColorMatrix type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0\"></feColorMatrix> <feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_43_926\"></feBlend> <feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow_43_926\" result=\"shape\"></feBlend> </filter> </defs> </svg>",
          }}
        />
      </div>
      <div className="flex items-center gap-1 w-full">
        <div className="flex items-center gap-1 flex-1 bg-white px-2 py-[9px] rounded-lg border-[1px_solid_#D1D1D2]">
          <div className="text-[rgba(12,15,36,1)] text-xs">$</div>
          <input
            type="text"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="No Min"
            className="text-[rgba(133,135,145,1)] text-xs bg-transparent border-none outline-none w-full"
          />
        </div>
        <div className="text-[rgba(12,15,36,1)] text-xs">-</div>
        <div className="flex items-center gap-1 flex-1 bg-white px-2 py-[9px] rounded-lg border-[1px_solid_#D1D1D2]">
          <div className="text-[rgba(12,15,36,1)] text-xs">$</div>
          <input
            type="text"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="text-[rgba(12,15,36,1)] text-xs bg-transparent border-none outline-none w-full"
          />
        </div>
      </div>
    </div>
  );
}
