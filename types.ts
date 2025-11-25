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
  imagePath: string;
}

export enum PricingDisplayMode {
  DISCOUNT_EMPHASIS = 'DISCOUNT_EMPHASIS',
  PRICE_EMPHASIS = 'PRICE_EMPHASIS',
}

export enum ProductRange {
  RANGE_1_50 = 'RANGE_1_50',
  RANGE_51_100 = 'RANGE_51_100',
}