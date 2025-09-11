"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataSourceBadge } from "@/components/ui/data-source-badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TrendingUp, TrendingDown, Minus, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: string | number | null;
  delta?: number | null;
  sparkline?: number[];
  badge?: "assumption" | "low-confidence" | "n/a" | "ads-only" | null;
  tooltip?: string;
  hidden?: boolean;
  className?: string;
  dataSources?: ("CRM" | "GA4" | "GSC" | "Google Ads" | "Email" | "LinkedIn" | "PostHog" | "Manual" | "Calculated")[];
}

const KpiCardComponent = React.memo(function KpiCard({
  title,
  value,
  delta,
  sparkline,
  badge,
  tooltip,
  hidden = false,
  className,
  dataSources = []
}: KpiCardProps) {
  // Memoize expensive formatting calculation
  const formatValue = React.useMemo(() => (val: string | number | null) => {
    if (val === null) return "N/A";
    if (typeof val === "number") {
      if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
      if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
      return val.toLocaleString();
    }
    return val;
  }, []);

  // Memoize delta icon calculation
  const getDeltaIcon = React.useMemo(() => {
    const DeltaIcon = (delta: number) => {
      if (delta > 0) return <TrendingUp className="h-3 w-3 text-scaile-green" />;
      if (delta < 0) return <TrendingDown className="h-3 w-3 text-scaile-pink" />;
      return <Minus className="h-3 w-3 text-gray-400" />;
    };
    DeltaIcon.displayName = 'DeltaIcon';
    return DeltaIcon;
  }, []);

  // Early return after hooks
  if (hidden) return null;

  const getDeltaColor = (delta: number) => {
    if (delta > 0) return "text-scaile-green";
    if (delta < 0) return "text-scaile-pink";  
    return "text-gray-400";
  };

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "assumption": return "secondary";
      case "low-confidence": return "outline";
      case "n/a": return "destructive";
      case "ads-only": return "default";
      default: return "secondary";
    }
  };

  return (
    <Card className={cn("relative overflow-hidden transition-all duration-200 hover:shadow-md hover:border-primary/20 hover:bg-primary/5 cursor-pointer", className)}>
      <CardContent className="p-3 sm:p-4">
        <div className="space-y-3">
          {/* Header Section */}
          <div className="flex items-start justify-between gap-2 min-h-[20px]">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">{title}</p>
              {tooltip && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="shrink-0">
                      <Info className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            {dataSources.length > 0 && (
              <div className="shrink-0">
                <DataSourceBadge sources={dataSources} size="sm" />
              </div>
            )}
          </div>
          
          {/* Value and Delta Section */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-2 flex-1 min-w-0">
              <p className={cn(
                "text-lg sm:text-xl lg:text-2xl font-bold truncate",
                value === null || value === "N/A" ? "text-muted-foreground" : "text-foreground"
              )}>
                {formatValue(value)}
              </p>
              
              {delta !== null && delta !== undefined && (
                <div className={cn("flex items-center gap-1 text-xs shrink-0", getDeltaColor(delta))}>
                  <span suppressHydrationWarning>
                    {getDeltaIcon(delta)}
                  </span>
                  <span>{Math.abs(delta).toFixed(1)}%</span>
                </div>
              )}
            </div>

            {badge && (
              <div className="shrink-0">
                <Badge variant={getBadgeVariant(badge)} className="text-xs">
                  {badge === "n/a" ? "N/A" : badge.replace("-", " ")}
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Simple sparkline placeholder */}
        {sparkline && sparkline.length > 0 && (
          <div className="mt-3 h-6 sm:h-8 flex items-end gap-0.5 overflow-hidden">
            {sparkline.slice(-20).map((value, index) => {
              // Use a deterministic calculation to avoid hydration mismatch
              const maxValue = Math.max(...sparkline);
              const normalizedValue = maxValue > 0 ? value / maxValue : 0;
              const heightPercent = Math.max(10, Math.round(normalizedValue * 90) + 10);
              return (
                <div
                  key={`sparkline-${index}`}
                  className="flex-1 bg-muted/60 rounded-sm min-w-[1px] sm:min-w-[2px]"
                  style={{
                    height: `${heightPercent}%`
                  }}
                />
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
});

// Export the memoized component
export const KpiCard = KpiCardComponent;
