"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SourceLogo } from "@/components/ui/source-logo";
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  ArrowRight,
  ExternalLink,
  Info,
  CheckCircle2,
  Clock,
  AlertCircle,
  Bot,
  BarChart3,
  Globe,
  Calendar,
  Zap
} from "lucide-react";

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
  const [configMode, setConfigMode] = useState(false);
  const [taskStatuses, setTaskStatuses] = useState<{[key: string]: string}>({});

  return (
    <div className="p-2 space-y-2 bg-background min-h-screen">

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Location Filter */}
        <div className="flex items-center gap-1 px-2 py-1 border border-border rounded bg-background text-xs">
          <Globe className="h-3 w-3 text-gray-500" />
          <select className="bg-transparent border-none text-xs cursor-pointer">
            <option>Global</option>
            <option>North America</option>
            <option>Europe</option>
            <option>Asia Pacific</option>
          </select>
        </div>
        
        {/* Channel Filter */}
        <div className="flex items-center gap-1 px-2 py-1 border border-border rounded bg-background text-xs">
          <ArrowRight className="h-3 w-3 text-gray-500" />
          <select className="bg-transparent border-none text-xs cursor-pointer">
            <option>All Channels</option>
            <option>Inbound</option>
            <option>Outbound</option>
            <option>Referral</option>
          </select>
        </div>
        
        {/* Business Unit Filter */}
        <div className="flex items-center gap-1 px-2 py-1 border border-border rounded bg-background text-xs">
          <select className="bg-transparent border-none text-xs cursor-pointer">
            <option>All Units</option>
            <option>Enterprise</option>
            <option>SMB</option>
            <option>Startup</option>
          </select>
        </div>
        
        {/* Timeframe Filter */}
        <div className="flex items-center gap-1 px-2 py-1 border border-border rounded bg-background text-xs">
          <Calendar className="h-3 w-3 text-gray-500" />
          <select className="bg-transparent border-none text-xs cursor-pointer">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This month</option>
            <option>Last month</option>
            <option>This quarter</option>
            <option>Custom range...</option>
          </select>
        </div>
        
        {/* Time Comparison Filter */}
        <div className="flex items-center gap-1 px-2 py-1 border border-border rounded bg-background text-xs">
          <TrendingUp className="h-3 w-3 text-gray-500" />
          <select 
            className="bg-transparent border-none text-xs cursor-pointer"
            value={selectedComparison}
            onChange={(e) => setSelectedComparison(e.target.value as "day" | "week" | "month")}
          >
            <option value="day">Day over Day</option>
            <option value="week">Week over Week</option>
            <option value="month">Month over Month</option>
          </select>
        </div>
      </div>

      {/* Dashboard Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-3">
        {/* Daily TL;DR */}
        <Card className="cursor-pointer hover:shadow-md transition-all duration-200 bg-background border-2 border-foreground/10 shadow-sm rounded-md">
          <CardHeader className="pb-0.5 pt-2">
            <CardTitle className="text-xs font-bold text-gray-900 dark:text-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <BarChart3 className="h-3 w-3" />
                Daily TL;DR
              </div>
              <div className="flex items-center gap-2">
                {/* Overall Score */}
                <div className="flex items-center gap-1">
                  <div className="text-[9px] text-gray-500 dark:text-gray-600">Score</div>
                  <div className="w-4 h-4 relative">
                    <svg className="w-4 h-4 transform -rotate-90" viewBox="0 0 32 32">
                      <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="3" className="text-gray-200 dark:text-gray-700" />
                      <circle 
                        cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="3" 
                        className="text-green-500" 
                        strokeDasharray="87.96" 
                        strokeDashoffset={87.96 - (87.96 * 0.87)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[7px] font-bold text-gray-900 dark:text-gray-100">87%</span>
                    </div>
                  </div>
                </div>
                {/* Configuration Gear */}
                <button
                  onClick={() => setConfigMode(!configMode)}
                  className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  title="Configure KPIs"
                >
                  ⚙️
                </button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-0.5 p-1.5">
            {[
              {
                id: "mobile",
                title: "Mobile conversion",
                subtitle: "optimization",
                impact: "+$60K monthly",
                action: "A/B test mobile checkout flow, optimize page load speed, simplify form fields"
              },
              {
                id: "nurture", 
                title: "Lead nurturing",
                subtitle: "automation",
                impact: "+$30K monthly",
                action: "Set up 7-email sequence, segment by lead score, personalize content by industry"
              },
              {
                id: "testing",
                title: "A/B testing",
                subtitle: "program",
                impact: "+15% conversion",
                action: "Test headlines, CTAs, and social proof elements across landing pages"
              }
            ].map((item, index) => (
              <div key={item.id} className="group">
                <div className="cursor-pointer" onClick={() => console.log(`Clicked ${item.title}`)}>
                  <div className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">{item.title}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-600"> {item.subtitle} - </span>
                      <span className="text-xs font-bold text-gray-900 dark:text-gray-100">{item.impact}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Daily Tasks for Improvements */}
        <Card className="cursor-pointer hover:shadow-md transition-all duration-200 bg-background border border-border rounded-md">
          <CardHeader className="pb-0.5 pt-2">
            <CardTitle className="text-xs font-bold text-gray-900 dark:text-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Daily Tasks
              </div>
              <button className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 w-5 h-5 rounded border border-border hover:bg-muted/30 transition-colors flex items-center justify-center">
                +
              </button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 p-1.5">
            {[
              { id: "mobile-ux", name: "Mobile UX Audit", status: "done" },
              { id: "email-campaigns", name: "Scale Email Campaigns", status: "running" },
              { id: "social-budget", name: "Social Media Budget Increase", status: "pending" }
            ].map((task) => {
              const currentStatus = taskStatuses[task.id] || task.status;
              return (
                <div 
                  key={task.id} 
                  className="flex items-center justify-between py-1 hover:bg-muted/20 rounded transition-colors cursor-pointer"
                  onClick={() => console.log(`Open task:`, task.name)}
                >
                  <span 
                    className={`text-xs font-medium transition-all ${
                      currentStatus === "done" 
                        ? "text-gray-500 dark:text-gray-400 line-through" 
                        : "text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    {task.name}
                  </span>
                  <button 
                    className="w-4 h-4 rounded-full border-2 cursor-pointer transition-colors flex items-center justify-center flex-shrink-0"
                    style={{
                      borderColor: currentStatus === "done" ? "#22c55e" : 
                                  currentStatus === "running" ? "#3b82f6" : "#6b7280",
                      backgroundColor: currentStatus === "done" ? "#22c55e" : "transparent"
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      const nextStatus = currentStatus === "pending" ? "running" : 
                                       currentStatus === "running" ? "done" : "pending";
                      setTaskStatuses(prev => ({
                        ...prev,
                        [task.id]: nextStatus
                      }));
                    }}
                  >
                    {currentStatus === "done" && (
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    )}
                    {currentStatus === "running" && (
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                    )}
                  </button>
                </div>
              );
            })}
            
            {/* Summary */}
            <div className="pt-2 mt-2 border-t border-border/30">
              <div className="text-[10px] text-gray-500 dark:text-gray-400 text-center">
                {(() => {
                  const tasks = [
                    { id: "mobile-ux", name: "Mobile UX Audit", status: "done" },
                    { id: "email-campaigns", name: "Scale Email Campaigns", status: "running" },
                    { id: "social-budget", name: "Social Media Budget Increase", status: "pending" }
                  ];
                  const completed = tasks.filter(t => (taskStatuses[t.id] || t.status) === "done").length;
                  const inProgress = tasks.filter(t => (taskStatuses[t.id] || t.status) === "running").length;
                  const pending = tasks.filter(t => (taskStatuses[t.id] || t.status) === "pending").length;
                  
                  return `${completed} completed • ${inProgress} in progress • ${pending} pending`;
                })()}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Market Sentiment Insights */}
        <Card className="cursor-pointer hover:shadow-md transition-all duration-200 bg-background border border-border rounded-md">
          <CardHeader className="pb-0.5 pt-2">
            <CardTitle className="text-xs font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1">
              <BarChart3 className="h-3 w-3" />
              Market Sentiment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-0.5 p-1.5">
            {[
              {
                topic: "AI Marketing Tools",
                sentiment: "Positive",
                change: "+15%",
                source: "Reddit + Google News",
                insight: "Increased interest in automation",
                link: "https://www.reddit.com/r/marketing/comments/ai_marketing_tools",
                confidence: 94,
                mentions: 2847,
                trending: "🔥"
              },
              {
                topic: "B2B SaaS Pricing",
                sentiment: "Cautious", 
                change: "-8%",
                source: "Reddit + Google News",
                insight: "Budget constraints mentioned",
                link: "https://news.ycombinator.com/item?id=saas_pricing_2024",
                confidence: 87,
                mentions: 1203,
                trending: "📉"
              },
              {
                topic: "Remote Sales Effectiveness",
                sentiment: "Optimistic",
                change: "+12%",
                source: "Reddit + Google News", 
                insight: "Hybrid approaches gaining traction",
                link: "https://www.reddit.com/r/sales/comments/remote_effectiveness",
                confidence: 91,
                mentions: 892,
                trending: "📈"
              }
            ].map((item, index) => (
              <div key={index} className="group">
                <a 
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-1 bg-muted/20 rounded hover:bg-muted/40 cursor-pointer transition-colors group border border-transparent hover:border-border"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="text-[10px] font-medium text-gray-900 dark:text-gray-100 truncate">
                        {item.topic}
                      </span>
                      <span className="text-[8px]">{item.trending}</span>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Badge 
                        variant="outline" 
                        className="text-[9px] px-1 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
                      >
                        {item.sentiment}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-[9px] text-gray-600 dark:text-gray-400 mt-0.5 leading-tight">
                    {item.insight}
                  </div>
                </a>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

