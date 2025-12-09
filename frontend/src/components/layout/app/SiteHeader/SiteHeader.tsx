import { type ComponentProps } from "react";

import { cn } from "@/utils/cn";

export type SiteHeaderProps = ComponentProps<"header"> & {
  month?: string;
  onMonthPrev?: () => void;
  onMonthNext?: () => void;
  userInitial?: string;
};

export const SiteHeader = ({
  month = "Set 2025",
  onMonthPrev,
  onMonthNext,
  userInitial = "U",
  className,
  ...props
}: SiteHeaderProps) => {
  return (
    <header
      className={cn(
        "flex items-center justify-between gap-2 px-3 py-2.5 sm:px-6 sm:py-3 rounded-lg bg-background border border-border shadow-sm",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-sm font-semibold text-primary">
          Oc
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold text-foreground">Orcana</span>
          <span className="text-xs text-muted-foreground">Visão simples do seu mês</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border bg-background text-xs text-muted-foreground hover:bg-muted transition-colors duration-200"
        >
          <button
            type="button"
            onClick={onMonthPrev}
            className="cursor-pointer hover:text-foreground transition-colors duration-200"
            aria-label="Mês anterior"
          >
            ‹
          </button>
          <span className="font-medium text-foreground">{month}</span>
          <button
            type="button"
            onClick={onMonthNext}
            className="cursor-pointer hover:text-foreground transition-colors duration-200"
            aria-label="Próximo mês"
          >
            ›
          </button>
        </button>
        <div className="w-7 h-7 rounded-full border border-border bg-muted flex items-center justify-center text-xs text-muted-foreground font-medium">
          {userInitial}
        </div>
      </div>
    </header>
  );
};
