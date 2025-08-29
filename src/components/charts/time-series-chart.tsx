"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";
import { TrendingUp, TrendingDown, Calendar, BarChart3 } from "lucide-react";

interface TimeSeriesDataPoint {
  date: string;
  value: number;
  cumulative?: number;
  annotations?: string[];
}

interface TimeSeriesChartProps {
  data: TimeSeriesDataPoint[];
  title: string;
  valueLabel: string;
  showCumulative?: boolean;
  color?: string;
  className?: string;
}

// Generate mock data for demonstration
const generateMockData = (days: number = 30): TimeSeriesDataPoint[] => {
  const data: TimeSeriesDataPoint[] = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  let cumulative = 0;
  
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    // Generate realistic GTM data with some trend and variance
    const baseValue = 50 + Math.sin(i / 7) * 20; // Weekly pattern
    const variance = (Math.random() - 0.5) * 20;
    const trend = i * 2; // Growth trend
    const value = Math.max(0, Math.round(baseValue + variance + trend));
    
    cumulative += value;
    
    data.push({
      date: date.toISOString().split('T')[0],
      value,
      cumulative,
      annotations: i % 10 === 0 ? [`Week ${Math.floor(i/7) + 1} milestone`] : undefined
    });
  }
  
  return data;
};

export function TimeSeriesChart({ 
  data, 
  title, 
  valueLabel, 
  showCumulative = false, 
  color = "#3b82f6",
  className 
}: TimeSeriesChartProps) {
  const [viewMode, setViewMode] = useState<"daily" | "cumulative">("daily");
  const [chartType, setChartType] = useState<"line" | "area">("area");
  
  // Use mock data if no data provided
  const chartData = data.length > 0 ? data : generateMockData();
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  const formatValue = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toLocaleString();
  };
  
  const currentValue = viewMode === "daily" ? "value" : "cumulative";
  const latestPoint = chartData[chartData.length - 1];
  const previousPoint = chartData[chartData.length - 8]; // Week ago
  const deltaPercent = previousPoint ? 
    ((latestPoint[currentValue]! - previousPoint[currentValue]!) / previousPoint[currentValue]!) * 100 : 0;

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">{title}</CardTitle>
            {deltaPercent !== 0 && (
              <Badge variant={deltaPercent > 0 ? "default" : "destructive"} className="gap-1">
                {deltaPercent > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {Math.abs(deltaPercent).toFixed(1)}%
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {showCumulative && (
              <div className="flex items-center border rounded-lg p-1">
                <Button
                  variant={viewMode === "daily" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("daily")}
                  className="h-7 px-2 text-xs"
                >
                  Daily
                </Button>
                <Button
                  variant={viewMode === "cumulative" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("cumulative")}
                  className="h-7 px-2 text-xs"
                >
                  Cumulative
                </Button>
              </div>
            )}
            
            <div className="flex items-center border rounded-lg p-1">
              <Button
                variant={chartType === "area" ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType("area")}
                className="h-7 px-2"
              >
                <BarChart3 className="h-3 w-3" />
              </Button>
              <Button
                variant={chartType === "line" ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType("line")}
                className="h-7 px-2"
              >
                <Calendar className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div>
            <p className="text-2xl font-bold">{formatValue(latestPoint[currentValue]!)}</p>
            <p className="text-sm text-muted-foreground">{valueLabel}</p>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>Latest: {formatDate(latestPoint.date)}</p>
            <p>7-day change: {deltaPercent > 0 ? '+' : ''}{deltaPercent.toFixed(1)}%</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "area" ? (
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate}
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  tickFormatter={formatValue}
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  labelFormatter={formatDate}
                  formatter={(value: number) => [formatValue(value), valueLabel]}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey={currentValue}
                  stroke={color}
                  strokeWidth={2}
                  fill="url(#colorGradient)"
                />
              </AreaChart>
            ) : (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate}
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  tickFormatter={formatValue}
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  labelFormatter={formatDate}
                  formatter={(value: number) => [formatValue(value), valueLabel]}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey={currentValue}
                  stroke={color}
                  strokeWidth={2}
                  dot={{ fill: color, strokeWidth: 0, r: 3 }}
                  activeDot={{ r: 5, fill: color }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
        
        {/* Annotations */}
        {chartData.some(d => d.annotations) && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm font-medium text-muted-foreground mb-2">Notable Events:</p>
            <div className="flex flex-wrap gap-1">
              {chartData.filter(d => d.annotations).slice(-3).map((point, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {formatDate(point.date)}: {point.annotations![0]}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
