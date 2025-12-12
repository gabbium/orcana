import { CATEGORY_KIND, type CategoryKind } from "../constants/enums";
import type { Category } from "../types/category";

export type ListCategoriesParams = {
  kinds?: CategoryKind | CategoryKind[];
};

export const listCategories = async (params?: ListCategoriesParams): Promise<Category[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const allCategories: Category[] = [
    {
      id: "1",
      kind: CATEGORY_KIND.EXPENSE,
      icon: "🍽",
      name: "Alimentação",
      color: "#22c55e",
      status: "Ativa",
    },
    {
      id: "2",
      kind: CATEGORY_KIND.EXPENSE,
      icon: "🏠",
      name: "Moradia",
      color: "#f97316",
      status: "Ativa",
    },
    {
      id: "3",
      kind: CATEGORY_KIND.EXPENSE,
      icon: "🎮",
      name: "Lazer",
      color: "#a855f7",
      status: "Arquivada",
    },
    {
      id: "4",
      kind: CATEGORY_KIND.INCOME,
      icon: "💼",
      name: "Salário",
      color: "#10b981",
      status: "Ativa",
    },
    {
      id: "5",
      kind: CATEGORY_KIND.INCOME,
      icon: "🧾",
      name: "Freelancer",
      color: "#3b82f6",
      status: "Ativa",
    },
  ];

  if (params?.kinds && params.kinds.length > 0) {
    return allCategories.filter((category) => params.kinds!.includes(category.kind));
  }

  return allCategories;
};

export type CreateCategoryRequest = {
  name: string;
  icon: string;
  color: string;
  kind: CategoryKind;
};

export const createCategory = async (data: CreateCategoryRequest) => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  console.log(data);
};
