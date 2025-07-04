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
import { Person, SplitGroup } from '@/lib/types';
import { useEffect } from 'react';
import { Checkbox } from './ui/checkbox';
import { ScrollArea } from './ui/scroll-area';

const formSchema = z.object({
  name: z.string().min(1, 'Group name is required'),
  memberIds: z.array(z.string()).refine(value => value.length >= 2, {
    message: 'A group must have at least two members.',
  }),
});

type AddGroupDialogProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onAddGroup: (group: Omit<SplitGroup, 'id'>) => void | Promise<void>;
  people: Person[];
};

export default function AddGroupDialog({
  isOpen,
  setIsOpen,
  onAddGroup,
  people,
}: AddGroupDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      memberIds: [],
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        name: '',
        memberIds: [],
      });
    }
  }, [form, isOpen]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await onAddGroup(values);
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Add Group</DialogTitle>
          <DialogDescription>
            Create a new group to easily split expenses with them later.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Roommates, Goa Trip" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
             <FormField
                control={form.control}
                name="memberIds"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Members</FormLabel>
                      <FormDescription>
                        Select the people who are part of this group.
                      </FormDescription>
                    </div>
                    <ScrollArea className="h-40 rounded-md border p-4">
                      <div className="grid grid-cols-2 gap-4">
                      {people.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="memberIds"
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
                    </ScrollArea>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <DialogFooter>
              <Button type="submit">Create Group</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
