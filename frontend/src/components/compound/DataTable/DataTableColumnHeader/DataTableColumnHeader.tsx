import type { Column } from "@tanstack/react-table";
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon, EyeOffIcon } from "lucide-react";
import type { ComponentProps } from "react";

import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { cn } from "@/utils/cn";

export type DataTableColumnHeaderProps<TData, TValue> = ComponentProps<"div"> & {
  column: Column<TData, TValue>;
};

export const DataTableColumnHeader = <TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) => {
  const columnTitle = column.columnDef.meta?.label ?? title;
  const canSort = column.getCanSort();
  const canHide = column.getCanHide();

  if (!canSort && !canHide) {
    return <div className={cn(className)}>{columnTitle}</div>;
  }

  const isSorted = column.getIsSorted();

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent">
            <span>{columnTitle}</span>
            {canSort && (
              <>
                {isSorted === "desc" ? (
                  <ArrowDownIcon />
                ) : isSorted === "asc" ? (
                  <ArrowUpIcon />
                ) : (
                  <ChevronsUpDownIcon />
                )}
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {canSort && (
            <>
              <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                <ArrowUpIcon className="h-3.5 w-3.5 text-muted-foreground/70" />
                Crescente
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                <ArrowDownIcon className="h-3.5 w-3.5 text-muted-foreground/70" />
                Decrescente
              </DropdownMenuItem>
            </>
          )}
          {canSort && canHide && <DropdownMenuSeparator />}
          {canHide && (
            <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
              <EyeOffIcon className="h-3.5 w-3.5 text-muted-foreground/70" />
              Ocultar
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
