import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/ToggleGroup";

import type { MovementsSearchDirection } from "../../api/schemas";

type MovementsFiltersProps = {
  period: string;
  onPrevPeriod: () => void;
  onNextPeriod: () => void;
  direction: MovementsSearchDirection;
  onDirectionChange: (direction: MovementsSearchDirection) => void;
};

export const MovementsFilters = ({
  period,
  onPrevPeriod,
  onNextPeriod,
  direction,
  onDirectionChange,
}: MovementsFiltersProps) => {
  return (
    <section className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Período</span>
        <div className="flex items-center overflow-hidden rounded-md border bg-background">
          <Button variant="ghost" size="sm" className="rounded-none" onClick={onPrevPeriod}>
            <ChevronLeftIcon />
          </Button>
          <div className="min-w-[120px] px-3 border-x text-center text-sm">{period}</div>
          <Button variant="ghost" size="sm" className="rounded-none" onClick={onNextPeriod}>
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
      <ToggleGroup
        type="single"
        variant="outline"
        size="sm"
        value={direction}
        onValueChange={(value) => {
          if (value) {
            onDirectionChange(value as MovementsSearchDirection);
          }
        }}
        className="bg-background"
      >
        <ToggleGroupItem value="All">Todos</ToggleGroupItem>
        <ToggleGroupItem value="Expense">Despesas</ToggleGroupItem>
        <ToggleGroupItem value="Income">Receitas</ToggleGroupItem>
      </ToggleGroup>
    </section>
  );
};
