
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const Header = () => {
  return (
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
  );
};

export default Header;
