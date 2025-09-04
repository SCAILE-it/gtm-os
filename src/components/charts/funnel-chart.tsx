"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

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

const FunnelChartComponent = React.memo(function FunnelChart({ data, className }: FunnelChartProps) {
  const [selectedStage, setSelectedStage] = React.useState<string | null>(null);
  const [hoveredStage, setHoveredStage] = React.useState<string | null>(null);
  
  // Memoize data processing
  const funnelData = React.useMemo(() => {
    return data.length > 0 ? data : mockFunnelData;
  }, [data]);
  
  // Memoize formatting function
  const formatValue = React.useMemo(() => (val: number) => {
    if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
    return val.toLocaleString();
  }, []);



  return (
    <div className={className}>
      {/* Horizontal Funnel - Responsive Layout */}
      <div className="w-full h-full overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 h-full">
            {funnelData.map((stage, index) => {
              const nextStage = funnelData[index + 1];
              const conversionToNext = nextStage ? ((nextStage.count / stage.count) * 100) : 100;
              
              const isSelected = selectedStage === stage.stage;
              const isHovered = hoveredStage === stage.stage;
              const isLast = index === funnelData.length - 1;
              
              return (
                <div key={stage.stage} className="relative w-full">
                  {/* Stage Card - Interactive */}
                  <div 
                    className={`p-4 sm:p-6 border rounded-xl h-full flex flex-col justify-between cursor-pointer transition-all duration-200 ${
                      isSelected ? 'border-primary bg-primary/5 shadow-lg scale-105' :
                      isHovered ? 'border-primary/50 bg-primary/5 shadow-md' :
                      'border-border bg-background/50 hover:border-border/80 hover:bg-background/70'
                    }`}
                    onClick={() => setSelectedStage(isSelected ? null : stage.stage)}
                    onMouseEnter={() => setHoveredStage(stage.stage)}
                    onMouseLeave={() => setHoveredStage(null)}
                  >
                    {/* Stage Header */}
                    <div className="mb-4 sm:mb-6">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div 
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{ backgroundColor: stage.color }}
                        />
                        <span className="font-semibold text-base sm:text-lg truncate">{stage.stage}</span>
                      </div>
                      <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
                        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">{formatValue(stage.count)}</div>
                        {stage.delta && (
                          <Badge
                            variant={stage.delta > 0 ? "default" : "destructive"}
                            className="gap-1 shrink-0"
                          >
                            <span suppressHydrationWarning>
                              {stage.delta > 0 ? <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" /> : <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4" />}
                            </span>
                            {Math.abs(stage.delta).toFixed(0)}%
                          </Badge>
                        )}
                      </div>
                      
                      {/* Conversion Rate - Mobile Friendly */}
                      {nextStage && (
                        <div className="mt-2 sm:mt-3 lg:hidden">
                          <div className="inline-flex items-center gap-1 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 px-2 py-1 rounded-md text-xs font-medium">
                            <TrendingUp className="h-3 w-3" />
                            {conversionToNext.toFixed(0)}% conversion
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Stage Bullets - Responsive */}
                    {stage.bullets && (
                      <div className="space-y-3 sm:space-y-4 flex-1">
                        {stage.bullets.slice(0, 3).map((bullet, bulletIndex) => (
                          <div key={bulletIndex} className="space-y-1">
                            <div className="flex items-start justify-between gap-2">
                              <span className="text-xs sm:text-sm text-muted-foreground leading-tight flex-1 min-w-0">{bullet.label}</span>
                              {bullet.delta !== null && bullet.delta !== undefined && (
                                <span className={`text-xs sm:text-sm font-medium shrink-0 ${
                                  bullet.delta > 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {bullet.delta > 0 ? '↗' : '↘'}{Math.abs(bullet.delta)}%
                                </span>
                              )}
                            </div>
                            <div className="text-sm sm:text-base font-semibold truncate">{bullet.value}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Conversion Arrow - Desktop Only, Safe Positioning */}
                  {nextStage && !isLast && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2 z-10">
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
});

// Export the memoized component
export const FunnelChart = FunnelChartComponent;
