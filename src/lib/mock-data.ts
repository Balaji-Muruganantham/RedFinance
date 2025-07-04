import type { Holding, Transaction, PortfolioSnapshot, Person, Expense } from './types';

export const mockHoldings: Holding[] = [
  { id: '1', type: 'Stock', ticker: 'RELIANCE.NS', name: 'Reliance Industries Ltd.', quantity: 50, price: 2850.50, costBasis: 2400.00, sector: 'Conglomerate' },
  { id: '2', type: 'Stock', ticker: 'TCS.NS', name: 'Tata Consultancy Services', quantity: 30, price: 3850.75, costBasis: 3200.00, sector: 'IT Services' },
  { id: '3', type: 'Stock', ticker: 'HDFCBANK.NS', name: 'HDFC Bank Ltd.', quantity: 40, price: 1530.20, costBasis: 1450.00, sector: 'Banking' },
  { 
    id: '4', 
    type: 'Mutual Fund', 
    ticker: 'PARAGPARIX', 
    name: 'Parag Parikh Flexi Cap Fund', 
    quantity: 200, 
    price: 75.50, 
    costBasis: 65.00, 
    sector: 'Flexi Cap',
    peRatio: 21.5,
    dailyRollingReturns: 1.5,
    categoryAverageReturn: 1.1,
    historicalPE: 20.1,
    categoryPriceIndicator: 'overpriced'
  },
  { id: '5', type: 'Stock', ticker: 'INFY.NS', name: 'Infosys Ltd.', quantity: 60, price: 1435.00, costBasis: 1300.50, sector: 'IT Services' },
  { 
    id: '6', 
    type: 'Mutual Fund', 
    ticker: 'UTINIFTY', 
    name: 'UTI Nifty 50 Index Fund', 
    quantity: 250, 
    price: 140.76, 
    costBasis: 120.20, 
    sector: 'Index Fund',
    peRatio: 22.2,
    dailyRollingReturns: -0.3,
    categoryAverageReturn: -0.1,
    historicalPE: 23.5,
    categoryPriceIndicator: 'underpriced'
  },
  { 
    id: '7', 
    type: 'Mutual Fund', 
    ticker: 'MIRAEAMC', 
    name: 'Mirae Asset Large Cap Fund', 
    quantity: 1000, 
    price: 95.12, 
    costBasis: 85.00, 
    sector: 'Large Cap',
    peRatio: 28.1,
    dailyRollingReturns: 0.9,
    categoryAverageReturn: 1.2,
    historicalPE: 28.0,
    categoryPriceIndicator: 'neutral'
  },
];

export const mockTransactions: Transaction[] = [
  { id: 't1', date: '2023-05-20T10:00:00Z', type: 'Buy', ticker: 'RELIANCE.NS', name: 'Reliance Industries Ltd.', quantity: 25, price: 2450.00 },
  { id: 't2', date: '2023-06-15T14:30:00Z', type: 'Buy', ticker: 'TCS.NS', name: 'Tata Consultancy Services', quantity: 30, price: 3200.00 },
  { id: 't3', date: '2023-07-01T09:00:00Z', type: 'Buy', ticker: 'HDFCBANK.NS', name: 'HDFC Bank Ltd.', quantity: 40, price: 1450.00 },
  { id: 't4', date: '2023-08-10T11:45:00Z', type: 'Sell', ticker: 'RELIANCE.NS', name: 'Reliance Industries Ltd.', quantity: 10, price: 2700.00 },
  { id: 't5', date: '2023-09-05T16:00:00Z', type: 'Buy', ticker: 'PARAGPARIX', name: 'Parag Parikh Flexi Cap Fund', quantity: 200, price: 65.00 },
  { id: 't6', date: '2023-10-02T13:20:00Z', type: 'Buy', ticker: 'INFY.NS', name: 'Infosys Ltd.', quantity: 60, price: 1300.50 },
  { id: 't7', date: '2024-01-10T11:00:00Z', type: 'Buy', ticker: 'RELIANCE.NS', name: 'Reliance Industries Ltd.', quantity: 35, price: 2350.00 },
];

export const mockPortfolioHistory: PortfolioSnapshot[] = [
  { date: '2023-01-01', portfolioValue: 2500000, benchmarkValue: 2500000 },
  { date: '2023-02-01', portfolioValue: 2580000, benchmarkValue: 2540000 },
  { date: '2023-03-01', portfolioValue: 2650000, benchmarkValue: 2600000 },
  { date: '2023-04-01', portfolioValue: 2730000, benchmarkValue: 2680000 },
  { date: '2023-05-01', portfolioValue: 2810000, benchmarkValue: 2750000 },
  { date: '2023-06-01', portfolioValue: 2900000, benchmarkValue: 2820000 },
  { date: '2023-07-01', portfolioValue: 3050000, benchmarkValue: 2900000 },
  { date: '2023-08-01', portfolioValue: 3120000, benchmarkValue: 2980000 },
  { date: '2023-09-01', portfolioValue: 3080000, benchmarkValue: 2950000 },
  { date: '2023-10-01', portfolioValue: 3200000, benchmarkValue: 3050000 },
  { date: '2023-11-01', portfolioValue: 3350000, benchmarkValue: 3150000 },
  { date: '2023-12-01', portfolioValue: 3500000, benchmarkValue: 3280000 },
  { date: '2024-01-01', portfolioValue: 3600000, benchmarkValue: 3400000 },
  { date: '2024-02-01', portfolioValue: 3750000, benchmarkValue: 3500000 },
  { date: '2024-03-01', portfolioValue: 3820000, benchmarkValue: 3600000 },
  { date: '2024-04-01', portfolioValue: 3910000, benchmarkValue: 3700000 },
  { date: '2024-05-01', portfolioValue: 4050000, benchmarkValue: 3850000 },
];

export const mockXirr = {
  portfolio: 15.2,
  benchmark: 12.5,
};

// Mock data for Expense Splitter
export const mockPeople: Person[] = [
  { id: 'p1', name: 'Aarav' },
  { id: 'p2', name: 'Diya' },
  { id: 'p3', name: 'Rohan' },
  { id: 'p4', name: 'Priya' },
];

export const mockExpenses: Expense[] = [
  {
    id: 'e1',
    description: 'Dinner at the restaurant',
    amount: 3000,
    paidById: 'p1', // Aarav paid
    participantIds: ['p1', 'p2', 'p3', 'p4'], // Everyone participated
    date: '2024-07-20T20:00:00Z',
  },
  {
    id: 'e2',
    description: 'Movie tickets',
    amount: 1200,
    paidById: 'p2', // Diya paid
    participantIds: ['p2', 'p3'], // Diya and Rohan
    date: '2024-07-21T18:30:00Z',
  },
  {
    id: 'e3',
    description: 'Groceries for the trip',
    amount: 2500,
    paidById: 'p4', // Priya paid
    participantIds: ['p1', 'p2', 'p4'], // Aarav, Diya, and Priya
    date: '2024-07-22T10:00:00Z',
  },
  {
    id: 'e4',
    description: 'Cab fare',
    amount: 800,
    paidById: 'p3', // Rohan paid
    participantIds: ['p1', 'p3'], // Aarav and Rohan
    date: '2024-07-22T22:00:00Z',
  },
];
