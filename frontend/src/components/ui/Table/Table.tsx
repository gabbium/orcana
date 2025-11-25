import type { ComponentProps } from "react";

import { cn } from "@/utils/cn";

export type TableProps = ComponentProps<"table">;

export const Table = ({ className, ...props }: TableProps) => {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
};

export type TableHeaderProps = ComponentProps<"thead">;

export const TableHeader = ({ className, ...props }: TableHeaderProps) => {
  return <thead data-slot="table-header" className={cn("[&_tr]:border-b", className)} {...props} />;
};

export type TableBodyProps = ComponentProps<"tbody">;

export const TableBody = ({ className, ...props }: TableBodyProps) => {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
};

export type TableFooterProps = ComponentProps<"tfoot">;

export const TableFooter = ({ className, ...props }: TableFooterProps) => {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", className)}
      {...props}
    />
  );
};

export type TableRowProps = ComponentProps<"tr">;

export const TableRow = ({ className, ...props }: TableRowProps) => {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className,
      )}
      {...props}
    />
  );
};

export type TableHeadProps = ComponentProps<"th">;

export const TableHead = ({ className, ...props }: TableHeadProps) => {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
};

export type TableCellProps = ComponentProps<"td">;

export const TableCell = ({ className, ...props }: TableCellProps) => {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
};

export type TableCaptionProps = ComponentProps<"caption">;

export const TableCaption = ({ className, ...props }: TableCaptionProps) => {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  );
};
