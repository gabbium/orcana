import { ItemGroup } from "@/components/ui/Item";
import type { TransactionSummary } from "@/features/transactions/types/transaction";

import { OverviewPendingCard, OverviewPendingCardSkeleton } from "../OverviewPendingCard";

export type OverviewPendingGroupProps = {
  data?: TransactionSummary;
  isLoading?: boolean;
};

export const OverviewPendingGroup = ({ data, isLoading = false }: OverviewPendingGroupProps) => {
  if (isLoading || !data) {
    return <OverviewPendingGroupSkeleton />;
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium text-foreground">Pendências</p>

      <ItemGroup className="grid grid-cols-2 gap-3">
        <OverviewPendingCard
          label="A receber"
          value={data.income.pending.value}
          count={data.income.pending.count}
          isPositive
        />
        <OverviewPendingCard
          label="A pagar"
          value={data.expense.pending.value}
          count={data.expense.pending.count}
        />
      </ItemGroup>
    </div>
  );
};

export const OverviewPendingGroupSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium text-foreground">Pendências</p>

      <ItemGroup className="grid grid-cols-2 gap-3">
        <OverviewPendingCardSkeleton />
        <OverviewPendingCardSkeleton />
      </ItemGroup>
    </div>
  );
};
