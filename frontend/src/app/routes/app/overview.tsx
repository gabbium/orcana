import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

import { FloatingActionButton } from "@/components/ui/FloatingActionButton";
import { ItemGroup } from "@/components/ui/Item";
import {
  OverviewBalanceCard,
  OverviewBalanceCardSkeleton,
  OverviewPendingCard,
  OverviewPendingCardSkeleton,
  OverviewToolbar,
  type OverviewFilter,
} from "@/features/overview";
import { transactionsQueries } from "@/features/transactions/api/queries";

const OverviewPage = () => {
  const [filter, setFilter] = useState<OverviewFilter>({
    month: "setembro de 2025",
  });

  const transactionsSummaryQuery = useQuery(transactionsQueries.summary({}));

  return (
    <div className="flex flex-col gap-4 relative">
      <OverviewToolbar filter={filter} onFilterChange={setFilter} />

      {transactionsSummaryQuery.isPending && <OverviewBalanceCardSkeleton />}

      {transactionsSummaryQuery.data && (
        <OverviewBalanceCard
          balance={transactionsSummaryQuery.data.monthlyBalance}
          totalIncome={transactionsSummaryQuery.data.income.total.value}
          totalExpense={transactionsSummaryQuery.data.expense.total.value}
        />
      )}

      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-foreground">Pendências</p>

        {transactionsSummaryQuery.isPending && (
          <ItemGroup className="grid grid-cols-2 gap-3">
            <OverviewPendingCardSkeleton />
            <OverviewPendingCardSkeleton />
          </ItemGroup>
        )}

        {transactionsSummaryQuery.data && (
          <ItemGroup className="grid grid-cols-2 gap-3">
            <OverviewPendingCard
              label="A receber"
              value={transactionsSummaryQuery.data.income.pending.value}
              count={transactionsSummaryQuery.data.income.pending.count}
              isPositive
            />
            <OverviewPendingCard
              label="A pagar"
              value={transactionsSummaryQuery.data.expense.pending.value}
              count={transactionsSummaryQuery.data.expense.pending.count}
            />
          </ItemGroup>
        )}
      </div>

      <FloatingActionButton icon={<PlusIcon />} />
    </div>
  );
};

export const Route = createFileRoute("/app/overview")({
  component: OverviewPage,
});
