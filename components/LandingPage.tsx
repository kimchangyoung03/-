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

                <div className="p-8 space-y-6">
                    {/* 지시문 */}
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                        <p className="text-sm text-gray-800 leading-relaxed">
                            친한 친구의 생일이 되어 생일 선물을 고르고자 하는 상황입니다. 친구는 과일과 빵을 균등하게 좋아하고, 당신은 1~5만원 정도의 선물을 줄 의향이 있습니다. 합리적 소비를 하면서, 동시에 친구에게 품질 좋은 선물을 주고 싶습니다. 한 번은 과일, 한 번은 빵 및 간식류에서 탐색을 하며 선물할 상품을 고르는 과업을 수행하십시오.
                        </p>
                    </div>

                <div className="space-y-4">
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
        </div>
    );
};

export default LandingPage;
