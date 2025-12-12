import { TRANSACTION_STATUS } from "../constants/enums";
import type { Transaction } from "../types/transaction";

export const getTransaction = async (transactionId: string): Promise<Transaction> => {
  //return api.get(`/transactions/${transactionId}`);
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    id: transactionId,
    kind: "expense",
    icon: "🍽",
    title: "Almoço restaurante",
    category: "Alimentação",
    date: "10 set",
    amount: 45.0,
    status: TRANSACTION_STATUS.CONFIRMED,
  };
};
