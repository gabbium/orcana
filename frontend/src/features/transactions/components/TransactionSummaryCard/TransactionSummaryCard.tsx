import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/Item";
import { cn } from "@/utils/cn";

export type TransactionSummaryCardProps = {
  label: string;
  value: number;
  isPositive: boolean;
};

export const TransactionSummaryCard = ({
  label,
  value,
  isPositive,
}: TransactionSummaryCardProps) => {
  return (
    <Item variant="muted" size="sm">
      <ItemContent>
        <ItemDescription className="text-xs">{label}</ItemDescription>
        <ItemTitle
          className={cn(
            "text-lg sm:text-xl font-semibold",
            isPositive ? "text-green-600" : "text-red-600",
          )}
        >
          R$ {value.toFixed(2).replace(".", ",")}
        </ItemTitle>
      </ItemContent>
    </Item>
  );
};
