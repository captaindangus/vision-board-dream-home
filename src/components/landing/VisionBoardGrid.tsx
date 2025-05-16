
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusIcon, MoreHorizontal, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define an interface for our board data
export interface VisionBoard {
  id: string;
  name: string;
  days: number;
  images: string[];
  createdAt: number; // timestamp
}

interface VisionBoardGridProps {
  visionBoards: VisionBoard[];
  isLoading: boolean;
  onDeleteBoard: (id: string) => void;
  onCreateNewBoard: () => void;
}

const VisionBoardGrid = ({ 
  visionBoards, 
  isLoading, 
  onDeleteBoard, 
  onCreateNewBoard 
}: VisionBoardGridProps) => {
  const navigate = useNavigate();
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const handleBoardClick = (boardId: string) => {
    // Set the current board ID in localStorage
    localStorage.setItem('currentBoardId', boardId);
    
    // Navigate to the board view
    navigate('/vision'); // This will redirect to the last active tab
  };

  const formatDaysAgo = (timestamp: number): string => {
    const now = Date.now();
    const diffMs = now - timestamp;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} Days Ago`;
  };

  return (
    <div className="mt-24">
      <h2 className="text-2xl font-bold mb-8">My Vision Boards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card 
          className="rounded-3xl border-dashed border-2 border-gray-300 flex flex-col items-center justify-center p-12 hover:border-gray-400 transition-all cursor-pointer"
          onClick={onCreateNewBoard}
        >
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-6">
              <PlusIcon className="w-8 h-8 text-gray-500" />
            </div>
            <span className="text-lg font-medium">Create a New Board 🏡</span>
          </div>
        </Card>

        {isLoading ? (
          // Show loading placeholders if loading
          Array.from({ length: 2 }).map((_, index) => (
            <Card key={`loading-${index}`} className="rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
              <div className="aspect-[4/3] bg-gray-100 animate-pulse"></div>
              <div className="p-4">
                <div className="h-5 w-2/3 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-1/3 bg-gray-100 rounded animate-pulse"></div>
              </div>
            </Card>
          ))
        ) : (
          // Show actual boards
          visionBoards.map(board => (
            <Card key={board.id} className="rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all group">
              <div className="relative">
                <div 
                  className="grid grid-cols-2 grid-rows-2 gap-0.5 aspect-[4/3] cursor-pointer"
                  onClick={() => handleBoardClick(board.id)}
                >
                  {board.images.map((image, idx) => (
                    <div key={idx} className="overflow-hidden">
                      <img 
                        src={image} 
                        alt="Home inspiration" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <DropdownMenu open={openDropdownId === board.id} onOpenChange={(isOpen) => {
                  if (isOpen) {
                    setOpenDropdownId(board.id);
                  } else if (openDropdownId === board.id) {
                    setOpenDropdownId(null);
                  }
                }}>
                  <DropdownMenuTrigger asChild>
                    <button className={`absolute top-4 right-4 bg-white rounded-full p-1.5 ${openDropdownId === board.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-36">
                    <DropdownMenuItem onClick={() => onDeleteBoard(board.id)} className="text-red-500">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{board.name}</h3>
                  <p className="text-sm text-gray-500">{formatDaysAgo(board.createdAt)}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full"
                  onClick={() => handleBoardClick(board.id)}
                >
                  View Listings
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default VisionBoardGrid;
