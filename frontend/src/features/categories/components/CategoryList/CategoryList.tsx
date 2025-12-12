import { ItemGroup } from "@/components/ui/Item";

import type { Category } from "../../types/category";
import { CategoryCard, CategoryCardSkeleton } from "../CategoryCard";

export type CategoryListProps = {
  categories: Category[];
  isLoading?: boolean;
};

export const CategoryList = ({ categories, isLoading }: CategoryListProps) => {
  if (isLoading) {
    return <CategoryListSkeleton />;
  }

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <ItemGroup className="gap-2">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          id={category.id}
          name={category.name}
          icon={category.icon}
          status={category.status}
        />
      ))}
    </ItemGroup>
  );
};

export type CategoryListSkeletonProps = {
  count?: number;
};

export const CategoryListSkeleton = ({ count = 3 }: CategoryListSkeletonProps) => {
  return (
    <ItemGroup className="gap-2">
      {Array.from({ length: count }).map((_, index) => (
        <CategoryCardSkeleton key={index} />
      ))}
    </ItemGroup>
  );
};
