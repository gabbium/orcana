import type { TransactionKind, TransactionStatus } from "../constants/enums";

export type Transaction = {
  id: string;
  title: string;
  icon: string;
  category: string;
  date: string;
  amount: number;
  status: TransactionStatus;
  kind: TransactionKind;
};

export type TransactionSummary = {
  currentBalance: number;
  monthBalance: number;
  income: {
    confirmed: number;
    pending: number;
    total: number;
  };
  expense: {
    confirmed: number;
    pending: number;
    total: number;
  };
};

export interface TransactionCategoryBreakdown {
  icon: string;
  name: string;
  amount: number;
  count: number;
  percentage: number;
}
