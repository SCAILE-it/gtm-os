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
          <div className="w-full h-[100px] p-2">
            <BarChart width={280} height={80} data={chart.data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <XAxis 
                dataKey="stage" 
                tick={{ fontSize: 10, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
                interval={0}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '4px',
                  fontSize: '11px'
                }}
              />
              <Bar 
                dataKey="count" 
                fill="#6b7280"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </div>
        );
      
      case "pie":
        return (
          <div className="w-full h-[140px] p-2">
            <div className="flex items-center gap-3">
              {/* Chart */}
              <div className="flex-shrink-0">
                <PieChart width={100} height={80}>
                  <Pie
                    data={chart.data}
                    cx={50}
                    cy={40}
                    innerRadius={12}
                    outerRadius={28}
                    paddingAngle={1}
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
                      borderRadius: '4px',
                      fontSize: '10px'
                    }}
                  />
                </PieChart>
              </div>
              
              {/* Legend */}
              <div className="flex-1 space-y-1">
                {chart.data.map((entry, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-gray-900 dark:text-gray-100 truncate">
                        {entry.name}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {entry.percentage || Math.round((entry.value / chart.data.reduce((sum, item) => sum + item.value, 0)) * 100)}%
                      </div>
                    </div>
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
      <h4 className="text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">
        {chart.title}
      </h4>
      {renderChart()}
    </div>
  );
}
