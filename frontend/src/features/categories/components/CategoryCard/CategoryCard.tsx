import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/Item";

export type CategoryCardProps = {
  name: string;
  icon: string;
  status: string;
};

export const CategoryCard = ({ name, icon, status }: CategoryCardProps) => {
  return (
    <Item className="cursor-pointer" variant="outline" size="sm">
      <ItemMedia variant="icon">{icon}</ItemMedia>
      <ItemContent>
        <ItemTitle>{name}</ItemTitle>
        <ItemDescription className="text-xs">{status}</ItemDescription>
      </ItemContent>
    </Item>
  );
};
