export interface Product {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  reviewCount: number;
  rating: number;
  imageKeyword: string;
}

export enum PricingDisplayMode {
  DISCOUNT_EMPHASIS = 'DISCOUNT_EMPHASIS',
  PRICE_EMPHASIS = 'PRICE_EMPHASIS',
}