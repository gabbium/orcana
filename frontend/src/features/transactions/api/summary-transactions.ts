import type { TransactionKind } from "../constants/enums";
import type { TransactionSummary } from "../types/transaction";

export type SummaryTransactionsInput = {
  kind?: TransactionKind | TransactionKind[];
};

export const summaryTransactions = async (
  params: SummaryTransactionsInput,
): Promise<TransactionSummary> => {
  console.log(params);

  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
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
