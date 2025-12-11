import { ItemGroup } from "@/components/ui/Item";

import type { Category } from "../../types/category";
import { CategoryCard } from "../CategoryCard/CategoryCard";

export type CategoryListProps = {
  categories: Category[];
};

export const CategoryList = ({ categories }: CategoryListProps) => {
  return (
    <ItemGroup className="gap-2">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </ItemGroup>
  );
};
