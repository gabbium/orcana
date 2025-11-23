import type { SummaryCardVariants } from "./SummaryCard.variants";

export type SummaryCardProps = {
  label: string;
  value: React.ReactNode;
  className?: string;
} & SummaryCardVariants;
