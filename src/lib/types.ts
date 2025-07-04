export type Holding = {
  id: string;
  type: 'Stock' | 'Mutual Fund';
  ticker: string;
  name: string;
  quantity: number;
  price: number; // current price
  costBasis: number; // average purchase price per share
  sector: string;
  peRatio?: number;
  dailyRollingReturns?: number; // As a percentage
  categoryAverageReturn?: number; // As a percentage
  historicalPE?: number;
  categoryPriceIndicator?: 'overpriced' | 'underpriced' | 'neutral';
};

export type Transaction = {
  id: string;
  date: string; // ISO string
  type: 'Buy' | 'Sell';
  ticker: string;
  name: string;
  quantity: number;
  price: number;
};
