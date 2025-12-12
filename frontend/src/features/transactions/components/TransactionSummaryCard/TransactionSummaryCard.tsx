import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/Item";
import { Skeleton } from "@/components/ui/Skeleton";

export type TransactionSummaryCardProps = {
  label: string;
  value: number;
  isPositive?: boolean;
};

export const TransactionSummaryCard = ({
  label,
  value,
  isPositive,
}: TransactionSummaryCardProps) => {
  const valueColor = isPositive ? "text-green-600" : "text-red-600";

  return (
    <Item variant="muted" size="sm">
      <ItemContent>
        <ItemDescription>{label}</ItemDescription>
        <ItemTitle className={valueColor}>
          R$ {value.toFixed(2).replace(".", ",")}
        </ItemTitle>
      </ItemContent>
    </Item>
  );
};

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
