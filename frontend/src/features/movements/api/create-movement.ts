import { z } from "zod";
import { api } from "@/lib/api-client";
import { type Movement, MovementDirection } from "@/types/api";
import type { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getInfiniteMovementsQueryOptions } from "./get-movements";

export const createMovementPayloadSchema = z.object({
  direction: z.enum(MovementDirection),
  amount: z.number().positive(),
  description: z.string().max(128).optional(),
  occurredAt: z.iso.datetime(),
});

export type CreateMovementPayload = z.infer<typeof createMovementPayloadSchema>;

export const createMovement = (data: CreateMovementPayload) => {
  return api.post<Movement>("/v1/movements", data);
};

type UseCreateMovementOptions = {
  mutationConfig?: MutationConfig<typeof createMovement>;
};

export const useCreateMovement = ({ mutationConfig }: UseCreateMovementOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getInfiniteMovementsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createMovement,
  });
};
