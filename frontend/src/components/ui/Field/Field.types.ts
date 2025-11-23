import { type ComponentProps } from "react";

import type { FieldVariants } from "./Field.variants";

export type FieldProps = ComponentProps<"div"> & FieldVariants;
