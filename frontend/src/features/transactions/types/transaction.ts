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
