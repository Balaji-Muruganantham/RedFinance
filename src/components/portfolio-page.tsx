'use client';

import { useState } from 'react';
import type { AnalyzePortfolioOutput } from '@/ai/flows/portfolio-insights';
import { getPortfolioAnalysis } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { mockHoldings, mockTransactions, mockPortfolioHistory, mockXirr } from '@/lib/mock-data';
import type { Holding, Transaction, PortfolioSnapshot } from '@/lib/types';
import { Bot, FileUp, Landmark, Plus, ListTree } from 'lucide-react';
import AddEditHoldingDialog from './add-edit-holding-dialog';
import AiAnalysisView from './ai-analysis-view';
import AllocationChart from './allocation-chart';
import HoldingsTable from './holdings-table';
import PortfolioSummary from './portfolio-summary';
import TransactionsTable from './transactions-table';
import DetailedHoldingsView from './detailed-holdings-view';
import PortfolioGrowthChart from './portfolio-growth-chart';

export default function PortfolioPage() {
  const [holdings, setHoldings] = useState<Holding[]>(mockHoldings);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [portfolioHistory] = useState<PortfolioSnapshot[]>(mockPortfolioHistory);
  const [xirr] = useState(mockXirr);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingHolding, setEditingHolding] = useState<Holding | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AnalyzePortfolioOutput | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const { toast } = useToast();

  const handleAddHolding = (holding: Omit<Holding, 'id'>) => {
    const newHolding = { ...holding, id: Date.now().toString(), type: 'Stock' } as Holding;
    setHoldings(prev => [...prev, newHolding ]);
  };

  const handleEditHolding = (holdingToUpdate: Holding) => {
    setHoldings(prev => prev.map(h => h.id === holdingToUpdate.id ? holdingToUpdate : h));
  };

  const handleDeleteHolding = (holdingId: string) => {
    setHoldings(prev => prev.filter(h => h.id !== holdingId));
  };

  const handleOpenEditDialog = (holding: Holding) => {
    setEditingHolding(holding);
    setIsDialogOpen(true);
  };

  const handleOpenAddDialog = () => {
    setEditingHolding(null);
    setIsDialogOpen(true);
  };

  const handleImport = () => {
    toast({
      title: 'Feature not available',
      description: 'Importing from a file is not implemented in this demo.',
    });
  };

  const runAiAnalysis = async () => {
    setIsAiLoading(true);
    setAiAnalysis(null);
    try {
      const holdingsString = holdings.map(h => `${h.ticker}: ${h.quantity} shares`).join(', ');
      const transactionsString = transactions.map(t => `${t.type} ${t.quantity} ${t.ticker} on ${new Date(t.date).toLocaleDateString()}`).join('; ');
      
      const allocationBySector = holdings.reduce((acc, holding) => {
        const value = holding.quantity * holding.price;
        acc[holding.sector] = (acc[holding.sector] || 0) + value;
        return acc;
      }, {} as Record<string, number>);
      
      const totalValue = Object.values(allocationBySector).reduce((sum, value) => sum + value, 0);
      
      const allocationString = Object.entries(allocationBySector)
        .map(([sector, value]) => `${sector}: ${(value / totalValue * 100).toFixed(2)}%`)
        .join(', ');

      const result = await getPortfolioAnalysis({
        holdings: holdingsString,
        transactionHistory: transactionsString,
        assetAllocation: allocationString,
      });
      setAiAnalysis(result);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'AI Analysis Failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred.',
      });
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Landmark className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Portfolio Insights</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={handleImport}>
                <FileUp className="mr-2 h-4 w-4" />
                Import
              </Button>
              <Button onClick={handleOpenAddDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Add Holding
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-xl mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="detailed-holdings">
              <ListTree className="mr-2 h-4 w-4" />
              Detailed Holdings
            </TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="ai-insights">
              <Bot className="mr-2 h-4 w-4" /> AI Insights
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid gap-6">
              <PortfolioSummary 
                holdings={holdings} 
                portfolioXirr={xirr.portfolio} 
                benchmarkXirr={xirr.benchmark} 
              />
              <PortfolioGrowthChart data={portfolioHistory} />
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <HoldingsTable
                    holdings={holdings.filter(h => h.type === 'Stock')}
                    onEdit={handleOpenEditDialog}
                    onDelete={handleDeleteHolding}
                    title="Top Stock Holdings"
                  />
                </div>
                <AllocationChart holdings={holdings} />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="detailed-holdings">
            <DetailedHoldingsView 
              holdings={holdings}
              onEdit={handleOpenEditDialog}
              onDelete={handleDeleteHolding}
            />
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionsTable transactions={transactions} />
          </TabsContent>

          <TabsContent value="ai-insights">
             <AiAnalysisView 
              analysis={aiAnalysis}
              isLoading={isAiLoading}
              onRunAnalysis={runAiAnalysis}
            />
          </TabsContent>
        </Tabs>
      </main>
      <AddEditHoldingDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        onAddHolding={handleAddHolding}
        onEditHolding={handleEditHolding}
        holding={editingHolding}
      />
    </div>
  );
}
