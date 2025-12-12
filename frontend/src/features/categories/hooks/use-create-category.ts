import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { MutationConfig } from "@/lib/react-query";

import { createCategory } from "../api/create-category";

export type UseCreateCategoryOptions = {
  mutationConfig?: MutationConfig<typeof createCategory>;
};

export const useCreateCategory = ({ mutationConfig }: UseCreateCategoryOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createCategory,
  });
};
