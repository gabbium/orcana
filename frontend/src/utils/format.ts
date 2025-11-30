export function mapSearchToDateRange(month: number, year: number) {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 1);

  return {
    startDate: start.toISOString(),
    endDate: end.toISOString(),
  };
}

export function formatMonthYearLabel(month: number, year: number): string {
  const date = new Date(year, month - 1, 1);

  return date.toLocaleDateString("pt-BR", {
    month: "short",
    year: "numeric",
  });
}

export function addMonthYear(
  month: number,
  year: number,
  diff: number,
): { month: number; year: number } {
  const date = new Date(year, month - 1 + diff, 1);
  return {
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
}
