
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Listings from "./pages/Listings";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";

const queryClient = new QueryClient();

// Function to get the last active tab or default to '/board'
const getLastActiveTab = () => {
  // Get the current board ID to maintain tab state per board
  const currentBoardId = localStorage.getItem('currentBoardId');
  
  // If we have a board ID, check if this specific board has a saved tab preference
  if (currentBoardId) {
    const boardTabPreference = localStorage.getItem(`lastActiveTab_${currentBoardId}`);
    if (boardTabPreference === '/listings') {
      return '/listings';
    }
  }
  
  // Default to the board tab if no preference was saved for this board
  return '/board';
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/board" element={<Index />} />
          <Route path="/listings" element={<Listings />} />
          {/* Redirect to the last active tab when going to /vision */}
          <Route path="/vision" element={<Navigate to={getLastActiveTab()} replace />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
