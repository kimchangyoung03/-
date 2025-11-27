import React, { useState, useEffect, useRef } from 'react';
import ProductCard from './components/ProductCard';
import LandingPage from './components/LandingPage';
import Survey from './components/Survey';
import PostSurvey from './components/PostSurvey';
import { Product, PricingDisplayMode, ProductRange } from './types';
import { Settings2, ShoppingBag, LogOut } from 'lucide-react';
import productsData from './data.json';

interface SurveyData {
  name: string;
  age: string;
  gender: string;
  giftBudget: string;
}

interface SessionData {
  button: string;
  mode: PricingDisplayMode;
  range: ProductRange;
  product: Product | null;
  duration: number;
  clicks: number;
  maxScroll: number;
  startTime: number;
  endTime: number;
}

const App: React.FC = () => {
  // State
  const [currentPage, setCurrentPage] = useState<'survey' | 'landing' | 'shop' | 'postSurvey'>('survey');
  const [products, setProducts] = useState<Product[]>([]);
  const [displayMode, setDisplayMode] = useState<PricingDisplayMode>(PricingDisplayMode.DISCOUNT_EMPHASIS);
  const [currentRange, setCurrentRange] = useState<ProductRange>(ProductRange.RANGE_1_50);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
  const [postSurveyData, setPostSurveyData] = useState<'빵' | '과일' | null>(null);
  
  // Session tracking
  const [firstSession, setFirstSession] = useState<SessionData | null>(null);
  const [secondSession, setSecondSession] = useState<SessionData | null>(null);
  const [currentButton, setCurrentButton] = useState<string>('');
  const [isFirstSession, setIsFirstSession] = useState<boolean>(true);

  // Tracking Refs
  const startTimeRef = useRef<number>(0);
  const clickCountRef = useRef<number>(0);
  const maxScrollRef = useRef<number>(0);

  // Get paired button
  const getPairedButton = (mode: PricingDisplayMode, range: ProductRange): { mode: PricingDisplayMode, range: ProductRange, buttonName: string } => {
    // Button 1 (DISCOUNT_EMPHASIS, RANGE_1_50) pairs with Button 4 (PRICE_EMPHASIS, RANGE_51_100)
    // Button 4 (PRICE_EMPHASIS, RANGE_51_100) pairs with Button 1 (DISCOUNT_EMPHASIS, RANGE_1_50)
    // Button 2 (PRICE_EMPHASIS, RANGE_1_50) pairs with Button 3 (DISCOUNT_EMPHASIS, RANGE_51_100)
    // Button 3 (DISCOUNT_EMPHASIS, RANGE_51_100) pairs with Button 2 (PRICE_EMPHASIS, RANGE_1_50)
    
    if (mode === PricingDisplayMode.DISCOUNT_EMPHASIS && range === ProductRange.RANGE_1_50) {
      return { mode: PricingDisplayMode.PRICE_EMPHASIS, range: ProductRange.RANGE_51_100, buttonName: 'Button 4 - Price Emphasis (51-100)' };
    } else if (mode === PricingDisplayMode.PRICE_EMPHASIS && range === ProductRange.RANGE_51_100) {
      return { mode: PricingDisplayMode.DISCOUNT_EMPHASIS, range: ProductRange.RANGE_1_50, buttonName: 'Button 1 - Discount Emphasis (1-50)' };
    } else if (mode === PricingDisplayMode.PRICE_EMPHASIS && range === ProductRange.RANGE_1_50) {
      return { mode: PricingDisplayMode.DISCOUNT_EMPHASIS, range: ProductRange.RANGE_51_100, buttonName: 'Button 3 - Discount Emphasis (51-100)' };
    } else if (mode === PricingDisplayMode.DISCOUNT_EMPHASIS && range === ProductRange.RANGE_51_100) {
      return { mode: PricingDisplayMode.PRICE_EMPHASIS, range: ProductRange.RANGE_1_50, buttonName: 'Button 2 - Price Emphasis (1-50)' };
    }
    return { mode, range, buttonName: '' };
  };

  const getButtonName = (mode: PricingDisplayMode, range: ProductRange): string => {
    if (mode === PricingDisplayMode.DISCOUNT_EMPHASIS && range === ProductRange.RANGE_1_50) {
      return 'Button 1 - Discount Emphasis (1-50)';
    } else if (mode === PricingDisplayMode.PRICE_EMPHASIS && range === ProductRange.RANGE_1_50) {
      return 'Button 2 - Price Emphasis (1-50)';
    } else if (mode === PricingDisplayMode.DISCOUNT_EMPHASIS && range === ProductRange.RANGE_51_100) {
      return 'Button 3 - Discount Emphasis (51-100)';
    } else if (mode === PricingDisplayMode.PRICE_EMPHASIS && range === ProductRange.RANGE_51_100) {
      return 'Button 4 - Price Emphasis (51-100)';
    }
    return '';
  };

  // Handle initial survey submission
  const handleSurveySubmit = (data: SurveyData) => {
    setSurveyData(data);
    setCurrentPage('landing');
  };

  // Handle button click from landing page
  const handleButtonClick = (mode: PricingDisplayMode, range: ProductRange) => {
    const buttonName = getButtonName(mode, range);
    setCurrentButton(buttonName);
    startSession(mode, range, buttonName);
  };

  // Start a session
  const startSession = (mode: PricingDisplayMode, range: ProductRange, buttonName: string) => {
    setDisplayMode(mode);
    setCurrentRange(range);

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
    setSelectedProduct(null);
    window.scrollTo(0, 0);
  };

  // Handle Product Click
  const handleProductClick = (product: Product) => {
    const endTime = Date.now();
    const duration = (endTime - startTimeRef.current) / 1000;
    
    const sessionData: SessionData = {
      button: currentButton,
      mode: displayMode,
      range: currentRange,
      product: product,
      duration: duration,
      clicks: clickCountRef.current,
      maxScroll: maxScrollRef.current,
      startTime: startTimeRef.current,
      endTime: endTime
    };

    if (isFirstSession) {
      setFirstSession(sessionData);
      setIsFirstSession(false);
      
      // Move to paired button
      const paired = getPairedButton(displayMode, sessionData.range);
      setCurrentButton(paired.buttonName);
      startSession(paired.mode, paired.range, paired.buttonName);
    } else {
      setSecondSession(sessionData);
      // Move to post survey
      setCurrentPage('postSurvey');
    }
  };

  // Handle post survey submission
  const handlePostSurveySubmit = (preference: '빵' | '과일') => {
    setPostSurveyData(preference);
    downloadReport(preference);
  };

  // Download final report
  const downloadReport = (preference?: '빵' | '과일') => {
    const finalPreference = preference || postSurveyData;
    let report = `Experiment Report
==================
Date: ${new Date().toLocaleString()}

=== Initial Survey Data ===
Name: ${surveyData?.name || 'N/A'}
Age: ${surveyData?.age || 'N/A'}
Gender: ${surveyData?.gender || 'N/A'}
Gift Budget: ${surveyData?.giftBudget || 'N/A'}

=== First Session ===
`;

    if (firstSession) {
      report += `Button: ${firstSession.button}
Display Mode: ${firstSession.mode}
Product Range: ${firstSession.range}
Duration: ${firstSession.duration.toFixed(2)} seconds
Total Clicks: ${firstSession.clicks}
Max Scroll Depth: ${firstSession.maxScroll} pixels
Start Time: ${new Date(firstSession.startTime).toLocaleString()}
End Time: ${new Date(firstSession.endTime).toLocaleString()}
`;

      if (firstSession.product) {
        report += `
Selected Product:
  - Product ID: ${firstSession.product.id}
  - Product Name: ${firstSession.product.name}
  - Original Price: ₩${firstSession.product.originalPrice.toLocaleString()}
  - Discounted Price: ₩${firstSession.product.discountedPrice.toLocaleString()}
  - Discount Percentage: ${firstSession.product.discountPercentage}%
  - Rating: ${firstSession.product.rating}
  - Review Count: ${firstSession.product.reviewCount}
  - Image Keyword: ${firstSession.product.imageKeyword}
`;
      }
    }

    report += `
=== Second Session ===
`;

    if (secondSession) {
      report += `Button: ${secondSession.button}
Display Mode: ${secondSession.mode}
Product Range: ${secondSession.range}
Duration: ${secondSession.duration.toFixed(2)} seconds
Total Clicks: ${secondSession.clicks}
Max Scroll Depth: ${secondSession.maxScroll} pixels
Start Time: ${new Date(secondSession.startTime).toLocaleString()}
End Time: ${new Date(secondSession.endTime).toLocaleString()}
`;

      if (secondSession.product) {
        report += `
Selected Product:
  - Product ID: ${secondSession.product.id}
  - Product Name: ${secondSession.product.name}
  - Original Price: ₩${secondSession.product.originalPrice.toLocaleString()}
  - Discounted Price: ₩${secondSession.product.discountedPrice.toLocaleString()}
  - Discount Percentage: ${secondSession.product.discountPercentage}%
  - Rating: ${secondSession.product.rating}
  - Review Count: ${secondSession.product.reviewCount}
  - Image Keyword: ${secondSession.product.imageKeyword}
`;
      }
    }

    report += `
=== Post Survey ===
Website Preference: ${finalPreference || 'N/A'}

=== Summary ===
Total Duration: ${firstSession && secondSession ? (firstSession.duration + secondSession.duration).toFixed(2) : 'N/A'} seconds
Total Clicks: ${firstSession && secondSession ? (firstSession.clicks + secondSession.clicks) : 'N/A'}
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

    // Reset everything
    setCurrentPage('survey');
    setFirstSession(null);
    setSecondSession(null);
    setSurveyData(null);
    setPostSurveyData(null);
    setCurrentButton('');
    setIsFirstSession(true);
    setSelectedProduct(null);
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

  if (currentPage === 'survey') {
    return <Survey onSubmit={handleSurveySubmit} />;
  }

  if (currentPage === 'landing') {
    return <LandingPage onStart={handleButtonClick} />;
  }

  if (currentPage === 'postSurvey') {
    return <PostSurvey onSubmit={handlePostSurveySubmit} />;
  }

  return (
    <div className="min-h-screen pb-20 max-w-md mx-auto bg-white shadow-2xl overflow-hidden relative">
      {/* Navigation Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-10 border-b border-gray-100">
        <div className="flex items-center gap-2 text-black font-bold text-lg">
          <ShoppingBag className="text-red-600" />
          <span>SHOP AI</span>
        </div>
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
              onClick={() => handleProductClick(product)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
