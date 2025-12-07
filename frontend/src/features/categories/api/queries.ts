import { queryOptions } from "@tanstack/react-query";

import { listCategories } from "./client";

export const categoriesQueries = {
  all: ["categories"],
  list: () =>
    queryOptions({
      queryKey: [...categoriesQueries.all, "list"],
      queryFn: () => listCategories(),
    }),
};
