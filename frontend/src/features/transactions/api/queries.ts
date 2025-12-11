import { queryOptions } from "@tanstack/react-query";

import {
  listTransactions,
  summaryTransactions,
  type ListTransactionsParams,
  type SummaryTransactionsParams,
} from "./client";

export const transactionsQueries = {
  all: ["transactions"],
  list: (params: ListTransactionsParams) =>
    queryOptions({
      queryKey: [...transactionsQueries.all, "list", params],
      queryFn: () => listTransactions(params),
    }),
  summary: (params: SummaryTransactionsParams) =>
    queryOptions({
      queryKey: [...transactionsQueries.all, "summary", params],
      queryFn: () => summaryTransactions(params),
    }),
};
