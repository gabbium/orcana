import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, MoreVerticalIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";

export type TransactionToolbarProps = {
  filterType: "all" | "income" | "expense";
  onFilterTypeChange: (value: "all" | "income" | "expense") => void;
  monthLabel: string;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
};

export const TransactionToolbar = ({
  filterType,
  onFilterTypeChange,
  monthLabel,
  onPreviousMonth,
  onNextMonth,
}: TransactionToolbarProps) => {
  return (
    <>
      <div className="flex flex-col gap-2 md:hidden">
        <div className="flex items-center justify-between gap-2">
          <select
            value={filterType}
            onChange={(e) => onFilterTypeChange(e.target.value as "all" | "income" | "expense")}
            className="px-3 py-1 rounded-lg border border-border/60 bg-muted/30 text-sm text-foreground cursor-pointer hover:border-primary/50 transition-colors"
          >
            <option value="all">Transações</option>
            <option value="income">Receitas</option>
            <option value="expense">Despesas</option>
          </select>
          <Button
            size="icon"
            variant="ghost"
            className="text-muted-foreground hover:text-foreground h-8 w-8"
            aria-label="Mais opções"
          >
            <MoreVerticalIcon className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center justify-center gap-3 px-3 py-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={onPreviousMonth}
            className="text-muted-foreground hover:text-foreground h-8 w-8"
            aria-label="Mês anterior"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>

          <div className="flex items-center gap-2 min-w-fit">
            <CalendarIcon className="w-4 h-4 text-muted-foreground" />
            <p className="text-sm font-medium text-foreground">{monthLabel}</p>
          </div>

          <Button
            size="icon"
            variant="ghost"
            onClick={onNextMonth}
            className="text-muted-foreground hover:text-foreground h-8 w-8"
            aria-label="Próximo mês"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="hidden md:flex items-center justify-between gap-3">
        <select
          value={filterType}
          onChange={(e) => onFilterTypeChange(e.target.value as "all" | "income" | "expense")}
          className="px-3 py-1 rounded-lg border border-border/60 bg-muted/30 text-sm text-foreground cursor-pointer hover:border-primary/50 transition-colors"
        >
          <option value="all">Transações</option>
          <option value="income">Receitas</option>
          <option value="expense">Despesas</option>
        </select>

        <div className="flex items-center justify-center gap-3">
          <Button
            size="icon"
            variant="ghost"
            onClick={onPreviousMonth}
            className="text-muted-foreground hover:text-foreground h-8 w-8"
            aria-label="Mês anterior"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>

          <div className="flex items-center gap-2 min-w-fit">
            <CalendarIcon className="w-4 h-4 text-muted-foreground" />
            <p className="text-sm font-medium text-foreground">{monthLabel}</p>
          </div>

          <Button
            size="icon"
            variant="ghost"
            onClick={onNextMonth}
            className="text-muted-foreground hover:text-foreground h-8 w-8"
            aria-label="Próximo mês"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </div>

        <Button
          size="icon"
          variant="ghost"
          className="text-muted-foreground hover:text-foreground h-8 w-8"
          aria-label="Mais opções"
        >
          <MoreVerticalIcon className="w-4 h-4" />
        </Button>
      </div>
    </>
  );
};
