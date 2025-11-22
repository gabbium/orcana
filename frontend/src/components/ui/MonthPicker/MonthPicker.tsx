import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../Button";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import { useEffect, useState, type FC } from "react";
import { addMonths, subMonths } from "date-fns";

const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

interface MonthSelectorProps {
  value: Date;
  onChange: (date: Date) => void;
}

export const MonthPicker: FC<MonthSelectorProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(value.getFullYear());

  useEffect(() => {
    setViewYear(value.getFullYear());
  }, [value]);

  const monthName = value.toLocaleString("pt-BR", { month: "long" });
  const monthCapitalized = monthName.charAt(0).toUpperCase() + monthName.slice(1);
  const label = `${monthCapitalized} ${value.getFullYear()}`;

  return (
    <div className="flex items-center justify-center gap-3">
      <Button variant="outline" size="icon-sm" onClick={() => onChange(subMonths(value, 1))}>
        <ChevronLeftIcon />
      </Button>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <CalendarIcon />
            <span>{label}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 space-y-3" align="center">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon-sm" onClick={() => setViewYear((y) => y - 1)}>
              <ChevronLeftIcon />
            </Button>
            <span className="text-sm font-medium">{viewYear}</span>
            <Button variant="ghost" size="icon-sm" onClick={() => setViewYear((y) => y + 1)}>
              <ChevronRightIcon />
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {MONTHS.map((m, index) => {
              const isActive = index === value.getMonth() && viewYear === value.getFullYear();
              return (
                <Button
                  key={m}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    onChange(new Date(viewYear, index, 1));
                    setOpen(false);
                  }}
                >
                  {m}
                </Button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
      <Button variant="outline" size="icon-sm" onClick={() => onChange(addMonths(value, 1))}>
        <ChevronRightIcon />
      </Button>
    </div>
  );
};
