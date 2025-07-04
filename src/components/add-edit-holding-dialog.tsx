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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Holding } from '@/lib/types';
import { useEffect } from 'react';

const formSchema = z.object({
  ticker: z.string().min(1, 'Ticker is required').max(20, 'Ticker is too long'),
  name: z.string().min(1, 'Name is required'),
  quantity: z.coerce.number().positive('Quantity must be positive'),
  price: z.coerce.number().positive('Current Price (INR) must be positive'),
  costBasis: z.coerce.number().positive('Cost Basis (INR) must be positive'),
  sector: z.string().min(1, 'Sector is required'),
});

type AddEditHoldingDialogProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onAddHolding: (holding: Omit<Holding, 'id'>) => void;
  onEditHolding: (holding: Holding) => void;
  holding: Holding | null;
};

export default function AddEditHoldingDialog({
  isOpen,
  setIsOpen,
  onAddHolding,
  onEditHolding,
  holding,
}: AddEditHoldingDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ticker: '',
      name: '',
      quantity: 0,
      price: 0,
      costBasis: 0,
      sector: '',
    },
  });

  useEffect(() => {
    if (holding) {
      form.reset(holding);
    } else {
      form.reset({
        ticker: '',
        name: '',
        quantity: 0,
        price: 0,
        costBasis: 0,
        sector: '',
      });
    }
  }, [holding, form, isOpen]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (holding) {
      onEditHolding({ ...holding, ...values });
    } else {
      onAddHolding(values);
    }
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{holding ? 'Edit Holding' : 'Add Holding'}</DialogTitle>
          <DialogDescription>
            {holding
              ? 'Update the details of your existing holding.'
              : 'Add a new holding to your portfolio.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="ticker"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ticker Symbol</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., RELIANCE.NS" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Reliance Industries" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="sector"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sector</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Conglomerate" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" step="any" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (INR)</FormLabel>
                    <FormControl>
                      <Input type="number" step="any" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="costBasis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cost Basis (INR)</FormLabel>
                    <FormControl>
                      <Input type="number" step="any" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">{holding ? 'Save Changes' : 'Add Holding'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
