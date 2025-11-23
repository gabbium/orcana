import type { ButtonProps } from "@/components/ui/Button";

import type { InputGroupButtonVariants } from "./InputGroupButton.variants";

export type InputGroupButtonProps = Omit<ButtonProps, "size"> & InputGroupButtonVariants;
