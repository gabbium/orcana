import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeftIcon,
  BanknoteIcon,
  BookOpenIcon,
  CreditCardIcon,
  GiftIcon,
  HeartIcon,
  HomeIcon,
  MoreVerticalIcon,
  ShoppingBagIcon,
  TreePalmIcon,
  TrendingUpIcon,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/Drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/Item";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { cn } from "@/utils/cn";

const expenses = [
  {
    id: 1,
    name: "Casa",
    icon: HomeIcon,
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "Educação",
    icon: BookOpenIcon,
    color: "bg-green-500",
  },
  {
    id: 3,
    name: "Lazer",
    icon: TreePalmIcon,
    color: "bg-yellow-500",
  },
];

const incomes = [
  {
    id: 1,
    name: "Salário",
    icon: BanknoteIcon,
    color: "bg-red-500",
  },
  {
    id: 2,
    name: "Investimento",
    icon: TrendingUpIcon,
    color: "bg-blue-500",
  },
  {
    id: 3,
    name: "Presente",
    icon: GiftIcon,
    color: "bg-green-500",
  },
];

const availableIcons: { icon: LucideIcon; name: string }[] = [
  { icon: HomeIcon, name: "Casa" },
  { icon: BookOpenIcon, name: "Educação" },
  { icon: TreePalmIcon, name: "Lazer" },
  { icon: BanknoteIcon, name: "Dinheiro" },
  { icon: TrendingUpIcon, name: "Investimento" },
  { icon: GiftIcon, name: "Presente" },
  { icon: HeartIcon, name: "Saúde" },
  { icon: ShoppingBagIcon, name: "Compras" },
  { icon: CreditCardIcon, name: "Cartão" },
  { icon: MoreVerticalIcon, name: "Mais" },
];

const HomePage = () => {
  return (
    <div className="flex flex-1 flex-col min-h-screen relative">
      <header className="px-4 py-2.5 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full flex sm:hidden">
            <ArrowLeftIcon />
          </Button>
          <h1 className="font-semibold">Categorias</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <MoreVerticalIcon />
          </Button>
        </div>
      </header>
      <main className="flex-1 p-4 pb-20">
        <section className="max-w-4xl mx-auto">
          <Tabs defaultValue="expenses">
            <TabsList className="w-full">
              <TabsTrigger value="expenses" className="data-[state=active]:text-red-500">
                Despesas
              </TabsTrigger>
              <TabsTrigger value="income" className="data-[state=active]:text-green-500">
                Receitas
              </TabsTrigger>
            </TabsList>
            <TabsContent value="expenses">
              <ItemGroup>
                {expenses.map((expense) => (
                  <CategoryItem
                    key={expense.id}
                    name={expense.name}
                    icon={expense.icon}
                    color={expense.color}
                  />
                ))}
              </ItemGroup>
            </TabsContent>
            <TabsContent value="income">
              <ItemGroup>
                {incomes.map((income) => (
                  <CategoryItem
                    key={income.id}
                    name={income.name}
                    icon={income.icon}
                    color={income.color}
                  />
                ))}
              </ItemGroup>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  );
};

type CategoryItemProps = {
  name: string;
  icon: LucideIcon;
  color: string;
};

const CategoryItem = ({ name, icon: Icon, color }: CategoryItemProps) => {
  const [showIconEditDrawer, setShowIconEditDrawer] = useState(false);
  const [showEditDrawer, setShowEditDrawer] = useState(false);

  return (
    <>
      <Item
        className="cursor-pointer"
        onClick={() => {
          setShowEditDrawer(true);
        }}
      >
        <ItemMedia>
          <div
            className={cn(
              "flex size-8 shrink-0 overflow-hidden rounded-full text-white items-center justify-center",
              color,
            )}
          >
            <Icon className="size-4" />
          </div>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{name}</ItemTitle>
        </ItemContent>
        <ItemActions>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreVerticalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setShowIconEditDrawer(true);
                }}
              >
                Editar ícone
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setShowEditDrawer(true);
                }}
              >
                Editar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ItemActions>
      </Item>
      <Drawer open={showIconEditDrawer} onOpenChange={setShowIconEditDrawer}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Editar ícone</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            <div className="grid grid-cols-5 gap-4 justify-items-center">
              {availableIcons.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Button
                    key={item.name}
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => {
                      setShowIconEditDrawer(false);
                    }}
                  >
                    <IconComponent className="size-5" />
                  </Button>
                );
              })}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
      <Drawer open={showEditDrawer} onOpenChange={setShowEditDrawer}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Editar categoria</DrawerTitle>
          </DrawerHeader>
          <DrawerFooter className="flex-row">
            <Button variant="ghost" className="flex-1" onClick={() => setShowEditDrawer(false)}>
              Cancelar
            </Button>
            <Button className="flex-1">Salvar</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export const Route = createFileRoute("/app/home")({
  component: HomePage,
});
