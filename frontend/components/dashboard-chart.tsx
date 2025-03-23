"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ChartTooltip } from "@/components/ui/chart"

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
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<ChartTooltip />} />
          <Legend />
          <Bar dataKey="students" fill="#8884d8" name="Students" />
          <Bar dataKey="volunteers" fill="#82ca9d" name="Volunteers" />
          <Bar dataKey="staff" fill="#ffc658" name="Staff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default DashboardChart

