import { Plus, Minus, ChevronDownIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { cn } from "@/utils/cn";

const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export type YearMonth = { year: number; month: number };

export type MonthYearPickerProps = {
  value: YearMonth;
  onValueChange: (next: YearMonth) => void;
  className?: string;
  triggerClassName?: string;
};

export const MonthYearPicker = ({
  value,
  onValueChange,
  className,
  triggerClassName,
}: MonthYearPickerProps) => {
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(value.year);

  const handleMonthSelect = (month: number) => {
    onValueChange({ year: viewYear, month });
    setOpen(false);
  };

  const handleSetThisMonth = () => {
    const now = new Date();
    onValueChange({ year: now.getFullYear(), month: now.getMonth() });
    setOpen(false);
  };

  return (
    <div
      className={cn("flex items-center gap-2", className)}
      role="group"
      aria-label="Selecionar mês e ano"
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="group/month-year-picker relative w-fit">
            <button
              type="button"
              className={cn(
                "border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 dark:hover:bg-input/50 h-9 w-full min-w-fit appearance-none rounded-md border bg-transparent px-3 py-2 pr-9 text-sm shadow-xs transition-[color,box-shadow] outline-none cursor-pointer",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                triggerClassName,
              )}
              aria-haspopup="dialog"
              aria-expanded={open}
            >
              {MONTHS[value.month - 1]} {value.year}
            </button>
            <ChevronDownIcon
              className="text-muted-foreground pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 opacity-50 select-none"
              aria-hidden="true"
            />
          </div>
        </PopoverTrigger>

        <PopoverContent align="start" className="w-72 p-3">
          <div className="flex items-center justify-between mb-3 pb-2 border-b">
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setViewYear((y) => y - 1)}
                aria-label="Ano anterior"
              >
                <Minus className="h-3 w-3" />
              </Button>

              <span className="w-16 text-center font-semibold text-sm">{viewYear}</span>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setViewYear((y) => y + 1)}
                aria-label="Próximo ano"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            <Button type="button" variant="secondary" size="sm" onClick={handleSetThisMonth}>
              Agora
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {MONTHS.map((mLabel, idx) => {
              const selected = idx === value.month - 1 && viewYear === value.year;

              return (
                <Button
                  key={mLabel}
                  type="button"
                  variant={selected ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleMonthSelect(idx)}
                  aria-selected={selected}
                >
                  {mLabel}
                </Button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
