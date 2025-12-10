export const CATEGORY_KIND = {
  EXPENSE: "expense",
  INCOME: "income",
} as const;

export type CategoryKind = (typeof CATEGORY_KIND)[keyof typeof CATEGORY_KIND];
