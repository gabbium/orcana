import { TRANSACTION_STATUS } from "../constants/enums";
import type { ListTransactionsInput } from "../schemas/list-transactions";
import type { Transaction } from "../types/transaction";

export const listTransactions = async (params: ListTransactionsInput): Promise<Transaction[]> => {
  console.log(params);

  await new Promise((resolve) => setTimeout(resolve, 300));

  const allTransactions: Transaction[] = [
    {
      id: "1",
      icon: "🍽",
      title: "Almoço restaurante",
      category: "Alimentação",
      date: "10 set",
      amount: 45.0,
      status: TRANSACTION_STATUS.CONFIRMED,
      kind: "expense",
    },
    {
      id: "2",
      icon: "💼",
      title: "Freelancer UI",
      category: "Trabalho extra",
      date: "15 set",
      amount: 800.0,
      status: TRANSACTION_STATUS.PENDING,
      kind: "income",
    },
    {
      id: "3",
      icon: "💡",
      title: "Conta de luz",
      category: "Moradia",
      date: "20 set",
      amount: 230.0,
      status: TRANSACTION_STATUS.PENDING,
      kind: "expense",
    },
    {
      id: "4",
      icon: "🏠",
      title: "Aluguel",
      category: "Moradia",
      date: "01 set",
      amount: 1200.0,
      status: TRANSACTION_STATUS.CONFIRMED,
      kind: "expense",
    },
    {
      id: "5",
      icon: "💰",
      title: "Salário",
      category: "Receita",
      date: "05 set",
      amount: 5000.0,
      status: TRANSACTION_STATUS.CONFIRMED,
      kind: "income",
    },
  ];

  if (params?.kind) {
    const kindsArray = Array.isArray(params.kind) ? params.kind : [params.kind];
    return allTransactions.filter((transaction) => kindsArray.includes(transaction.kind));
  }

  return allTransactions;
};
