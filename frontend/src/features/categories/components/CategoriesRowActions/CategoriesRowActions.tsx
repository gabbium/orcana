import type { Row } from "@tanstack/react-table";
import { MoreVerticalIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

import type { Category } from "../../types/categories";

export type CategoriesRowActionsProps = {
  row: Row<Category>;
  onEdit?: (category: Category) => void;
  onDelete?: (category: Category) => void;
};

export const CategoriesRowActions = ({ row, onEdit, onDelete }: CategoriesRowActionsProps) => {
  const category = row.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <MoreVerticalIcon />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(category.id)}>
          Copiar ID
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEdit?.(category)}>Editar</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete?.(category)}>Deletar</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
