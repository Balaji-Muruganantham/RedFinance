'use client';

import { Holding } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HoldingsTable from './holdings-table';
import MutualFundHoldingsTable from './mutual-fund-holdings-table';
import { useMemo } from 'react';

type DetailedHoldingsViewProps = {
  holdings: Holding[];
  onEdit: (holding: Holding) => void;
  onDelete: (id: string) => void;
};

export default function DetailedHoldingsView({ holdings, onEdit, onDelete }: DetailedHoldingsViewProps) {
  const { stockHoldings, mutualFundHoldings } = useMemo(() => {
    const stockHoldings = holdings.filter(h => h.type === 'Stock');
    const mutualFundHoldings = holdings.filter(h => h.type === 'Mutual Fund');
    return { stockHoldings, mutualFundHoldings };
  }, [holdings]);

  return (
    <Tabs defaultValue="stocks" className="w-full">
      <TabsList className="grid w-full grid-cols-2 max-w-sm">
        <TabsTrigger value="stocks">Stocks ({stockHoldings.length})</TabsTrigger>
        <TabsTrigger value="mutual-funds">Mutual Funds ({mutualFundHoldings.length})</TabsTrigger>
      </TabsList>
      <TabsContent value="stocks">
        <HoldingsTable
          holdings={stockHoldings}
          onEdit={onEdit}
          onDelete={onDelete}
          title="Stock Holdings"
        />
      </TabsContent>
      <TabsContent value="mutual-funds">
        <MutualFundHoldingsTable holdings={mutualFundHoldings} />
      </TabsContent>
    </Tabs>
  );
}
