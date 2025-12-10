import type { CategoryKind } from "./category-kind";

export type Category = {
  id: string;
  kind: CategoryKind;
  name: string;
  icon: string;
  status: string;
  transactionCount: number;
};
