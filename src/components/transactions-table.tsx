'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Transaction } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type TransactionsTableProps = {
  transactions: Transaction[];
};

export default function TransactionsTable({ transactions }: TransactionsTableProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(value);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Asset</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
               <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
                  No transactions recorded.
                </TableCell>
              </TableRow>
            ) : (
              transactions.map(tx => (
                <TableRow key={tx.id}>
                  <TableCell>{formatDate(tx.date)}</TableCell>
                  <TableCell>
                    <span className={cn(
                      'px-2 py-1 rounded-full text-xs font-medium',
                      tx.type === 'Buy' ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'
                    )}>
                      {tx.type}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{tx.ticker}</div>
                    <div className="text-sm text-muted-foreground">{tx.name}</div>
                  </TableCell>
                  <TableCell className="text-right">{tx.quantity}</TableCell>
                  <TableCell className="text-right">{formatCurrency(tx.price)}</TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(tx.price * tx.quantity)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
