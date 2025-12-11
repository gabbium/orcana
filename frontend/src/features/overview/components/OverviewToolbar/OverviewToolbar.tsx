import { CalendarIcon } from "lucide-react";

export type OverviewToolbarProps = {
  monthLabel: string;
};

export const OverviewToolbar = ({ monthLabel }: OverviewToolbarProps) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <CalendarIcon className="w-4 h-4 text-muted-foreground" />
      <p className="text-sm font-medium text-foreground">{monthLabel}</p>
    </div>
  );
};
