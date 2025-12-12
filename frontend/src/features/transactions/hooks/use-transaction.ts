import { useQuery, queryOptions } from "@tanstack/react-query";

import type { QueryConfig } from "@/lib/react-query";

import { getTransaction } from "../api/get-transaction";

export const getTransactionQueryOptions = (transactionId: string) => {
  return queryOptions({
    queryKey: ["transactions", transactionId],
    queryFn: () => getTransaction(transactionId),
  });
};

export type UseTransactionOptions = {
  transactionId: string;
  queryConfig?: QueryConfig<typeof getTransactionQueryOptions>;
};

export const useTransaction = ({ transactionId, queryConfig }: UseTransactionOptions) => {
  return useQuery({
    ...getTransactionQueryOptions(transactionId),
    ...queryConfig,
  });
};
