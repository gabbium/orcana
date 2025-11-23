export type PaginatedList<T> = {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export const MovementDirection = {
  EXPENSE: "expense",
  INCOME: "income",
} as const;

export type MovementDirection = (typeof MovementDirection)[keyof typeof MovementDirection];

export type Movement = {
  id: string;
  direction: MovementDirection;
  amount: number;
  description?: string;
  occurredAt: string;
};
