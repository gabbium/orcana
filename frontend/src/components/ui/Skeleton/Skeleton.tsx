import { type ComponentProps } from "react"

import { cn } from "@/utils/cn"

export type SkeletonProps = ComponentProps<"div">

export const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  )
}
