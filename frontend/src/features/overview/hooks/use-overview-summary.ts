import { useQuery, queryOptions } from "@tanstack/react-query";

import type { QueryConfig } from "@/lib/react-query";

import { summaryTransactions } from "@/features/transactions/api/summary-transactions";
import type { OverviewFilter } from "../schemas/overview";

export const getOverviewSummaryQueryOptions = (params: OverviewFilter) => {
  return queryOptions({
    queryKey: ["overview", "summary", params],
    queryFn: () => summaryTransactions({}),
  });
};

export type UseOverviewSummaryOptions = {
  params: OverviewFilter;
  queryConfig?: QueryConfig<typeof getOverviewSummaryQueryOptions>;
};

export const useOverviewSummary = ({ params, queryConfig }: UseOverviewSummaryOptions) => {
  return useQuery({
    ...getOverviewSummaryQueryOptions(params),
    ...queryConfig,
  });
};
