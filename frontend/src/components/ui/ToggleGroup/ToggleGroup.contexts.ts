import type { VariantProps } from "class-variance-authority";
import { createContext } from "react";

import { toggleVariants } from "@/components/ui/Toggle";

export type ToggleGroupContextValue = VariantProps<typeof toggleVariants> & {
  spacing?: number;
};

export const ToggleGroupContext = createContext<ToggleGroupContextValue>({
  size: "default",
  variant: "default",
  spacing: 0,
});
