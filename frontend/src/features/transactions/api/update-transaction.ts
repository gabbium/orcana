import { api } from "@/lib/api-client";

import type { Transaction } from "../types/transaction";

export type UpdateTransactionInput = {
  kind: string;
  title: string;
  icon: string;
  category: string;
  date: string;
  amount: number;
  status: string;
};

export const updateTransaction = ({
  data,
  transactionId,
}: {
  data: UpdateTransactionInput;
  transactionId: string;
}): Promise<Transaction> => {
  return api.put(`/transactions/${transactionId}`, data);
};
