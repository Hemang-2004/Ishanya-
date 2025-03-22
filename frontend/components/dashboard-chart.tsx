"use client"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
} from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const data = [
  {
    name: "Jan",
    students: 120,
    volunteers: 45,
    staff: 18,
  },
  {
    name: "Feb",
    students: 145,
    volunteers: 52,
    staff: 20,
  },
  {
    name: "Mar",
    students: 190,
    volunteers: 68,
    staff: 22,
  },
  {
    name: "Apr",
    students: 210,
    volunteers: 75,
    staff: 25,
  },
  {
    name: "May",
    students: 250,
    volunteers: 92,
    staff: 28,
  },
  {
    name: "Jun",
    students: 280,
    volunteers: 110,
    staff: 30,
  },
]

export function DashboardChart() {
  return (
    <ChartContainer>
      <ChartLegend className="mb-4">
        <ChartLegendItem name="Students" color="hsl(var(--primary))" />
        <ChartLegendItem name="Volunteers" color="hsl(var(--secondary))" />
        <ChartLegendItem name="Staff" color="hsl(var(--muted))" />
      </ChartLegend>
      <Chart className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
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
                                {entry.name}: {entry.value}
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
            <Area
              type="monotone"
              dataKey="students"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary) / 0.2)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="volunteers"
              stroke="hsl(var(--secondary))"
              fill="hsl(var(--secondary) / 0.2)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="staff"
              stroke="hsl(var(--muted))"
              fill="hsl(var(--muted) / 0.2)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Chart>
    </ChartContainer>
  )
}

