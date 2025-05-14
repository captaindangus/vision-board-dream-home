import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Check, Pencil } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export function VisionBoardContent() {
  const [title, setTitle] = useState("MyVisionBoard 1 🌟");
  const [isEditing, setIsEditing] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    }
  };

  return (
    <main className="flex flex-col w-full h-full bg-white px-6 py-8 rounded-[20px]">
      <div className="flex justify-between items-center w-full mb-4">
        <div className="flex items-center gap-2">
          {isEditing ? (
            <Input
              type="text"
              value={title}
              onChange={handleTitleChange}
              onKeyDown={handleKeyDown}
              onBlur={toggleEditing}
              autoFocus
              className="text-[rgba(12,15,36,1)] text-2xl font-bold h-auto py-1"
            />
          ) : (
            <h1 className="text-[rgba(12,15,36,1)] text-2xl font-bold">
              {title}
            </h1>
          )}
          <button 
            onClick={toggleEditing}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label={isEditing ? "Save title" : "Edit title"}
          >
            {isEditing ? (
              <Check className="w-5 h-5 text-[rgba(12,15,36,1)]" />
            ) : (
              <Pencil className="w-5 h-5 text-[rgba(12,15,36,1)]" />
            )}
          </button>
        </div>
        <button className="text-white text-base font-medium gap-2.5 bg-[#0C0F24] px-6 py-2.5 rounded-[100px]">
          Upload
        </button>
      </div>
      <p className="text-center text-[#0C0F24] text-base mb-4">
        Upload or paste an image, or drag one in from the gallery to get started!
      </p>
      <ScrollArea className="flex-1">
        <EmptyState />
      </ScrollArea>
    </main>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col justify-center items-center gap-9 w-full h-full py-10">
      <div className="max-w-full">
        <div
          dangerouslySetInnerHTML={{
            __html:
              "<svg id=\"43:1285\" layer-name=\"image\" width=\"980\" height=\"482\" viewBox=\"0 0 980 482\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"w-full h-auto max-h-[482px]\"> <path d=\"M632.577 258.718H347.424V258.861H632.577V258.718Z\" fill=\"#EBEBEB\"></path> <path d=\"M434.395 262.163H428.418V262.305H434.395V262.163Z\" fill=\"#EBEBEB\"></path> <path d=\"M613.289 265.904H603.109V266.047H613.289V265.904Z\" fill=\"#EBEBEB\"></path> <path d=\"M565.218 262.231H531.484V262.374H565.218V262.231Z\" fill=\"#EBEBEB\"></path> <path d=\"M480.813 265.482H455.006V265.625H480.813V265.482Z\" fill=\"#EBEBEB\"></path> <path d=\"M427.084 264.581H418.142V264.724H427.084V264.581Z\" fill=\"#EBEBEB\"></path> <path d=\"M590.568 265.482H577.702V265.625H590.568V265.482Z\" fill=\"#EBEBEB\"></path> <path d=\"M414.817 264.513H384.454V264.655H414.817V264.513Z\" fill=\"#EBEBEB\"></path> <path d=\"M482.586 233.283H372.466C371.603 233.281 370.776 232.937 370.167 232.327C369.557 231.716 369.215 230.889 369.215 230.026V75.2279C369.223 74.3702 369.568 73.5501 370.177 72.9457C370.786 72.3413 371.608 72.0015 372.466 72H482.586C483.45 72 484.278 72.3431 484.889 72.9538C485.5 73.5645 485.843 74.3928 485.843 75.2564V230.026C485.843 230.89 485.5 231.718 484.889 232.329C484.278 232.939 483.45 233.283 482.586 233.283ZM372.466 72.1141C371.641 72.1156 370.85 72.4443 370.268 73.0281C369.685 73.6119 369.358 74.4031 369.358 75.2279V230.026C369.358 230.851 369.685 231.642 370.268 232.226C370.85 232.81 371.641 233.138 372.466 233.14H482.586C483.411 233.137 484.201 232.808 484.785 232.225C485.368 231.641 485.697 230.851 485.7 230.026V75.2279C485.697 74.403 485.368 73.6127 484.785 73.0294C484.201 72.4461 483.411 72.1171 482.586 72.1141H372.466Z\" fill=\"#EBEBEB\"></path> <path d=\"M605.949 233.283H495.823C494.96 233.28 494.134 232.935 493.524 232.325C492.914 231.715 492.57 230.889 492.567 230.026V75.2279C492.576 74.3697 492.922 73.5496 493.532 72.9453C494.142 72.3411 494.965 72.0015 495.823 72H605.949C606.806 72.003 607.627 72.3435 608.234 72.9477C608.842 73.5519 609.187 74.3712 609.194 75.2279V230.026C609.195 230.453 609.112 230.876 608.949 231.271C608.786 231.665 608.547 232.024 608.246 232.326C607.945 232.629 607.587 232.869 607.193 233.033C606.799 233.197 606.376 233.282 605.949 233.283ZM495.823 72.1141C494.998 72.1171 494.208 72.4461 493.624 73.0294C493.041 73.6127 492.712 74.403 492.709 75.2279V230.026C492.712 230.851 493.041 231.641 493.624 232.225C494.208 232.808 494.998 233.137 495.823 233.14H605.949C606.774 233.137 607.564 232.808 608.148 232.225C608.731 231.641 609.06 230.851 609.063 230.026V75.2279C609.06 74.403 608.731 73.6127 608.148 73.0294C607.564 72.4461 606.774 72.1171 605.949 72.1141H495.823Z\" fill=\"#EBEBEB\"></path><path d=\"M463.646 88.8982H391.651V196.652H463.646V88.8982Z\" fill=\"#E6E6E6\"></path><path d=\"M462.049 88.8982H390.054V196.652H462.049V88.8982Z\" fill=\"#F5F5F5\"></path><path d=\"M459.175 92.1261H392.923V1
