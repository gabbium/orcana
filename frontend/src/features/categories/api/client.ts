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
      status: "Ativa",
    },
    {
      id: "2",
      kind: CATEGORY_KIND.EXPENSE,
      icon: "🏠",
      name: "Moradia",
      status: "Ativa",
    },
    {
      id: "3",
      kind: CATEGORY_KIND.EXPENSE,
      icon: "🎮",
      name: "Lazer",
      status: "Arquivada",
    },
    {
      id: "4",
      kind: CATEGORY_KIND.INCOME,
      icon: "💼",
      name: "Salário",
      status: "Ativa",
    },
    {
      id: "5",
      kind: CATEGORY_KIND.INCOME,
      icon: "🧾",
      name: "Freelancer",
      status: "Ativa",
    },
  ];

  if (params?.kinds && params.kinds.length > 0) {
    return allCategories.filter((category) => params.kinds!.includes(category.kind));
  }

  return allCategories;
};
