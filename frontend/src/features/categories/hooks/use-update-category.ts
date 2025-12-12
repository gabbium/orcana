import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { MutationConfig } from "@/lib/react-query";

import { updateCategory } from "../api/update-category";

export type UseUpdateCategoryOptions = {
  mutationConfig?: MutationConfig<typeof updateCategory>;
};

export const useUpdateCategory = ({ mutationConfig }: UseUpdateCategoryOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateCategory,
  });
};
