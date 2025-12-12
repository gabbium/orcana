import { createFileRoute } from "@tanstack/react-router";

import { MonthYearPicker, type YearMonth } from "@/components/ui/MonthYearPicker";
import {
  OverviewBalanceCard,
  OverviewPendingGroup,
  useOverviewSummary,
  overviewFilterSchema,
} from "@/features/overview";

const OverviewPage = () => {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const summaryQuery = useOverviewSummary({
    params: search,
  });

  const handleFilterChange = (value: YearMonth) => {
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
          <h1 className="text-lg font-semibold text-foreground">Visão mensal</h1>
          <p className="text-xs text-muted-foreground">Acompanhe seu fluxo de caixa mensal</p>
        </div>

        <MonthYearPicker
          value={{
            month: search.month,
            year: search.year,
          }}
          onValueChange={handleFilterChange}
        />
      </div>

      <OverviewBalanceCard
        balance={summaryQuery.data?.monthlyBalance}
        totalIncome={summaryQuery.data?.income.total.value}
        totalExpense={summaryQuery.data?.expense.total.value}
        isLoading={summaryQuery.isPending}
      />

      <OverviewPendingGroup data={summaryQuery.data} isLoading={summaryQuery.isPending} />
    </div>
  );
};

export const Route = createFileRoute("/app/overview/")({
  validateSearch: overviewFilterSchema,
  loaderDeps: ({ search }) => ({ search }),
  component: OverviewPage,
});
