import { format, parse } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useCallback } from "react";

import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { useDisclosure } from "@/hooks/use-disclosure";
import { cn } from "@/utils/cn";

import type { DatePickerProps } from "./DatePicker.types";

export const DatePicker = ({
  value,
  onChange,
  onBlur,
  className,
  placeholder = "Select date",
  ...props
}: DatePickerProps) => {
  const { close, open, isOpen } = useDisclosure();

  const handleOpenChange = (openState: boolean) => {
    if (openState) {
      open();
    } else {
      close();
      onBlur?.();
    }
  };

  const selectedDate =
    value && value.trim().length > 0 ? parse(value, "yyyy-MM-dd", new Date()) : undefined;

  const handleSelect = useCallback(
    (date: Date | undefined) => {
      if (!onChange) {
        close();
        return;
      }

      if (!date) {
        onChange("");
        close();
        return;
      }

      const nextValue = format(date, "yyyy-MM-dd");
      onChange(nextValue);
      close();
    },
    [close, onChange],
  );

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          data-slot="input"
          className={cn(
            "border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none transition-[color,box-shadow]",
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            "inline-flex items-center justify-start gap-2 text-left font-normal",
            !selectedDate && "text-muted-foreground",
            className,
          )}
          {...props}
        >
          <CalendarIcon />
          {selectedDate ? (
            <span>{format(selectedDate, "dd/MM/yyyy")}</span>
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          captionLayout="dropdown"
          onSelect={handleSelect}
        />
      </PopoverContent>
    </Popover>
  );
};
