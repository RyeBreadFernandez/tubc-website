import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md border border-transparent font-semibold whitespace-nowrap cursor-pointer transition-all duration-150 outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-95 active:brightness-90 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:     "bg-primary text-primary-foreground hover:bg-terra-dark",
        outline:     "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
        secondary:   "bg-secondary text-secondary-foreground hover:bg-border",
        ghost:       "hover:bg-parchment-dark text-muted-foreground hover:text-bark",
        destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20",
        link:        "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:   "px-5 py-2.5 text-sm",
        sm:        "px-4 py-1.5 text-sm",
        lg:        "px-7 py-3 text-base",
        icon:      "size-9 rounded-md",
        "icon-sm": "size-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>) {
  return (
    <button
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
