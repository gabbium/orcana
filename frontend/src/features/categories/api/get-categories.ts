import { CATEGORY_KIND, type CategoryKind } from "../constants/enums";
import type { Category } from "../types/category";

export type GetCategoriesInput = {
  kind: CategoryKind;
};

export const getCategories = async (params: GetCategoriesInput): Promise<Category[]> => {
  // return api.get(`/categories`, {
  //   params,
  // });

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

  if (params?.kind) {
    return allCategories.filter((category) => category.kind === params.kind);
  }

  return allCategories;
};
