import React, { useState, useEffect, useCallback } from 'react';
import { generateProducts } from './services/geminiService';
import ProductCard from './components/ProductCard';
import SearchBar from './components/SearchBar';
import { Product, PricingDisplayMode } from './types';
import { Settings2, ShoppingBag } from 'lucide-react';

const App: React.FC = () => {
  const [category, setCategory] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [displayMode, setDisplayMode] = useState<PricingDisplayMode>(PricingDisplayMode.DISCOUNT_EMPHASIS);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleSearch = useCallback(async (term: string) => {
    setCategory(term);
    setLoading(true);
    setHasSearched(true);
    
    // Reset products while loading to show skeleton
    setProducts([]);

    try {
      const newProducts = await generateProducts(term);
      setProducts(newProducts);
    } catch (e) {
      console.error("Failed to fetch products", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleMode = () => {
    setDisplayMode(prev => 
      prev === PricingDisplayMode.DISCOUNT_EMPHASIS 
        ? PricingDisplayMode.PRICE_EMPHASIS 
        : PricingDisplayMode.DISCOUNT_EMPHASIS
    );
  };

  return (
    <div className="min-h-screen pb-20 max-w-md mx-auto bg-white shadow-2xl overflow-hidden relative">
      
      {/* Navigation Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white">
        <div className="flex items-center gap-2 text-black font-bold text-lg">
          <ShoppingBag className="text-red-600" />
          <span>SHOP AI</span>
        </div>
        <div className="text-xs font-medium px-2 py-1 bg-gray-100 rounded text-gray-500">
          Mobile Preview
        </div>
      </header>

      {/* Search Bar (Sticky) */}
      <SearchBar onSearch={handleSearch} isLoading={loading} />

      {/* View Mode Toggle (Floating or Top) */}
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Current View</span>
          <span className="text-sm font-bold text-gray-900">
            {displayMode === PricingDisplayMode.DISCOUNT_EMPHASIS ? '할인율 강조 (Discount Focus)' : '최종가 강조 (Price Focus)'}
          </span>
        </div>
        <button 
          onClick={toggleMode}
          className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm active:scale-95 transition-all hover:border-gray-400"
        >
          <Settings2 size={16} className="text-gray-600" />
          <span className="text-xs font-medium text-gray-700">Switch View</span>
        </button>
      </div>

      {/* Main Content Area */}
      <main className="px-3 py-4">
        
        {/* Empty State */}
        {!hasSearched && !loading && (
          <div className="flex flex-col items-center justify-center py-20 text-center px-6">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-4xl">
              🛍️
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">상품을 검색해보세요</h2>
            <p className="text-sm text-gray-500">
              "운동화", "노트북", "여름 원피스" 등을 입력하면 <br/>
              AI가 가상의 상품 목록을 생성합니다.
            </p>
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100 text-left w-full">
              <h3 className="text-sm font-bold text-blue-800 mb-1">A/B 테스트 모드</h3>
              <p className="text-xs text-blue-600">
                검색 후 상단의 'Switch View' 버튼을 눌러 
                할인율 중심 UI와 가격 중심 UI를 비교해보세요.
              </p>
            </div>
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col bg-white rounded-lg overflow-hidden border border-gray-100 h-72 animate-pulse">
                <div className="aspect-square bg-gray-200"></div>
                <div className="p-3 flex flex-col flex-grow gap-2">
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="mt-auto h-8 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Product Grid */}
        {!loading && hasSearched && products.length > 0 && (
          <>
             <div className="mb-4 flex items-center justify-between">
               <h2 className="font-bold text-gray-900">
                 '{category}' 검색 결과
                 <span className="ml-1 text-sm font-normal text-gray-500">({products.length})</span>
               </h2>
             </div>
            <div className="grid grid-cols-2 gap-3">
              {products.map((product, index) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  mode={displayMode}
                  index={index}
                />
              ))}
            </div>
          </>
        )}
        
        {/* No Results */}
        {!loading && hasSearched && products.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            상품을 찾을 수 없습니다. 다시 시도해주세요.
          </div>
        )}
      </main>

    </div>
  );
};

export default App;