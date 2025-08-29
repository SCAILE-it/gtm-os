"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataSourceBadge } from "@/components/ui/data-source-badge";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { TrendingUp, TrendingDown, PieChart as PieChartIcon, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ChannelData {
  channel: string;
  value: number;
  percentage: number;
  delta?: number;
  color: string;
}

interface ChannelBreakdownChartProps {
  data: ChannelData[];
  title: string;
  valueLabel: string;
  className?: string;
}

// Mock channel data
const mockChannelData: ChannelData[] = [
  { channel: "Organic Search", value: 998, percentage: 35.1, delta: 2.1, color: "#3b82f6" },
  { channel: "Paid Ads", value: 797, percentage: 28.0, delta: -1.5, color: "#8b5cf6" },
  { channel: "Direct", value: 512, percentage: 18.0, delta: 3.2, color: "#10b981" },
  { channel: "Email", value: 341, percentage: 12.0, delta: 1.8, color: "#f59e0b" },
  { channel: "Social", value: 199, percentage: 7.0, delta: -0.5, color: "#ef4444" }
];

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#84cc16'];

export function ChannelBreakdownChart({ data, title, valueLabel, className }: ChannelBreakdownChartProps) {
  const [viewMode, setViewMode] = useState<"pie" | "bar">("pie");
  
  // Use mock data if no data provided
  const chartData = data.length > 0 ? data : mockChannelData;
  
  const formatValue = (val: number) => {
    if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
    return val.toLocaleString();
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{data.channel}</p>
          <p className="text-sm text-blue-600">
            {valueLabel}: {formatValue(data.value)}
          </p>
          <p className="text-sm text-muted-foreground">
            {data.percentage}% of total
          </p>
          {data.delta && (
            <p className={`text-sm ${data.delta > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {data.delta > 0 ? '+' : ''}{data.delta.toFixed(1)}% vs last period
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={className}>
              <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <PieChartIcon className="h-5 w-5" />
                {title}
              </CardTitle>
              <DataSourceBadge sources={["GA4"]} className="mt-2" />
            </div>
            
            <div className="flex items-center border rounded-lg p-1">
            <Button
              variant={viewMode === "pie" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("pie")}
              className="h-7 px-2"
            >
              <PieChartIcon className="h-3 w-3" />
            </Button>
            <Button
              variant={viewMode === "bar" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("bar")}
              className="h-7 px-2"
            >
              <BarChart3 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              {viewMode === "pie" ? (
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              ) : (
                <BarChart data={chartData} layout="horizontal">
                  <XAxis type="number" tickFormatter={formatValue} fontSize={12} />
                  <YAxis type="category" dataKey="channel" width={80} fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
          
          {/* Legend & Stats */}
          <div className="space-y-3">
            {chartData.map((channel, index) => (
              <div key={channel.channel} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: channel.color || COLORS[index % COLORS.length] }}
                  />
                  <div>
                    <p className="font-medium text-sm">{channel.channel}</p>
                    <p className="text-xs text-muted-foreground">{channel.percentage}% of total</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-medium text-sm">{formatValue(channel.value)}</p>
                  {channel.delta && (
                    <div className={`flex items-center gap-1 text-xs ${
                      channel.delta > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {channel.delta > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {Math.abs(channel.delta).toFixed(1)}%
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Summary */}
            <div className="pt-3 border-t">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total {valueLabel}</span>
                <span className="font-medium">
                  {formatValue(chartData.reduce((sum, channel) => sum + channel.value, 0))}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-muted-foreground">Top Channel</span>
                <span className="font-medium">{chartData[0].channel}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
