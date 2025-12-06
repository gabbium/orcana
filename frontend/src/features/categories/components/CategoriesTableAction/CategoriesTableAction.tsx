import type { Row } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

import type { CategoryDto } from "../../api/types";

export interface CategoriesTableActionProps {
  row: Row<CategoryDto>;
}

export const CategoriesTableAction = ({ row }: CategoriesTableActionProps) => {
  const category = row.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <MoreHorizontalIcon />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(category.id)}>
          Copiar ID
        </DropdownMenuItem>
        <DropdownMenuItem>Editar</DropdownMenuItem>
        <DropdownMenuItem>Deletar</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
