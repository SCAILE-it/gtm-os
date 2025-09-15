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
  const COLORS = ['#e5e5e5', '#a3a3a3', '#737373', '#525252'];
  
  // Debug log
  console.log('InlineChart rendering:', chart);
  
  // Ensure data exists
  if (!chart.data || chart.data.length === 0) {
    return (
      <div className="h-24 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center text-xs text-gray-500">
        No data available
      </div>
    );
  }

  const renderChart = () => {
    switch (chart.type) {
      case "bar":
        return (
          <div className="w-full h-[80px] p-1">
            <BarChart width={260} height={60} data={chart.data} margin={{ top: 2, right: 2, left: 2, bottom: 15 }}>
              <XAxis 
                dataKey="stage" 
                tick={{ fontSize: 9, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
                interval={0}
              />
              <Bar 
                dataKey="count" 
                fill="#d1d5db"
                radius={[1, 1, 0, 0]}
              />
            </BarChart>
          </div>
        );
      
      case "pie":
        return (
          <div className="w-full h-[80px] p-1">
            <div className="flex items-start gap-2 h-full">
              {/* Minimal Chart */}
              <div className="flex-shrink-0">
                <PieChart width={60} height={60}>
                  <Pie
                    data={chart.data}
                    cx={30}
                    cy={30}
                    innerRadius={8}
                    outerRadius={25}
                    paddingAngle={0}
                    dataKey="value"
                  >
                    {chart.data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </div>
              
              {/* Minimal Legend */}
              <div className="flex-1 space-y-0.5 pt-1">
                {chart.data.map((entry, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <div 
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-xs text-gray-700 dark:text-gray-300 truncate">
                      {entry.name} {entry.percentage || Math.round((entry.value / chart.data.reduce((sum, item) => sum + item.value, 0)) * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      default:
        return <div className="h-32 bg-muted/50 rounded flex items-center justify-center text-xs text-muted-foreground">Chart type not supported</div>;
    }
  };

  return (
    <div className="w-full">
      {renderChart()}
    </div>
  );
}
