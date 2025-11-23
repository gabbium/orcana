import { type ComponentProps } from "react";

export type FieldErrorProps = ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>;
};
