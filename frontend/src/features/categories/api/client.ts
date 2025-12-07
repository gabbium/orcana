import type { Category } from "../types/categories";

export const listCategories = async (): Promise<Category[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const mockData: Category[] = [
    {
      id: "1",
      name: "Salário",
      description: "Receitas fixas mensais.",
      kind: "income",
      icon: "dollar-sign",
      color: "green",
      status: "active",
    },
    {
      id: "2",
      name: "Aluguel",
      description: "Despesas com moradia.",
      kind: "expense",
      icon: "home",
      color: "blue",
      status: "active",
    },
    {
      id: "3",
      name: "Freelance",
      description: "Trabalhos pontuais.",
      kind: "income",
      icon: "briefcase",
      color: "purple",
      status: "inactive",
    },
    {
      id: "4",
      name: "Supermercado",
      description: "Supermercado e alimentos.",
      kind: "expense",
      icon: "shopping-cart",
      color: "orange",
      status: "active",
    },
  ];

  return mockData;
};

// import { api } from "@/lib/api-client";
//
// export const listCategories = async (
// ): Promise<Category[]> => {
//   const response = await api.get<Category[]>("/v1/categories", {
//     params,
//   });
//   return response.data;
// };
