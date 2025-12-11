import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/Item";

export type OverviewBalanceCardProps = {
  balance: number;
  totalIncome: number;
  totalExpense: number;
};

export const OverviewBalanceCard = ({
  balance,
  totalIncome,
  totalExpense,
}: OverviewBalanceCardProps) => {
  const formatCurrency = (value: number) => `R$ ${value.toFixed(2).replace(".", ",")}`;

  return (
    <Item variant="muted" size="sm">
      <ItemContent>
        <ItemDescription className="text-xs">Saldo do mês</ItemDescription>
        <ItemTitle className="text-base sm:text-lg">{formatCurrency(balance)}</ItemTitle>
      </ItemContent>
      <ItemContent>
        <ItemDescription className="text-xs">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
          Receitas: {formatCurrency(totalIncome)}
        </ItemDescription>
        <ItemDescription className="text-xs">
          <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
          Despesas: {formatCurrency(totalExpense)}
        </ItemDescription>
      </ItemContent>
    </Item>
  );
};
