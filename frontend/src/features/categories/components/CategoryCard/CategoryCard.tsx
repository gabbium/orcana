import { Link } from "@tanstack/react-router";

import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/Item";
import { Skeleton } from "@/components/ui/Skeleton";

export type CategoryCardProps = {
  id: string;
  name: string;
  icon: string;
  status: string;
};

export const CategoryCard = ({ id, name, icon, status }: CategoryCardProps) => {
  return (
    <Item className="cursor-pointer" variant="outline" size="sm" asChild>
      <Link to="/app/categories/$id/edit" params={{ id }}>
        <ItemMedia variant="icon">{icon}</ItemMedia>
        <ItemContent>
          <ItemTitle>{name}</ItemTitle>
          <ItemDescription>{status}</ItemDescription>
        </ItemContent>
      </Link>
    </Item>
  );
};

export const CategoryCardSkeleton = () => {
  return (
    <Item className="cursor-pointer" variant="outline" size="sm">
      <ItemMedia variant="icon">
        <Skeleton className="h-6 w-6 rounded-full" />
      </ItemMedia>
      <ItemContent>
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-3 w-32" />
      </ItemContent>
    </Item>
  );
};
