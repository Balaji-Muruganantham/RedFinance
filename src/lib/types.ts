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

export type PortfolioSnapshot = {
  date: string;
  portfolioValue: number;
  benchmarkValue: number;
};

// Types for Expense Splitter
export type Person = {
  id: string;
  name: string;
};

export type Expense = {
  id: string;
  description: string;
  amount: number;
  paidById: string; // Person ID
  participantIds: string[]; // Person IDs
  date: string; // ISO string
};

export type SimplifiedDebt = {
  from: Person;
  to: Person;
  amount: number;
};

export type SplitGroup = {
  id: string;
  name: string;
  memberIds: string[];
};
