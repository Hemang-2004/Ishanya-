import * as React from "react"
import { cn } from "@/lib/utils"

const Chart = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  return <div className={cn("w-full rounded-md border", className)} ref={ref} {...props} />
})
Chart.displayName = "Chart"

const ChartContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div className={cn("w-full", className)} ref={ref} {...props} />
  },
)
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "absolute z-10 hidden w-max rounded-md border bg-popover p-2 text-popover-foreground shadow-md group-hover:block",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
);
ChartTooltip.displayName = "ChartTooltip";



const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  { label: string; content: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>
>(({ label, content, className, ...props }, ref) => {
  return (
    <div
      className={cn("rounded-md border bg-popover p-4 text-popover-foreground shadow-sm", className)}
      ref={ref}
      {...props}
    >
      <div className="mb-1 text-sm font-medium">{label}</div>
      {content}
    </div>
  )
})
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div className={cn("flex items-center text-sm", className)} ref={ref} {...props} />
  },
)
ChartLegend.displayName = "ChartLegend"

interface ChartLegendItemProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  color: string
}

const ChartLegendItem = React.forwardRef<HTMLDivElement, ChartLegendItemProps>(
  ({ name, color, className, ...props }, ref) => {
    return (
      <div className={cn("flex items-center gap-2", className)} ref={ref} {...props}>
        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
        <span>{name}</span>
      </div>
    )
  },
)
ChartLegendItem.displayName = "ChartLegendItem"

export { Chart, ChartContainer, ChartTooltipContent, ChartLegend, ChartLegendItem, ChartTooltip }

