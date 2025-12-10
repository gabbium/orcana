import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/Item";

import type { Category } from "../../types/category";

export type CategoryItemProps = {
  category: Category;
};

export const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Item className="cursor-pointer" variant="outline" size="sm">
      <ItemMedia variant="icon">{category.icon}</ItemMedia>
      <ItemContent>
        <ItemTitle>{category.name}</ItemTitle>
        <ItemDescription className="text-xs">
          {category.status}
          {category.transactionCount > 0 && ` • ${category.transactionCount} transações`}
        </ItemDescription>
      </ItemContent>
    </Item>
  );
};
