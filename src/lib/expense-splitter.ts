import type { Expense, Person, SimplifiedDebt } from './types';

// Calculates the net balance for each person.
// Positive balance means the person is owed money.
// Negative balance means the person owes money.
export function calculateBalances(
  expenses: Expense[],
  people: Person[]
): Map<string, number> {
  const balances = new Map<string, number>(
    people.map(person => [person.id, 0])
  );

  for (const expense of expenses) {
    const { amount, paidById, participantIds } = expense;
    const share = amount / participantIds.length;

    // Credit the payer
    balances.set(paidById, (balances.get(paidById) || 0) + amount);

    // Debit the participants
    for (const participantId of participantIds) {
      balances.set(
        participantId,
        (balances.get(participantId) || 0) - share
      );
    }
  }

  return balances;
}

// Simplifies the debts into the minimum number of transactions.
export function simplifyDebts(balances: Map<string, number>, people: Person[]): SimplifiedDebt[] {
  const peopleById = new Map(people.map(p => [p.id, p]));
  const transactions: SimplifiedDebt[] = [];

  const debtors = Array.from(balances.entries())
    .filter(([, amount]) => amount < 0)
    .map(([id, amount]) => ({ id, amount: -amount }));

  const creditors = Array.from(balances.entries())
    .filter(([, amount]) => amount > 0)
    .map(([id, amount]) => ({ id, amount }));
  
  // Use a greedy approach to settle debts
  let debtorIndex = 0;
  let creditorIndex = 0;

  while (debtorIndex < debtors.length && creditorIndex < creditors.length) {
    const debtor = debtors[debtorIndex];
    const creditor = creditors[creditorIndex];
    const amountToSettle = Math.min(debtor.amount, creditor.amount);

    if (amountToSettle > 0.01) { // Avoid floating point inaccuracies
      transactions.push({
        from: peopleById.get(debtor.id)!,
        to: peopleById.get(creditor.id)!,
        amount: amountToSettle,
      });

      debtor.amount -= amountToSettle;
      creditor.amount -= amountToSettle;
    }

    if (debtor.amount < 0.01) {
      debtorIndex++;
    }
    if (creditor.amount < 0.01) {
      creditorIndex++;
    }
  }

  return transactions;
}
