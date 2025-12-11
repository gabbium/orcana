import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/Item";

export type OverviewCategoryBreakdownCardProps = {
  icon: string;
  name: string;
  amount: number;
  count: number;
  percentage: number;
};

export const OverviewCategoryBreakdownCard = ({
  icon,
  name,
  amount,
  count,
  percentage,
}: OverviewCategoryBreakdownCardProps) => {
  const formatCurrency = (value: number) => `R$ ${value.toFixed(2).replace(".", ",")}`;

  return (
    <Item variant="muted" size="sm">
      <ItemMedia variant="icon">{icon}</ItemMedia>
      <ItemContent>
        <ItemTitle>{name}</ItemTitle>
        <ItemDescription className="text-xs">
          {formatCurrency(amount)} em {count} lançamentos
        </ItemDescription>
      </ItemContent>
      <ItemContent>
        <ItemTitle>{percentage}%</ItemTitle>
        <ItemDescription className="text-xs text-right">do total</ItemDescription>
      </ItemContent>
    </Item>
  );
};
