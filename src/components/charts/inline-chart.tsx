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
  
  // Debug log
  console.log('InlineChart rendering:', chart);

  const renderChart = () => {
    switch (chart.type) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={120}>
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
          <div className="w-full h-[120px] flex items-center justify-center">
            <PieChart width={200} height={120}>
              <Pie
                data={chart.data}
                cx={100}
                cy={60}
                innerRadius={20}
                outerRadius={50}
                paddingAngle={2}
                dataKey="value"
              >
                {chart.data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`$${(value / 1000).toFixed(1)}K`, 'Revenue']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '12px'
                }}
              />
            </PieChart>
          </div>
        );
      
      default:
        return <div className="h-32 bg-muted/50 rounded flex items-center justify-center text-xs text-muted-foreground">Chart type not supported</div>;
    }
  };

  return (
    <div className="border border-border rounded-lg p-3 bg-background">
      <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
        {chart.title}
      </h4>
      {renderChart()}
    </div>
  );
}
