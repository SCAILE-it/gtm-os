"use client";

import { useState, useCallback, useMemo } from "react";
import { KpiCard } from "@/components/ui/kpi-card";
import { FunnelChart } from "@/components/charts/funnel-chart";
import { ChannelBreakdownChart } from "@/components/charts/channel-breakdown-chart";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardSkeleton } from "@/components/ui/loading-skeleton";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { useKpiData } from "@/hooks/useSupabaseData";
import { Button } from "@/components/ui/button";
import { DataSourceType } from "@/lib/supabase/types";
import { Lightbulb, Database, BarChart3, Users, TrendingUp, RefreshCw, AlertTriangle } from "lucide-react";

// Mock data following the new specification
const mockKpiData = {
  totalContacts: { 
    value: 2847, 
    delta: 12.3, 
    sparkline: [100, 120, 140, 135, 160, 180, 170, 190, 210, 200],
    tooltip: "Distinct CRM contacts; sparkline = new contacts/day",
    dataSources: ["CRM"] as DataSourceType[]
  },
  totalClosedSales: { 
    value: 485000, 
    delta: -3.2, 
    sparkline: [400000, 420000, 450000, 480000, 485000],
    tooltip: "Total Closed Sales or ARR in €",
    badge: null,
    dataSources: ["CRM"] as DataSourceType[]
  },
  winRate: { 
    value: "34%", 
    delta: 5.1,
    tooltip: "closed-won / closed-any (CRM)",
    badge: null,
    dataSources: ["CRM"] as DataSourceType[]
  },
  cac: { 
    value: 1850, 
    delta: -8.7, 
    badge: "ads-only" as const, 
    hidden: false,
    tooltip: "Σ Ads spend / new customers. Hidden if no Ads or spend=0",
    dataSources: ["Google Ads", "CRM"] as DataSourceType[]
  },
  totalLTV: { 
    value: 45000, 
    delta: 8.3,
    tooltip: "Total Customer Lifetime Value in € (Prediction how much revenue can be expected)",
    badge: "assumption" as const
  },
  icpMatch: { 
    value: "78%", 
    delta: 4.2,
    tooltip: "How many deals were actually closed with an interaction of the previously defined ICP = Target Persona for ads and Outreach"
  },
  timeToClose: { 
    value: 32, 
    delta: -1.8,
    tooltip: "median(opportunity → close) in days"
  }
};

// Unused mock data - commented out to fix linting
// const mockFunnelData = [
//   {
//     stage: "first-touch" as const,
//     title: "First Touch",
//     headline: 2847,
//     bullets: [
//       { label: "Top channel share", value: "SEO 35%", delta: 2.1 },
//       { label: "Engagement rate", value: "45%", delta: 3.2 },
//       { label: "Company-email share", value: "67%", delta: 1.8 }
//     ]
//   },
//   {
//     stage: "qualified" as const,
//     title: "Qualified", 
//     headline: 654,
//     bullets: [
//       { label: "MQL vs SQL mix", value: "MQL 60%", delta: 4.2 },
//       { label: "ICP match share", value: "78%", delta: 2.1 },
//       { label: "Top campaigns", value: "Content Marketing", delta: 1.8 }
//     ]
//   },
//   {
//     stage: "opportunity" as const,
//     title: "Opportunity",
//     headline: 147, 
//     bullets: [
//       { label: "Source→Opp top share", value: "SEO 42%", delta: 8.3 },
//       { label: "Proposal sent rate", value: "89%", delta: 5.2 },
//       { label: "Stage-stuck >30d", value: "12%", delta: -2.9 }
//     ]
//   },
//   {
//     stage: "closed" as const,
//     title: "Closed",
//     headline: 50,
//     bullets: [
//       { label: "Top win source", value: "SEO", delta: 5.1 },
//       { label: "Avg deal size", value: "€15.4K", delta: 8.3 },
//       { label: "Median sales cycle", value: "28 days", delta: -1.8 }
//     ]
//   }
// ];

