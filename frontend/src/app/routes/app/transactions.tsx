import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

import { FloatingActionButton } from "@/components/ui/FloatingActionButton";
import { ItemGroup } from "@/components/ui/Item";
import {
  TransactionToolbar,
  type TransactionFilter,
  TransactionSummaryCard,
  TransactionSummaryCardSkeleton,
  TransactionCard,
  transactionsQueries,
  TransactionCardSkeleton,
  TRANSACTION_KIND,
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

      {transactionsSummaryQuery.isPending && (
        <ItemGroup className="grid grid-cols-2 gap-3">
          <TransactionSummaryCardSkeleton />
          <TransactionSummaryCardSkeleton />
        </ItemGroup>
      )}

      {transactionsSummaryQuery.data && !filter.kind && (
        <ItemGroup className="grid grid-cols-2 gap-3">
          <TransactionSummaryCard
            label="Saldo Atual"
            value={transactionsSummaryQuery.data.currentBalance}
            isPositive={transactionsSummaryQuery.data.currentBalance >= 0}
          />
          <TransactionSummaryCard
            label="Balanço do Mês"
            value={transactionsSummaryQuery.data.monthlyBalance}
            isPositive={transactionsSummaryQuery.data.monthlyBalance >= 0}
          />
        </ItemGroup>
      )}

      {transactionsSummaryQuery.data && filter.kind === TRANSACTION_KIND.EXPENSE && (
        <ItemGroup className="grid grid-cols-2 gap-3">
          <TransactionSummaryCard
            label="Total Pago"
            value={transactionsSummaryQuery.data.expense.confirmed.value}
          />
          <TransactionSummaryCard
            label="Total Pendente"
            value={transactionsSummaryQuery.data.expense.pending.value}
          />
        </ItemGroup>
      )}

      {transactionsSummaryQuery.data && filter.kind === TRANSACTION_KIND.INCOME && (
        <ItemGroup className="grid grid-cols-2 gap-3">
          <TransactionSummaryCard
            label="Total Recebido"
            value={transactionsSummaryQuery.data.income.confirmed.value}
            isPositive
          />
          <TransactionSummaryCard
            label="Total Pendente"
            value={transactionsSummaryQuery.data.income.pending.value}
            isPositive
          />
        </ItemGroup>
      )}

      {transactionsQuery.isPending && (
        <ItemGroup className="gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <TransactionCardSkeleton key={index} />
          ))}
        </ItemGroup>
      )}

      {transactionsQuery.data && (
        <ItemGroup className="gap-2">
          {transactionsQuery.data?.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              title={transaction.title}
              icon={transaction.icon}
              category={transaction.category}
              date={transaction.date}
              amount={transaction.amount}
              status={transaction.status}
              kind={transaction.kind}
            />
          ))}
        </ItemGroup>
      )}

      <FloatingActionButton icon={<PlusIcon />} />
    </div>
  );
};

export const Route = createFileRoute("/app/transactions")({
  component: TransactionsPage,
});
