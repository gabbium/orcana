import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { MutationConfig } from "@/lib/react-query";

import { updateTransaction } from "../api/update-transaction";

export type UseUpdateTransactionOptions = {
  mutationConfig?: MutationConfig<typeof updateTransaction>;
};

export const useUpdateTransaction = ({ mutationConfig }: UseUpdateTransactionOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateTransaction,
  });
};
