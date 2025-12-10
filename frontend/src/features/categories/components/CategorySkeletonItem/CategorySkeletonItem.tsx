import { Skeleton } from "@/components/ui/Skeleton";

export const CategorySkeletonItem = () => {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border border-border/60 bg-muted/30">
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
  );
};
