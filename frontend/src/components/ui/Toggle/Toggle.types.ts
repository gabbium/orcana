import * as TogglePrimitive from "@radix-ui/react-toggle";
import type { ComponentProps } from "react";

import type { ToggleVariants } from "./Toggle.variants";

export type ToggleProps = ComponentProps<typeof TogglePrimitive.Root> & ToggleVariants;
