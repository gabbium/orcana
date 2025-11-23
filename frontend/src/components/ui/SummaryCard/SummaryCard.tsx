import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/Card";
import { cn } from "@/utils/cn";

import type { SummaryCardProps } from "./SummaryCard.types";
import { summaryCardVariants } from "./SummaryCard.variants";

export const SummaryCard = ({ label, value, variant, className }: SummaryCardProps) => {
  return (
    <Card className={cn("h-full gap-0 py-3 shadow-none", className)}>
      <CardHeader className="px-3 py-0">
        <CardDescription className="text-xs text-muted-foreground">{label}</CardDescription>
      </CardHeader>
      <CardContent className="px-3 py-0">
        <div className={cn(summaryCardVariants({ variant }))}>{value}</div>
      </CardContent>
    </Card>
  );
};
