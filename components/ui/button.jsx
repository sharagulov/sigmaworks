import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center text-black/80 justify-center text-white whitespace-nowrap rounded-2xl text-sm transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "z-2 bg-accent hover:bg-accent-hover text-xs md:text-sm shadow-sm hover:shadow-md",
        git:
         "shadow-sm hover:shadow-lg bg-black/20 text-black/80 hover:bg-black/10 ",
        destructive:
          "z-2 bg-destructive hover:bg-destructive/80 shadow-sm hover:shadow-md",
        outline:
          " bg-accent shadow-sm hover:bg-accent-hover",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm ",
        ghost: "hover:bg-accent-hover ",
        ighost: "hover:bg-accent-hover text-base hover:shadow-md text-black hover:text-white",
        link: "underline-offset-4 hover:underline",
        white: "text-black/80 shadow hover:shadow-md",
        whiteAction: "text-black/80 shadow hover:shadow-md hover:bg-accent-hover hover:text-white",
        context: "text-black/80 container",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
