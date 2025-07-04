'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Holding } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';

type MutualFundHoldingsTableProps = {
  holdings: Holding[];
};

const IndicatorBadge = ({ indicator }: { indicator: Holding['categoryPriceIndicator'] }) => {
  if (!indicator) {
    return <span className="text-muted-foreground">N/A</span>;
  }

  const indicatorClasses = {
    overpriced: 'bg-red-900/50 text-red-300',
    underpriced: 'bg-green-900/50 text-green-300',
    neutral: 'bg-muted text-muted-foreground',
  };

  return <Badge variant="outline" className={cn('border-transparent capitalize', indicatorClasses[indicator])}>{indicator}</Badge>;
};


export default function MutualFundHoldingsTable({ holdings }: MutualFundHoldingsTableProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(value);
  };
  
  const formatPercentage = (value: number) => `${value.toFixed(2)}%`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mutual Fund Holdings</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead className="text-right">Gain/Loss</TableHead>
              <TableHead className="text-right">P/E Ratio</TableHead>
              <TableHead className="text-right">Rolling Returns</TableHead>
              <TableHead className="text-right">Category Avg.</TableHead>
              <TableHead className="text-right">Hist. P/E</TableHead>
              <TableHead>Category Valuation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {holdings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center h-24">
                  No mutual fund holdings yet.
                </TableCell>
              </TableRow>
            ) : (
              holdings.map(holding => {
                const value = holding.quantity * holding.price;
                const gainLoss = (holding.price - holding.costBasis) * holding.quantity;
                const isGain = gainLoss >= 0;
                return (
                  <TableRow key={holding.id}>
                    <TableCell>
                      <div className="font-medium">{holding.ticker}</div>
                      <div className="text-sm text-muted-foreground">{holding.name}</div>
                    </TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(value)}</TableCell>
                    <TableCell className={cn('text-right', isGain ? 'text-green-400' : 'text-red-400')}>
                      {formatCurrency(gainLoss)}
                    </TableCell>
                    <TableCell className="text-right">{holding.peRatio ?? 'N/A'}</TableCell>
                    <TableCell className={cn('text-right', (holding.dailyRollingReturns ?? 0) >= 0 ? 'text-green-400' : 'text-red-400')}>
                        {holding.dailyRollingReturns ? formatPercentage(holding.dailyRollingReturns) : 'N/A'}
                    </TableCell>
                     <TableCell className={cn('text-right', (holding.categoryAverageReturn ?? 0) >= 0 ? 'text-green-400' : 'text-red-400')}>
                        {holding.categoryAverageReturn ? formatPercentage(holding.categoryAverageReturn) : 'N/A'}
                    </TableCell>
                    <TableCell className="text-right">{holding.historicalPE ?? 'N/A'}</TableCell>
                    <TableCell>
                      <IndicatorBadge indicator={holding.categoryPriceIndicator} />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
