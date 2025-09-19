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
          <div className="w-full h-full bg-background rounded p-3 flex items-center">
            <div className="flex items-end justify-between h-full w-full gap-2" style={{ height: '100px' }}>
              {chart.data.map((item, index) => {
                const maxValue = Math.max(...chart.data.map(d => d.count || d.value || 0));
                const height = ((item.count || item.value || 0) / maxValue) * 80 + 10; // Ensure minimum height
                return (
                  <div key={index} className="flex flex-col items-center flex-1 h-full">
                    <div className="flex-1 flex items-end justify-center" style={{ height: '80px' }}>
                      <div 
                        className="w-full bg-blue-500 rounded-t transition-all duration-300"
                        style={{ 
                          height: `${height}px`,
                          maxWidth: '40px',
                          minHeight: '4px'
                        }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 truncate text-center">
                      {item.stage || item.name}
                    </div>
                    <div className="text-xs font-medium text-foreground">
                      {item.count || item.value}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      
      case "pie":
        return (
          <div className="w-full h-full bg-background rounded p-3">
            <div className="grid grid-cols-2 gap-2 h-full">
              {chart.data.map((entry, index) => {
                const percentage = entry.percentage || Math.round((entry.value / chart.data.reduce((sum, item) => sum + (item.value || 0), 0)) * 100);
                const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'];
                return (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: colors[index % colors.length] }}
                    />
                    <div className="text-xs text-foreground min-w-0">
                      <div className="font-medium truncate">{entry.name}</div>
                      <div className="text-muted-foreground">{percentage}% • {entry.value?.toLocaleString()}</div>
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
    <div className="w-full h-full flex flex-col">
      <div className="text-sm font-medium text-foreground mb-2 px-2 pt-2">
        {chart.title}
      </div>
      <div className="flex-1">
        {renderChart()}
      </div>
    </div>
  );
}
