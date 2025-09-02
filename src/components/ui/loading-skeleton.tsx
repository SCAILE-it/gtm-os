"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  className?: string;
}

export function KpiCardSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardContent className="p-4">
        <div className="animate-pulse">
          {/* Title and data source */}
          <div className="flex items-center justify-between mb-3">
            <div className="h-4 bg-muted rounded w-24"></div>
            <div className="h-5 bg-muted rounded w-12"></div>
          </div>
          
          {/* Value and delta */}
          <div className="flex items-baseline gap-2 mb-4">
            <div className="h-8 bg-muted rounded w-20"></div>
            <div className="h-4 bg-muted rounded w-12"></div>
          </div>
          
          {/* Sparkline */}
          <div className="h-8 flex items-end gap-0.5">
            {Array.from({ length: 20 }).map((_, i) => {
              // Use deterministic heights to avoid hydration mismatch
              const heights = [12, 18, 24, 16, 28, 20, 14, 22, 30, 18, 26, 15, 19, 25, 17, 21, 29, 13, 23, 27];
              return (
                <div
                  key={i}
                  className="flex-1 bg-muted/60 rounded-sm min-w-[2px]"
                  style={{ height: `${heights[i]}px` }}
                />
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ChartSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-32 mb-2"></div>
          <div className="h-4 bg-muted rounded w-48"></div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="animate-pulse">
          <div className="h-64 bg-muted rounded flex items-end justify-center gap-2 p-4">
            {Array.from({ length: 8 }).map((_, i) => {
              // Use deterministic heights to avoid hydration mismatch
              const heights = [120, 180, 95, 160, 140, 200, 110, 170];
              return (
                <div
                  key={i}
                  className="bg-muted-foreground/20 rounded-t w-8"
                  style={{ height: `${heights[i]}px` }}
                />
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function TableSkeleton({ rows = 5, className }: LoadingSkeletonProps & { rows?: number }) {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-40"></div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="animate-pulse space-y-3">
          {/* Table header */}
          <div className="flex gap-4 pb-2 border-b">
            <div className="h-4 bg-muted rounded w-24"></div>
            <div className="h-4 bg-muted rounded w-20"></div>
            <div className="h-4 bg-muted rounded w-16"></div>
            <div className="h-4 bg-muted rounded w-32"></div>
          </div>
          
          {/* Table rows */}
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="flex gap-4 py-2">
              <div className="h-4 bg-muted rounded w-24"></div>
              <div className="h-4 bg-muted rounded w-20"></div>
              <div className="h-4 bg-muted rounded w-16"></div>
              <div className="h-4 bg-muted rounded w-32"></div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-pulse">
        <div className="h-8 bg-muted rounded w-64 mb-2"></div>
        <div className="h-4 bg-muted rounded w-96"></div>
      </div>
      
      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <KpiCardSkeleton key={i} />
        ))}
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
    </div>
  );
}

export function StageDashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-pulse">
        <div className="h-8 bg-muted rounded w-48 mb-2"></div>
        <div className="h-4 bg-muted rounded w-80"></div>
      </div>
      
      {/* Stage KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <KpiCardSkeleton key={i} />
        ))}
      </div>
      
      {/* Charts and Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartSkeleton />
        <TableSkeleton rows={4} />
      </div>
    </div>
  );
}

export function DataSourcesSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-pulse">
        <div className="h-8 bg-muted rounded w-56 mb-2"></div>
        <div className="h-4 bg-muted rounded w-96"></div>
      </div>
      
      {/* Data Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="animate-pulse space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-muted rounded"></div>
                  <div className="h-5 bg-muted rounded w-32"></div>
                </div>
                <div className="h-4 bg-muted rounded w-24"></div>
                <div className="h-3 bg-muted rounded w-full"></div>
                <div className="h-3 bg-muted rounded w-20"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
