export type MovementDirection = "Income" | "Expense";

export type MovementDto = {
  id: string;
  direction: MovementDirection;
  amount: number;
  category: string;
  description: string;
  occurredAt: string;
};

export type MovementsSummaryDto = {
  totals: MovementsSummaryTotalsDto;
};

export type MovementsSummaryTotalsDto = {
  totalIncome: number;
  totalExpense: number;
  balance: number;
};

export type ListMovementsRequest = {
  pageNumber: number;
  pageSize: number;
  order?: string;
  direction?: MovementDirection[];
  minOccurredAt?: string;
  maxOccurredAt?: string;
};

export type GetMovementsSummaryRequest = {
  minOccurredAt?: string;
  maxOccurredAt?: string;
};
