export const TRANSACTION_STATUS = {
  CONFIRMED: "confirmed",
  PENDING: "pending",
} as const;

export type TransactionStatus = (typeof TRANSACTION_STATUS)[keyof typeof TRANSACTION_STATUS];

export const TRANSACTION_KIND = {
  EXPENSE: "expense",
  INCOME: "income",
} as const;

export type TransactionKind = (typeof TRANSACTION_KIND)[keyof typeof TRANSACTION_KIND];
