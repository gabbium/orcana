import { CATEGORY_KIND, type CategoryKind } from "../constants/enums";
import type { Category } from "../types/category";

export type ListCategoriesParams = {
  kinds?: CategoryKind[];
};

export const listCategories = async (params?: ListCategoriesParams): Promise<Category[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const allCategories: Category[] = [
    {
      id: "1",
      kind: CATEGORY_KIND.EXPENSE,
      icon: "🍽",
      name: "Alimentação",
      status: "Ativa",
      transactionCount: 12,
    },
    {
      id: "2",
      kind: CATEGORY_KIND.EXPENSE,
      icon: "🏠",
      name: "Moradia",
      status: "Ativa",
      transactionCount: 2,
    },
    {
      id: "3",
      kind: CATEGORY_KIND.EXPENSE,
      icon: "🎮",
      name: "Lazer",
      status: "Arquivada",
      transactionCount: 0,
    },
    {
      id: "4",
      kind: CATEGORY_KIND.INCOME,
      icon: "💼",
      name: "Salário",
      status: "Ativa",
      transactionCount: 2,
    },
    {
      id: "5",
      kind: CATEGORY_KIND.INCOME,
      icon: "🧾",
      name: "Freelancer",
      status: "Ativa",
      transactionCount: 0,
    },
  ];

  if (params?.kinds && params.kinds.length > 0) {
    return allCategories.filter((category) => params.kinds!.includes(category.kind));
  }

  return allCategories;
};
