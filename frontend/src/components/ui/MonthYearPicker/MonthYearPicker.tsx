import { CalendarIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { useDisclosure } from "@/hooks/use-disclosure";

import { MONTHS } from "./MonthYearPicker.constants";
import type { MonthYearPickerProps } from "./MonthYearPicker.types";

export const MonthYearPicker = ({ value, onChange }: MonthYearPickerProps) => {
  const { close, open, isOpen } = useDisclosure();
  const [viewYear, setViewYear] = useState(value.getFullYear());

  const handleOpenChange = (openState: boolean) => {
    if (openState) {
      open();
    } else {
      close();
    }
  };

  useEffect(() => {
    setViewYear(value.getFullYear());
  }, [value]);

  const monthName = value.toLocaleString("en", { month: "long" });
  const monthCapitalized = monthName.charAt(0).toUpperCase() + monthName.slice(1);
  const label = `${monthCapitalized} ${value.getFullYear()}`;

  return (
    <div className="flex items-center justify-center gap-3">
      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            <CalendarIcon />
            <span className="text-sm">{label}</span>
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 space-y-3" align="center">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Previous year"
              onClick={() => setViewYear((y) => y - 1)}
            >
              <ChevronLeftIcon />
            </Button>
            <span className="text-sm font-medium">{viewYear}</span>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Next year"
              onClick={() => setViewYear((y) => y + 1)}
            >
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
                    close();
                  }}
                >
                  {m}
                </Button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
