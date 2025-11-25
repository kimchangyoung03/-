import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';

interface SearchBarProps {
  onSearch: (term: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [term, setTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term);
    }
  };

  return (
    <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md shadow-sm px-4 py-3 border-b border-gray-200">
      <form onSubmit={handleSubmit} className="relative flex items-center w-full max-w-md mx-auto">
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="상품 카테고리를 입력하세요 (예: 운동화)"
          className="w-full pl-10 pr-12 py-2.5 bg-gray-100 border-none rounded-full text-sm focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none placeholder-gray-500"
          disabled={isLoading}
        />
        <Search className="absolute left-3.5 text-gray-400" size={18} />
        
        <button 
          type="submit" 
          disabled={isLoading || !term.trim()}
          className="absolute right-1.5 p-1.5 bg-black text-white rounded-full disabled:opacity-50 hover:bg-gray-800 transition-colors"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <ArrowRight size={16} />
          )}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;