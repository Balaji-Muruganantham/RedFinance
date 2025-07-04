import type { Holding, Transaction, PortfolioSnapshot } from './types';

export const mockHoldings: Holding[] = [
  { id: '1', type: 'Stock', ticker: 'AAPL', name: 'Apple Inc.', quantity: 50, price: 175.30, costBasis: 150.00, sector: 'Technology' },
  { id: '2', type: 'Stock', ticker: 'MSFT', name: 'Microsoft Corp.', quantity: 30, price: 340.54, costBasis: 280.75, sector: 'Technology' },
  { id: '3', type: 'Stock', ticker: 'JNJ', name: 'Johnson & Johnson', quantity: 40, price: 165.21, costBasis: 160.10, sector: 'Healthcare' },
  { 
    id: '4', 
    type: 'Mutual Fund', 
    ticker: 'VTSAX', 
    name: 'Vanguard Total Stock Market Index Fund', 
    quantity: 20, 
    price: 110.88, 
    costBasis: 95.50, 
    sector: 'Index Fund',
    peRatio: 24.5,
    dailyRollingReturns: 1.2,
    categoryAverageReturn: 0.9,
    historicalPE: 22.1,
    categoryPriceIndicator: 'overpriced'
  },
  { id: '5', type: 'Stock', ticker: 'JPM', name: 'JPMorgan Chase & Co.', quantity: 60, price: 155.76, costBasis: 140.20, sector: 'Financials' },
  { 
    id: '6', 
    type: 'Mutual Fund', 
    ticker: 'VFIAX', 
    name: 'Vanguard 500 Index Fund Admiral Shares', 
    quantity: 25, 
    price: 450.76, 
    costBasis: 410.20, 
    sector: 'Index Fund',
    peRatio: 25.2,
    dailyRollingReturns: -0.5,
    categoryAverageReturn: -0.2,
    historicalPE: 26.5,
    categoryPriceIndicator: 'underpriced'
  },
  { 
    id: '7', 
    type: 'Mutual Fund', 
    ticker: 'AGTHX', 
    name: 'American Funds Growth Fund of America', 
    quantity: 100, 
    price: 75.12, 
    costBasis: 65.00, 
    sector: 'Growth Fund',
    peRatio: 33.1,
    dailyRollingReturns: 0.8,
    categoryAverageReturn: 1.1,
    historicalPE: 33.0,
    categoryPriceIndicator: 'neutral'
  },
];

export const mockTransactions: Transaction[] = [
  { id: 't1', date: '2023-05-20T10:00:00Z', type: 'Buy', ticker: 'AAPL', name: 'Apple Inc.', quantity: 25, price: 152.50 },
  { id: 't2', date: '2023-06-15T14:30:00Z', type: 'Buy', ticker: 'MSFT', name: 'Microsoft Corp.', quantity: 30, price: 280.75 },
  { id: 't3', date: '2023-07-01T09:00:00Z', type: 'Buy', ticker: 'JNJ', name: 'Johnson & Johnson', quantity: 40, price: 160.10 },
  { id: 't4', date: '2023-08-10T11:45:00Z', type: 'Sell', ticker: 'AAPL', name: 'Apple Inc.', quantity: 10, price: 178.00 },
  { id: 't5', date: '2023-09-05T16:00:00Z', type: 'Buy', ticker: 'VTSAX', name: 'Vanguard Total Stock Market Index Fund', quantity: 20, price: 95.50 },
  { id: 't6', date: '2023-10-02T13:20:00Z', type: 'Buy', ticker: 'JPM', name: 'JPMorgan Chase & Co.', quantity: 60, price: 140.20 },
  { id: 't7', date: '2024-01-10T11:00:00Z', type: 'Buy', ticker: 'AAPL', name: 'Apple Inc.', quantity: 35, price: 148.00 },
];

export const mockPortfolioHistory: PortfolioSnapshot[] = [
  { date: '2023-01-01', portfolioValue: 25000, benchmarkValue: 25000 },
  { date: '2023-02-01', portfolioValue: 25800, benchmarkValue: 25400 },
  { date: '2023-03-01', portfolioValue: 26500, benchmarkValue: 26000 },
  { date: '2023-04-01', portfolioValue: 27300, benchmarkValue: 26800 },
  { date: '2023-05-01', portfolioValue: 28100, benchmarkValue: 27500 },
  { date: '2023-06-01', portfolioValue: 29000, benchmarkValue: 28200 },
  { date: '2023-07-01', portfolioValue: 30500, benchmarkValue: 29000 },
  { date: '2023-08-01', portfolioValue: 31200, benchmarkValue: 29800 },
  { date: '2023-09-01', portfolioValue: 30800, benchmarkValue: 29500 },
  { date: '2023-10-01', portfolioValue: 32000, benchmarkValue: 30500 },
  { date: '2023-11-01', portfolioValue: 33500, benchmarkValue: 31500 },
  { date: '2023-12-01', portfolioValue: 35000, benchmarkValue: 32800 },
  { date: '2024-01-01', portfolioValue: 36000, benchmarkValue: 34000 },
  { date: '2024-02-01', portfolioValue: 37500, benchmarkValue: 35000 },
  { date: '2024-03-01', portfolioValue: 38200, benchmarkValue: 36000 },
  { date: '2024-04-01', portfolioValue: 39100, benchmarkValue: 37000 },
  { date: '2024-05-01', portfolioValue: 40500, benchmarkValue: 38500 },
];

export const mockXirr = {
  portfolio: 15.2,
  benchmark: 12.5,
};
