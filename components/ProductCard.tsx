import React from 'react';
import { Product, PricingDisplayMode } from '../types';
import { ShoppingCart, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  mode: PricingDisplayMode;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, mode, index }) => {
  const displayOriginal = product.originalPrice.toLocaleString();
  const displayFinal = product.discountedPrice.toLocaleString();

  return (
    <div className="flex flex-col bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Image Container */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden group">
        <img
          src={product.imagePath}
          alt={product.name}
          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <button className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:text-red-500 transition-colors">
          <Heart size={18} />
        </button>

        {/* Badge for high rating or high discount */}
        {(product.rating >= 4.5 || product.discountPercentage >= 50) && (
          <div className={`absolute top-2 left-2 px-2 py-0.5 text-white text-[10px] font-bold rounded-sm ${product.discountPercentage >= 50 ? 'bg-red-500' : 'bg-black/70'}`}>
            {product.discountPercentage >= 50 ? 'HOT DEAL' : 'BEST'}
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-3 flex flex-col flex-grow">
        {/* Brand/Category - fake for visuals */}
        <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-1 truncate hidden">
          {product.imageKeyword}
        </span>

        {/* Title */}
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 leading-tight mb-2 min-h-[2.5em]">
          {product.name}
        </h3>



        {/* Pricing Section - The Core Logic */}
        <div className="mt-auto">
          {mode === PricingDisplayMode.DISCOUNT_EMPHASIS ? (
            // VERSION A: Discount Emphasis
            // Discount: Red, Large
            // Original: Gray, Struck
            // Final: Black
            <div className="flex flex-col items-start">
              <div className="flex items-baseline gap-1.5 w-full">
                <span className="text-2xl font-extrabold text-red-600 leading-none">
                  {product.discountPercentage}%
                </span>
                <span className="text-xs text-gray-400 line-through decoration-gray-400">
                  ₩{displayOriginal}
                </span>
              </div>
              <span className="text-lg font-bold text-gray-900 mt-0.5">
                ₩{displayFinal}
              </span>
            </div>
          ) : (
            // VERSION B: Final Price Emphasis
            // Final: Red, Large
            // Original: Gray, Struck
            // Discount: Black (or small tag)
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2 w-full mb-0.5">
                <span className="text-xs font-bold text-black bg-gray-100 px-1.5 py-0.5 rounded">
                  Save {product.discountPercentage}%
                </span>
                <span className="text-xs text-gray-400 line-through decoration-gray-400">
                  ₩{displayOriginal}
                </span>
              </div>
              <span className="text-2xl font-extrabold text-red-600 leading-none">
                ₩{displayFinal}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;