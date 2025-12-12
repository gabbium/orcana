import { MonthYearPicker, type YearMonth } from "@/components/ui/MonthYearPicker/MonthYearPicker";
import type { OverviewFilter } from "../../schemas/overview";

export type OverviewToolbarProps = {
  filter: OverviewFilter;
  onFilterChange: (value: YearMonth) => void;
};

export const OverviewToolbar = ({ filter, onFilterChange }: OverviewToolbarProps) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-semibold text-foreground">Visão mensal</h1>
        <p className="text-xs text-muted-foreground">Acompanhe seu fluxo de caixa mensal</p>
      </div>

      <MonthYearPicker
        value={{
          month: filter.month,
          year: filter.year,
        }}
        onValueChange={onFilterChange}
      />
    </div>
  );
};

