import type { Column } from "@tanstack/react-table";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/Input";

export type DataTableTextFilterProps<TData> = {
  column: Column<TData>;
};

export const DataTableTextFilter = <TData,>({ column }: DataTableTextFilterProps<TData>) => {
  const textFilter = column.columnDef.meta?.filter;

  const filterValue = (column.getFilterValue() as string) ?? "";
  const [value, setValue] = useState(filterValue);

  useEffect(() => {
    setValue(filterValue);
  }, [filterValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      column.setFilterValue(value);
    }, 300);

    return () => clearTimeout(timer);
  }, [value, column]);

  if (textFilter?.type !== "text") {
    return null;
  }

  return (
    <Input
      placeholder={column.columnDef.meta?.label ?? column.id}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="h-8 w-[150px] lg:w-[250px]"
    />
  );
};
