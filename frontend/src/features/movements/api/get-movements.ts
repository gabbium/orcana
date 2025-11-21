import { z } from "zod";
import { api } from "@/lib/api-client";
import { type Movement, MovementDirection, type PaginatedList } from "@/types/api";
import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

export const getMovementsParamsSchema = z.object({
  pageNumber: z.number().min(1),
  pageSize: z.number().min(1).max(100),
  order: z.string().optional(),
  direction: z.array(z.enum(MovementDirection)).optional(),
  minOccurredAt: z.iso.datetime().optional(),
  maxOccurredAt: z.iso.datetime().optional(),
});

export type GetMovementsParams = z.infer<typeof getMovementsParamsSchema>;

export const getMovements = (params: GetMovementsParams) => {
  return api.get<PaginatedList<Movement>>("/v1/movements", {
    params,
  });
};

export const getInfiniteMovementsQueryOptions = () => {
  return infiniteQueryOptions({
    queryKey: ["movements"],
    queryFn: ({ pageParam = 1 }) => {
      return getMovements({ pageNumber: pageParam, pageSize: 3 });
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage?.data?.hasNextPage) {
        return undefined;
      }
      const nextPage = lastPage?.data?.pageNumber + 1;
      return nextPage;
    },
    initialPageParam: 1,
  });
};

export const useInfiniteMovements = () => {
  return useInfiniteQuery({
    ...getInfiniteMovementsQueryOptions(),
  });
};
