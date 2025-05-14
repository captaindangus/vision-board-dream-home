import React from 'react';

export function HomeFeatures() {
  // In a real application, these would come from an API or state
  const features = [
    { id: 1, imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/06f272f34f120353f084c45338160d8492ca0587" },
    { id: 2, imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/14d7490fc560ed37c301915ed96d9708f0dab982" },
    { id: 3, imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/4f4b1c4187d6d801b614aad47e18e1ffd2f7a769" }
  ];

  return (
    <div className="flex items-center gap-2 w-full overflow-x-auto">
      {features.map((feature) => (
        <img
          key={feature.id}
          src={feature.imageUrl}
          alt=""
          className="w-[144px] h-[109px] rounded-[8px]"
        />
      ))}
    </div>
  );
}
