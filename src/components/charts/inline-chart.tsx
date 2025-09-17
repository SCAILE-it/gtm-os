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
  // Theme-aware colors following global design rules
  const COLORS = ['hsl(var(--muted-foreground))', 'hsl(var(--foreground) / 0.7)', 'hsl(var(--foreground) / 0.5)', 'hsl(var(--foreground) / 0.3)'];
  
  
  // Ensure data exists
  if (!chart.data || chart.data.length === 0) {
    return (
      <div className="h-24 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
        No data available
      </div>
    );
  }

  const renderChart = () => {
    switch (chart.type) {
      case "bar":
        return (
          <div className="w-full h-full bg-background rounded p-2 flex items-center min-h-[120px]">
            <div className="flex items-end justify-between h-full w-full gap-1">
              {chart.data.map((item, index) => {
                const maxValue = Math.max(...chart.data.map(d => d.count || d.value || 0));
                const height = ((item.count || item.value || 0) / maxValue) * 100;
                return (
                  <div key={index} className="flex flex-col items-center flex-1 h-full">
                    <div className="flex-1 flex items-end">
                      <div 
                        className="w-full bg-foreground/60 rounded-t transition-all duration-300"
                        style={{ height: `${height}%`, minHeight: '2px' }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 truncate">
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
          <div className="w-full h-full bg-background rounded p-4 min-h-[120px]">
            <div className="grid grid-cols-4 gap-3 h-full items-center">
              {chart.data.map((entry, index) => {
                const percentage = entry.percentage || Math.round((entry.value / chart.data.reduce((sum, item) => sum + item.value, 0)) * 100);
                return (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div 
                      className="w-3 h-3 rounded-full mb-1"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <div className="text-xs text-foreground">
                      <div className="font-medium">{entry.name}</div>
                      <div className="text-muted-foreground">{percentage}%</div>
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
    <div className="w-full h-full">
      <div className="text-sm font-medium text-foreground mb-2 px-2 pt-1">
        {chart.title}
      </div>
      {renderChart()}
    </div>
  );
}
