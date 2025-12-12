import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { FloatingActionButton } from "@/components/ui/FloatingActionButton";
import { MonthYearPicker, type YearMonth } from "@/components/ui/MonthYearPicker/MonthYearPicker";
import { NativeSelect, NativeSelectOption } from "@/components/ui/NativeSelect";
import {
  TransactionSummaryGroup,
  TransactionList,
  useListTransactions,
  useSummaryTransactions,
  TRANSACTION_KIND,
  listTransactionsInputSchema,
  type TransactionKind,
} from "@/features/transactions";

const ListTransactionsPage = () => {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const transactionsQuery = useListTransactions({
    params: search,
  });

  const transactionsSummaryQuery = useSummaryTransactions({
    params: {
      kind: search.kind,
    },
  });

  const handleKindChange = (kind: TransactionKind) => {
    navigate({
      search: (old) => ({
        ...old,
        kind: kind || undefined,
      }),
    });
  };

  const handleMonthYearChange = (value: YearMonth) => {
    navigate({
      search: (old) => ({
        ...old,
        ...value,
      }),
    });
  };

  return (
    <div className="flex flex-col gap-4 relative">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-semibold text-foreground">Transações</h1>
          <p className="text-xs text-muted-foreground">Controle todas as suas transações</p>
        </div>

        <div className="flex items-center gap-2">
          <MonthYearPicker
            value={{
              month: search.month,
              year: search.year,
            }}
            onValueChange={handleMonthYearChange}
          />

          <NativeSelect
            value={search.kind || ""}
            onChange={(e) => handleKindChange(e.target.value as TransactionKind)}
          >
            <NativeSelectOption value="">Todas</NativeSelectOption>
            <NativeSelectOption value={TRANSACTION_KIND.EXPENSE}>Despesas</NativeSelectOption>
            <NativeSelectOption value={TRANSACTION_KIND.INCOME}>Receitas</NativeSelectOption>
          </NativeSelect>

          <Button
            className="hidden sm:flex"
            onClick={() => navigate({ to: "/app/transactions/create" })}
          >
            Nova transação
          </Button>
        </div>
      </div>

      <TransactionSummaryGroup
        summary={transactionsSummaryQuery.data}
        mode={search.kind}
        isLoading={transactionsSummaryQuery.isPending}
      />

      <TransactionList
        transactions={transactionsQuery.data || []}
        isLoading={transactionsQuery.isPending}
      />

      <FloatingActionButton
        icon={<PlusIcon />}
        onClick={() => navigate({ to: "/app/transactions/create" })}
        className="sm:hidden"
      />
    </div>
  );
};

export const Route = createFileRoute("/app/transactions/")({
  validateSearch: listTransactionsInputSchema,
  loaderDeps: ({ search }) => ({ search }),
  component: ListTransactionsPage,
});
