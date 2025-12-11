import { Item, ItemContent } from "@/components/ui/Item";
import { Skeleton } from "@/components/ui/Skeleton";

export const OverviewBalanceCardSkeleton = () => {
  return (
    <Item variant="muted" size="sm">
      <ItemContent>
        <Skeleton className="h-3 w-16 mb-2" />
        <Skeleton className="h-6 w-32" />
      </ItemContent>
      <ItemContent>
        <div className="space-y-2">
          <Skeleton className="h-3 w-40" />
          <Skeleton className="h-3 w-40" />
        </div>
      </ItemContent>
    </Item>
  );
};
