import type { CategoryKind } from "../constants/enums";

export type Category = {
  id: string;
  name: string;
  icon: string;
  status: string;
  transactionCount: number;
  kind: CategoryKind;
};
