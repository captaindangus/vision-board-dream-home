
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PlusIcon, MoreHorizontal } from 'lucide-react';

export default function LandingPage() {
  // Placeholder data for demo vision boards
  const visionBoards = [
    {
      id: '1',
      name: 'My Vision Board 1',
      days: 2,
      images: [
        '/lovable-uploads/3cc34a99-58d4-4b5e-8e69-d6a2e85aa6c9.png',
        '/lovable-uploads/157448d1-0bc6-45cb-9972-beac1f4d2227.png',
        '/lovable-uploads/3373eae3-ed71-4b48-b291-1980584aa937.png',
        '/lovable-uploads/4c0986af-8c7c-4c53-adb0-d0cf70b3959f.png',
      ]
    },
    {
      id: '2',
      name: 'My Vision Board 2',
      days: 2,
      images: [
        '/lovable-uploads/f9797142-2f9e-442c-ba71-a1f02e9ecfd2.png',
        '/lovable-uploads/fc4f717f-e4db-49b7-8aa6-fcd82c66bff2.png',
        '/lovable-uploads/edc4f5ac-e0ea-4e33-8927-76659277b28e.png',
        '/lovable-uploads/95c52f8a-e0af-4684-b567-4224b55fcf8c.png',
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="px-8 py-4 flex justify-between items-center border-b">
        <img src="https://i.imgur.com/4Cx3R66.png" alt="eXp Realty" className="h-9" />
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-full px-6">Find Your Home</Button>
          <Button variant="outline" className="rounded-full w-12 h-12 flex items-center justify-center">
            JZ
          </Button>
          <Button variant="ghost" className="p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-5">Vision Board To Dream Home</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create a vision board of your dream home—style, layout, vibes—
            and we'll find real listings that match your vision
          </p>
          <div className="mt-8">
            <Link to="/">
              <Button className="rounded-full px-6 py-6 text-lg bg-black hover:bg-gray-800">
                Create a New Board
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="text-2xl font-bold mb-8">My Vision Boards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="rounded-3xl border-dashed border-2 border-gray-300 flex flex-col items-center justify-center p-12 hover:border-gray-400 transition-all">
              <Link to="/" className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                  <PlusIcon className="w-8 h-8 text-gray-500" />
                </div>
                <span className="text-lg font-medium">Create a New Board 🏡</span>
              </Link>
            </Card>

            {visionBoards.map(board => (
              <Card key={board.id} className="rounded-3xl overflow-hidden border-0 shadow-sm">
                <div className="relative">
                  <div className="grid grid-cols-2 grid-rows-2 gap-0.5 aspect-[4/3]">
                    {board.images.map((image, idx) => (
                      <div key={idx} className="overflow-hidden">
                        <img 
                          src={image} 
                          alt="" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <button className="absolute top-4 right-4 bg-white rounded-full p-1.5">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{board.name}</h3>
                    <p className="text-sm text-gray-500">{board.days} Days Ago</p>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-full">
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
