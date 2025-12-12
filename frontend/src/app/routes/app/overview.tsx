import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

import { FloatingActionButton } from "@/components/ui/FloatingActionButton";
import {
  OverviewBalanceCard,
  OverviewBalanceCardSkeleton,
  OverviewPendingGroup,
  OverviewPendingGroupSkeleton,
  OverviewToolbar,
  type OverviewFilter,
} from "@/features/overview";
import { transactionsQueries } from "@/features/transactions/api/queries";

const today = new Date();

const OverviewPage = () => {
  const [filter, setFilter] = useState<OverviewFilter>({
    month: today.getMonth() + 1,
    year: today.getFullYear(),
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

      {transactionsSummaryQuery.isPending && <OverviewPendingGroupSkeleton />}

      {transactionsSummaryQuery.data && (
        <OverviewPendingGroup data={transactionsSummaryQuery.data} />
      )}

      <FloatingActionButton icon={<PlusIcon />} />
    </div>
  );
};

export const Route = createFileRoute("/app/overview")({
  component: OverviewPage,
});
