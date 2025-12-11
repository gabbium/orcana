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
  monthlyBalance: number;
  income: {
    confirmed: { value: number; count: number };
    pending: { value: number; count: number };
    total: { value: number; count: number };
  };
  expense: {
    confirmed: { value: number; count: number };
    pending: { value: number; count: number };
    total: { value: number; count: number };
  };
};
