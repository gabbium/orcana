import { cva, type VariantProps } from "class-variance-authority";

export const itemVariants = cva(
  "group/item flex items-center border border-background text-sm rounded-md transition-colors [a]:hover:bg-accent/50 [a]:transition-colors [button]:transition-colors duration-100 flex-wrap outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] hover:bg-accent/50 has-[[data-slot=item-actions]_button:hover]:hover:bg-background",
  {
    variants: {
      variant: {
        default: "bg-background",
        outline: "border-border",
        muted: "bg-muted/50",
      },
      size: {
        default: "p-3 gap-4 ",
        sm: "py-2 px-3 gap-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none group-has-[[data-slot=item-description]]/item:translate-y-0.5",
  {
    variants: {
      variant: {
        default: "bg-background",
        icon: "size-8 border rounded-sm bg-muted [&_svg:not([class*='size-'])]:size-4",
        image: "size-10 rounded-sm overflow-hidden [&_img]:size-full [&_img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type ItemVariants = VariantProps<typeof itemVariants>;

export type ItemMediaVariants = VariantProps<typeof itemMediaVariants>;
