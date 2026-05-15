/**
 * Shared TypeScript types mirroring the Python domain models.
 * Expand as backend entities are implemented.
 */

export interface Movement {
  id: string;
  date: string;
  description: string;
  product: string;
  type: "cargo" | "abono";
  category: string;
  amount: number;
  balance?: number;
}

export interface CreditSummary {
  totalDebt: number;
  minimumPayment: number;
  noInterestPayment: number;
  creditLimit: number;
  availableCredit: number;
  msiBalance: number;
}

export interface MSIPlan {
  id: string;
  description: string;
  originalAmount: number;
  pendingBalance: number;
  monthlyPayment: number;
  totalMonths: number;
  remainingMonths: number;
}

export interface TrackerExpense {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
}

export interface TrackerCycle {
  budget: number;
  totalSpent: number;
  remaining: number;
  percentUsed: number;
  expenses: TrackerExpense[];
}
