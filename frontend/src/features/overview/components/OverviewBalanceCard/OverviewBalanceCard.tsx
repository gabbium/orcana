import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/Item";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/utils/cn";

export type OverviewBalanceCardProps = {
  balance?: number;
  totalIncome?: number;
  totalExpense?: number;
  isLoading?: boolean;
};

export const OverviewBalanceCard = ({
  balance,
  totalIncome,
  totalExpense,
  isLoading = false,
}: OverviewBalanceCardProps) => {
  if (isLoading || balance === undefined || totalIncome === undefined || totalExpense === undefined) {
    return <OverviewBalanceCardSkeleton />;
  }

  const formatCurrency = (value: number) => `R$ ${value.toFixed(2).replace(".", ",")}`;
  const balanceColor = balance >= 0 ? "text-green-600" : "text-red-600";

  return (
    <Item variant="muted" size="sm">
      <ItemContent>
        <ItemDescription>Balanço do mês</ItemDescription>
        <ItemTitle className={cn("text-base sm:text-lg", balanceColor)}>
          {formatCurrency(balance)}
        </ItemTitle>
      </ItemContent>
      <ItemContent>
        <ItemDescription>
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
          Receitas: {formatCurrency(totalIncome)}
        </ItemDescription>
        <ItemDescription>
          <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
          Despesas: {formatCurrency(totalExpense)}
        </ItemDescription>
      </ItemContent>
    </Item>
  );
};

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
