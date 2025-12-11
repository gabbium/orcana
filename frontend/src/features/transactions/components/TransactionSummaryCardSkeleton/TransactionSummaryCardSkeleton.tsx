import { Item, ItemContent } from "@/components/ui/Item";
import { Skeleton } from "@/components/ui/Skeleton";

export const TransactionSummaryCardSkeleton = () => {
  return (
    <Item variant="muted" size="sm">
      <ItemContent>
        <Skeleton className="h-3 w-16 mb-2" />
        <Skeleton className="h-6 w-24" />
      </ItemContent>
    </Item>
  );
};
