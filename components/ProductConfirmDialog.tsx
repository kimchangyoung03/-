import React from 'react';
import { Product } from '../types';
import { X } from 'lucide-react';

interface ProductConfirmDialogProps {
  product: Product;
  onConfirm: () => void;
  onCancel: () => void;
}

const ProductConfirmDialog: React.FC<ProductConfirmDialogProps> = ({ product, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl max-w-sm w-full mx-4 overflow-hidden">
        {/* Close button */}
        <button
          onClick={onCancel}
          className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X size={20} />
        </button>

        {/* Product Image */}
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          <img
            src={product.imagePath}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Product Info */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
            {product.name}
          </h3>
          
          <p className="text-base text-gray-700 mb-6 text-center">
            이 상품을 선택하시겠습니까?
          </p>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
              아니요
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              예
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductConfirmDialog;

