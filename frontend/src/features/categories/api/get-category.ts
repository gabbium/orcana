import { CATEGORY_KIND } from "../constants/enums";
import type { Category } from "../types/category";

export const getCategory = async (categoryId: string): Promise<Category> => {
  //return api.get(`/categories/${categoryId}`);
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    id: categoryId,
    kind: CATEGORY_KIND.EXPENSE,
    icon: "🍽",
    name: "Alimentação",
    color: "#22c55e",
    status: "Ativa",
  };
};
