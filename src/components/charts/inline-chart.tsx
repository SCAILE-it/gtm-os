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
          <div className="w-full h-[60px] bg-gray-50 dark:bg-gray-800 rounded p-2">
            <div className="flex items-end justify-between h-full gap-1">
              {chart.data.map((item, index) => {
                const maxValue = Math.max(...chart.data.map(d => d.count || d.value || 0));
                const height = ((item.count || item.value || 0) / maxValue) * 100;
                return (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div 
                      className="w-full bg-gray-400 dark:bg-gray-600 rounded-t transition-all duration-300"
                      style={{ height: `${height}%`, minHeight: '2px' }}
                    />
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 truncate">
                      {item.stage || item.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      
      case "pie":
        return (
          <div className="w-full h-[60px] bg-gray-50 dark:bg-gray-800 rounded p-2">
            <div className="flex items-center gap-3 h-full">
              {chart.data.map((entry, index) => {
                const percentage = entry.percentage || Math.round((entry.value / chart.data.reduce((sum, item) => sum + item.value, 0)) * 100);
                return (
                  <div key={index} className="flex items-center gap-1 flex-1">
                    <div 
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <div className="text-xs text-gray-700 dark:text-gray-300 truncate">
                      <div className="font-medium">{entry.name}</div>
                      <div className="text-gray-500">{percentage}%</div>
                    </div>
                  </div>
                );
              })}
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
