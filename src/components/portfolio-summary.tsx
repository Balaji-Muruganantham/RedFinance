'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Holding } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp, Percent, TrendingUp, Wallet } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';
import { Skeleton } from './ui/skeleton';

type PortfolioSummaryProps = {
  holdings: Holding[];
  portfolioXirr: number;
  benchmarkXirr: number;
};

export default function PortfolioSummary({ holdings, portfolioXirr, benchmarkXirr }: PortfolioSummaryProps) {
  const { totalValue, totalGainLoss, gainLossPercentage } = useMemo(() => {
    const totalValue = holdings.reduce((acc, h) => acc + h.quantity * h.price, 0);
    const totalCost = holdings.reduce((acc, h) => acc + h.quantity * h.costBasis, 0);
    const totalGainLoss = totalValue - totalCost;
    const gainLossPercentage = totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0;

    return { totalValue, totalGainLoss, gainLossPercentage };
  }, [holdings]);
  
  const [dailyChange, setDailyChange] = useState<number | null>(null);
  const [dailyChangePercentage, setDailyChangePercentage] = useState<number | null>(null);

  useEffect(() => {
    // Calculate on client side to avoid hydration mismatch
    const change = (Math.random() - 0.5) * totalValue * 0.05;
    const percentage = totalValue > 0 ? (change / (totalValue - change)) * 100 : 0;
    setDailyChange(change);
    setDailyChangePercentage(percentage);
  }, [totalValue]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const formatPercentage = (value: number) => `${value.toFixed(2)}%`;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-4 w-4 text-muted-foreground fill-current"><path d="M128,24a104,104,0,1,0,104,104A104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V94.63a8,8,0,0,1,10.18-7.5l48,21.33a8,8,0,0,1,0,15.06l-48,21.34A8,8,0,0,1,120,136Z"></path></svg>
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
           {dailyChange === null ? (
            <div className="h-4 w-4" />
          ) : dailyChange >= 0 ? (
            <ArrowUp className="h-4 w-4 text-green-400" />
          ) : (
            <ArrowDown className="h-4 w-4 text-red-400" />
          )}
        </CardHeader>
        <CardContent>
          {dailyChange === null || dailyChangePercentage === null ? (
            <div className="space-y-2 pt-1">
              <Skeleton className="h-7 w-24" />
              <Skeleton className="h-3 w-20" />
            </div>
          ) : (
            <>
              <div className={cn(
                'text-2xl font-bold',
                dailyChange >= 0 ? 'text-green-400' : 'text-red-400'
              )}>
                {formatCurrency(dailyChange)}
              </div>
              <p className="text-xs text-muted-foreground">
                {dailyChangePercentage.toFixed(2)}% today
              </p>
            </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Portfolio XIRR</CardTitle>
          <Percent className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatPercentage(portfolioXirr)}</div>
          <p className="text-xs text-muted-foreground">Annualized return</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Benchmark XIRR</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatPercentage(benchmarkXirr)}</div>
          <p className="text-xs text-muted-foreground">NIFTY 50 equivalent</p>
        </CardContent>
      </Card>
    </div>
  );
}
