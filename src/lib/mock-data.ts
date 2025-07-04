import type { Holding, Transaction } from './types';

export const mockHoldings: Holding[] = [
  { id: '1', ticker: 'AAPL', name: 'Apple Inc.', quantity: 50, price: 175.30, costBasis: 150.00, sector: 'Technology' },
  { id: '2', ticker: 'MSFT', name: 'Microsoft Corp.', quantity: 30, price: 340.54, costBasis: 280.75, sector: 'Technology' },
  { id: '3', ticker: 'JNJ', name: 'Johnson & Johnson', quantity: 40, price: 165.21, costBasis: 160.10, sector: 'Healthcare' },
  { id: '4', ticker: 'VTSAX', name: 'Vanguard Total Stock Market Index Fund', quantity: 20, price: 110.88, costBasis: 95.50, sector: 'Mutual Fund' },
  { id: '5', ticker: 'JPM', name: 'JPMorgan Chase & Co.', quantity: 60, price: 155.76, costBasis: 140.20, sector: 'Financials' },
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
