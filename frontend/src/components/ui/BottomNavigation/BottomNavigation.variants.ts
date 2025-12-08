import { cva, type VariantProps } from "class-variance-authority";

export const bottomNavigationButtonVariants = cva(
  "flex flex-col text-xs text-black/40 items-center gap-1 rounded-lg p-2 transition-colors outline-hidden ring-offset-background focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[active=true]:text-primary",
  {
    variants: {
      variant: {
        default: "",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type BottomNavigationButtonVariants = VariantProps<typeof bottomNavigationButtonVariants>;
