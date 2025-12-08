import type { Column } from "@tanstack/react-table";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/InputGroup";

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
    <InputGroup className="h-8 w-48">
      <InputGroupInput
        placeholder={`Search by ${column.id}...`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  );
};
