import { api } from "@/lib/api-client";

import type { Category } from "../types/category";

export type UpdateCategoryInput = {
  kind: string;
  name: string;
  icon: string;
  color: string;
};

export const updateCategory = ({
  data,
  categoryId,
}: {
  data: UpdateCategoryInput;
  categoryId: string;
}): Promise<Category> => {
  return api.put(`/categories/${categoryId}`, data);
};
