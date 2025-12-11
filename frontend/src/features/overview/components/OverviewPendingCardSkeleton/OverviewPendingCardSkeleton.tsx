import { Item, ItemContent } from "@/components/ui/Item";
import { Skeleton } from "@/components/ui/Skeleton";

export const OverviewPendingCardSkeleton = () => {
  return (
    <Item variant="muted" size="sm">
      <ItemContent>
        <Skeleton className="h-3 w-16 mb-2" />
        <Skeleton className="h-6 w-24 mb-2" />
        <Skeleton className="h-3 w-20" />
      </ItemContent>
    </Item>
  );
};
