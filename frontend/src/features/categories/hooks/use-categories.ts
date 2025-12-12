import { useQuery, queryOptions } from "@tanstack/react-query";

import type { QueryConfig } from "@/lib/react-query";

import { getCategories } from "../api/get-categories";
import type { GetCategoriesInput } from "../api/get-categories";

export const getCategoriesQueryOptions = (params: GetCategoriesInput) => {
  return queryOptions({
    queryKey: ["categories", params],
    queryFn: () => getCategories(params),
  });
};

export type UseCategoriesOptions = {
  params: GetCategoriesInput;
  queryConfig?: QueryConfig<typeof getCategoriesQueryOptions>;
};

export const useCategories = ({ queryConfig, params }: UseCategoriesOptions) => {
  return useQuery({
    ...getCategoriesQueryOptions(params),
    ...queryConfig,
  });
};
