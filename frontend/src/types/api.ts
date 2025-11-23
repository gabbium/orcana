import { ArrowDownCircleIcon, ArrowUpCircleIcon } from "lucide-react";

export type PaginatedList<T> = {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export const MovementDirection = [
  {
    label: "Income",
    value: "income",
    icon: ArrowUpCircleIcon,
  },
  {
    label: "Expense",
    value: "expense",
    icon: ArrowDownCircleIcon,
  },
] as const;

export type MovementDirection = (typeof MovementDirection)[number]["value"];

export type Movement = {
  id: string;
  direction: MovementDirection;
  amount: number;
  description: string;
  occurredAt: string;
};
