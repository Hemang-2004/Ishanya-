"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import { ChartTooltip } from "@/components/ui/chart"

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
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[50, 100]} />
          <Tooltip content={<ChartTooltip />} />
          <Legend />
          <ReferenceLine y={80} label="Target" stroke="red" strokeDasharray="3 3" />
          <Line type="monotone" dataKey="completion" stroke="#8884d8" activeDot={{ r: 8 }} name="Completion Rate (%)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ReportsChart

