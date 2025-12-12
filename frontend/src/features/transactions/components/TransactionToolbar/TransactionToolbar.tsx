import { MonthYearPicker, type YearMonth } from "@/components/ui/MonthYearPicker/MonthYearPicker";
import { NativeSelect, NativeSelectOption } from "@/components/ui/NativeSelect";

import { TRANSACTION_KIND, type TransactionKind } from "../../constants/enums";

export type TransactionFilter = {
  kind?: TransactionKind;
  month: number;
  year: number;
};

export type TransactionToolbarProps = {
  filter: TransactionFilter;
  onFilterChange: (filter: TransactionFilter) => void;
};

export const TransactionToolbar = ({ filter, onFilterChange }: TransactionToolbarProps) => {
  const handleKindChange = (value: TransactionKind) => {
    const newFilter = { ...filter };

    if (value) {
      newFilter.kind = value;
    } else {
      delete newFilter.kind;
    }

    onFilterChange(newFilter);
  };

  const handleMonthYearChange = (value: YearMonth) => {
    onFilterChange({ ...filter, ...value });
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-semibold text-foreground">Transações</h1>
        <p className="text-xs text-muted-foreground">Controle todas as suas transações</p>
      </div>

      <div className="flex items-center gap-2">
        <MonthYearPicker
          value={{
            month: filter.month,
            year: filter.year,
          }}
          onValueChange={handleMonthYearChange}
        />

        <NativeSelect
          value={filter.kind}
          onChange={(e) => handleKindChange(e.target.value as TransactionKind)}
        >
          <NativeSelectOption value="">Todas</NativeSelectOption>
          <NativeSelectOption value={TRANSACTION_KIND.EXPENSE}>Despesas</NativeSelectOption>
          <NativeSelectOption value={TRANSACTION_KIND.INCOME}>Receitas</NativeSelectOption>
        </NativeSelect>
      </div>
    </div>
  );
};
