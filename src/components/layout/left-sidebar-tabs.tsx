"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  History,
  Calendar,
  CheckSquare,
  Bot,
  Terminal,
  Database,
  AlertCircle,
  CheckCircle2,
  Clock,
  Play,
  Settings,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  RefreshCw
} from "lucide-react";

interface DailyDigest {
  date: string;
  metrics: Array<{
    label: string;
    value: string;
    change: string;
    trend: "up" | "down";
  }>;
  alerts: Array<{
    type: "warning" | "success";
    message: string;
  }>;
}

interface LeftSidebarTabsProps {
  dailyDigest: DailyDigest;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

type TabType = "history" | "digest" | "tasks" | "agents" | "prompt" | "datalake";

export function LeftSidebarTabs({ dailyDigest, collapsed, onToggleCollapse }: LeftSidebarTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("digest");

  const tabs = [
    { id: "history" as TabType, label: "History", icon: History },
    { id: "digest" as TabType, label: "Daily Digest", icon: Calendar },
    { id: "tasks" as TabType, label: "Daily Tasks", icon: CheckSquare },
    { id: "agents" as TabType, label: "Agents Library", icon: Bot },
    { id: "prompt" as TabType, label: "System Prompt", icon: Terminal },
    { id: "datalake" as TabType, label: "Datalake", icon: Database },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "history":
        return (
          <div className="space-y-2">
            {[
              { 
                name: "Mobile Conversion Optimization", 
                status: "active", 
                task: "Analyzing funnel data",
                time: "Started 2h ago",
                progress: 65
              },
              { 
                name: "Revenue Analysis Q4", 
                status: "active", 
                task: "Generating insights",
                time: "Started 1h ago",
                progress: 90
              },
              { 
                name: "Email Campaign Performance", 
                status: "done", 
                task: "Analysis complete",
                time: "Yesterday",
                progress: 100
              },
              { 
                name: "Customer Segments", 
                status: "done", 
                task: "Report generated",
                time: "2 days ago",
                progress: 100
              },
              { 
                name: "Social Media ROI", 
                status: "paused", 
                task: "Waiting for data",
                time: "3 days ago",
                progress: 30
              }
            ].map((flow, index) => (
              <Card key={index} className={`p-2 rounded-lg border cursor-pointer transition-all ${
                flow.status === 'active' 
                  ? 'border-primary/40 bg-primary/5 hover:bg-primary/10' 
                  : flow.status === 'done'
                  ? 'border-border/40 bg-white/60 dark:bg-slate-800/60 hover:bg-white/80 dark:hover:bg-slate-800/80'
                  : 'border-border/20 bg-white/40 dark:bg-slate-800/40 hover:bg-white/60 dark:hover:bg-slate-800/60'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <div className="font-medium text-sm text-slate-800 dark:text-slate-200 truncate">{flow.name}</div>
                  <div className={`w-2 h-2 rounded-full ${
                    flow.status === 'active' ? 'bg-primary animate-pulse' :
                    flow.status === 'done' ? 'bg-green-500' : 'bg-slate-400'
                  }`} />
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">{flow.task}</div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">{flow.time}</div>
                  {flow.status === 'active' && (
                    <div className="text-xs text-slate-600 dark:text-slate-400">{flow.progress}%</div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        );

      case "digest":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              {dailyDigest.metrics.map((metric, index) => (
                <Card key={index} className="p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#363A4A] hover:bg-gray-50 dark:hover:bg-[#3A3E4E] transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{metric.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{metric.value}</span>
                      <span className={`text-xs font-medium ${
                        metric.trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Alerts</h4>
              {dailyDigest.alerts.map((alert, index) => (
                <div key={index} className={`flex items-center gap-2 p-3 rounded-md text-sm ${
                  alert.type === 'warning' ? 'bg-yellow-50 text-yellow-800 border border-yellow-200 dark:bg-yellow-950/20 dark:text-yellow-200 dark:border-yellow-800' :
                  'bg-green-50 text-green-800 border border-green-200 dark:bg-green-950/20 dark:text-green-200 dark:border-green-800'
                }`}>
                  {alert.type === 'warning' ? 
                    <AlertCircle className="h-4 w-4" /> : 
                    <CheckCircle2 className="h-4 w-4" />
                  }
                  {alert.message}
                </div>
              ))}
            </div>
          </div>
        );

      case "tasks":
        return (
          <div className="space-y-3">
            {[
              { title: "Review Q4 Email Performance", status: "pending", priority: "high" },
              { title: "Mobile UX Audit", status: "in-progress", priority: "urgent" },
              { title: "Social Media Budget Planning", status: "completed", priority: "medium" },
              { title: "Customer Segment Analysis", status: "pending", priority: "low" }
            ].map((task, index) => (
              <Card key={index} className="p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="font-medium text-sm">{task.title}</div>
                  <Badge variant={
                    task.status === 'completed' ? 'secondary' :
                    task.status === 'in-progress' ? 'default' : 'outline'
                  } className="text-xs">
                    {task.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant={
                    task.priority === 'urgent' ? 'destructive' :
                    task.priority === 'high' ? 'default' : 'outline'
                  } className="text-xs">
                    {task.priority}
                  </Badge>
                  <Button size="sm" variant="ghost" className="text-xs">
                    <Play className="h-3 w-3 mr-1" />
                    Start
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        );

      case "agents":
        return (
          <div className="space-y-3">
            {[
              { name: "Revenue Analyst", status: "active", description: "Tracks revenue trends and forecasting" },
              { name: "Conversion Optimizer", status: "idle", description: "Optimizes funnel conversion rates" },
              { name: "Campaign Manager", status: "active", description: "Manages email and social campaigns" },
              { name: "Customer Insights", status: "idle", description: "Analyzes customer behavior patterns" }
            ].map((agent, index) => (
              <Card key={index} className="p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="font-medium text-sm">{agent.name}</div>
                  <div className={`w-2 h-2 rounded-full ${
                    agent.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                </div>
                <div className="text-xs text-muted-foreground mb-2">{agent.description}</div>
                <Button size="sm" variant="outline" className="text-xs w-full">
                  {agent.status === 'active' ? 'View Progress' : 'Activate'}
                </Button>
              </Card>
            ))}
          </div>
        );

      case "prompt":
        return (
          <div className="space-y-3">
            <Card className="p-3">
              <div className="text-sm font-medium mb-2">Current System Prompt</div>
              <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                You are a GTM Operating System AI. Focus on actionable insights, revenue optimization, and team collaboration.
              </div>
              <Button size="sm" variant="outline" className="text-xs mt-2 w-full">
                <Settings className="h-3 w-3 mr-1" />
                Edit Prompt
              </Button>
            </Card>
            
            <Card className="p-3">
              <div className="text-sm font-medium mb-2">Prompt Templates</div>
              <div className="space-y-1">
                {["Revenue Focus", "Conversion Optimization", "Campaign Analysis"].map((template, index) => (
                  <Button key={index} size="sm" variant="ghost" className="text-xs w-full justify-start">
                    {template}
                  </Button>
                ))}
              </div>
            </Card>
          </div>
        );

      case "datalake":
        return (
          <div className="space-y-4">
            {/* Connected Sources */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium">Connected</h4>
                <Badge variant="secondary" className="text-xs">4 active</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: "GA4", icon: "Google Analytics", status: "syncing", lastSync: "2m ago" },
                  { name: "HubSpot", icon: "HubSpot", status: "connected", lastSync: "5m ago" },
                  { name: "Stripe", icon: "Stripe", status: "connected", lastSync: "1m ago" },
                  { name: "LinkedIn", icon: "LinkedIn", status: "connected", lastSync: "10m ago" }
                ].map((source) => (
                  <Card key={source.name} className="p-2 rounded-lg border border-border/60">
                    <div className="flex flex-col items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${
                        source.status === 'syncing' ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'
                      }`} />
                      <div className="text-xs font-medium text-center">{source.name}</div>
                      <div className="text-xs text-muted-foreground">{source.lastSync}</div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Available Sources */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium">Available</h4>
                <Button size="sm" variant="ghost" className="text-xs">
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Refresh
                </Button>
              </div>
              <div className="space-y-2">
                {[
                  { name: "Gong", category: "Sales", description: "Call recordings & insights" },
                  { name: "Telli", category: "Sales", description: "Call analytics platform" },
                  { name: "Reddit", category: "Social", description: "Social listening" },
                  { name: "SEMrush", category: "SEO", description: "Competitive intelligence" },
                  { name: "Peek AI", category: "Analytics", description: "Website behavior" },
                  { name: "Google Ads", category: "Marketing", description: "Paid campaigns" }
                ].map((source, index) => (
                  <Card key={index} className="p-3 rounded-lg border border-border/60 hover:border-border transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="text-sm font-medium">{source.name}</div>
                          <Badge variant="outline" className="text-xs">{source.category}</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">{source.description}</div>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs rounded-md">
                        Connect
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (collapsed) {
    return (
      <div className="w-16 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#2A2D3A] flex flex-col">
        {/* Collapsed Tab Icons */}
        <div className="flex flex-col">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                size="sm"
                className="rounded-none border-0 h-12 w-full"
                onClick={() => setActiveTab(tab.id)}
                title={tab.label}
              >
                <Icon className="h-4 w-4" />
              </Button>
            );
          })}
        </div>
        
        {/* Expand Button */}
        <div className="mt-auto p-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full h-8"
            onClick={onToggleCollapse}
            title="Expand sidebar"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#2A2D3A] flex flex-col transition-all duration-300">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="flex items-center justify-between p-2">
          <div className="grid grid-cols-3 gap-1 flex-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  size="sm"
                  className="rounded-lg border-0 h-8 w-8 p-0"
                  onClick={() => setActiveTab(tab.id)}
                  title={tab.label}
                >
                  <Icon className="h-4 w-4" />
                </Button>
              );
            })}
          </div>
          
          {/* Collapse Button */}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={onToggleCollapse}
            title="Collapse sidebar"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tab Content */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {renderTabContent()}
        </div>
      </ScrollArea>
    </div>
  );
}
