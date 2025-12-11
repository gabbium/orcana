import { Item, ItemContent, ItemMedia } from "@/components/ui/Item";
import { Skeleton } from "@/components/ui/Skeleton";

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
