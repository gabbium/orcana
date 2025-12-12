import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

import { FloatingActionButton } from "@/components/ui/FloatingActionButton";
import {
  TransactionToolbar,
  TransactionSummaryGroup,
  TransactionSummaryGroupSkeleton,
  TransactionList,
  TransactionListSkeleton,
  transactionsQueries,
  type TransactionFilter,
} from "@/features/transactions";

const TransactionsPage = () => {
  const [filter, setFilter] = useState<TransactionFilter>({
    month: "setembro de 2025",
  });

  const transactionsQuery = useQuery(
    transactionsQueries.list({
      kinds: filter.kind,
    }),
  );

  const transactionsSummaryQuery = useQuery(
    transactionsQueries.summary({
      kinds: filter.kind,
    }),
  );

  return (
    <div className="flex flex-col gap-4 relative">
      <TransactionToolbar filter={filter} onFilterChange={setFilter} />

      {transactionsSummaryQuery.isPending && <TransactionSummaryGroupSkeleton />}
      {transactionsSummaryQuery.data && (
        <TransactionSummaryGroup summary={transactionsSummaryQuery.data} mode={filter.kind} />
      )}

      {transactionsQuery.isPending && <TransactionListSkeleton />}
      {transactionsQuery.data && <TransactionList transactions={transactionsQuery.data} />}

      <FloatingActionButton icon={<PlusIcon />} />
    </div>
  );
};

export const Route = createFileRoute("/app/transactions")({
  component: TransactionsPage,
});
