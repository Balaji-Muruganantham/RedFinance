'use client';

import { useState, useMemo, useEffect } from 'react';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Person, Expense, SimplifiedDebt, SplitGroup } from '@/lib/types';
import { calculateBalances, simplifyDebts } from '@/lib/expense-splitter';
import AddExpenseDialog from './add-expense-dialog';
import BalancesSummary from './balances-summary';
import ExpenseList from './expense-list';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, Timestamp } from 'firebase/firestore';
import AddGroupDialog from './add-group-dialog';
import GroupsList from './groups-list';

export default function ExpenseSplitterPage() {
  const [people, setPeople] = useState<Person[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [groups, setGroups] = useState<SplitGroup[]>([]);
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);
  const [isGroupDialogOpen, setIsGroupDialogOpen] = useState(false);
  const [simplifiedDebts, setSimplifiedDebts] = useState<SimplifiedDebt[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Listener for people
    const peopleQuery = query(collection(db, 'people'), orderBy('name', 'asc'));
    const unsubscribePeople = onSnapshot(peopleQuery, (querySnapshot) => {
      const peopleData: Person[] = [];
      querySnapshot.forEach((doc) => {
        peopleData.push({ id: doc.id, ...doc.data() } as Person);
      });
      setPeople(peopleData);
    }, (error) => {
      console.error("Error fetching people:", error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not connect to the database to fetch people. Make sure your Firebase setup is correct.',
      });
    });

    // Listener for expenses
    const expensesQuery = query(collection(db, 'expenses'), orderBy('date', 'desc'));
    const unsubscribeExpenses = onSnapshot(expensesQuery, (querySnapshot) => {
      const expensesData: Expense[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const date = (data.date as Timestamp)?.toDate().toISOString() ?? new Date().toISOString();
        expensesData.push({ 
          id: doc.id, 
          ...data,
          date,
        } as Expense);
      });
      setExpenses(expensesData);
    });
    
    // Listener for groups
    const groupsQuery = query(collection(db, 'groups'), orderBy('name', 'asc'));
    const unsubscribeGroups = onSnapshot(groupsQuery, (querySnapshot) => {
      const groupsData: SplitGroup[] = [];
      querySnapshot.forEach((doc) => {
        groupsData.push({ id: doc.id, ...doc.data() } as SplitGroup);
      });
      setGroups(groupsData);
    }, (error) => {
      console.error("Error fetching groups:", error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not fetch groups from the database.',
      });
    });


    // Cleanup listeners on unmount
    return () => {
      unsubscribePeople();
      unsubscribeExpenses();
      unsubscribeGroups();
    };
  }, [toast]);

  const balances = useMemo(() => calculateBalances(expenses, people), [expenses, people]);

  const handleAddExpense = async (expense: Omit<Expense, 'id' | 'date'>) => {
    try {
      await addDoc(collection(db, 'expenses'), {
        ...expense,
        date: serverTimestamp(),
      });
      setSimplifiedDebts([]); // Reset simplified debts on new expense
      toast({
          title: 'Expense Added',
          description: `"${expense.description}" for ${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(expense.amount)} has been added and synced.`,
      });
    } catch (error) {
       toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to add expense. Please try again.',
      });
      console.error("Error adding document: ", error);
    }
  };
  
  const handleAddGroup = async (group: Omit<SplitGroup, 'id'>) => {
     try {
      await addDoc(collection(db, 'groups'), group);
      toast({
          title: 'Group Created',
          description: `The "${group.name}" group has been created and synced.`,
      });
    } catch (error) {
       toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create group. Please try again.',
      });
      console.error("Error adding group: ", error);
    }
  };

  const handleSimplifyDebts = () => {
    const simplified = simplifyDebts(balances, people);
    setSimplifiedDebts(simplified);
  };
  
  const handleAddPerson = () => {
    toast({
        title: 'Feature not available',
        description: 'You can add people directly in your Firebase Firestore console.',
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Expense Splitter</h2>
        <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => setIsGroupDialogOpen(true)} disabled={people.length < 2}>
              <Plus className="mr-2 h-4 w-4" /> Add Group
            </Button>
            <Button variant="outline" onClick={handleAddPerson}>
                <Plus className="mr-2 h-4 w-4" /> Add Person
            </Button>
            <Button onClick={() => setIsExpenseDialogOpen(true)} disabled={people.length === 0}>
                <Plus className="mr-2 h-4 w-4" /> Add Expense
            </Button>
        </div>
      </div>
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <BalancesSummary 
                balances={balances}
                people={people}
                simplifiedDebts={simplifiedDebts}
                onSimplify={handleSimplifyDebts}
            />
            <GroupsList groups={groups} people={people} />
        </div>
        <div className="lg:col-span-3">
            <ExpenseList expenses={expenses} people={people} />
        </div>
      </div>
      <AddExpenseDialog 
        isOpen={isExpenseDialogOpen}
        setIsOpen={setIsExpenseDialogOpen}
        onAddExpense={handleAddExpense}
        people={people}
      />
      <AddGroupDialog 
        isOpen={isGroupDialogOpen}
        setIsOpen={setIsGroupDialogOpen}
        onAddGroup={handleAddGroup}
        people={people}
      />
    </div>
  );
}
