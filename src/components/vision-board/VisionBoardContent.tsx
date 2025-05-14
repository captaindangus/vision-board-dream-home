import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Check, Pencil, Image, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useVisionBoard, VisionBoardItem } from '@/context/VisionBoardContext';

export function VisionBoardContent() {
  const [title, setTitle] = useState("MyVisionBoard 1 🌟");
  const [isEditing, setIsEditing] = useState(false);
  const { items, updateItemPosition, removeItem, addItem } = useVisionBoard();
  const containerRef = useRef<HTMLDivElement>(null);
  const [draggedItem, setDraggedItem] = useState<{id: string, offsetX: number, offsetY: number} | null>(null);

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

  const handleItemMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    id: string
  ) => {
    if (!containerRef.current) return;
    
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    
    // Calculate offset within the item where the mouse was clicked
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    
    setDraggedItem({ id, offsetX, offsetY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!draggedItem || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const scrollTop = containerRef.current.scrollTop;
    
    // Calculate position relative to the container, accounting for scroll and click offset
    const x = e.clientX - containerRect.left - draggedItem.offsetX;
    const y = e.clientY - containerRect.top - draggedItem.offsetY + scrollTop;
    
    // Ensure item stays within container bounds
    const boundedX = Math.max(0, Math.min(x, containerRect.width - 150));
    const boundedY = Math.max(0, y);
    
    updateItemPosition(draggedItem.id, { x: boundedX, y: boundedY });
  };

  const handleMouseUp = () => {
    setDraggedItem(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    const data = e.dataTransfer.getData('application/json');
    if (!data || !containerRef.current) return;
    
    try {
      const parsedData = JSON.parse(data);
      console.log("Drop event detected with data:", parsedData);
      
      // Calculate position relative to the container
      const containerRect = containerRef.current.getBoundingClientRect();
      const position = { 
        x: e.clientX - containerRect.left, 
        y: e.clientY - containerRect.top + (containerRef.current.scrollTop || 0)
      };
      
      addItem({
        ...parsedData,
        position
      });
    } catch (err) {
      console.error('Error parsing dragged data:', err);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  // Add event listener for custom drop events
  useEffect(() => {
    const handleCustomDrop = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { data, position } = customEvent.detail;
      
      addItem({
        ...data,
        position
      });
    };

    const element = containerRef.current;
    if (element) {
      element.addEventListener('visionboard:drop', handleCustomDrop);
      
      return () => {
        element.removeEventListener('visionboard:drop', handleCustomDrop);
      };
    }
  }, [addItem]);

  return (
    <main 
      className="flex flex-col w-full h-full bg-white px-6 py-8 rounded-[20px]"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
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
      <ScrollArea className="flex-1 relative" ref={containerRef}>
        <div className="min-h-[500px] relative p-4">
          {items.length > 0 ? (
            items.map((item) => (
              <VisionBoardItemComponent
                key={item.id}
                item={item}
                onMouseDown={(e) => handleItemMouseDown(e, item.id)}
                onRemove={() => removeItem(item.id)}
                isDragging={draggedItem?.id === item.id}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      </ScrollArea>
    </main>
  );
}

interface VisionBoardItemComponentProps {
  item: VisionBoardItem;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  onRemove: () => void;
  isDragging: boolean;
}

function VisionBoardItemComponent({ 
  item, 
  onMouseDown, 
  onRemove,
  isDragging
}: VisionBoardItemComponentProps) {
  return (
    <div
      className={`absolute rounded-xl overflow-hidden shadow-md bg-white cursor-move ${
        isDragging ? 'z-50 opacity-90' : 'z-10'
      }`}
      style={{
        left: `${item.position.x}px`,
        top: `${item.position.y}px`,
        width: item.size?.width || 'auto',
        height: item.size?.height || 'auto',
      }}
      onMouseDown={onMouseDown}
    >
      <div className="relative">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute top-1 right-1 bg-white rounded-full p-1 z-20 opacity-80 hover:opacity-100"
          aria-label="Remove item"
        >
          <X className="w-4 h-4" />
        </button>
        
        {item.type === 'image' || item.type === 'homeFeature' ? (
          <div className="relative">
            <img
              src={item.content.imageUrl}
              alt={item.content.title || "Vision board image"}
              className="w-full h-full object-cover"
              style={{ minHeight: '120px', minWidth: '150px' }}
            />
            {item.content.title && (
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 px-2 py-1 rounded text-white text-xs">
                {item.content.title}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-[#F3F3F4] p-3 rounded-xl min-w-[200px]">
            <div className="text-black text-sm font-bold truncate mb-1">
              {item.content.title}
            </div>
            {item.content.description && (
              <div className="text-black text-xs">
                {item.content.description}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col justify-center items-center gap-6 w-full h-full py-10 col-span-3">
      <div className="flex flex-col items-center">
        <div className="mb-6 text-gray-300">
          <Image className="w-24 h-24" strokeWidth={1} />
        </div>
        <h1 className="text-center text-[#0C0F24] text-2xl font-bold">Add Your First Image ✨</h1>
        <p className="text-center text-[#0C0F24] text-base mt-3">
          Drag items from the sidebar or upload an image to get started!
        </p>
      </div>
    </div>
  );
}
