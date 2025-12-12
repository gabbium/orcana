import { MoreVerticalIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";

export type OverviewFilter = {
  month: string;
};

export type OverviewToolbarProps = {
  filter: OverviewFilter;
  onFilterChange: (filter: OverviewFilter) => void;
};

const MONTHS = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

const YEARS = Array.from({ length: 10 }, (_, i) => String(new Date().getFullYear() - 5 + i));

const getMonthIndex = (monthName: string): string => {
  const index = MONTHS.indexOf(monthName.toLowerCase());
  return index >= 0 ? String(index) : "0";
};

const getMonthName = (index: string): string => {
  return MONTHS[parseInt(index)] || MONTHS[0];
};

export const OverviewToolbar = ({ filter, onFilterChange }: OverviewToolbarProps) => {
  const [monthPart, yearPart] = filter.month.split(" de ");
  const currentMonth = monthPart?.toLowerCase() || MONTHS[0];
  const currentYear = yearPart || String(new Date().getFullYear());
  const monthIndex = getMonthIndex(currentMonth);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = e.target.value;
    const month = getMonthName(index);
    onFilterChange({ month: `${month} de ${currentYear}` });
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = e.target.value;
    onFilterChange({ month: `${currentMonth} de ${year}` });
  };

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <select
          value={monthIndex}
          onChange={handleMonthChange}
          className="px-3 py-1 rounded-lg border border-border/60 bg-muted/30 text-sm text-foreground cursor-pointer hover:border-primary/50 transition-colors"
        >
          {MONTHS.map((month, index) => (
            <option key={month} value={String(index)}>
              {month.charAt(0).toUpperCase() + month.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={currentYear}
          onChange={handleYearChange}
          className="px-3 py-1 rounded-lg border border-border/60 bg-muted/30 text-sm text-foreground cursor-pointer hover:border-primary/50 transition-colors"
        >
          {YEARS.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <Button size="icon-sm" variant="ghost" aria-label="Mais opções">
        <MoreVerticalIcon />
      </Button>
    </div>
  );
};
