'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Holding } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp, DollarSign, Wallet } from 'lucide-react';
import { useMemo } from 'react';

type PortfolioSummaryProps = {
  holdings: Holding[];
};

export default function PortfolioSummary({ holdings }: PortfolioSummaryProps) {
  const { totalValue, totalGainLoss, gainLossPercentage } = useMemo(() => {
    const totalValue = holdings.reduce((acc, h) => acc + h.quantity * h.price, 0);
    const totalCost = holdings.reduce((acc, h) => acc + h.quantity * h.costBasis, 0);
    const totalGainLoss = totalValue - totalCost;
    const gainLossPercentage = totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0;

    return { totalValue, totalGainLoss, gainLossPercentage };
  }, [holdings]);
  
  // Mocked daily change
  const dailyChange = useMemo(() => (Math.random() - 0.5) * totalValue * 0.05, [totalValue]);
  const dailyChangePercentage = totalValue > 0 ? (dailyChange / (totalValue - dailyChange)) * 100 : 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalValue)}</div>
          <p className="text-xs text-muted-foreground">The current estimated value of your portfolio</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Gain / Loss</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              'text-2xl font-bold',
              totalGainLoss >= 0 ? 'text-green-400' : 'text-red-400'
            )}
          >
            {formatCurrency(totalGainLoss)}
          </div>
          <p className="text-xs text-muted-foreground">
            {gainLossPercentage.toFixed(2)}% all time
          </p>
        </CardContent>
      </Card>
       <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Day's Change</CardTitle>
          {dailyChange >= 0 ? <ArrowUp className="h-4 w-4 text-green-400" /> : <ArrowDown className="h-4 w-4 text-red-400" />}
        </CardHeader>
        <CardContent>
          <div className={cn(
              'text-2xl font-bold',
              dailyChange >= 0 ? 'text-green-400' : 'text-red-400'
            )}>
            {formatCurrency(dailyChange)}
            </div>
          <p className="text-xs text-muted-foreground">
            {dailyChangePercentage.toFixed(2)}% today
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
