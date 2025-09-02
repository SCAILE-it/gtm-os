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
      if (delta > 0) return <TrendingUp className="h-3 w-3 text-green-600" />;
      if (delta < 0) return <TrendingDown className="h-3 w-3 text-red-600" />;
      return <Minus className="h-3 w-3 text-gray-400" />;
    };
    DeltaIcon.displayName = 'DeltaIcon';
    return DeltaIcon;
  }, []);

  // Early return after hooks
  if (hidden) return null;

  const getDeltaColor = (delta: number) => {
    if (delta > 0) return "text-green-600";
    if (delta < 0) return "text-red-600";
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
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-muted-foreground">{title}</p>
                {tooltip && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
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
                <DataSourceBadge sources={dataSources} size="sm" />
              )}
            </div>
            
            <div className="flex items-baseline gap-2">
              <p className={cn(
                "text-2xl font-bold",
                value === null || value === "N/A" ? "text-muted-foreground" : "text-foreground"
              )}>
                {formatValue(value)}
              </p>
              
              {delta !== null && delta !== undefined && (
                <div className={cn("flex items-center gap-1 text-xs", getDeltaColor(delta))}>
                  {getDeltaIcon(delta)}
                  <span>{Math.abs(delta).toFixed(1)}%</span>
                </div>
              )}
            </div>
          </div>

          {badge && (
            <Badge variant={getBadgeVariant(badge)} className="text-xs">
              {badge === "n/a" ? "N/A" : badge.replace("-", " ")}
            </Badge>
          )}
        </div>

        {/* Simple sparkline placeholder */}
        {sparkline && sparkline.length > 0 && (
          <div className="mt-4 h-8 flex items-end gap-0.5">
            {sparkline.slice(-20).map((value, index) => (
              <div
                key={index}
                className="flex-1 bg-muted/60 rounded-sm min-w-[2px]"
                style={{
                  height: `${Math.max(2, (value / Math.max(...sparkline)) * 32)}px`
                }}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
});

// Export the memoized component
export const KpiCard = KpiCardComponent;
