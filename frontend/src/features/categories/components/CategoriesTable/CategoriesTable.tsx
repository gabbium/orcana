import type { ColumnDef } from "@tanstack/react-table";
import { CircleIcon } from "lucide-react";
import { useMemo } from "react";

import { DataTable, DataTableColumnHeader } from "@/components/compound/DataTable";
import { Badge } from "@/components/ui/Badge";

import {
  getCategoryColor,
  getCategoryIcon,
  getCategoryKind,
  getCategoryStatus,
} from "../../constants/helpers";
import { CATEGORY_KIND_OPTIONS, CATEGORY_STATUS_OPTIONS } from "../../constants/maps";
import type { Category } from "../../types/categories";
import { CategoriesRowActions } from "../CategoriesRowActions";

export type CategoriesTableProps = {
  categories: Category[];
  onRowEdit?: (category: Category) => void;
  onRowDelete?: (category: Category) => void;
};

export const CategoriesTable = ({ categories, onRowEdit, onRowDelete }: CategoriesTableProps) => {
  const columns = useMemo<ColumnDef<Category>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nome" />,
        cell: ({ row }) => (
          <div className="flex flex-col gap-1">
            <span className="font-medium">{row.getValue("name")}</span>
            <span className="text-xs text-muted-foreground">{row.original.description}</span>
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
        meta: {
          label: "nome",
          filter: {
            type: "text",
          },
        },
      },
      {
        accessorKey: "kind",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Tipo" />,
        cell: ({ row }) => {
          const kind = getCategoryKind(row.original.kind);

          return (
            <Badge variant="outline" className="text-muted-foreground px-1.5">
              <kind.icon className={kind.className} />
              {kind.label}
            </Badge>
          );
        },
        enableSorting: false,
        enableHiding: false,
        filterFn: "arrIncludesEquals",
        meta: {
          label: "Tipo",
          filter: {
            type: "select",
            options: CATEGORY_KIND_OPTIONS,
          },
        },
      },
      {
        accessorKey: "status",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        cell: ({ row }) => {
          const status = getCategoryStatus(row.original.status);

          return (
            <Badge variant="outline" className="text-muted-foreground px-1.5">
              <CircleIcon className={`${status.className} fill-current`} />
              {status.label}
            </Badge>
          );
        },
        enableSorting: false,
        enableHiding: false,
        filterFn: "arrIncludesEquals",
        meta: {
          label: "Status",
          filter: {
            type: "select",
            options: CATEGORY_STATUS_OPTIONS,
          },
        },
      },
      {
        accessorKey: "icon",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Ícone" />,
        cell: ({ row }) => {
          const icon = getCategoryIcon(row.original.icon);

          return <icon.icon className="h-5 w-5 text-muted-foreground" />;
        },
        enableSorting: false,
        enableHiding: false,
        meta: {
          label: "Ícone",
        },
      },
      {
        accessorKey: "color",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Cor" />,
        cell: ({ row }) => {
          const color = getCategoryColor(row.original.color);

          return <CircleIcon className={`h-6 w-6 fill-current ${color.className}`} />;
        },
        enableSorting: false,
        enableHiding: false,
        meta: {
          label: "Cor",
        },
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <CategoriesRowActions row={row} onEdit={onRowEdit} onDelete={onRowDelete} />
        ),
        enableSorting: false,
        enableHiding: false,
      },
    ],
    [onRowEdit, onRowDelete],
  );

  return <DataTable columns={columns} data={categories} />;
};
