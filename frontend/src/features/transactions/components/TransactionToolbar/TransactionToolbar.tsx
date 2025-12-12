import { MoreVerticalIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";

import type { TransactionKind } from "../../constants/enums";

export type TransactionFilter = {
  kind?: TransactionKind;
  month: string;
};

export type TransactionToolbarProps = {
  filter: TransactionFilter;
  onFilterChange: (filter: TransactionFilter) => void;
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

export const TransactionToolbar = ({ filter, onFilterChange }: TransactionToolbarProps) => {
  const [monthPart, yearPart] = filter.month.split(" de ");
  const currentMonth = monthPart?.toLowerCase() || MONTHS[0];
  const currentYear = yearPart || String(new Date().getFullYear());
  const monthIndex = getMonthIndex(currentMonth);

  const handleFilterKindChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const kind = e.target.value as TransactionKind;
    if (kind) {
      onFilterChange({ ...filter, kind });
    } else {
      const newFilter = { ...filter };
      delete newFilter.kind;
      onFilterChange(newFilter);
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = e.target.value;
    const month = getMonthName(index);
    onFilterChange({ ...filter, month: `${month} de ${currentYear}` });
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = e.target.value;
    onFilterChange({ ...filter, month: `${currentMonth} de ${year}` });
  };

  return (
    <div className="flex items-center justify-between gap-3">
      <select
        value={filter.kind || ""}
        onChange={handleFilterKindChange}
        className="px-3 py-1 rounded-lg border border-border/60 bg-muted/30 text-sm text-foreground cursor-pointer hover:border-primary/50 transition-colors"
      >
        <option value="">Transações</option>
        <option value="income">Receitas</option>
        <option value="expense">Despesas</option>
      </select>

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
