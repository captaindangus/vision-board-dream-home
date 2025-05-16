
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/landing/Header';
import HeroSection from '@/components/landing/HeroSection';
import VisionBoardGrid from '@/components/landing/VisionBoardGrid';
import { loadVisionBoards, deleteVisionBoard, prepareNewBoard } from '@/utils/visionBoardUtils';

export default function LandingPage() {
  const navigate = useNavigate();
  const [visionBoards, setVisionBoards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load boards from localStorage on component mount
  useEffect(() => {
    const boards = loadVisionBoards();
    setVisionBoards(boards);
    setIsLoading(false);
  }, []);

  const handleDeleteBoard = (id: string) => {
    const updatedBoards = deleteVisionBoard(visionBoards, id);
    setVisionBoards(updatedBoards);
  };
  
  const handleCreateNewBoard = () => {
    prepareNewBoard();
    navigate('/board');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="px-8 py-12">
        <HeroSection onCreateNewBoard={handleCreateNewBoard} />
        <VisionBoardGrid 
          visionBoards={visionBoards}
          isLoading={isLoading}
          onDeleteBoard={handleDeleteBoard}
          onCreateNewBoard={handleCreateNewBoard}
        />
      </main>
    </div>
  );
}
