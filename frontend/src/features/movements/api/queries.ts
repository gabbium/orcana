import { queryOptions } from "@tanstack/react-query";

import { getMovementsSummary, listMovements } from "./servers";
import type { GetMovementsSummaryRequest, ListMovementsRequest } from "./types";

export const movementsQueries = {
  all: ["movements"],
  list: (params: ListMovementsRequest) =>
    queryOptions({
      queryKey: [...movementsQueries.all, "list", params],
      queryFn: () => listMovements(params),
    }),
  summary: (params: GetMovementsSummaryRequest) =>
    queryOptions({
      queryKey: [...movementsQueries.all, "summary", params],
      queryFn: () => getMovementsSummary(params),
    }),
};
