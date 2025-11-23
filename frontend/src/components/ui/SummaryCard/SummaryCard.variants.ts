import { cva, type VariantProps } from "class-variance-authority";

export const summaryCardVariants = cva("font-semibold tabular-nums text-base sm:text-lg", {
  variants: {
    variant: {
      neutral: "",
      positive: "text-emerald-600 dark:text-emerald-400",
      negative: "text-red-600 dark:text-red-400",
    },
  },
  defaultVariants: {
    variant: "neutral",
  },
});

export type SummaryCardVariants = VariantProps<typeof summaryCardVariants>;
