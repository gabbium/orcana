import { Item, ItemContent, ItemMedia } from "@/components/ui/Item";
import { Skeleton } from "@/components/ui/Skeleton";

export const TransactionCardSkeleton = () => {
  return (
    <Item className="cursor-pointer" variant="outline" size="sm">
      <ItemMedia variant="icon">
        <Skeleton className="h-6 w-6 rounded" />
      </ItemMedia>
      <ItemContent>
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-3 w-40" />
      </ItemContent>
      <ItemContent>
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-3 w-16" />
      </ItemContent>
    </Item>
  );
};
