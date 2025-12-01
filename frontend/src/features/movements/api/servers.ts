import { api } from "@/lib/api-client";
import type { PaginatedList } from "@/types/api";

import type {
  CreateMovementRequest,
  GetMovementsSummaryRequest,
  ListMovementsRequest,
  MovementDto,
  MovementsSummaryDto,
} from "./types";

export const listMovements = async (
  params: ListMovementsRequest,
): Promise<PaginatedList<MovementDto>> => {
  const response = await api.get<PaginatedList<MovementDto>>("/v1/movements", {
    params,
  });
  return response.data;
};

export const getMovementsSummary = async (
  params: GetMovementsSummaryRequest,
): Promise<MovementsSummaryDto> => {
  const response = await api.get<MovementsSummaryDto>("/v1/movements/summary", {
    params,
  });
  return response.data;
};

export const createMovement = async (data: CreateMovementRequest): Promise<MovementDto> => {
  const response = await api.post<MovementDto>("v1/movements", data);
  return response.data;
};
