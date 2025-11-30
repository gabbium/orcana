import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

import type { MovementDirectionSearch } from "../../api/schemas";
import type { MovementDirection } from "../../api/types";

type MovementsFiltersProps = {
  minOccurredAt: string;
  maxOccurredAt: string;
  onMinOccurredAt: (value: string) => void;
  onMaxOccurredAt: (value: string) => void;
  direction?: MovementDirectionSearch;
  onDirectionChange: (direction?: MovementDirectionSearch) => void;
};

export const MovementsFilters = ({
  minOccurredAt,
  maxOccurredAt,
  onMinOccurredAt,
  onMaxOccurredAt,
  direction,
  onDirectionChange,
}: MovementsFiltersProps) => {
  return (
    <section className="flex flex-wrap items-center gap-3">
      <div className="flex flex-wrap gap-3">
        <div className="flex flex-col gap-1">
          <Label htmlFor="min-occurred-at" className="text-xs text-muted-foreground">
            Data Inicial
          </Label>
          <Input
            id="min-occurred-at"
            type="date"
            value={minOccurredAt}
            onChange={(event) => onMinOccurredAt(event.target.value)}
            className="bg-background"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="max-occurred-at" className="text-xs text-muted-foreground">
            Data final
          </Label>
          <Input
            id="max-occurred-at"
            type="date"
            value={maxOccurredAt}
            onChange={(event) => onMaxOccurredAt(event.target.value)}
            className="bg-background"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="direction" className="text-xs text-muted-foreground">
          Tipo
        </Label>
        <Select
          name="direction"
          value={direction}
          onValueChange={(value) => {
            onDirectionChange(value as MovementDirection);
          }}
        >
          <SelectTrigger id="direction" className="w-[180px] bg-background">
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">Todas</SelectItem>
            <SelectItem value="Expense">Despesas</SelectItem>
            <SelectItem value="Income">Receitas</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
};
