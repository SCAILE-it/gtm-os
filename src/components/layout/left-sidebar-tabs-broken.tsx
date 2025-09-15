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

type TabType = "flows" | "digest" | "tools";

export function LeftSidebarTabs({ dailyDigest, collapsed, onToggleCollapse }: LeftSidebarTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("digest");
  
  // Arc browser-style tab switching with keyboard
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.metaKey || e.ctrlKey) {
      const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setActiveTab(tabs[currentIndex - 1].id);
        e.preventDefault();
      } else if (e.key === 'ArrowRight' && currentIndex < tabs.length - 1) {
        setActiveTab(tabs[currentIndex + 1].id);
        e.preventDefault();
      }
    }
  };

  const tabs = [
    { id: "flows" as TabType, label: "Flows", icon: History },
    { id: "digest" as TabType, label: "Digest", icon: Calendar },
    { id: "tools" as TabType, label: "Tools", icon: Database },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "flows":
        return (
          <div className="space-y-4">
            {/* Active Flows */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Active Flows</h4>
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
                  ? 'border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/20 hover:bg-blue-100 dark:hover:bg-blue-950/30' 
                  : flow.status === 'done'
                  ? 'border-gray-200 dark:border-gray-600 bg-white dark:bg-[#363A4A] hover:bg-gray-50 dark:hover:bg-[#3A3E4E]'
                  : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-[#323643] hover:bg-gray-100 dark:hover:bg-[#363A4A]'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-gray-800 dark:text-gray-200 truncate">{flow.name}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{flow.task}</div>
                  </div>
                  <div className="flex items-center gap-2 ml-2">
                    {flow.status === 'active' && (
                      <div className="text-xs text-blue-600 dark:text-blue-400">{flow.progress}%</div>
                    )}
                    <div className={`w-2 h-2 rounded-full ${
                      flow.status === 'active' ? 'bg-blue-500 animate-pulse' :
                      flow.status === 'done' ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        );

      case "digest":
        return (
          <div className="space-y-4">
            {/* Key Metrics */}
            <div className="space-y-2">
              {dailyDigest.metrics.map((metric, index) => (
                <Card key={index} className="p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#363A4A] hover:bg-gray-50 dark:hover:bg-[#3A3E4E] transition-colors cursor-pointer">
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

            {/* Chart of the Day */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Chart of the Day</h4>
              <Card className="p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#363A4A] hover:bg-gray-50 dark:hover:bg-[#3A3E4E] transition-colors cursor-pointer">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Revenue Trend</span>
                    <Badge variant="secondary" className="text-xs">7 Days</Badge>
                  </div>
                  <div className="h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-end justify-between px-2 pb-1">
                    {[28, 34, 30, 32, 37, 31, 40].map((height, i) => (
                      <div key={i} className="bg-blue-500 rounded-t w-2" style={{height: `${height}px`}} />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Revenue up 12.3% this week</p>
                </div>
              </Card>
            </div>

            {/* Topics to Explore */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Topics to Explore</h4>
              <div className="space-y-1">
                {[
                  "Why is email performing so well?",
                  "Mobile conversion drop analysis",
                  "Social media scaling opportunity"
                ].map((topic, index) => (
                  <div key={index} className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/20 text-blue-800 dark:text-blue-200 text-xs cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-950/30 transition-colors">
                    {topic}
                  </div>
                ))}
              </div>
            </div>

            {/* Key Insights & So What */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Key Insights</h4>
              <div className="space-y-2">
                <Card className="p-3 rounded-lg border border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-950/20">
                  <div className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">Email campaigns driving 45% of revenue</div>
                  <div className="text-xs text-green-700 dark:text-green-300">So what: Double down on successful email campaigns. Potential to increase revenue by 20-30%.</div>
                </Card>
                
                <Card className="p-3 rounded-lg border border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-950/20">
                  <div className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">Mobile conversion dropped 12%</div>
                  <div className="text-xs text-red-700 dark:text-red-300">So what: Urgent UX audit needed. Costing $8-12K in lost revenue weekly.</div>
                </Card>
                
                <Card className="p-3 rounded-lg border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/20">
                  <div className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">Social media shows 40% higher ROAS</div>
                  <div className="text-xs text-blue-700 dark:text-blue-300">So what: Scale social budget by 25%. Could add $15-20K monthly.</div>
                </Card>
              </div>
            </div>
          </div>
        );

      case "tools":
        return (
          <div className="space-y-4">
            {/* Active Agents */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Active Agents</h4>
              <div className="space-y-2">
                {[
                  { name: "Revenue Analyst", status: "active", task: "Tracking Q4 performance" },
                  { name: "Conversion Optimizer", status: "idle", task: "Ready for funnel analysis" },
                  { name: "Campaign Manager", status: "active", task: "Optimizing email campaigns" }
                ].map((agent, index) => (
                  <Card key={index} className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#363A4A]">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-sm text-gray-800 dark:text-gray-200">{agent.name}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{agent.task}</div>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        agent.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Data Sources */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Data Sources</h4>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {[
                  { name: "GA4", status: "connected" },
                  { name: "HubSpot", status: "connected" },
                  { name: "Stripe", status: "syncing" },
                  { name: "LinkedIn", status: "connected" }
                ].map((source) => (
                  <div key={source.name} className="p-2 bg-white dark:bg-[#363A4A] rounded-lg border border-gray-200 dark:border-gray-600 text-center">
                    <div className={`w-2 h-2 rounded-full mx-auto mb-1 ${
                      source.status === 'syncing' ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'
                    }`} />
                    <div className="text-xs font-medium text-gray-800 dark:text-gray-200">{source.name}</div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-1">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Available:</div>
                {["Gong", "Reddit", "SEMrush", "Google Ads"].map((source) => (
                  <Button key={source} size="sm" variant="outline" className="w-full text-xs justify-start">
                    + {source}
                  </Button>
                ))}
              </div>
            </div>

            {/* System Settings */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">System</h4>
              <div className="space-y-2">
                <Button size="sm" variant="outline" className="w-full text-xs justify-start">
                  <Settings className="h-3 w-3 mr-2" />
                  Edit System Prompt
                </Button>
                <Button size="sm" variant="outline" className="w-full text-xs justify-start">
                  <Bot className="h-3 w-3 mr-2" />
                  Agent Templates
                </Button>
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
    <div 
      className="w-80 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#2A2D3A] flex flex-col transition-all duration-300"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Arc-style Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-2">
        <div className="flex items-center justify-between">
          {/* Horizontal scrollable tabs */}
          <div className="flex-1 overflow-x-auto">
            <div className="flex items-center gap-1 min-w-fit">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    size="sm"
                    className={`rounded-lg h-8 w-8 p-0 flex-shrink-0 ${
                      activeTab === tab.id 
                        ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                    title={tab.label}
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                );
              })}
            </div>
          </div>
          
          {/* Collapse Button */}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
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
