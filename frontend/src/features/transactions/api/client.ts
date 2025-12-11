import { TRANSACTION_KIND, TRANSACTION_STATUS, type TransactionKind } from "../constants/enums";
import type { Transaction, TransactionSummary } from "../types/transaction";

export type ListTransactionsParams = {
  kinds?: TransactionKind | TransactionKind[];
};

export const listTransactions = async (params: ListTransactionsParams): Promise<Transaction[]> => {
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
      kind: TRANSACTION_KIND.EXPENSE,
    },
    {
      id: "2",
      icon: "💼",
      title: "Freelancer UI",
      category: "Trabalho extra",
      date: "15 set",
      amount: 800.0,
      status: TRANSACTION_STATUS.PENDING,
      kind: TRANSACTION_KIND.INCOME,
    },
    {
      id: "3",
      icon: "💡",
      title: "Conta de luz",
      category: "Moradia",
      date: "20 set",
      amount: 230.0,
      status: TRANSACTION_STATUS.PENDING,
      kind: TRANSACTION_KIND.EXPENSE,
    },
    {
      id: "4",
      icon: "🏠",
      title: "Aluguel",
      category: "Moradia",
      date: "01 set",
      amount: 1200.0,
      status: TRANSACTION_STATUS.CONFIRMED,
      kind: TRANSACTION_KIND.EXPENSE,
    },
    {
      id: "5",
      icon: "💰",
      title: "Salário",
      category: "Receita",
      date: "05 set",
      amount: 5000.0,
      status: TRANSACTION_STATUS.CONFIRMED,
      kind: TRANSACTION_KIND.INCOME,
    },
  ];

  if (params?.kinds) {
    const kindsArray = Array.isArray(params.kinds) ? params.kinds : [params.kinds];
    return allTransactions.filter((transaction) => kindsArray.includes(transaction.kind));
  }

  return allTransactions;
};

export type SummaryTransactionsParams = {
  kinds?: TransactionKind | TransactionKind[];
};

export const summaryTransactions = async (
  params: SummaryTransactionsParams,
): Promise<TransactionSummary> => {
  console.log(params);

  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    currentBalance: 2450.0,
    monthlyBalance: 2450.0,
    income: {
      confirmed: { value: 5000.0, count: 1 },
      pending: { value: 800.0, count: 1 },
      total: { value: 5800.0, count: 2 },
    },
    expense: {
      confirmed: { value: 2550.0, count: 3 },
      pending: { value: 230.0, count: 1 },
      total: { value: 2780.0, count: 4 },
    },
  };
};
