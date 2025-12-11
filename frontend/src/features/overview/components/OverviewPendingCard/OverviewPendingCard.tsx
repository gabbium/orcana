import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/Item";

export type OverviewPendingCardProps = {
  label: string;
  value: number;
  count: number;
  isPositive: boolean;
};

export const OverviewPendingCard = ({
  label,
  value,
  count,
  isPositive,
}: OverviewPendingCardProps) => {
  const formatCurrency = (val: number) => `R$ ${val.toFixed(2).replace(".", ",")}`;
  const textColor = isPositive ? "text-green-600" : "text-red-600";

  return (
    <Item variant="muted" size="sm">
      <ItemContent>
        <ItemDescription className="text-xs">{label}</ItemDescription>
        <ItemTitle className={`text-base sm:text-lg font-semibold ${textColor}`}>
          {formatCurrency(value)}
        </ItemTitle>
        <ItemDescription className="text-xs">{count} lançamentos</ItemDescription>
      </ItemContent>
    </Item>
  );
};
