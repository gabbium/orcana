import { queryOptions } from "@tanstack/react-query";

import { listCategories, type ListCategoriesParams } from "./client";

export const categoriesQueries = {
  all: ["categories"],
  list: (params: ListCategoriesParams) =>
    queryOptions({
      queryKey: [...categoriesQueries.all, "list", params],
      queryFn: () => listCategories(params),
    }),
};
