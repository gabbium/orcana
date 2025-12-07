export type CategoryDto = {
  id: string;
  name: string;
  description: string;
  kind: string;
  icon: string;
  color: string;
  status: string;
};

export type ListCategoriesRequest = {
  pageNumber?: number;
  pageSize?: number;
  order?: string;
  name?: string;
  kind?: string[];
  status?: string[];
};
