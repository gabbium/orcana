import { useQuery, queryOptions } from "@tanstack/react-query";

import type { QueryConfig } from "@/lib/react-query";

import { summaryTransactions, type SummaryTransactionsInput } from "../api/summary-transactions";

export const getSummaryTransactionsQueryOptions = (params: SummaryTransactionsInput) => {
  return queryOptions({
    queryKey: ["transactions", "summary", params],
    queryFn: () => summaryTransactions(params),
  });
};

export type UseSummaryTransactionsOptions = {
  params: SummaryTransactionsInput;
  queryConfig?: QueryConfig<typeof getSummaryTransactionsQueryOptions>;
};

export const useSummaryTransactions = ({
  params,
  queryConfig,
}: UseSummaryTransactionsOptions) => {
  return useQuery({
    ...getSummaryTransactionsQueryOptions(params),
    ...queryConfig,
  });
};
