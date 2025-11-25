import React, { useState, useEffect, useRef } from 'react';
import ProductCard from './components/ProductCard';
import LandingPage from './components/LandingPage';
import { Product, PricingDisplayMode, ProductRange } from './types';
import { Settings2, ShoppingBag, LogOut } from 'lucide-react';
import productsData from './data.json';

const App: React.FC = () => {
  // State
  const [currentPage, setCurrentPage] = useState<'landing' | 'shop'>('landing');
  const [products, setProducts] = useState<Product[]>([]);
  const [displayMode, setDisplayMode] = useState<PricingDisplayMode>(PricingDisplayMode.DISCOUNT_EMPHASIS);

  // Tracking Refs
  const startTimeRef = useRef<number>(0);
  const clickCountRef = useRef<number>(0);
  const maxScrollRef = useRef<number>(0);

  // Start Experiment
  const handleStart = (mode: PricingDisplayMode, range: ProductRange) => {
    setDisplayMode(mode);

    // Filter products based on range
    let filteredProducts: Product[] = [];
    if (range === ProductRange.RANGE_1_50) {
      filteredProducts = (productsData as Product[]).slice(0, 50);
    } else if (range === ProductRange.RANGE_51_100) {
      filteredProducts = (productsData as Product[]).slice(50, 100);
    }

    setProducts(filteredProducts);
    setCurrentPage('shop');
    startTimeRef.current = Date.now();
    clickCountRef.current = 0;
    maxScrollRef.current = 0;
    window.scrollTo(0, 0);
  };

  // End Experiment & Download Report
  const handleEnd = () => {
    const endTime = Date.now();
    const durationSeconds = (endTime - startTimeRef.current) / 1000;

    const report = `Experiment Report
-----------------
Date: ${new Date().toLocaleString()}
Display Mode: ${displayMode}
Total Duration: ${durationSeconds.toFixed(2)} seconds
Total Clicks: ${clickCountRef.current}
Max Scroll Depth: ${maxScrollRef.current} pixels
`;

    // Create and download file
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `experiment_report_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Reset and go back to landing
    setCurrentPage('landing');
  };

  // Tracking Effects
  useEffect(() => {
    if (currentPage !== 'shop') return;

    const handleClick = () => {
      clickCountRef.current += 1;
    };

    const handleScroll = () => {
      const currentScroll = window.scrollY + window.innerHeight;
      if (currentScroll > maxScrollRef.current) {
        maxScrollRef.current = Math.floor(currentScroll);
      }
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage]);

  if (currentPage === 'landing') {
    return <LandingPage onStart={handleStart} />;
  }

  return (
    <div className="min-h-screen pb-20 max-w-md mx-auto bg-white shadow-2xl overflow-hidden relative">

      {/* Navigation Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-10 border-b border-gray-100">
        <div className="flex items-center gap-2 text-black font-bold text-lg">
          <ShoppingBag className="text-red-600" />
          <span>SHOP AI</span>
        </div>
        <button
          onClick={handleEnd}
          className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors"
        >
          <LogOut size={14} />
          End Experiment
        </button>
      </header>

      {/* View Mode Indicator */}
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Current View</span>
          <span className="text-sm font-bold text-gray-900">
            {displayMode === PricingDisplayMode.DISCOUNT_EMPHASIS ? '할인율 강조 (Discount Focus)' : '최종가 강조 (Price Focus)'}
          </span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm opacity-75 cursor-not-allowed">
          <Settings2 size={16} className="text-gray-400" />
          <span className="text-xs font-medium text-gray-400">Fixed Mode</span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="px-3 py-4">

        {/* Product Grid */}
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
      </main>

    </div>
  );
};

export default App;