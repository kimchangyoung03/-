import React from 'react';
import { PricingDisplayMode, ProductRange } from '../types';

interface LandingPageProps {
    onStart: (mode: PricingDisplayMode, range: ProductRange) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-blue-600 p-6 text-center">
                    <h1 className="text-2xl font-bold text-white mb-2">Shopping Experiment</h1>
                    <p className="text-blue-100 text-sm">Select a session configuration to start</p>
                </div>

                <div className="p-8 space-y-4">
                    <button
                        onClick={() => onStart(PricingDisplayMode.DISCOUNT_EMPHASIS, ProductRange.RANGE_1_50)}
                        className="w-full flex flex-col items-center justify-center p-4 bg-white border-2 border-blue-100 hover:border-blue-500 hover:bg-blue-50 rounded-xl transition-all group"
                    >
                        <span className="font-bold text-gray-900 group-hover:text-blue-700">Button 1</span>
                        <span className="text-sm text-gray-500">Discount Emphasis (1-50)</span>
                    </button>

                    <button
                        onClick={() => onStart(PricingDisplayMode.PRICE_EMPHASIS, ProductRange.RANGE_1_50)}
                        className="w-full flex flex-col items-center justify-center p-4 bg-white border-2 border-blue-100 hover:border-blue-500 hover:bg-blue-50 rounded-xl transition-all group"
                    >
                        <span className="font-bold text-gray-900 group-hover:text-blue-700">Button 2</span>
                        <span className="text-sm text-gray-500">Price Emphasis (1-50)</span>
                    </button>

                    <button
                        onClick={() => onStart(PricingDisplayMode.DISCOUNT_EMPHASIS, ProductRange.RANGE_51_100)}
                        className="w-full flex flex-col items-center justify-center p-4 bg-white border-2 border-blue-100 hover:border-blue-500 hover:bg-blue-50 rounded-xl transition-all group"
                    >
                        <span className="font-bold text-gray-900 group-hover:text-blue-700">Button 3</span>
                        <span className="text-sm text-gray-500">Discount Emphasis (51-100)</span>
                    </button>

                    <button
                        onClick={() => onStart(PricingDisplayMode.PRICE_EMPHASIS, ProductRange.RANGE_51_100)}
                        className="w-full flex flex-col items-center justify-center p-4 bg-white border-2 border-blue-100 hover:border-blue-500 hover:bg-blue-50 rounded-xl transition-all group"
                    >
                        <span className="font-bold text-gray-900 group-hover:text-blue-700">Button 4</span>
                        <span className="text-sm text-gray-500">Price Emphasis (51-100)</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
