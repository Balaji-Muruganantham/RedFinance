'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Person, Expense } from '@/lib/types';
import { useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';

const formSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  amount: z.coerce.number().positive('Amount must be positive'),
  paidById: z.string().min(1, 'You must select who paid'),
  participantIds: z.array(z.string()).refine(value => value.some(item => item), {
    message: 'You have to select at least one participant.',
  }),
});

type AddExpenseDialogProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onAddExpense: (expense: Omit<Expense, 'id' | 'date'>) => void;
  people: Person[];
};

export default function AddExpenseDialog({
  isOpen,
  setIsOpen,
  onAddExpense,
  people,
}: AddExpenseDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
      amount: 0,
      paidById: '',
      participantIds: [],
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        description: '',
        amount: 0,
        paidById: '',
        participantIds: people.map(p => p.id), // Default to all participants
      });
    }
  }, [form, isOpen, people]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    onAddExpense(values);
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
          <DialogDescription>
            Add a new expense and split it with your friends.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Dinner, movie tickets" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <div className="grid grid-cols-2 gap-4">
               <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount (INR)</FormLabel>
                      <FormControl>
                        <Input type="number" step="any" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="paidById"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Paid by</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select who paid" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {people.map(person => (
                            <SelectItem key={person.id} value={person.id}>
                              {person.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
             </div>
             <FormField
                control={form.control}
                name="participantIds"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Split between</FormLabel>
                      <FormDescription>
                        Select the people who participated in this expense.
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                    {people.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="participantIds"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...(field.value || []), item.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item.name}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <DialogFooter>
              <Button type="submit">Add Expense</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
