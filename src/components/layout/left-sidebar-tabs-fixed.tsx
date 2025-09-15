"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  History,
  Calendar,
  Database,
  ChevronLeft,
  ChevronRight,
  Settings,
  Bot,
  AlertCircle,
  CheckCircle2
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
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Active Flows</h4>
              <div className="space-y-2">
                {[
                  { name: "Mobile Conversion Optimization", status: "active", task: "Analyzing funnel data", progress: 65 },
                  { name: "Revenue Analysis Q4", status: "active", task: "Generating insights", progress: 90 },
                  { name: "Email Campaign Performance", status: "done", task: "Analysis complete", progress: 100 }
                ].map((flow, index) => (
                  <Card key={index} className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#363A4A]">
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
            </div>
          </div>
        );

      case "digest":
        return (
          <div className="space-y-4">
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
              </div>
            </div>
          </div>
        );

      case "tools":
        return (
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Active Agents</h4>
              <div className="space-y-2">
                {[
                  { name: "Revenue Analyst", status: "active", task: "Tracking Q4 performance" },
                  { name: "Conversion Optimizer", status: "idle", task: "Ready for funnel analysis" }
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

            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Data Sources</h4>
              <div className="grid grid-cols-2 gap-2">
                {["GA4", "HubSpot", "Stripe", "LinkedIn"].map((source) => (
                  <div key={source} className="p-2 bg-white dark:bg-[#363A4A] rounded-lg border border-gray-200 dark:border-gray-600 text-center">
                    <div className="w-2 h-2 rounded-full mx-auto mb-1 bg-green-500" />
                    <div className="text-xs font-medium text-gray-800 dark:text-gray-200">{source}</div>
                  </div>
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
      <div className="border-b border-gray-200 dark:border-gray-700 p-2">
        <div className="flex items-center justify-between">
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

      <ScrollArea className="flex-1">
        <div className="p-4">
          {renderTabContent()}
        </div>
      </ScrollArea>
    </div>
  );
}
