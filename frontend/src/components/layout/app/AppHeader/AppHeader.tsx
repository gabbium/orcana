import { Avatar, AvatarFallback } from "@/components/ui/Avatar";

export type AppHeaderProps = {
  month?: string;
};

export const AppHeader = ({ month = "Set 2025" }: AppHeaderProps) => {
  return (
    <header className="flex items-center justify-between gap-2 px-3 py-2.5 sm:px-6 sm:py-3 rounded-lg bg-background border border-border">
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
          <span className="font-medium text-foreground">{month}</span>
        </button>
        <Avatar>
          <AvatarFallback className="bg-muted text-xs text-muted-foreground font-medium">
            GA
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};
