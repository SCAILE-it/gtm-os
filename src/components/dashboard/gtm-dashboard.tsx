"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target, 
  DollarSign,
  ArrowRight,
  ExternalLink,
  Info,
  CheckCircle2,
  Clock,
  AlertCircle,
  Bot,
  MessageSquare,
  BarChart3
} from "lucide-react";

interface FunnelMetric {
  label: string;
  value: string;
  change: {
    day: number;
    week: number;
    month: number;
  };
  benchmark: {
    industry: number;
    top25: number;
    bottom25: number;
    status: "above" | "below" | "at";
  };
  dataSources: string[];
  calculation?: string;
}

interface AgentRun {
  id: string;
  name: string;
  status: "running" | "completed" | "scheduled";
  progress?: number;
  result?: string;
  timestamp: Date;
}

interface DailyTask {
  id: string;
  title: string;
  impact: string;
  urgency: "high" | "medium" | "low";
  category: "attract" | "convert" | "close";
  dataSources: string[];
}

export function GTMDashboard() {
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedChannel, setSelectedChannel] = useState("All");
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState("All");
  const [selectedTimeframe, setSelectedTimeframe] = useState<"day" | "week" | "month">("day");

  // Tool-Specific KPIs Based on Integrations
  const funnelMetrics = {
    attract: {
      // GSC + GA4 Metrics
      organicTraffic: {
        label: "Organic Traffic",
        value: "12.4K",
        change: { day: 8.3, week: 12.1, month: 18.7 },
        benchmark: { industry: 10000, top25: 15000, bottom25: 5000, status: "above" as const },
        dataSources: ["Google Search Console", "GA4"],
        calculation: "Organic search sessions from GSC + GA4"
      },
      // Google Ads Metrics
      paidLeads: {
        label: "Paid Leads", 
        value: "847",
        change: { day: -3.2, week: 5.8, month: 12.4 },
        benchmark: { industry: 750, top25: 1200, bottom25: 400, status: "above" as const },
        dataSources: ["Google Ads", "GA4"],
        calculation: "Conversions from Google Ads campaigns"
      },
      // Phantombuster + Apollo Outbound
      outboundReplies: {
        label: "Outbound Replies",
        value: "156",
        change: { day: 15.2, week: 8.9, month: 22.1 },
        benchmark: { industry: 120, top25: 200, bottom25: 60, status: "above" as const },
        dataSources: ["Phantombuster", "Instantly", "Apollo"],
        calculation: "Positive replies from outbound campaigns"
      },
      // Peek AI + Teamfluence
      contentPerformance: {
        label: "Content Reach",
        value: "45.2K",
        change: { day: 6.7, week: 14.3, month: 28.9 },
        benchmark: { industry: 35000, top25: 55000, bottom25: 18000, status: "above" as const },
        dataSources: ["Peek AI", "Teamfluence"],
        calculation: "Total content impressions and engagement"
      },
      // Combined Cost Efficiency
      costPerLead: {
        label: "Blended CAC",
        value: "$42",
        change: { day: -8.1, week: -5.3, month: -12.1 },
        benchmark: { industry: 55, top25: 35, bottom25: 85, status: "above" as const },
        dataSources: ["Google Ads", "Phantombuster", "Apollo"],
        calculation: "Total marketing spend / Total leads acquired"
      }
    },
    convert: {
      qualified: {
        label: "Interested Leads",
        value: "847",
        change: 15.7,
        period: selectedTimeframe,
        benchmark: { industry: 650, status: "above" as const },
        dataSources: ["HubSpot", "Pipedrive"],
        calculation: "Leads with engagement score > 70 or replied to outreach"
      },
      rate: {
        label: "Interest Rate",
        value: "29.8%",
        change: 2.1,
        period: selectedTimeframe,
        benchmark: { industry: 25, status: "above" as const },
        dataSources: ["HubSpot", "Pipedrive"],
        calculation: "Interested leads / Total leads * 100"
      }
    },
    close: {
      opportunities: {
        label: "Real Opportunities",
        value: "127",
        change: 8.9,
        period: selectedTimeframe,
        benchmark: { industry: 95, status: "above" as const },
        dataSources: ["HubSpot", "Pipedrive"],
        calculation: "Qualified leads with budget + authority + timeline"
      },
      revenue: {
        label: "Revenue",
        value: "$142.5K",
        change: 18.2,
        period: selectedTimeframe,
        benchmark: { industry: 120000, status: "above" as const },
        dataSources: ["HubSpot", "Stripe"],
        calculation: "Closed deals * Average deal value"
      }
    }
  };

  // Daily Tasks for Improvements
  const dailyTasks: DailyTask[] = [
    {
      id: "1",
      title: "Optimize mobile conversion rate",
      impact: "+$60K monthly",
      urgency: "high",
      category: "convert",
      dataSources: ["Google Analytics", "Hotjar"]
    },
    {
      id: "2", 
      title: "Scale email outreach campaigns",
      impact: "+$30K monthly",
      urgency: "medium",
      category: "attract",
      dataSources: ["Instantly", "Apollo"]
    },
    {
      id: "3",
      title: "Improve lead qualification process",
      impact: "+15% close rate",
      urgency: "medium", 
      category: "close",
      dataSources: ["HubSpot", "Pipedrive"]
    }
  ];

  // Agent Runs of the Day
  const agentRuns: AgentRun[] = [
    {
      id: "1",
      name: "Keywords Research Agent",
      status: "completed",
      result: "Found 23 high-value keywords",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2h ago
    },
    {
      id: "2",
      name: "Lead Enrichment Agent", 
      status: "running",
      progress: 73,
      timestamp: new Date(Date.now() - 30 * 60 * 1000) // 30m ago
    },
    {
      id: "3",
      name: "Conversion Optimizer",
      status: "scheduled",
      timestamp: new Date(Date.now() + 2 * 60 * 60 * 1000) // in 2h
    }
  ];

  const renderFunnelCard = (
    title: string,
    subtitle: string,
    metrics: Record<string, FunnelMetric>,
    color: string,
    onClick: () => void
  ) => (
    <Card className="cursor-pointer hover:shadow-md transition-all duration-200 group" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </CardTitle>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>
          </div>
          <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(metrics).map(([key, metric]) => (
          <div key={key} className="group/metric relative">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-gray-900 dark:text-gray-100">
                {metric.label}
              </span>
              <Info className="h-3 w-3 text-gray-400 opacity-0 group-hover/metric:opacity-100 transition-opacity" />
            </div>
            
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {metric.value}
                </span>
                <div className="text-xs text-gray-500 space-y-0.5">
                  <div className="flex items-center gap-0.5">
                    <span className="text-xs">DoD</span>
                    <span className={metric.change.day > 0 ? 'text-gray-600' : 'text-gray-600'}>
                      {metric.change.day > 0 ? '+' : ''}{metric.change.day}%
                    </span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <span className="text-xs">WoW</span>
                    <span className={metric.change.week > 0 ? 'text-gray-600' : 'text-gray-600'}>
                      {metric.change.week > 0 ? '+' : ''}{metric.change.week}%
                    </span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <span className="text-xs">MoM</span>
                    <span className={metric.change.month > 0 ? 'text-gray-600' : 'text-gray-600'}>
                      {metric.change.month > 0 ? '+' : ''}{metric.change.month}%
                    </span>
                  </div>
                </div>
              </div>
            
            {/* Clean Benchmark Bar */}
            <div className="mt-2">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 relative">
                {/* Bottom 25% */}
                <div className="absolute left-0 w-1/4 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-l-full" />
                {/* Middle 50% (Industry Average) */}
                <div className="absolute left-1/4 w-1/2 h-1.5 bg-gray-400 dark:bg-gray-500" />
                {/* Top 25% */}
                <div className="absolute right-0 w-1/4 h-1.5 bg-gray-500 dark:bg-gray-400 rounded-r-full" />
                
                {/* Your Performance Indicator */}
                <div 
                  className="absolute top-0 w-0.5 h-1.5 bg-gray-900 dark:bg-gray-100 transition-all duration-300"
                  style={{ 
                    left: `${Math.min(95, Math.max(5, 
                      ((parseInt(metric.value.replace(/[^0-9.]/g, '')) - metric.benchmark.bottom25) / 
                       (metric.benchmark.top25 - metric.benchmark.bottom25)) * 100
                    ))}%` 
                  }}
                />
              </div>
            </div>
            
            {/* Tooltip on Hover */}
            <div className="absolute inset-0 opacity-0 group-hover/metric:opacity-100 transition-opacity pointer-events-none">
              <div className="absolute top-0 left-0 right-0 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs p-2 rounded shadow-lg z-10">
                <div className="mb-1">Sources: {metric.dataSources.join(", ")}</div>
                {metric.calculation && (
                  <div>Calculation: {metric.calculation}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Filters */}
      <div className="flex items-center gap-2">
        {/* Location Filter */}
        <select className="text-xs border border-gray-200 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800">
          <option>All Locations</option>
          <option>North America</option>
          <option>Europe</option>
          <option>Asia Pacific</option>
        </select>
        
        {/* Channel Filter */}
        <select className="text-xs border border-gray-200 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800">
          <option>All Channels</option>
          <option>Inbound</option>
          <option>Outbound</option>
          <option>Referral</option>
        </select>
        
        {/* Business Unit Filter */}
        <select className="text-xs border border-gray-200 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800">
          <option>All Units</option>
          <option>Enterprise</option>
          <option>SMB</option>
          <option>Startup</option>
        </select>
        
        {/* Timeframe Filter */}
        <select className="text-xs border border-gray-200 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>This month</option>
          <option>Last month</option>
          <option>This quarter</option>
          <option>Custom range...</option>
        </select>
      </div>

      {/* Funnel Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {renderFunnelCard(
          "Attract",
          "Inbound: SEO, AEO, SEA, LinkedIn, Newsletter, Webinars + Outbound: Email & LinkedIn Outreach",
          funnelMetrics.attract,
          "gray",
          () => console.log("Open Attract tab")
        )}
        
        {renderFunnelCard(
          "Convert", 
          "CRM Data: Leads registered through inbound or replied to outbound",
          funnelMetrics.convert,
          "gray",
          () => console.log("Open Convert tab")
        )}
        
        {renderFunnelCard(
          "Close",
          "CRM Data: Qualified leads, closed deals",
          funnelMetrics.close,
          "gray", 
          () => console.log("Open Close tab")
        )}
      </div>

      {/* Dashboard Boxes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Tasks for Improvements */}
        <Card className="cursor-pointer hover:shadow-md transition-all duration-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Daily Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {dailyTasks.map((task) => (
              <div 
                key={task.id} 
                className="p-3 bg-gray-50 dark:bg-gray-800 rounded border hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors group"
                onClick={() => console.log(`Open ${task.category} tab for task:`, task.title)}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-900 dark:text-gray-100">
                    {task.title}
                  </span>
                  <Badge variant={task.urgency === "high" ? "default" : "secondary"} className="text-xs">
                    {task.urgency}
                  </Badge>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  Impact: {task.impact}
                </div>
                
                {/* Data Sources on Hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-500">
                  Sources: {task.dataSources.join(", ")}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Agent Runs of the Day */}
        <Card className="cursor-pointer hover:shadow-md transition-all duration-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Agent Runs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {agentRuns.map((agent) => (
              <div 
                key={agent.id}
                className="p-3 bg-gray-50 dark:bg-gray-800 rounded border hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                onClick={() => console.log("Open agent details:", agent.name)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-900 dark:text-gray-100">
                    {agent.name}
                  </span>
                  <div className="flex items-center gap-1">
                    {agent.status === "running" && (
                      <Clock className="h-3 w-3 text-gray-600 animate-pulse" />
                    )}
                    {agent.status === "completed" && (
                      <CheckCircle2 className="h-3 w-3 text-gray-600" />
                    )}
                    {agent.status === "scheduled" && (
                      <AlertCircle className="h-3 w-3 text-gray-400" />
                    )}
                  </div>
                </div>
                
                {agent.status === "running" && agent.progress && (
                  <div className="space-y-1">
                    <Progress value={agent.progress} className="h-1" />
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {agent.progress}% complete
                    </div>
                  </div>
                )}
                
                {agent.result && (
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {agent.result}
                  </div>
                )}
                
                <div className="text-xs text-gray-500 mt-1">
                  {agent.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Market Sentiment Insights */}
        <Card className="cursor-pointer hover:shadow-md transition-all duration-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Market Sentiment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              {
                topic: "AI Marketing Tools",
                sentiment: "Positive",
                change: "+15%",
                source: "Reddit + Google News",
                insight: "Increased interest in automation"
              },
              {
                topic: "B2B SaaS Pricing",
                sentiment: "Cautious", 
                change: "-8%",
                source: "Reddit + Google News",
                insight: "Budget constraints mentioned"
              },
              {
                topic: "Remote Work Solutions",
                sentiment: "Stable",
                change: "+2%",
                source: "Reddit + Google News", 
                insight: "Steady demand continues"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="p-3 bg-gray-50 dark:bg-gray-800 rounded border hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors group"
                onClick={() => console.log("Open market sentiment details for:", item.topic)}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {item.topic}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {item.sentiment}
                  </Badge>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  {item.insight}
                </div>
                
                {/* Data Sources on Hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-500">
                  Source: {item.source}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
