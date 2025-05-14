
import React, { createContext, useContext, useState } from 'react';
import { Search } from 'lucide-react';

// Create a context to share the search state across sidebar components
interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useSearch();
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex items-center gap-2 w-full bg-[#F3F3F4] px-3 py-4 rounded-[100px]">
      <div>
        <Search size={20} />
      </div>
      <input 
        type="text" 
        placeholder="Search Elements" 
        className="bg-transparent border-none outline-none text-black text-sm font-medium w-full"
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  );
}
