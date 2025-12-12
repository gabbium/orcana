import { api } from "@/lib/api-client";

import type { Transaction } from "../types/transaction";

export type CreateTransactionInput = {
  kind: string;
  title: string;
  icon: string;
  category: string;
  date: string;
  amount: number;
  status: string;
};

export const createTransaction = (data: CreateTransactionInput): Promise<Transaction> => {
  return api.post(`/transactions`, data);
};
