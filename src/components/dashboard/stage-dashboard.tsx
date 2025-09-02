"use client";


import { KpiCard } from "@/components/ui/kpi-card";
import { TimeSeriesChart } from "@/components/charts/time-series-chart";

import { ExposureRail } from "@/components/charts/exposure-rail";
import { DataSourceBadge } from "@/components/ui/data-source-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type StageType = "first-touch" | "qualified" | "opportunity" | "closed";

interface StageDashboardProps {
  stage: StageType;
}

type DataSource = "CRM" | "GA4" | "GSC" | "Google Ads" | "Email" | "LinkedIn" | "PostHog" | "Manual" | "Calculated";
// type BadgeType = "assumption" | "low-confidence" | "n/a" | "ads-only" | null; // Commented out - unused

// Removed unused Metric interface to fix linting
// interface Metric {
//   title: string;
//   value: string | number;
//   delta: number;
//   tooltip: string;
//   dataSources?: readonly DataSource[];
//   badge?: BadgeType;
// }

const stageConfig = {
  "first-touch": {
    title: "First Touch",
    description: "Unknown → Identified Contact",
    exitCondition: "Provides contact info OR demonstrates engagement intent",
    color: "blue",
    metrics: [
      { title: "Contacts Created", value: 2847, delta: 12.3, tooltip: "# identified contacts created (CRM) or first seen (GA4→CRM join)", dataSources: ["CRM", "GA4"] as const },
      { title: "Engagement Rate", value: "45%", delta: 3.2, tooltip: "Engaged sessions / sessions (GA4)", dataSources: ["GA4"] as const },
      { title: "Cost per Touch", value: 12.50, delta: -2.1, tooltip: "Ads spend / Contacts Created. Hidden if no Ads", badge: "ads-only" as const, dataSources: ["Google Ads"] as const },
      { title: "Time to Qualify", value: "3.2 days", delta: -0.5, tooltip: "Median(first touch → qualified)", dataSources: ["CRM"] as const }
    ]
  },
  "qualified": {
    title: "Qualified",
    description: "Identified → Validated Potential Customer", 
    exitCondition: "Passes qualification criteria (BANT, MEDDIC, etc.)",
    color: "purple",
    metrics: [
      { title: "MQLs/SQLs", value: 654, delta: 8.7, tooltip: "Distinct contacts whose first qualifying timestamp for MQL/SQL falls in Zeitraum", dataSources: ["CRM"] as const },
      { title: "ICP Match Score", value: "78%", delta: 4.2, tooltip: "% of Qualified that match ICP rule (Settings)", dataSources: ["CRM"] as const },
      { title: "Cost per Qualified", value: 125, delta: -3.1, tooltip: "Ads spend ÷ # Qualified. Hidden if Ads absent", dataSources: ["Google Ads"] as const, badge: "ads-only" as const },
      { title: "Time to Opportunity", value: "5.8 days", delta: 1.2, tooltip: "Median days from first touch → opportunity", dataSources: ["CRM"] as const }
    ]
  },
  "opportunity": {
    title: "Opportunity",
    description: "Potential → Active Sales Process",
    exitCondition: "Formal sales process initiated (demo scheduled, proposal requested)",
    color: "green", 
    metrics: [
      { title: "Opportunities", value: 147, delta: 15.3, tooltip: "Distinct contacts/deals with first opportunity timestamp in Zeitraum", dataSources: ["CRM"] },
      { title: "Avg Deal Size", value: "€15.4K", delta: 8.3, tooltip: "Mean/median open opp amount in window. N/A if Deals missing", dataSources: ["CRM"], badge: "n/a" as const },
      { title: "Cost per Opportunity", value: 540, delta: -5.2, tooltip: "Ads spend ÷ # Opportunities. Hidden if Ads absent", dataSources: ["Google Ads"], badge: "ads-only" as const },
      { title: "Time to Close", value: "28 days", delta: -1.8, tooltip: "Median days opportunity → closed for opps that closed in/after Zeitraum", dataSources: ["CRM"] }
    ]
  },
  "closed": {
    title: "Closed",
    description: "Active → Decided",
    exitCondition: "Contract signed OR deal definitively lost",
    color: "orange",
    metrics: [
      { title: "Won Deals", value: 50, delta: 22.1, tooltip: "# deals in closed-won with first won date in Zeitraum", dataSources: ["CRM"] as const },
      { title: "Win Rate", value: "34%", delta: 5.1, tooltip: "Won / closed-any (won + lost) within Zeitraum", dataSources: ["CRM"] as const },
      { title: "CAC", value: 1850, delta: -8.7, tooltip: "Σ Ads spend ÷ new customers in Zeitraum. Hidden if Ads missing", dataSources: ["Google Ads", "CRM"] as const, badge: "ads-only" as const },
      { title: "Sales Cycle Length", value: "32 days", delta: -2.3, tooltip: "Median days first touch → close (primary) and opp → close (secondary)", dataSources: ["CRM"] as const }
    ]
  }
};

