import type { ColumnDef } from "@tanstack/react-table";
import { CircleIcon, CircleSmallIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { useMemo } from "react";

import {
  DataTable,
  DataTableColumnHeader,
  type DataTableBaseProps,
} from "@/components/compound/DataTable";
import { Badge } from "@/components/ui/Badge";

import type { CategoryDto } from "../../api/types";
import {
  CATEGORY_COLOR_MAP,
  CATEGORY_ICON_MAP,
  CATEGORY_KIND_OPTIONS,
  CATEGORY_STATUS_OPTIONS,
} from "../../constants";
import { CategoriesTableAction } from "../CategoriesTableAction";

type CategoriesTableProps = DataTableBaseProps<CategoryDto>;

const useCategoriesColumns = (): ColumnDef<CategoryDto>[] => {
  return useMemo<ColumnDef<CategoryDto>[]>(
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
          if (row.original.kind === "expense")
            return (
              <Badge variant="outline" className="text-muted-foreground px-1.5">
                <TrendingDownIcon className="text-red-600" />
                Despesa
              </Badge>
            );

          return (
            <Badge variant="outline" className="text-muted-foreground px-1.5">
              <TrendingUpIcon className="text-emerald-600" />
              Receita
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
          if (row.original.status === "active")
            return (
              <Badge variant="outline" className="text-muted-foreground px-1.5">
                <CircleSmallIcon className="text-emerald-600 fill-current" />
                Ativo
              </Badge>
            );

          return (
            <Badge variant="outline" className="text-muted-foreground px-1.5">
              <CircleSmallIcon className="text-slate-600 fill-current" />
              Inativo
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
          const icon = row.getValue("icon") as string;
          const IconComponent = CATEGORY_ICON_MAP[icon as keyof typeof CATEGORY_ICON_MAP];

          return (
            <div>
              {IconComponent ? (
                <IconComponent className="h-5 w-5 text-muted-foreground" />
              ) : (
                <CircleSmallIcon className="h-5 w-5" />
              )}
            </div>
          );
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
          const color = row.getValue("color") as string;

          return (
            <CircleIcon
              className={`h-6 w-6 fill-current ${CATEGORY_COLOR_MAP[color] || "text-gray-300"}`}
            />
          );
        },
        enableSorting: false,
        enableHiding: false,
        meta: {
          label: "Cor",
        },
      },
      {
        id: "actions",
        cell: ({ row }) => <CategoriesTableAction row={row} />,
        enableSorting: false,
        enableHiding: false,
      },
    ],
    [],
  );
};

export const CategoriesTable = ({ ...props }: CategoriesTableProps) => {
  const columns = useCategoriesColumns();

  return <DataTable columns={columns} {...props} />;
};
