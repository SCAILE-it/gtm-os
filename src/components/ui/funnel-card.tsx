"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FunnelBullet {
  label: string;
  value: string;
  delta?: number | null;
  badge?: "low-n" | "assumption" | "low-confidence" | "n/a";
}

interface FunnelCardProps {
  stage: "first-touch" | "qualified" | "opportunity" | "closed";
  title: string;
  headline: string | number | null;
  bullets: FunnelBullet[];
  onClick?: () => void;
  className?: string;
  isLast?: boolean;
}

const stageColors = {
  "first-touch": "bg-muted/40",
  "qualified": "bg-muted/50", 
  "opportunity": "bg-muted/60",
  "closed": "bg-muted/70"
};

const stageBorders = {
  "first-touch": "border-l-4 border-l-slate-400",
  "qualified": "border-l-4 border-l-slate-500",
  "opportunity": "border-l-4 border-l-slate-600", 
  "closed": "border-l-4 border-l-slate-700"
};

export function FunnelCard({
  stage,
  title,
  headline,
  bullets,
  onClick,
  className,
  isLast = false
}: FunnelCardProps) {
  const formatValue = (val: string | number | null) => {
    if (val === null) return "N/A";
    if (typeof val === "number") {
      if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
      if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
      return val.toLocaleString();
    }
    return val;
  };

  const getDeltaIcon = (delta: number) => {
    if (delta > 0) return <TrendingUp className="h-3 w-3 text-green-600" />;
    if (delta < 0) return <TrendingDown className="h-3 w-3 text-red-600" />;
    return <Minus className="h-3 w-3 text-gray-400" />;
  };

  const getDeltaColor = (delta: number) => {
    if (delta > 0) return "text-green-600";
    if (delta < 0) return "text-red-600";
    return "text-gray-400";
  };

  return (
    <div className="flex items-center">
      <Card className={cn(
        "relative overflow-hidden cursor-pointer transition-all hover:shadow-md",
        stageColors[stage],
        stageBorders[stage],
        className
      )} onClick={onClick}>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          {/* Headline */}
          <div className="mb-4">
            <p className="text-2xl font-bold text-foreground">
              {formatValue(headline)}
            </p>
          </div>

          {/* Bullets */}
          <div className="space-y-2">
            {bullets.slice(0, 3).map((bullet, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{bullet.label}</span>
                <div className="flex items-center gap-1">
                  <span className="font-medium">{bullet.value}</span>
                  {bullet.delta !== null && bullet.delta !== undefined && (
                    <div className={cn("flex items-center gap-0.5", getDeltaColor(bullet.delta))}>
                      <span suppressHydrationWarning>
                        {getDeltaIcon(bullet.delta)}
                      </span>
                      <span>{Math.abs(bullet.delta).toFixed(0)}%</span>
                    </div>
                  )}
                  {bullet.badge && (
                    <Badge variant="outline" className="text-[10px] h-4 px-1">
                      {bullet.badge}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Arrow between cards */}
      {!isLast && (
        <div className="mx-2 flex-shrink-0">
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
        </div>
      )}
    </div>
  );
}
