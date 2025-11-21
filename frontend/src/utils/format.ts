import { default as dayjs } from "dayjs";

export const formatDate = (
  value: string | Date | null | undefined,
  format: string = "DD/MM/YYYY HH:mm",
): string => {
  if (!value) {
    return "";
  }
  return dayjs(value).format(format);
};
