import type { ComponentProps } from "react";

import type { BadgeVariants } from "./Badge.variants";

export type BadgeProps = ComponentProps<"span"> &
  BadgeVariants & {
    asChild?: boolean;
  };
