export type PaginatedList<T> = {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type MovementDirection = "income" | "expense";

export type Movement = {
  id: string;
  direction: MovementDirection;
  amount: number;
  category: string;
  description: string;
  occurredAt: string;
};
