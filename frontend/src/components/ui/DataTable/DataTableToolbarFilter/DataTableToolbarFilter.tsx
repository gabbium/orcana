import { SearchIcon } from "lucide-react";

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/InputGroup";

import { DataTableFacetedFilter } from "../DataTableFacetedFilter";

import type { DataTableToolbarFilterProps } from "./DataTableToolbarFilter.types";

export const DataTableToolbarFilter = <TData,>({ column }: DataTableToolbarFilterProps<TData>) => {
  const filter = column.columnDef.meta?.filter;

  if (!filter) return null;

  switch (filter.type) {
    case "text":
      return (
        <InputGroup className="max-w-fit h-8">
          <InputGroupInput
            placeholder={filter.title ?? `Search by ${column.id}...`}
            value={column.getFilterValue()?.toString() ?? ""}
            onChange={(e) => column.setFilterValue(e.target.value)}
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      );

    case "select":
      return (
        <DataTableFacetedFilter
          column={column}
          title={filter.title ?? column.id}
          options={filter.options ?? []}
        />
      );

    default:
      return null;
  }
};
