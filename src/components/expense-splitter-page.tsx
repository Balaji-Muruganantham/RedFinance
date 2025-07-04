'use client';

import { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mockPeople, mockExpenses } from '@/lib/mock-data';
import type { Person, Expense, SimplifiedDebt } from '@/lib/types';
import { calculateBalances, simplifyDebts } from '@/lib/expense-splitter';
import AddExpenseDialog from './add-expense-dialog';
import BalancesSummary from './balances-summary';
import ExpenseList from './expense-list';

export default function ExpenseSplitterPage() {
  const [people, setPeople] = useState<Person[]>(mockPeople);
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [simplifiedDebts, setSimplifiedDebts] = useState<SimplifiedDebt[]>([]);
  const { toast } = useToast();

  const balances = useMemo(() => calculateBalances(expenses, people), [expenses, people]);

  const handleAddExpense = (expense: Omit<Expense, 'id' | 'date'>) => {
    const newExpense = {
      ...expense,
      id: `e${Date.now()}`,
      date: new Date().toISOString(),
    };
    setExpenses(prev => [newExpense, ...prev]);
    setSimplifiedDebts([]); // Reset simplified debts on new expense
    toast({
        title: 'Expense Added',
        description: `"${expense.description}" for ${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(expense.amount)} has been added.`,
    });
  };

  const handleSimplifyDebts = () => {
    const simplified = simplifyDebts(balances, people);
    setSimplifiedDebts(simplified);
  };
  
  const handleAddPerson = () => {
    toast({
        title: 'Feature not available',
        description: 'Adding new people is not implemented in this demo.',
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Expense Splitter</h2>
        <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleAddPerson}>
                <Plus className="mr-2 h-4 w-4" /> Add Person
            </Button>
            <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add Expense
            </Button>
        </div>
      </div>
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
            <BalancesSummary 
                balances={balances}
                people={people}
                simplifiedDebts={simplifiedDebts}
                onSimplify={handleSimplifyDebts}
            />
        </div>
        <div className="lg:col-span-3">
            <ExpenseList expenses={expenses} people={people} />
        </div>
      </div>
      <AddExpenseDialog 
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        onAddExpense={handleAddExpense}
        people={people}
      />
    </div>
  );
}
