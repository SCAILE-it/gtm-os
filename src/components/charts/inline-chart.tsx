"use client";

import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

interface InlineChartProps {
  chart: {
    id: string;
    type: "line" | "bar" | "pie";
    title: string;
    data: Array<Record<string, any>>;
  };
}

export function InlineChart({ chart }: InlineChartProps) {
  const COLORS = ['#2563eb', '#6b7280', '#9ca3af', '#d1d5db'];

  const renderChart = () => {
    switch (chart.type) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chart.data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="stage" 
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
              />
              <Bar 
                dataKey="count" 
                fill="#2563eb"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={chart.data}
                cx="50%"
                cy="50%"
                outerRadius={60}
                dataKey="value"
                label={({ name, percentage }) => `${name} ${percentage}%`}
                labelStyle={{ fontSize: 11, fill: '#6b7280' }}
              >
                {chart.data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`$${(value / 1000).toFixed(1)}K`, 'Revenue']}
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return <div className="h-32 bg-muted/50 rounded flex items-center justify-center text-xs text-muted-foreground">Chart type not supported</div>;
    }
  };

  return (
    <div className="border border-border rounded-lg p-3 bg-background">
      <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
        📊 {chart.title}
      </h4>
      {renderChart()}
    </div>
  );
}
