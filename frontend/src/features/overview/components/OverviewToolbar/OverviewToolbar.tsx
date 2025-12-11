import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, MoreVerticalIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";

export type OverviewFilter = {
  month: string;
};

export type OverviewToolbarProps = {
  filter: OverviewFilter;
  onFilterChange: (filter: OverviewFilter) => void;
};

export const OverviewToolbar = ({ filter, onFilterChange }: OverviewToolbarProps) => {
  const handlePreviousMonth = () => {
    onFilterChange({ ...filter });
  };

  const handleNextMonth = () => {
    onFilterChange({ ...filter });
  };

  return (
    <div className="relative flex items-center justify-center gap-3">
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

      <Button
        size="icon"
        variant="ghost"
        className="absolute right-0 text-muted-foreground hover:text-foreground h-8 w-8"
        aria-label="Mais opções"
      >
        <MoreVerticalIcon className="w-4 h-4" />
      </Button>
    </div>
  );
};