// Unused mock data - commented out to fix linting
// const mockChannelData = [
//   { channel: "Organic Search", share: 35, delta: 2.1 },
//   { channel: "Paid Ads", share: 28, delta: -1.5 },
//   { channel: "Direct", share: 18, delta: 3.2 },
//   { channel: "Email", share: 12, delta: 1.8 },
//   { channel: "Social", share: 7, delta: -0.5 }
// ];

const mockPersonas = [
  { title: "VP Marketing", share: 32, lift: 1.8 },
  { title: "CMO", share: 28, lift: 2.1 },
  { title: "Marketing Director", share: 24, lift: 1.5 },
  { title: "Growth Manager", share: 16, lift: 1.2 }
];

const mockKeywords = [
  { keyword: "marketing automation", channel: "seo", lift: 2.3, stability: 0.85 },
  { keyword: "lead generation", channel: "paid", lift: 1.9, stability: 0.72 },
  { keyword: "customer analytics", channel: "seo", lift: 1.6, stability: 0.91 },
  { keyword: "sales funnel", channel: "paid", lift: 1.4, stability: 0.68 }
];

export function StageDashboard({ stage }: StageDashboardProps) {
  // Removed unused chartView state to fix linting
  const config = stageConfig[stage];

  return (
    <div className="space-y-6">
      {/* Stage Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className={cn(
              "h-3 w-3 rounded-full",
              config.color === "blue" && "bg-blue-500",
              config.color === "purple" && "bg-purple-500", 
              config.color === "green" && "bg-green-500",
              config.color === "orange" && "bg-orange-500"
            )} />
            <h1 className="text-3xl font-bold tracking-tight">{config.title} Stage</h1>
          </div>
          <p className="text-muted-foreground mb-1">{config.description}</p>
          <p className="text-sm text-muted-foreground">
            <strong>Exit Condition:</strong> {config.exitCondition}
          </p>
        </div>
        <div></div>
      </div>

      {/* Stage Breadcrumb */}
      <div className="flex items-center gap-2 p-4 bg-background border rounded-lg">
        <div className="flex items-center gap-2">
          {Object.entries(stageConfig).map(([key, stageInfo], index) => (
            <div key={key} className="flex items-center gap-2">
              <Button
                variant={key === stage ? "default" : "outline"}
                size="sm"
                className="cursor-pointer"
                onClick={() => {
                  if (key !== stage) {
                    window.location.href = `/stages/${key}`;
                  }
                }}
              >
                {stageInfo.title}
              </Button>
              {index < Object.keys(stageConfig).length - 1 && (
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* KPI Grid */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Stage Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {config.metrics.map((metric, index) => (
            <KpiCard
              key={index}
              title={metric.title}
              value={metric.value}
              delta={metric.delta}
              tooltip={metric.tooltip}
              badge={metric.badge}
              dataSources={(metric.dataSources as DataSource[]) || (["CRM"] as const)}
            />
          ))}
        </div>
      </div>

      {/* Exposure Rail - Only for First Touch */}
      {stage === "first-touch" && (
        <ExposureRail
          metrics={[]}
          chartData={[]}
        />
      )}

      {/* Historical Chart */}
      <TimeSeriesChart
        data={[]}
        title={`${config.title} Historical Trends`}
        valueLabel={config.title}
        showCumulative={true}
        color={
          config.color === "blue" ? "#3b82f6" :
          config.color === "purple" ? "#8b5cf6" :
          config.color === "green" ? "#10b981" : "#f59e0b"
        }
      />



      {/* Stage-Specific Operational Data */}
      {stage === "qualified" && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Forms Performance</CardTitle>
              <DataSourceBadge sources={["CRM"]} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="grid grid-cols-6 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
                <span>Form Type</span>
                <span>Submissions</span>
                <span>Completion %</span>
                <span>Phone %</span>
                <span>Pain %</span>
                <span>SQL Rate</span>
              </div>
              <div className="grid grid-cols-6 gap-4 text-sm items-center">
                <span className="font-medium">Demo Request</span>
                <span>142</span>
                <span className="text-green-600">89%</span>
                <span className="text-green-600">67%</span>
                <span className="text-blue-600">45%</span>
                <span className="font-medium">78%</span>
              </div>
              <div className="grid grid-cols-6 gap-4 text-sm items-center">
                <span className="font-medium">Contact Form</span>
                <span>98</span>
                <span className="text-yellow-600">72%</span>
                <span className="text-red-600">23%</span>
                <span className="text-yellow-600">31%</span>
                <span className="font-medium">45%</span>
              </div>
              <div className="grid grid-cols-6 gap-4 text-sm items-center">
                <span className="font-medium">Guide Download</span>
                <span>67</span>
                <span className="text-green-600">94%</span>
                <span className="text-red-600">12%</span>
                <span className="text-green-600">67%</span>
                <span className="font-medium">34%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {stage === "opportunity" && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Pipeline Health</CardTitle>
              <DataSourceBadge sources={["CRM"]} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">12%</div>
                <div className="text-sm text-muted-foreground">Aged {'>'}30d</div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">89%</div>
                <div className="text-sm text-muted-foreground">Next Meeting</div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">76%</div>
                <div className="text-sm text-muted-foreground">Proposal Sent</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {stage === "closed" && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Closed Deals</CardTitle>
              <DataSourceBadge sources={["CRM"]} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="grid grid-cols-7 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
                <span>Deal</span>
                <span>ARR</span>
                <span>Source</span>
                <span>Persona</span>
                <span>ICP</span>
                <span>Cycle</span>
                <span>Close Date</span>
              </div>
              <div className="grid grid-cols-7 gap-4 text-sm items-center">
                <span className="font-medium">Acme Corp</span>
                <span>€24K</span>
                <span>SEO</span>
                <span>CMO</span>
                <Badge variant="default" className="text-xs">Yes</Badge>
                <span>28d</span>
                <span>Jan 15</span>
              </div>
              <div className="grid grid-cols-7 gap-4 text-sm items-center">
                <span className="font-medium">Beta Inc</span>
                <span>€18K</span>
                <span>Paid</span>
                <span>VP Marketing</span>
                <Badge variant="default" className="text-xs">Yes</Badge>
                <span>34d</span>
                <span>Jan 12</span>
              </div>
              <div className="grid grid-cols-7 gap-4 text-sm items-center">
                <span className="font-medium">Gamma Ltd</span>
                <span>€12K</span>
                <span>Direct</span>
                <span>Marketing Dir</span>
                <Badge variant="secondary" className="text-xs">No</Badge>
                <span>45d</span>
                <span>Jan 08</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bottom Insights Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Top Personas</CardTitle>
              <DataSourceBadge sources={["CRM"]} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPersonas.map((persona, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <div className="font-medium">{persona.title}</div>
                    <div className="text-sm text-muted-foreground">{persona.share}% of stage</div>
                  </div>
                  <Badge variant="outline">
                    {persona.lift}x lift
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Top Keywords</CardTitle>
              <DataSourceBadge sources={["GSC", "Google Ads"]} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockKeywords.map((keyword, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <div className="font-medium">{keyword.keyword}</div>
                    <div className="text-sm text-muted-foreground capitalize">{keyword.channel}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {keyword.lift}x lift
                    </Badge>
                    <div className="text-xs text-muted-foreground">
                      {Math.round(keyword.stability * 100)}% stable
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>


    </div>
  );
}
