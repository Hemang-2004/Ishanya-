"use client"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
} from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const data = [
  { name: "Digital Literacy", value: 35 },
  { name: "Vocational Training", value: 25 },
  { name: "Community Leadership", value: 20 },
  { name: "Health & Wellness", value: 15 },
  { name: "Financial Literacy", value: 5 },
]

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(var(--accent))",
  "hsl(var(--muted))",
  "hsl(var(--card))",
]

export function ReportsPieChart() {
  return (
    <ChartContainer>
      <ChartLegend className="mb-4">
        {data.map((entry, index) => (
          <ChartLegendItem
            key={`legend-${index}`}
            name={`${entry.name} (${entry.value}%)`}
            color={COLORS[index % COLORS.length]}
          />
        ))}
      </ChartLegend>
      <Chart className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <ChartTooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <ChartTooltipContent
                      className="border-none shadow-md"
                      label={`${payload[0].name}`}
                      content={
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: payload[0].color }} />
                          <span className="text-sm text-muted-foreground">{payload[0].value}% of total impact</span>
                        </div>
                      }
                    />
                  )
                }
                return null
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Chart>
    </ChartContainer>
  )
}

