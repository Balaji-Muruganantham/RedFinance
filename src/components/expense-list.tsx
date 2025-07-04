'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Person, Expense } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { User, Users } from 'lucide-react';
import { Badge } from './ui/badge';

type ExpenseListProps = {
  expenses: Expense[];
  people: Person[];
};

export default function ExpenseList({ expenses, people }: ExpenseListProps) {
  const peopleById = new Map(people.map(p => [p.id, p]));

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(value);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense History</CardTitle>
        <CardDescription>A log of all recorded expenses.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Paid by</TableHead>
              <TableHead>Split between</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.length === 0 ? (
               <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                  No expenses recorded yet.
                </TableCell>
              </TableRow>
            ) : (
              expenses.map(expense => (
                <TableRow key={expense.id}>
                  <TableCell>{formatDate(expense.date)}</TableCell>
                  <TableCell className="font-medium">{expense.description}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{peopleById.get(expense.paidById)?.name}</Badge>
                  </TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            {expense.participantIds.length === 1 ? <User className="h-4 w-4" /> : <Users className="h-4 w-4" /> }
                            <span>{expense.participantIds.length}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{expense.participantIds.map(id => peopleById.get(id)?.name).join(', ')}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(expense.amount)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
