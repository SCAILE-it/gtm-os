"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

// TODO: Replace with API call to /api/charts/revenue
// Should accept timeRange parameter and return daily revenue data
// Expected response: { day, revenue, date }[]
const data = [
  { day: "Mon", revenue: 18500, date: "Dec 9" },
  { day: "Tue", revenue: 22400, date: "Dec 10" },
  { day: "Wed", revenue: 19800, date: "Dec 11" },
  { day: "Thu", revenue: 21200, date: "Dec 12" },
  { day: "Fri", revenue: 24600, date: "Dec 13" },
  { day: "Sat", revenue: 20800, date: "Dec 14" },
  { day: "Sun", revenue: 26100, date: "Dec 15" }
];

interface RevenueChartProps {
  height?: number;
  showTooltip?: boolean;
}

export function RevenueChart({ height = 200, showTooltip = true }: RevenueChartProps) {
  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ payload: Record<string, any>; value: number }>; label?: string }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium">{`${label}, ${data.date}`}</p>
          <p className="text-sm text-primary">
            Revenue: ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis 
          dataKey="day" 
          tick={{ fontSize: 12, fill: "#6b7280" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis 
          tick={{ fontSize: 12, fill: "#6b7280" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
        />
        {showTooltip && <Tooltip content={<CustomTooltip />} />}
        <Line 
          type="monotone" 
          dataKey="revenue" 
          stroke="#2563eb" 
          strokeWidth={2}
          dot={{ fill: "#2563eb", strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: "#2563eb", strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
