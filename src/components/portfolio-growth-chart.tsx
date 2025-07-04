'use client';

import { useMemo } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartTooltipContent } from '@/components/ui/chart';
import type { PortfolioSnapshot } from '@/lib/types';

type PortfolioGrowthChartProps = {
  data: PortfolioSnapshot[];
};

export default function PortfolioGrowthChart({ data }: PortfolioGrowthChartProps) {
  const chartData = useMemo(
    () =>
      data.map(d => ({
        date: new Date(d.date).toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        }),
        portfolioValue: d.portfolioValue,
        benchmarkValue: d.benchmarkValue,
      })),
    [data]
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Growth</CardTitle>
        <CardDescription>
          Your portfolio's performance over time against the benchmark.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="colorBenchmark" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--muted-foreground))"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--muted-foreground))"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                tickFormatter={formatCurrency}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <Tooltip
                content={
                  <ChartTooltipContent
                    formatter={(value, name) => (
                      <div className="grid gap-1">
                        <div className="font-semibold">
                          {formatCurrency(value as number)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {name === 'portfolioValue'
                            ? 'Your Portfolio'
                            : 'Benchmark'}
                        </div>
                      </div>
                    )}
                    labelFormatter={label => new Date(label).toLocaleDateString()}
                  />
                }
                cursor={{
                  stroke: 'hsl(var(--border))',
                  strokeWidth: 2,
                  strokeDasharray: '3 3',
                }}
              />
              <Area
                type="monotone"
                dataKey="portfolioValue"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#colorPortfolio)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="benchmarkValue"
                stroke="hsl(var(--muted-foreground))"
                fillOpacity={1}
                fill="url(#colorBenchmark)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
