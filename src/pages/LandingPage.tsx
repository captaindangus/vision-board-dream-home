
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PlusIcon, MoreHorizontal, Menu, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function LandingPage() {
  const navigate = useNavigate();
  const [visionBoards, setVisionBoards] = useState([
    {
      id: '1',
      name: 'My Vision Board 1',
      days: 2,
      images: [
        '/lovable-uploads/d6cec2fd-12d6-4b45-ae92-5f10fec33156.png',
        '/lovable-uploads/63b9a3a1-d1bc-4bcf-a807-a2aec8728e6f.png',
        '/lovable-uploads/853d956f-993b-4666-bbd3-20838e6e1588.png',
        '/lovable-uploads/ab124023-9d45-4962-8b9a-f9ed70f10fcf.png',
      ]
    },
    {
      id: '2',
      name: 'My Vision Board 2',
      days: 2,
      images: [
        '/lovable-uploads/322397c6-7177-4095-bf9e-7d62eca30dbc.png',
        '/lovable-uploads/fc39b9f3-6a99-4d62-869d-a1a7498dc9f5.png',
        '/lovable-uploads/b1d62892-cf6f-41ad-b366-89cb39168cd9.png',
        '/lovable-uploads/d9c579f3-a709-4010-b98a-1eb2b3b21174.png',
      ]
    }
  ]);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const handleDeleteBoard = (id: string) => {
    setVisionBoards(visionBoards.filter(board => board.id !== id));
    setOpenDropdownId(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="px-8 py-4 flex justify-between items-center">
        <img src="/lovable-uploads/83583edb-e5ff-42ff-a3f0-136fba133d5b.png" alt="eXp Realty" className="h-12" />
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-full px-6 h-12">Find Your Home</Button>
          <Button variant="outline" className="rounded-full h-12 w-12 flex items-center justify-center">
            JZ
          </Button>
          <Button variant="ghost" className="rounded-full bg-[#1A1F2C] w-12 h-12 flex items-center justify-center p-0">
            <Menu className="h-5 w-5 text-white" />
          </Button>
        </div>
      </header>

      <main className="px-8 py-12">
        <div className="text-center mb-16">
          <div className="mx-auto" style={{ maxWidth: '608px' }}>
            <h1 className="text-[76px] font-semibold mb-5 leading-[76px]" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Vision Board To Dream Home
            </h1>
            <p className="text-xl text-gray-600">
              Create a vision board of your dream home—style, layout, vibes—
              and we'll find real listings that match your vision
            </p>
          </div>
          <div className="mt-8">
            <Link to="/board">
              <Button className="rounded-full px-6 py-6 text-lg bg-black hover:bg-gray-800">
                Create a New Board
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="text-2xl font-bold mb-8">My Vision Boards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card 
              className="rounded-3xl border-dashed border-2 border-gray-300 flex flex-col items-center justify-center p-12 hover:border-gray-400 transition-all cursor-pointer"
              onClick={() => navigate('/board')}
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                  <PlusIcon className="w-8 h-8 text-gray-500" />
                </div>
                <span className="text-lg font-medium">Create a New Board 🏡</span>
              </div>
            </Card>

            {visionBoards.map(board => (
              <Card key={board.id} className="rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all group">
                <div className="relative">
                  <div 
                    className="grid grid-cols-2 grid-rows-2 gap-0.5 aspect-[4/3] cursor-pointer"
                    onClick={() => navigate('/listings')}
                  >
                    {board.images.map((image, idx) => (
                      <div key={idx} className="overflow-hidden">
                        <img 
                          src={image} 
                          alt="Modern house" 
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
                      <DropdownMenuItem onClick={() => handleDeleteBoard(board.id)} className="text-red-500">
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{board.name}</h3>
                    <p className="text-sm text-gray-500">{board.days} Days Ago</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-full"
                    onClick={() => navigate('/listings')}
                  >
                    View Listings
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
