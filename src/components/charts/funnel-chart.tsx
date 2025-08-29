"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataSourceBadge } from "@/components/ui/data-source-badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Users, ArrowDown } from "lucide-react";

interface FunnelBullet {
  label: string;
  value: string;
  delta?: number | null;
  badge?: "low-n" | "assumption" | "low-confidence" | "n/a";
}

interface FunnelStageData {
  stage: string;
  count: number;
  conversionRate?: number;
  delta?: number;
  color: string;
  bullets?: FunnelBullet[];
}

interface FunnelChartProps {
  data: FunnelStageData[];
  title: string;
  className?: string;
}

// Mock funnel data
const mockFunnelData: FunnelStageData[] = [
  { stage: "First Touch", count: 2847, conversionRate: 100, delta: 12.3, color: "#3b82f6" },
  { stage: "Qualified", count: 654, conversionRate: 23.0, delta: 8.7, color: "#8b5cf6" },
  { stage: "Opportunity", count: 147, conversionRate: 22.5, delta: 15.3, color: "#10b981" },
  { stage: "Closed", count: 50, conversionRate: 34.0, delta: 22.1, color: "#f59e0b" }
];

export function FunnelChart({ data, title, className }: FunnelChartProps) {
  // Use mock data if no data provided
  const funnelData = data.length > 0 ? data : mockFunnelData;
  
  const formatValue = (val: number) => {
    if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
    return val.toLocaleString();
  };

  const maxCount = Math.max(...funnelData.map(d => d.count));

  return (
    <div className={className}>
      {/* Horizontal Funnel - Clean Layout */}
      <div className="w-full h-full">
        <div className="grid grid-cols-4 gap-4 h-full">
            {funnelData.map((stage, index) => {
              const nextStage = funnelData[index + 1];
              const conversionToNext = nextStage ? ((nextStage.count / stage.count) * 100) : 100;
              
              return (
                <div key={stage.stage} className="relative">
                  {/* Stage Card - Spacious */}
                  <div className="p-6 border rounded-xl bg-background/50 h-full flex flex-col justify-between">
                    {/* Stage Header */}
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: stage.color }}
                        />
                        <span className="font-semibold text-lg">{stage.stage}</span>
                      </div>
                      <div className="flex items-baseline gap-3">
                        <div className="text-4xl font-bold">{formatValue(stage.count)}</div>
                        {stage.delta && (
                          <Badge 
                            variant={stage.delta > 0 ? "default" : "destructive"} 
                            className="gap-1"
                          >
                            {stage.delta > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                            {Math.abs(stage.delta).toFixed(0)}%
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Stage Bullets - Spacious */}
                    {stage.bullets && (
                      <div className="space-y-4 flex-1">
                        {stage.bullets.slice(0, 3).map((bullet, bulletIndex) => (
                          <div key={bulletIndex} className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">{bullet.label}</span>
                              {bullet.delta !== null && bullet.delta !== undefined && (
                                <span className={`text-sm font-medium ${
                                  bullet.delta > 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {bullet.delta > 0 ? '↗' : '↘'}{Math.abs(bullet.delta)}%
                                </span>
                              )}
                            </div>
                            <div className="text-base font-semibold">{bullet.value}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Conversion Arrow - Positioned absolutely */}
                  {nextStage && (
                    <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                      <div className="flex flex-col items-center bg-background border rounded-lg px-2 py-1 shadow-sm">
                        <TrendingUp className="h-3 w-3 text-green-600" />
                        <span className="text-xs font-medium text-green-700 dark:text-green-400">
                          {conversionToNext.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
