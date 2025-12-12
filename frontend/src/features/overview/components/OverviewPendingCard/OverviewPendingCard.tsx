import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/Item";
import { Skeleton } from "@/components/ui/Skeleton";

export type OverviewPendingCardProps = {
  label: string;
  value: number;
  count: number;
  isPositive?: boolean;
};

export const OverviewPendingCard = ({
  label,
  value,
  count,
  isPositive,
}: OverviewPendingCardProps) => {
  const formatCurrency = (val: number) => `R$ ${val.toFixed(2).replace(".", ",")}`;
  const valueColor = isPositive ? "text-green-600" : "text-red-600";

  return (
    <Item variant="muted" size="sm">
      <ItemContent>
        <ItemDescription>{label}</ItemDescription>
        <ItemTitle className={valueColor}>{formatCurrency(value)}</ItemTitle>
        <ItemDescription>{count} lançamentos</ItemDescription>
      </ItemContent>
    </Item>
  );
};

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
