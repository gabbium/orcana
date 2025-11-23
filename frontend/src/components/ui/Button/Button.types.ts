import type { ComponentProps } from "react";

import type { ButtonVariants } from "./Button.variants";

export type ButtonProps = ComponentProps<"button"> &
  ButtonVariants & {
    asChild?: boolean;
  };
