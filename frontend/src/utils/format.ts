import { format, parseISO } from "date-fns";

export const formatDate = (
  value: string | Date | null | undefined,
  fmt: string = "dd/MM/yyyy HH:mm",
): string => {
  if (!value) return "";

  const date = typeof value === "string" ? parseISO(value) : value;
  return format(date, fmt);
};
