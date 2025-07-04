export type Holding = {
  id: string;
  ticker: string;
  name: string;
  quantity: number;
  price: number; // current price
  costBasis: number; // average purchase price per share
  sector: string;
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
