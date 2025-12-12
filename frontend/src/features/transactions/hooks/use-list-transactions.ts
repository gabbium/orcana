import { useQuery, queryOptions } from "@tanstack/react-query";

import type { QueryConfig } from "@/lib/react-query";

import { listTransactions } from "../api/list-transactions";
import type { ListTransactionsInput } from "../schemas/list-transactions";

export const getListTransactionsQueryOptions = (params: ListTransactionsInput) => {
  return queryOptions({
    queryKey: ["transactions", "list", params],
    queryFn: () => listTransactions(params),
  });
};

export type UseListTransactionsOptions = {
  params: ListTransactionsInput;
  queryConfig?: QueryConfig<typeof getListTransactionsQueryOptions>;
};

export const useListTransactions = ({ params, queryConfig }: UseListTransactionsOptions) => {
  return useQuery({
    ...getListTransactionsQueryOptions(params),
    ...queryConfig,
  });
};
