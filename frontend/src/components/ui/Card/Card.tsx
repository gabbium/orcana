import { cn } from "@/utils/cn";

export type CardProps = React.ComponentProps<"div">;

export const Card = ({ className, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "bg-card border border-border rounded-lg shadow-sm p-2.5 sm:p-3.5 flex flex-col",
        className,
      )}
      {...props}
    />
  );
};

export type CardHeaderProps = React.ComponentProps<"div">;

export const CardHeader = ({ className, ...props }: CardHeaderProps) => {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-4",
        className,
      )}
      {...props}
    />
  );
};

export type CardTitleProps = React.ComponentProps<"div">;

export const CardTitle = ({ className, ...props }: CardTitleProps) => {
  return <div className={cn("flex flex-col gap-1", className)} {...props} />;
};

export type CardSubtitleProps = React.ComponentProps<"p">;

export const CardSubtitle = ({ className, ...props }: CardSubtitleProps) => {
  return <p className={cn("text-xs sm:text-sm text-muted-foreground", className)} {...props} />;
};

export type CardContentProps = React.ComponentProps<"div">;

export const CardContent = ({ className, ...props }: CardContentProps) => {
  return <div className={cn("flex flex-col gap-3", className)} {...props} />;
};
