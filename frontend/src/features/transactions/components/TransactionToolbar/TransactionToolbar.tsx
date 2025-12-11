import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, MoreVerticalIcon } from "lucide-react";

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

export const TransactionToolbar = ({ filter, onFilterChange }: TransactionToolbarProps) => {
  const handleFilterKindChange = (kind: TransactionKind) => {
    if (kind) {
      onFilterChange({ ...filter, kind });
    } else {
      const newFilter = { ...filter };
      delete newFilter.kind;
      onFilterChange(newFilter);
    }
  };

  const handlePreviousMonth = () => {
    onFilterChange({ ...filter });
  };

  const handleNextMonth = () => {
    onFilterChange({ ...filter });
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <div className="flex items-center justify-between gap-2">
        <select
          value={filter.kind}
          onChange={(e) => handleFilterKindChange(e.target.value as TransactionKind)}
          className="px-3 py-1 rounded-lg border border-border/60 bg-muted/30 text-sm text-foreground cursor-pointer hover:border-primary/50 transition-colors"
        >
          <option value="">Transações</option>
          <option value="income">Receitas</option>
          <option value="expense">Despesas</option>
        </select>
        <Button
          size="icon"
          variant="ghost"
          className="text-muted-foreground hover:text-foreground h-8 w-8 md:hidden"
          aria-label="Mais opções"
        >
          <MoreVerticalIcon className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex items-center justify-center gap-3">
        <Button
          size="icon"
          variant="ghost"
          onClick={handlePreviousMonth}
          className="text-muted-foreground hover:text-foreground h-8 w-8"
          aria-label="Mês anterior"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>

        <div className="flex items-center gap-2 min-w-fit">
          <CalendarIcon className="w-4 h-4 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">{filter.month}</p>
        </div>

        <Button
          size="icon"
          variant="ghost"
          onClick={handleNextMonth}
          className="text-muted-foreground hover:text-foreground h-8 w-8"
          aria-label="Próximo mês"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <Button
        size="icon"
        variant="ghost"
        className="text-muted-foreground hover:text-foreground h-8 w-8 hidden md:flex"
        aria-label="Mais opções"
      >
        <MoreVerticalIcon className="w-4 h-4" />
      </Button>
    </div>
  );
};
