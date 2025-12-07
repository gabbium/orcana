import type { PaginatedList } from "@/types/api";

import type { CategoryDto, ListCategoriesRequest } from "./types";

export const listCategories = async (
  params: ListCategoriesRequest,
): Promise<PaginatedList<CategoryDto>> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const mockData: CategoryDto[] = [
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

  const pageNumber = params.pageNumber ?? 1;
  const pageSize = params.pageSize ?? 10;
  const totalItems = mockData.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  return {
    items: mockData,
    pageNumber,
    pageSize,
    totalItems,
    totalPages,
    hasPreviousPage: pageNumber > 1,
    hasNextPage: pageNumber < totalPages,
  };
};

// import { api } from "@/lib/api-client";
//
// export const listCategories = async (
//   params: ListCategoriesRequest,
// ): Promise<PaginatedList<CategoryDto>> => {
//   const response = await api.get<PaginatedList<CategoryDto>>("/v1/categories", {
//     params,
//   });
//   return response.data;
// };
