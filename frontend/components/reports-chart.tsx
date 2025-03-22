"use client"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
} from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const data = [
  {
    name: "Jan",
    completion: 65,
    target: 80,
  },
  {
    name: "Feb",
    completion: 70,
    target: 80,
  },
  {
    name: "Mar",
    completion: 75,
    target: 80,
  },
  {
    name: "Apr",
    completion: 72,
    target: 80,
  },
  {
    name: "May",
    completion: 78,
    target: 80,
  },
  {
    name: "Jun",
    completion: 82,
    target: 80,
  },
]

export function ReportsChart() {
  return (
    <ChartContainer>
      <ChartLegend className="mb-4">
        <ChartLegendItem name="Completion Rate" color="hsl(var(--primary))" />
        <ChartLegendItem name="Target" color="hsl(var(--muted))" />
      </ChartLegend>
      <Chart className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="name" className="text-sm text-muted-foreground" />
            <YAxis className="text-sm text-muted-foreground" />
            <ChartTooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <ChartTooltipContent
                      className="border-none shadow-md"
                      label={`${label}`}
                      content={
                        <div className="flex flex-col gap-2">
                          {payload.map((entry) => (
                            <div key={entry.name} className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                              <span className="text-sm text-muted-foreground">
                                {entry.name}: {entry.value}%
                              </span>
                            </div>
                          ))}
                        </div>
                      }
                    />
                  )
                }
                return null
              }}
            />
            <Bar dataKey="completion" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="target" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Chart>
    </ChartContainer>
  )
}

