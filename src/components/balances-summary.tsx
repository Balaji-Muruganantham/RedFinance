'use client';

import type { Person, SimplifiedDebt } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';

type BalancesSummaryProps = {
  balances: Map<string, number>;
  people: Person[];
  simplifiedDebts: SimplifiedDebt[];
  onSimplify: () => void;
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(value);
};

export default function BalancesSummary({ balances, people, simplifiedDebts, onSimplify }: BalancesSummaryProps) {
  const peopleById = new Map(people.map(p => [p.id, p]));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Group Balances</CardTitle>
        <CardDescription>A summary of who owes who.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Overall Balances</h3>
          <ul className="space-y-2">
            {Array.from(balances.entries()).map(([personId, amount]) => {
              const person = peopleById.get(personId);
              if (!person) return null;
              
              const isOwed = amount > 0;
              const isOwing = amount < 0;

              return (
                <li key={personId} className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                  <span className="font-medium">{person.name}</span>
                  <span className={cn(
                    'font-bold',
                    isOwed && 'text-green-400',
                    isOwing && 'text-red-400'
                  )}>
                    {isOwed ? `gets back ${formatCurrency(amount)}` : isOwing ? `owes ${formatCurrency(Math.abs(amount))}` : 'is settled up'}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Simplified Debts</h3>
            <Button size="sm" variant="outline" onClick={onSimplify}>Simplify Debts</Button>
          </div>
          {simplifiedDebts.length > 0 ? (
            <ul className="space-y-3">
              {simplifiedDebts.map((debt, index) => (
                <li key={index} className="flex items-center justify-between p-3 rounded-lg border bg-card text-card-foreground shadow-sm">
                   <Badge variant="outline" className="text-sm">{debt.from.name}</Badge>
                   <div className="flex items-center gap-2 text-muted-foreground">
                      <ArrowRight className="h-4 w-4" />
                      <span className="font-bold text-lg text-foreground">{formatCurrency(debt.amount)}</span>
                      <ArrowRight className="h-4 w-4" />
                   </div>
                   <Badge variant="outline" className="text-sm">{debt.to.name}</Badge>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-muted-foreground py-4">
              <Users className="mx-auto h-8 w-8 mb-2" />
              <p>Click "Simplify Debts" to see the minimum number of transactions required to settle up.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
