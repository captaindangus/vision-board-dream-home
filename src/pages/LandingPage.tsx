
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PlusIcon, MoreHorizontal, Menu } from 'lucide-react';

export default function LandingPage() {
  // Placeholder data for demo vision boards
  const visionBoards = [
    {
      id: '1',
      name: 'My Vision Board 1',
      days: 2,
      images: [
        'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.2&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.2&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.2&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1487252665478-49b61b47f302?ixlib=rb-4.0.2&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      ]
    },
    {
      id: '2',
      name: 'My Vision Board 2',
      days: 2,
      images: [
        'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.2&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.2&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1487252665478-49b61b47f302?ixlib=rb-4.0.2&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.2&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="px-8 py-4 flex justify-between items-center">
        <img src="/lovable-uploads/83583edb-e5ff-42ff-a3f0-136fba133d5b.png" alt="eXp Realty" className="h-12" />
        <div className="flex items-center gap-4">
          <Button variant="outline" className="rounded-full px-6 h-12">Find Your Home</Button>
          <Button variant="outline" className="rounded-full h-12 w-12 flex items-center justify-center">
            JZ
          </Button>
          <Button variant="ghost" className="rounded-full bg-[#1A1F2C] w-12 h-12 flex items-center justify-center p-0">
            <Menu className="h-5 w-5 text-white" />
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-[76px] font-semibold mb-5 leading-[76px]" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Vision Board To Dream Home
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create a vision board of your dream home—style, layout, vibes—
            and we'll find real listings that match your vision
          </p>
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
            <Card className="rounded-3xl border-dashed border-2 border-gray-300 flex flex-col items-center justify-center p-12 hover:border-gray-400 transition-all">
              <Link to="/board" className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                  <PlusIcon className="w-8 h-8 text-gray-500" />
                </div>
                <span className="text-lg font-medium">Create a New Board 🏡</span>
              </Link>
            </Card>

            {visionBoards.map(board => (
              <Link to="/listings" key={board.id}>
                <Card key={board.id} className="rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all">
                  <div className="relative">
                    <div className="grid grid-cols-2 grid-rows-2 gap-0.5 aspect-[4/3]">
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
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
