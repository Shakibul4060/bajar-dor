export type PriceChange = "up" | "down" | "flat";

export interface MarketPrice {
  bazar: string;
  location?: string;
  minPrice: number;
  maxPrice: number;
  averagePrice: number;
}

export interface Product {
  id: string | number;
  slug: string;
  name: string;
  emoji: string;
  category: string;
  categorySlug: string;
  unit: string;
  price: number;
  minPrice: number;
  maxPrice: number;
  averagePrice: number;
  changePercent: number;
  changeType: PriceChange;
  description: string;
  markets: MarketPrice[];
}

export interface Category {
  slug: string;
  name: string;
  icon: string;
  description?: string;
}