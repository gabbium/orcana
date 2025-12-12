import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { MutationConfig } from "@/lib/react-query";

import { createTransaction } from "../api/create-transaction";

export type UseCreateTransactionOptions = {
  mutationConfig?: MutationConfig<typeof createTransaction>;
};

export const useCreateTransaction = ({ mutationConfig }: UseCreateTransactionOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createTransaction,
  });
};
