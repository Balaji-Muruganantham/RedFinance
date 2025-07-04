'use client';

import { useMemo } from 'react';
import { Pie, PieChart, Tooltip } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { Holding } from '@/lib/types';

type AllocationChartProps = {
  holdings: Holding[];
};

export default function AllocationChart({ holdings }: AllocationChartProps) {
  const { chartData, chartConfig } = useMemo(() => {
    const allocationBySector = holdings.reduce((acc, holding) => {
      const value = holding.quantity * holding.price;
      acc[holding.sector] = (acc[holding.sector] || 0) + value;
      return acc;
    }, {} as Record<string, number>);

    const chartData = Object.entries(allocationBySector).map(([sector, value]) => ({
      sector,
      value,
      fill: `var(--color-${sector.toLowerCase().replace(/ /g, '-')})`,
    }));

    const chartConfig = chartData.reduce((acc, data, index) => {
      acc[data.sector.toLowerCase().replace(/ /g, '-')] = {
        label: data.sector,
        color: `hsl(var(--chart-${(index % 5) + 1}))`,
      };
      return acc;
    }, {} as ChartConfig);

    return { chartData, chartConfig };
  }, [holdings]);

  if (holdings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Asset Allocation</CardTitle>
          <CardDescription>No holdings to display allocation.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64 text-muted-foreground">
          <p>Add holdings to see your allocation.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Asset Allocation</CardTitle>
        <CardDescription>Distribution of assets by sector.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="sector"
              innerRadius={60}
              strokeWidth={5}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
