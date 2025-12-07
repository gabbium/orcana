import { queryOptions } from "@tanstack/react-query";

import { listCategories } from "./client";
import type { ListCategoriesRequest } from "./types";

export const categoriesQueries = {
  all: ["categories"],
  list: (params: ListCategoriesRequest) =>
    queryOptions({
      queryKey: [...categoriesQueries.all, "list", params],
      queryFn: () => listCategories(params),
    }),
};
