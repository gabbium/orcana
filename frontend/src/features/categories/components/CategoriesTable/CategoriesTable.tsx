import type { ColumnDef } from "@tanstack/react-table";
import { CircleIcon, CircleSmallIcon } from "lucide-react";
import { useMemo } from "react";

import { Badge } from "@/components/ui/Badge";
import { Checkbox } from "@/components/ui/Checkbox";
import { DataTable } from "@/components/ui/DataTable";

import {
  getCategoryColor,
  getCategoryIcon,
  getCategoryKind,
  getCategoryStatus,
} from "../../constants/helpers";
import type { Category } from "../../types/categories";
import { CategoriesRowActions } from "../CategoriesRowActions";

export type CategoriesTableProps = {
  categories: Category[];
  onRowDelete?: (category: Category) => void;
};

export const CategoriesTable = ({ categories, onRowDelete }: CategoriesTableProps) => {
  const columns = useMemo<ColumnDef<Category>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            className="translate-y-0.5"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="translate-y-0.5"
          />
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
        meta: {
          filter: {
            type: "text",
          },
        },
      },
      {
        accessorKey: "kind",
        header: "Type",
        cell: ({ row }) => {
          const kind = getCategoryKind(row.original.kind);
          return (
            <Badge variant="outline" className="text-muted-foreground px-1.5">
              <kind.icon className={kind.className} />
              {kind.label}
            </Badge>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = getCategoryStatus(row.original.status);
          return (
            <Badge variant="outline" className="text-muted-foreground px-1.5">
              <CircleSmallIcon className={`${status.className} fill-current`} />
              {status.label}
            </Badge>
          );
        },
      },
      {
        accessorKey: "icon",
        header: "Icon",
        cell: ({ row }) => {
          const icon = getCategoryIcon(row.original.icon);
          return <icon.icon className="h-5 w-5 text-muted-foreground" />;
        },
      },
      {
        accessorKey: "color",
        header: "Color",
        cell: ({ row }) => {
          const color = getCategoryColor(row.original.color);
          return <CircleIcon className={`h-6 w-6 fill-current ${color.className}`} />;
        },
      },
      {
        id: "actions",
        cell: ({ row }) => <CategoriesRowActions row={row} onDelete={onRowDelete} />,
      },
    ],
    [onRowDelete],
  );

  return <DataTable columns={columns} data={categories} />;
};
