import { useQuery, queryOptions } from "@tanstack/react-query";

import type { QueryConfig } from "@/lib/react-query";

import { getCategory } from "../api/get-category";

export const getCategoryQueryOptions = (categoryId: string) => {
  return queryOptions({
    queryKey: ["categories", categoryId],
    queryFn: () => getCategory(categoryId),
  });
};

export type UseCategoryOptions = {
  categoryId: string;
  queryConfig?: QueryConfig<typeof getCategoryQueryOptions>;
};

export const useCategory = ({ categoryId, queryConfig }: UseCategoryOptions) => {
  return useQuery({
    ...getCategoryQueryOptions(categoryId),
    ...queryConfig,
  });
};
