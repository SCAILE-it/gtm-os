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
  change: number;
  period: "day" | "week" | "month";
  benchmark: {
    industry: number;
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
  const [selectedPeriod, setSelectedPeriod] = useState<"day" | "week" | "month">("day");

  // Funnel Metrics with Industry Benchmarks
  const funnelMetrics = {
    attract: {
      leads: {
        label: "All Leads",
        value: "2,847",
        change: 12.3,
        period: selectedPeriod,
        benchmark: { industry: 2500, status: "above" as const },
        dataSources: ["Google Analytics", "Google Ads", "LinkedIn"],
        calculation: "Website visits + Form submissions + Outreach replies"
      },
      cost: {
        label: "Cost per Lead",
        value: "$42",
        change: -8.1,
        period: selectedPeriod,
        benchmark: { industry: 55, status: "above" as const },
        dataSources: ["Google Ads", "LinkedIn Ads", "Phantombuster"],
        calculation: "Total ad spend / Total leads generated"
      }
    },
    convert: {
      qualified: {
        label: "Interested Leads",
        value: "847",
        change: 15.7,
        period: selectedPeriod,
        benchmark: { industry: 650, status: "above" as const },
        dataSources: ["HubSpot", "Pipedrive"],
        calculation: "Leads with engagement score > 70 or replied to outreach"
      },
      rate: {
        label: "Interest Rate",
        value: "29.8%",
        change: 2.1,
        period: selectedPeriod,
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
        period: selectedPeriod,
        benchmark: { industry: 95, status: "above" as const },
        dataSources: ["HubSpot", "Pipedrive"],
        calculation: "Qualified leads with budget + authority + timeline"
      },
      revenue: {
        label: "Revenue",
        value: "$142.5K",
        change: 18.2,
        period: selectedPeriod,
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
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>
          </div>
          <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(metrics).map(([key, metric]) => (
          <div key={key} className="group/metric">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {metric.label}
                </span>
                <Info className="h-3 w-3 text-gray-400 opacity-0 group-hover/metric:opacity-100 transition-opacity" />
              </div>
              <Badge variant={metric.benchmark.status === "above" ? "default" : "secondary"} className="text-xs">
                {metric.benchmark.status === "above" ? "Above Industry" : "Below Industry"}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {metric.value}
              </span>
              <div className="flex items-center gap-1">
                {metric.change > 0 ? (
                  <TrendingUp className="h-4 w-4 text-gray-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-gray-600" />
                )}
                <span className="text-sm font-medium text-gray-600">
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
              </div>
            </div>
            
            {/* Data Sources & Calculation on Hover */}
            <div className="opacity-0 group-hover/metric:opacity-100 transition-opacity mt-2 p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs">
              <div className="text-gray-600 dark:text-gray-400 mb-1">
                Sources: {metric.dataSources.join(", ")}
              </div>
              {metric.calculation && (
                <div className="text-gray-500 dark:text-gray-500">
                  Calculation: {metric.calculation}
                </div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Period Selector */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">GTM Operating System</h1>
        <div className="flex gap-1">
          {(["day", "week", "month"] as const).map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
              className="text-xs"
            >
              {period === "day" ? "Daily" : period === "week" ? "Weekly" : "Monthly"}
            </Button>
          ))}
        </div>
      </div>

      {/* Funnel Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {renderFunnelCard(
          "Attract",
          "Inbound: SEO, AEO, SEA, LinkedIn, Newsletter, Webinars + Outbound: Email & LinkedIn Outreach",
          funnelMetrics.attract,
          "blue",
          () => console.log("Open Attract tab")
        )}
        
        {renderFunnelCard(
          "Convert", 
          "CRM Data: Leads registered through inbound or replied to outbound",
          funnelMetrics.convert,
          "green",
          () => console.log("Open Convert tab")
        )}
        
        {renderFunnelCard(
          "Close",
          "CRM Data: Qualified leads, closed deals",
          funnelMetrics.close,
          "purple", 
          () => console.log("Open Close tab")
        )}
      </div>

      {/* Dashboard Boxes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Tasks for Improvements */}
        <Card className="cursor-pointer hover:shadow-md transition-all duration-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
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
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
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
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
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
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
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
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
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
