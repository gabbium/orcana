import { Link } from "@tanstack/react-router";
import type { Row } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

import type { Category } from "../../types/categories";

export type CategoriesRowActionsProps = {
  row: Row<Category>;
  onDelete?: (category: Category) => void;
};

export const CategoriesRowActions = ({ row, onDelete }: CategoriesRowActionsProps) => {
  const category = row.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          aria-label="Abrir menu"
        >
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(category.id)}>
          Copiar ID
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/app/categories/$id" params={{ id: category.id }}>
            Visualizar
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/app/categories/$id/edit" params={{ id: category.id }}>
            Editar
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete?.(category)} variant="destructive">
          Deletar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
