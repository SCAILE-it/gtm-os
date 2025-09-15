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
    target: number;
    status: "above" | "below" | "at";
    editable: boolean;
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
  const [selectedComparison, setSelectedComparison] = useState<"day" | "week" | "month">("day");

  // Clean GTM KPIs focused on actionable metrics

  const funnelMetrics = {
    attract: {
      // What matters: Quality of traffic, not just volume
      qualifiedVisitors: {
        label: "Qualified Visitors",
        value: "3.2K",
        change: { day: 12.1, week: 8.7, month: 18.2 },
        benchmark: { target: 2500, status: "above" as const, editable: true },
        dataSources: ["GA4", "Peek"],
        calculation: "Visitors matching ICP criteria + engagement signals"
      },
      // What matters: Conversion efficiency, not just leads
      conversionRate: {
        label: "Visitor→Lead Rate", 
        value: "4.2%",
        change: { day: 0.3, week: -0.1, month: 0.8 },
        benchmark: { target: 3.5, status: "above" as const, editable: true },
        dataSources: ["GA4", "HubSpot"],
        calculation: "Form submissions / Qualified visitors * 100"
      },
      // What matters: Outbound effectiveness
      outboundConversion: {
        label: "Outbound→Meeting Rate",
        value: "12.8%",
        change: { day: 2.1, week: -1.2, month: 3.4 },
        benchmark: { target: 8.0, status: "above" as const, editable: true },
        dataSources: ["Apollo", "Instantly"],
        calculation: "Meetings booked / Outbound contacts * 100"
      }
    },
    convert: {
      // What matters: Speed to qualification
      timeToQualify: {
        label: "Avg. Time to Qualify",
        value: "2.3 days",
        change: { day: -0.2, week: -0.5, month: -0.8 },
        benchmark: { target: 3, status: "above" as const, editable: true },
        dataSources: ["HubSpot", "Pipedrive"],
        calculation: "Time from lead creation to qualified status"
      },
      // What matters: Quality of leads moving forward
      qualificationRate: {
        label: "Lead→Qualified Rate",
        value: "28.4%",
        change: { day: 1.2, week: 2.8, month: 4.1 },
        benchmark: { target: 25, status: "above" as const, editable: true },
        dataSources: ["HubSpot", "Pipedrive"],
        calculation: "Qualified leads / Total leads * 100"
      },
      // What matters: Pipeline velocity
      pipelineValue: {
        label: "Pipeline Added",
        value: "$847K",
        change: { day: 12.3, week: 8.9, month: 15.7 },
        benchmark: { target: 650000, status: "above" as const, editable: true },
        dataSources: ["HubSpot", "Pipedrive"],
        calculation: "New opportunities value added to pipeline"
      }
    },
    close: {
      // What matters: Deal velocity
      salesCycle: {
        label: "Avg. Sales Cycle",
        value: "42 days",
        change: { day: -1.2, week: -3.8, month: -8.1 },
        benchmark: { target: 45, status: "above" as const, editable: true },
        dataSources: ["HubSpot", "Pipedrive"],
        calculation: "Days from opportunity to closed-won"
      },
      // What matters: Win rate efficiency
      winRate: {
        label: "Win Rate",
        value: "24.6%",
        change: { day: 0.8, week: 1.2, month: 2.3 },
        benchmark: { target: 20, status: "above" as const, editable: true },
        dataSources: ["HubSpot", "Pipedrive"],
        calculation: "Closed-won / Total opportunities * 100"
      },
      // What matters: Revenue predictability
      monthlyRecurring: {
        label: "New MRR",
        value: "$47.2K",
        change: { day: 8.9, week: 12.4, month: 18.7 },
        benchmark: { target: 40000, status: "above" as const, editable: true },
        dataSources: ["Stripe", "HubSpot"],
        calculation: "New monthly recurring revenue from closed deals"
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
    <Card className="cursor-pointer hover:shadow-md transition-all duration-200 group bg-white dark:bg-[#262626] border border-gray-200 dark:border-gray-600" onClick={onClick}>
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
            <div className="space-y-2">
              {/* Metric Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium text-gray-900 dark:text-gray-100">
                    {metric.label}
                  </span>
                  <div className="text-xs text-gray-400 opacity-0 group-hover/metric:opacity-100 transition-opacity">
                    {metric.dataSources.map(source => source.split(' ')[0]).join('+')}
                  </div>
                </div>
                <div className="text-xs text-gray-500 space-y-0.5">
                  <div className="flex items-center gap-0.5">
                    <span>DoD</span>
                    <span className={metric.change.day > 0 ? 'text-gray-600' : 'text-gray-600'}>
                      {metric.change.day > 0 ? '+' : ''}{metric.change.day}%
                    </span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <span>WoW</span>
                    <span className={metric.change.week > 0 ? 'text-gray-600' : 'text-gray-600'}>
                      {metric.change.week > 0 ? '+' : ''}{metric.change.week}%
                    </span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <span>MoM</span>
                    <span className={metric.change.month > 0 ? 'text-gray-600' : 'text-gray-600'}>
                      {metric.change.month > 0 ? '+' : ''}{metric.change.month}%
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Main Value with Growth Badge */}
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {metric.value}
                </span>
                <Badge 
                  variant="outline" 
                  className="text-xs text-gray-600 border-gray-300 bg-gray-50 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
                >
                  {selectedComparison === "day" 
                    ? `${metric.change.day > 0 ? "+" : ""}${metric.change.day}%` 
                    : selectedComparison === "week"
                    ? `${metric.change.week > 0 ? "+" : ""}${metric.change.week}%`
                    : `${metric.change.month > 0 ? "+" : ""}${metric.change.month}%`
                  }
                </Badge>
              </div>
              
              {/* Simple Target Comparison */}
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Target: {
                  metric.value.includes('%') 
                    ? `${metric.benchmark.target}%`
                    : metric.value.includes('$')
                    ? `$${(metric.benchmark.target / 1000).toFixed(0)}K`
                    : metric.value.includes('days')
                    ? `${metric.benchmark.target} days`
                    : metric.benchmark.target.toLocaleString()
                }</span>
                <button className="text-gray-400 hover:text-gray-600 text-xs" title="Edit target">
                  edit
                </button>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 relative">
                {/* Target indicator line at 80% */}
                <div className="absolute top-0 w-0.5 h-1.5 bg-gray-800 dark:bg-gray-200" style={{ left: '80%' }} />
                
                {/* Performance bar - contained within card */}
                <div 
                  className="h-1.5 rounded-full transition-all duration-300 bg-gray-600 dark:bg-gray-400"
                  style={{ 
                    width: `${Math.min((parseInt(metric.value.replace(/[^0-9.]/g, '')) / metric.benchmark.target) * 80, 100)}%`
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Daily TL;DR */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded p-4">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Daily TL;DR</h2>
        <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
          <div>• Mobile conversion optimization identified - potential $60K monthly impact</div>
          <div>• Email campaign performance scaling - $30K monthly opportunity</div>
          <div>• Lead qualification process needs refinement - 15% close rate improvement possible</div>
          <div>• Outbound sequences performing 23% above target - scale recommended</div>
        </div>
      </div>

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
        
        {/* Time Comparison Filter */}
        <select 
          className="text-xs border border-gray-200 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800"
          value={selectedComparison}
          onChange={(e) => setSelectedComparison(e.target.value as "day" | "week" | "month")}
        >
          <option value="day">Day over Day</option>
          <option value="week">Week over Week</option>
          <option value="month">Month over Month</option>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Tasks for Improvements */}
        <Card className="cursor-pointer hover:shadow-md transition-all duration-200 bg-white dark:bg-[#262626] border border-gray-200 dark:border-gray-600">
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
                className="p-3 bg-white dark:bg-[#262626] rounded border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#404040] cursor-pointer transition-colors group"
                style={{ backgroundColor: 'var(--card)' }}
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


        {/* Market Sentiment Insights */}
        <Card className="cursor-pointer hover:shadow-md transition-all duration-200 bg-white dark:bg-[#262626] border border-gray-200 dark:border-gray-600">
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
                className="p-3 bg-white dark:bg-[#262626] rounded border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#404040] cursor-pointer transition-colors group"
                style={{ backgroundColor: 'var(--card)' }}
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
