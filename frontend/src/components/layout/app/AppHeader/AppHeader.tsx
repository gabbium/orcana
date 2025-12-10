import { Avatar, AvatarFallback } from "@/components/ui/Avatar";

export type AppHeaderProps = Record<string, never>;

export const AppHeader = () => {
  return (
    <header className="flex items-center justify-between gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-background border border-border">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-sm font-semibold text-primary">
          Oc
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold text-foreground">Orcana</span>
        </div>
      </div>
      <Avatar>
        <AvatarFallback className="bg-muted text-xs text-muted-foreground font-medium">
          GA
        </AvatarFallback>
      </Avatar>
    </header>
  );
};