// Mock data for charts
const mockChannelData = [
  { channel: "Organic Search", value: 998, percentage: 35.1, delta: 2.1, color: "#10b981" },
  { channel: "Paid Ads", value: 797, percentage: 28.0, delta: -1.5, color: "#3b82f6" },
  { channel: "Direct", value: 512, percentage: 18.0, delta: 3.2, color: "#8b5cf6" },
  { channel: "Email", value: 341, percentage: 12.0, delta: 1.8, color: "#f59e0b" },
  { channel: "Social", value: 199, percentage: 7.0, delta: -0.5, color: "#ef4444" }
];

// Unused mock data - commented out to fix linting
// const mockConversionFunnelData = [
//   { stage: "First Touch", count: 2847, conversionRate: 100, delta: 12.3, color: "#64748b" },
//   { stage: "Qualified", count: 654, conversionRate: 23.0, delta: 8.7, color: "#64748b" },
//   { stage: "Opportunity", count: 147, conversionRate: 22.5, delta: 15.3, color: "#64748b" },
//   { stage: "Closed", count: 50, conversionRate: 34.0, delta: 22.1, color: "#64748b" }
// ];

export function OverviewDashboard() {
  const [viewMode, setViewMode] = useState<"kpis" | "funnel" | "channels">("kpis");
  const { data: kpiData, loading, error, retry, isRetrying } = useKpiData();

  // Memoize tab change handler to prevent unnecessary re-renders
  const handleViewModeChange = useCallback((value: string) => {
    setViewMode(value as "kpis" | "funnel" | "channels");
  }, []);

  // Memoize display data to prevent recalculation on every render
  const displayData = useMemo(() => {
    return kpiData || mockKpiData;
  }, [kpiData]);

  // Loading state
  if (loading) {
    return <DashboardSkeleton />;
  }

  // Error state with retry option
  if (error && !kpiData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="border-destructive/50 bg-destructive/5 max-w-md">
          <CardContent className="p-6 text-center space-y-4">
            <AlertTriangle className="h-12 w-12 text-destructive mx-auto" />
            <div>
              <h3 className="font-semibold text-destructive mb-2">Failed to load dashboard</h3>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
            <Button 
              onClick={retry}
              disabled={isRetrying}
              className="gap-2"
            >
              {isRetrying ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              {isRetrying ? 'Retrying...' : 'Try Again'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }



  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">GTM Overview</h1>
        <p className="text-muted-foreground mt-1">
          CEO dashboard with key performance indicators and funnel analysis
        </p>
      </div>

      {/* Unified GTM Dashboard */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">GTM Dashboard</h2>
          <Tabs value={viewMode} onValueChange={handleViewModeChange} className="w-auto">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="kpis" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                KPIs
              </TabsTrigger>
              <TabsTrigger value="funnel" className="gap-2">
                <Users className="h-4 w-4" />
                Funnel
              </TabsTrigger>
              <TabsTrigger value="channels" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                Channels
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <Tabs value={viewMode} onValueChange={handleViewModeChange}>
          <TabsContent value="kpis" className="h-[600px]">
            <ErrorBoundary>
              {/* CEO KPI Ribbon - Two Rows for Better Spacing */}
              <div className="space-y-8">
              {/* Top Row - Primary Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <KpiCard
                  title="Total Contacts"
                  value={displayData.totalContacts.value}
                  delta={displayData.totalContacts.delta}
                  sparkline={displayData.totalContacts.sparkline}
                  tooltip={displayData.totalContacts.tooltip}
                  dataSources={displayData.totalContacts.dataSources}
                />
                <KpiCard
                  title="ARR (€)"
                  value={displayData.totalClosedSales.value}
                  delta={displayData.totalClosedSales.delta}
                  sparkline={displayData.totalClosedSales.sparkline}
                  tooltip={displayData.totalClosedSales.tooltip}
                  badge={displayData.totalClosedSales.badge}
                  dataSources={displayData.totalClosedSales.dataSources}
                />
                <KpiCard
                  title="Win Rate"
                  value={displayData.winRate.value}
                  delta={displayData.winRate.delta}
                  tooltip={displayData.winRate.tooltip}
                  badge={displayData.winRate.badge}
                  dataSources={displayData.winRate.dataSources}
                />
                <KpiCard
                  title="CAC (ads-only)"
                  value={displayData.cac.value}
                  delta={displayData.cac.delta}
                  badge={displayData.cac.badge}
                  hidden={displayData.cac.hidden}
                  tooltip={displayData.cac.tooltip}
                  dataSources={displayData.cac.dataSources}
                />
              </div>
              
              {/* Bottom Row - Secondary Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <KpiCard
                  title="Customer LTV (€)"
                  value={mockKpiData.totalLTV.value}
                  delta={mockKpiData.totalLTV.delta}
                  tooltip={mockKpiData.totalLTV.tooltip}
                  badge={mockKpiData.totalLTV.badge}
                  dataSources={["Calculated"]}
                />
                <KpiCard
                  title="ICP Match Score"
                  value={mockKpiData.icpMatch.value}
                  delta={mockKpiData.icpMatch.delta}
                  tooltip={mockKpiData.icpMatch.tooltip}
                  dataSources={["CRM"]}
                />
                <KpiCard
                  title="Time to Close"
                  value={mockKpiData.timeToClose.value}
                  delta={mockKpiData.timeToClose.delta}
                  tooltip={mockKpiData.timeToClose.tooltip}
                  dataSources={["CRM"]}
                />
              </div>
              </div>
            </ErrorBoundary>

          </TabsContent>

          <TabsContent value="funnel" className="h-[600px] overflow-hidden">
            <FunnelChart
              data={[
                { 
                  stage: "First Touch", 
                  count: 2847, 
                  conversionRate: 100, 
                  delta: 12.3, 
                  color: "#64748b",
                  bullets: [
                    { label: "Top channel share", value: "SEO 35%", delta: 2 },
                    { label: "Engagement rate", value: "45%", delta: 3 },
                    { label: "Company-email share", value: "67%", delta: 2 }
                  ]
                },
                { 
                  stage: "Qualified", 
                  count: 654, 
                  conversionRate: 23.0, 
                  delta: 8.7, 
                  color: "#64748b",
                  bullets: [
                    { label: "MQL vs SQL mix", value: "MQL 60%", delta: 4 },
                    { label: "ICP match share", value: "78%", delta: 2 },
                    { label: "Top campaigns", value: "Content Marketing", delta: 2 }
                  ]
                },
                { 
                  stage: "Opportunity", 
                  count: 147, 
                  conversionRate: 22.5, 
                  delta: 15.3, 
                  color: "#64748b",
                  bullets: [
                    { label: "Source→Opp top share", value: "SEO 42%", delta: 8 },
                    { label: "Proposal sent rate", value: "89%", delta: 5 },
                    { label: "Stage-stuck >30d", value: "12%", delta: -3 }
                  ]
                },
                { 
                  stage: "Closed", 
                  count: 50, 
                  conversionRate: 34.0, 
                  delta: 22.1, 
                  color: "#64748b",
                  bullets: [
                    { label: "Top win source", value: "SEO", delta: 5 },
                    { label: "Avg deal size", value: "€15.4K", delta: 8 },
                    { label: "Median sales cycle", value: "28 days", delta: -2 }
                  ]
                }
              ]}
              title="GTM Conversion Funnel with KPIs"
            />
          </TabsContent>

          <TabsContent value="channels" className="h-[600px] overflow-hidden">
            <ChannelBreakdownChart
              data={mockChannelData}
              title="Channel Performance"
              valueLabel="Contacts"
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Quick Actions - Minimal */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="cursor-pointer hover:shadow-sm transition-shadow" onClick={() => window.location.href = '/admin/recommendations'}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              <div>
                <h3 className="font-medium">Recommendations</h3>
                <p className="text-sm text-muted-foreground">3 active insights</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-sm transition-shadow" onClick={() => window.location.href = '/admin/data-sources'}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Database className="h-5 w-5 text-slate-500" />
              <div>
                <h3 className="font-medium">Data Sources</h3>
                <p className="text-sm text-muted-foreground">4 of 6 connected</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>


    </div>
  );
}
