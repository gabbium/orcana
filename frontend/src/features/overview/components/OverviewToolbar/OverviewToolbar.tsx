import { MonthYearPicker, type YearMonth } from "@/components/ui/MonthYearPicker/MonthYearPicker";

export type OverviewFilter = {
  month: number;
  year: number;
};

export type OverviewToolbarProps = {
  filter: OverviewFilter;
  onFilterChange: (filter: OverviewFilter) => void;
};

export const OverviewToolbar = ({ filter, onFilterChange }: OverviewToolbarProps) => {
  const handleMonthYearChange = (value: YearMonth) => {
    onFilterChange({ ...filter, ...value });
  };

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
        onValueChange={handleMonthYearChange}
      />
    </div>
  );
};
