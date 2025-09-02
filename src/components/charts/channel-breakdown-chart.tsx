"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataSourceBadge } from "@/components/ui/data-source-badge";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { TrendingUp, TrendingDown, PieChart as PieChartIcon, BarChart3, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [hiddenChannels, setHiddenChannels] = useState<Set<string>>(new Set());
  const [hoveredChannel, setHoveredChannel] = useState<string | null>(null);
  
  // Use mock data if no data provided
  const chartData = data.length > 0 ? data : mockChannelData;
  
  // Filter out hidden channels
  const visibleData = chartData.filter(item => !hiddenChannels.has(item.channel));
  

  
  const formatValue = (val: number) => {
    if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
    return val.toLocaleString();
  };

  // Interactive functions
  const toggleChannelVisibility = (channel: string) => {
    const newHidden = new Set(hiddenChannels);
    if (newHidden.has(channel)) {
      newHidden.delete(channel);
    } else {
      newHidden.add(channel);
    }
    setHiddenChannels(newHidden);
  };

  const handleChartClick = (data: { payload?: { channel: string } }) => {
    if (data && data.payload) {
      setSelectedChannel(selectedChannel === data.payload.channel ? null : data.payload.channel);
    }
  };

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: { channel: string; value: number; percentage: number; delta: number; color?: string } }>; label?: string }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background/95 backdrop-blur-sm p-4 border rounded-lg shadow-lg border-border">
          <div className="flex items-center gap-2 mb-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: data.color || COLORS[0] }}
            />
            <p className="font-semibold text-foreground">{data.channel}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-primary font-medium">
              {valueLabel}: {formatValue(data.value)}
            </p>
            <p className="text-sm text-muted-foreground">
              {data.percentage}% of total
            </p>
            {data.delta && (
              <div className="flex items-center gap-1">
                {data.delta > 0 ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <p className={`text-sm font-medium ${data.delta > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {data.delta > 0 ? '+' : ''}{data.delta.toFixed(1)}% vs last period
                </p>
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-2 border-t pt-2">
            Click to {selectedChannel === data.channel ? 'deselect' : 'select'}
          </p>
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
                    data={visibleData}
                    cx="50%"
                    cy="50%"
                    innerRadius={selectedChannel ? 50 : 40}
                    outerRadius={selectedChannel ? 110 : 100}
                    paddingAngle={2}
                    dataKey="value"
                    onClick={handleChartClick}
                                            onMouseEnter={(data: { channel?: string }) => setHoveredChannel(data?.channel || null)}
                    onMouseLeave={() => setHoveredChannel(null)}
                  >
                    {visibleData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color || COLORS[index % COLORS.length]}
                        fillOpacity={
                          selectedChannel && selectedChannel !== entry.channel ? 0.3 :
                          hoveredChannel && hoveredChannel !== entry.channel ? 0.7 : 1
                        }
                        stroke={selectedChannel === entry.channel ? "#000" : "none"}
                        strokeWidth={selectedChannel === entry.channel ? 2 : 0}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              ) : (
                <BarChart data={visibleData} layout="horizontal">
                  <XAxis type="number" tickFormatter={formatValue} fontSize={12} />
                  <YAxis type="category" dataKey="channel" width={80} fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="value" 
                    radius={[0, 4, 4, 0]}
                    onClick={handleChartClick}
                                            onMouseEnter={(data: { payload?: { channel: string } }) => setHoveredChannel(data?.payload?.channel || null)}
                    onMouseLeave={() => setHoveredChannel(null)}
                  >
                    {visibleData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color || COLORS[index % COLORS.length]}
                        fillOpacity={
                          selectedChannel && selectedChannel !== entry.channel ? 0.3 :
                          hoveredChannel && hoveredChannel !== entry.channel ? 0.7 : 1
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
          
          {/* Interactive Legend & Stats */}
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium">Channels</h4>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setHiddenChannels(new Set())}
                  className="h-6 px-2 text-xs"
                >
                  Show All
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setHiddenChannels(new Set(chartData.map(c => c.channel)))}
                  className="h-6 px-2 text-xs"
                >
                  Hide All
                </Button>
              </div>
            </div>
            
            {chartData.map((channel, index) => {
              const isHidden = hiddenChannels.has(channel.channel);
              const isSelected = selectedChannel === channel.channel;
              const isHovered = hoveredChannel === channel.channel;
              
              return (
                <div
                  key={channel.channel}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${
                    isSelected ? 'border-primary bg-primary/5' :
                    isHovered ? 'border-primary/50 bg-primary/5' :
                    isHidden ? 'border-dashed border-muted bg-muted/20 opacity-50' :
                    'border-transparent hover:border-border hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedChannel(isSelected ? null : channel.channel)}
                  onMouseEnter={() => setHoveredChannel(channel.channel)}
                  onMouseLeave={() => setHoveredChannel(null)}
                >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div 
                          className={`w-3 h-3 rounded-full transition-all ${isHidden ? 'opacity-30' : ''}`}
                          style={{ backgroundColor: channel.color || COLORS[index % COLORS.length] }}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleChannelVisibility(channel.channel);
                          }}
                          className="h-5 w-5 p-0 hover:bg-transparent"
                        >
                          {isHidden ? (
                            <EyeOff className="h-3 w-3 text-muted-foreground" />
                          ) : (
                            <Eye className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                          )}
                        </Button>
                      </div>
                      <div>
                        <p className={`font-medium text-sm transition-colors ${isHidden ? 'text-muted-foreground' : 'text-foreground'}`}>
                          {channel.channel}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {channel.percentage}% of total
                        </p>
                      </div>
                      {isSelected && (
                        <Badge variant="secondary" className="text-xs">
                          Selected
                        </Badge>
                      )}
                    </div>
                    
                    <div className="text-right">
                      <p className={`font-medium text-sm ${isHidden ? 'text-muted-foreground' : 'text-foreground'}`}>
                        {formatValue(channel.value)}
                      </p>
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
                );
              })}
            
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
