import { api } from "@/lib/api-client";

import type { Category } from "../types/category";

export type CreateCategoryInput = {
  kind: string;
  name: string;
  icon: string;
  color: string;
};

export const createCategory = (data: CreateCategoryInput): Promise<Category> => {
  return api.post(`/categories`, data);
};

