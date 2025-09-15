"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  onTabClick?: (tabId: TabType) => void;
}

type TabType = "flows" | "daily" | "context" | "agents" | "system";

export function LeftSidebarTabs({ dailyDigest, collapsed, onToggleCollapse, onTabClick }: LeftSidebarTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("daily");
  
  const tabs = [
    { id: "flows" as TabType, label: "Flow History", icon: History },
    { id: "daily" as TabType, label: "Daily", icon: Calendar },
    { id: "context" as TabType, label: "Context", icon: Database },
    { id: "agents" as TabType, label: "Agents", icon: Bot },
    { id: "system" as TabType, label: "System", icon: Settings },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "flows":
        return (
          <div className="space-y-1">
            {[
              { 
                name: "Mobile Conversion Optimization", 
                status: "active", 
                task: "Analyzing funnel data", 
                progress: 65,
                time: "2h ago",
                read: true
              },
              { 
                name: "Revenue Analysis Q4", 
                status: "active", 
                task: "Generating insights", 
                progress: 90,
                time: "1h ago", 
                read: true
              },
              { 
                name: "Email Campaign Performance", 
                status: "completed", 
                task: "Analysis complete - 3 recommendations ready", 
                time: "30m ago",
                read: false // Unread - completed while user was away
              },
              { 
                name: "Customer Segment Analysis", 
                status: "completed", 
                task: "Report generated", 
                time: "Yesterday",
                read: true
              },
              { 
                name: "Social Media ROI Study", 
                status: "completed", 
                task: "Insights available", 
                time: "2 days ago",
                read: false // Unread - new insights
              },
              { 
                name: "Competitive Analysis", 
                status: "completed", 
                task: "Market positioning report", 
                time: "3 days ago",
                read: true
              },
              { 
                name: "Pricing Strategy Review", 
                status: "completed", 
                task: "Optimization recommendations", 
                time: "1 week ago",
                read: true
              }
            ].map((flow, index) => (
              <div 
                key={index} 
                className={`p-2 rounded border cursor-pointer transition-colors ${
                  flow.status === 'active' 
                    ? 'border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/20 hover:bg-blue-100 dark:hover:bg-blue-950/30' 
                    : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-[#262626] hover:bg-gray-50 dark:hover:bg-[#3A3E4E]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0 mr-2">
                    <div className={`text-sm truncate ${
                      !flow.read ? 'font-bold text-gray-900 dark:text-gray-100' : 'font-medium text-gray-800 dark:text-gray-200'
                    }`}>
                      {flow.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">{flow.time}</div>
                  </div>
                  
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {flow.status === 'active' && (
                      <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">{flow.progress}%</div>
                    )}
                    
                    {flow.status === 'active' ? (
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    ) : !flow.read ? (
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    ) : (
                      <div className="w-2 h-2 bg-gray-400 rounded-full" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "daily":
        return (
          <div className="space-y-4">
            {/* Daily TL;DR - Essential Only */}
            <div>
              <div className="p-3 bg-white dark:bg-[#262626] rounded border border-gray-200 dark:border-gray-600">
                <div className="space-y-2">
                  <div className="text-sm text-gray-800 dark:text-gray-200">
                    Revenue <span className="font-semibold">$142.5K</span> (+12.3%) • CAC <span className="font-semibold">$85</span> (-8.2%) • Conv <span className="font-semibold">3.2%</span> (+0.5%) • Users <span className="font-semibold">2.1K</span> (+15.7%)
                  </div>
                  
                  <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <div>• Email = 45% revenue → Scale for +$30K/month</div>
                    <div>• Mobile down 12% → Fix saves $60K/month</div>
                    <div>• Social ROAS +40% → Double budget</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Numbers */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Key Numbers</h4>
              <div className="grid grid-cols-2 gap-2">
                {dailyDigest.metrics.map((metric, index) => (
                  <div key={index} className="p-2 bg-white dark:bg-[#262626] rounded border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#3A3E4E] transition-colors cursor-pointer">
                    <div className="text-xs text-gray-600 dark:text-gray-400">{metric.label}</div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{metric.value}</span>
                      <span className={`text-xs font-medium ${
                        metric.trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Focus Today - Minimal */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Focus Today</h4>
              <div className="space-y-2">
                <div className="p-2 bg-white dark:bg-[#262626] rounded border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#3A3E4E]">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Fix mobile conversion</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Losing $60K monthly</div>
                </div>
                
                <div className="p-2 bg-white dark:bg-[#262626] rounded border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#3A3E4E]">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Scale email campaigns</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Potential $30K monthly</div>
                </div>

                <div className="p-2 bg-white dark:bg-[#262626] rounded border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#3A3E4E]">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Increase social budget</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">40% higher ROAS</div>
                </div>
              </div>
            </div>

            {/* Daily Scheduled Tasks */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Daily Tasks</h4>
              <div className="space-y-2">
                {[
                  { title: "Daily Revenue Report", time: "09:00", status: "completed", executedAt: "09:02 AM" },
                  { title: "Email Performance Check", time: "10:00", status: "completed", executedAt: "10:05 AM" },
                  { title: "Conversion Rate Analysis", time: "14:00", status: "pending", executedAt: "2:00 PM" },
                  { title: "Social Media Metrics", time: "16:00", status: "pending", executedAt: "4:00 PM" },
                  { title: "End-of-Day Summary", time: "18:00", status: "scheduled", executedAt: "6:00 PM" }
                ].map((task, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-white dark:bg-[#262626] rounded border border-gray-200 dark:border-gray-600">
                    <div className={`w-2 h-2 rounded-full ${
                      task.status === 'completed' ? 'bg-green-500' :
                      task.status === 'pending' ? 'bg-blue-500' : 'bg-gray-400'
                    }`} />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{task.title}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {task.status === 'completed' ? `Executed at ${task.executedAt}` : 
                         task.status === 'pending' ? `Running at ${task.executedAt}` :
                         `Scheduled for ${task.executedAt}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "tools":
        return (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Active Agents</h4>
              <div className="space-y-2">
                {[
                  { name: "Revenue Analyst", status: "active", task: "Tracking Q4 performance" },
                  { name: "Conversion Optimizer", status: "idle", task: "Ready for funnel analysis" }
                ].map((agent, index) => (
                  <Card key={index} className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#262626]">
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
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Data Sources</h4>
              
              {/* Connected Sources - Connections Page Style */}
              <div className="space-y-2 mb-4">
                {[
                  { name: "Google Analytics 4", status: "connected", lastSync: "2m ago", records: "1.2M" },
                  { name: "HubSpot CRM", status: "connected", lastSync: "15m ago", records: "45K" },
                  { name: "Stripe", status: "syncing", lastSync: "syncing...", records: "12K" },
                  { name: "LinkedIn Ads", status: "connected", lastSync: "1h ago", records: "8K" }
                ].map((source, index) => (
                  <div key={index} className="p-2 bg-white dark:bg-[#262626] rounded border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          source.status === 'syncing' ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'
                        }`} />
                        <div>
                          <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{source.name}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">{source.records} records</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">{source.lastSync}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Available Sources */}
              <div>
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Available</h5>
                <div className="space-y-1">
                  {[
                    { name: "Gong", category: "Sales" },
                    { name: "Reddit", category: "Social" },
                    { name: "SEMrush", category: "SEO" },
                    { name: "Google Ads", category: "Marketing" }
                  ].map((source, index) => (
                    <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full" />
                        <div className="text-sm text-gray-800 dark:text-gray-200">{source.name}</div>
                        <Badge variant="outline" className="text-xs">{source.category}</Badge>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs h-6 px-2">
                        Connect
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "context":
        return (
          <div className="space-y-4">
            {/* Search & Filter */}
            <div>
              <Input
                placeholder="Search data sources..."
                className="text-sm mb-3"
              />
              
              <div className="flex gap-1 mb-3">
                {["All", "Connected", "Analytics", "CRM", "Marketing", "E-commerce"].map((filter) => (
                  <Button key={filter} size="sm" variant="outline" className="text-xs h-6 px-2 rounded">
                    {filter}
                  </Button>
                ))}
              </div>
            </div>

            {/* Connected Sources - Clean Minimal Design */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                Connected Sources
              </h4>
              
              <div className="space-y-1 mb-4">
                {[
                  { 
                    name: "Google Analytics 4", 
                    category: "Analytics",
                    records: "1.2M records",
                    status: "Connected",
                    lastSync: "2m ago"
                  },
                  { 
                    name: "HubSpot CRM", 
                    category: "CRM",
                    records: "45K records",
                    status: "Connected", 
                    lastSync: "15m ago"
                  },
                  { 
                    name: "Mixpanel", 
                    category: "Analytics",
                    records: "Testing connection",
                    status: "Testing",
                    lastSync: ""
                  },
                  { 
                    name: "Salesforce", 
                    category: "CRM",
                    records: "Connection failed",
                    status: "Failed", 
                    lastSync: "2h ago"
                  }
                ].map((source, index) => (
                  <div key={index} className="p-2 hover:bg-gray-50 dark:hover:bg-[#404040] rounded transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        {source.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                        {source.status}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                      <span>{source.records}</span>
                      {source.lastSync && <span>{source.lastSync}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Tools - Clean Minimal Design */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Available Tools</h4>
              
              {/* Analytics */}
              <div className="mb-3">
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Analytics</div>
                <div className="space-y-1">
                  {[
                    "Adobe Analytics",
                    "Amplitude", 
                    "Hotjar",
                    "Segment"
                  ].map((tool, index) => (
                    <div key={index} className="flex items-center justify-between p-1 hover:bg-gray-50 dark:hover:bg-[#404040] rounded transition-colors cursor-pointer">
                      <div className="text-sm text-gray-900 dark:text-gray-100">{tool}</div>
                      <Button size="sm" variant="ghost" className="text-xs h-5 px-1 text-gray-400 hover:text-gray-600" title="Connect">
                        Add
                      </Button>
                    </div>
                  ))}
                  <div className="text-xs text-gray-500 dark:text-gray-400 pl-1">+8 more</div>
                </div>
              </div>

              {/* CRM */}
              <div className="mb-3">
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">CRM</div>
                <div className="space-y-1">
                  {[
                    "Pipedrive",
                    "Zoho CRM",
                    "Monday.com"
                  ].map((tool, index) => (
                    <div key={index} className="flex items-center justify-between p-1 hover:bg-gray-50 dark:hover:bg-[#404040] rounded transition-colors cursor-pointer">
                      <div className="text-sm text-gray-900 dark:text-gray-100">{tool}</div>
                      <Button size="sm" variant="ghost" className="text-xs h-5 px-1 text-gray-400 hover:text-gray-600" title="Connect">
                        Add
                      </Button>
                    </div>
                  ))}
                  <div className="text-xs text-gray-500 dark:text-gray-400 pl-1">+5 more</div>
                </div>
              </div>

              {/* Marketing */}
              <div className="mb-3">
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Marketing</div>
                <div className="space-y-1">
                  {[
                    "Google Ads",
                    "Facebook Ads", 
                    "Mailchimp"
                  ].map((tool, index) => (
                    <div key={index} className="flex items-center justify-between p-1 hover:bg-gray-50 dark:hover:bg-[#404040] rounded transition-colors cursor-pointer">
                      <div className="text-sm text-gray-900 dark:text-gray-100">{tool}</div>
                      <Button size="sm" variant="ghost" className="text-xs h-5 px-1 text-gray-400 hover:text-gray-600" title="Connect">
                        Add
                      </Button>
                    </div>
                  ))}
                  <div className="text-xs text-gray-500 dark:text-gray-400 pl-1">+12 more</div>
                </div>
              </div>

              {/* E-commerce */}
              <div>
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">E-commerce</div>
                <div className="space-y-1">
                  {[
                    "Stripe",
                    "Shopify",
                    "WooCommerce"
                  ].map((tool, index) => (
                    <div key={index} className="flex items-center justify-between p-1 hover:bg-gray-50 dark:hover:bg-[#404040] rounded transition-colors cursor-pointer">
                      <div className="text-sm text-gray-900 dark:text-gray-100">{tool}</div>
                      <Button size="sm" variant="ghost" className="text-xs h-5 px-1 text-gray-400 hover:text-gray-600" title="Connect">
                        Add
                      </Button>
                    </div>
                  ))}
                  <div className="text-xs text-gray-500 dark:text-gray-400 pl-1">+7 more</div>
                </div>
              </div>
            </div>
          </div>
        );

      case "agents":
        return (
          <div className="space-y-4">
            {/* Search & Filter */}
            <div>
              <Input
                placeholder="Search agents..."
                className="text-sm mb-3"
              />
              
              <div className="flex gap-1 mb-3">
                {["All", "Active", "Marketing", "Sales", "Analytics"].map((filter) => (
                  <Button key={filter} size="sm" variant="outline" className="text-xs h-6 px-2 rounded">
                    {filter}
                  </Button>
                ))}
              </div>
            </div>

            {/* Active Agents */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                Active (3)
              </h4>
              <div className="space-y-1">
                {[
                  { name: "Revenue Analyst", category: "Analytics" },
                  { name: "Campaign Manager", category: "Marketing" },
                  { name: "Lead Scorer", category: "Sales" }
                ].map((agent, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{agent.name}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{agent.category}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Agents by Category */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Available</h4>
              
              {/* Marketing */}
              <div className="mb-3">
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Marketing (12)</div>
                <div className="space-y-1">
                  {["Email Optimizer", "Social Media Manager", "Content Analyzer"].map((agent) => (
                    <div key={agent} className="flex items-center gap-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                      <div className="w-2 h-2 bg-gray-400 rounded-full" />
                      <div className="text-sm text-gray-700 dark:text-gray-300">{agent}</div>
                    </div>
                  ))}
                  <div className="text-xs text-gray-500 dark:text-gray-400 pl-4">+9 more</div>
                </div>
              </div>

              {/* Sales */}
              <div className="mb-3">
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Sales (8)</div>
                <div className="space-y-1">
                  {["Pipeline Tracker", "Deal Analyzer"].map((agent) => (
                    <div key={agent} className="flex items-center gap-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                      <div className="w-2 h-2 bg-gray-400 rounded-full" />
                      <div className="text-sm text-gray-700 dark:text-gray-300">{agent}</div>
                    </div>
                  ))}
                  <div className="text-xs text-gray-500 dark:text-gray-400 pl-4">+6 more</div>
                </div>
              </div>

              {/* Analytics */}
              <div>
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Analytics (15)</div>
                <div className="space-y-1">
                  {["Conversion Optimizer", "Cohort Analyzer"].map((agent) => (
                    <div key={agent} className="flex items-center gap-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                      <div className="w-2 h-2 bg-gray-400 rounded-full" />
                      <div className="text-sm text-gray-700 dark:text-gray-300">{agent}</div>
                    </div>
                  ))}
                  <div className="text-xs text-gray-500 dark:text-gray-400 pl-4">+13 more</div>
                </div>
              </div>
            </div>
          </div>
        );

      case "system":
        return (
          <div className="space-y-4">
            {/* System Prompt */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">System Prompt</h4>
              <div className="p-3 bg-white dark:bg-[#262626] rounded border border-gray-200 dark:border-gray-600">
                <div className="text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-[#404040] p-2 rounded font-mono mb-3">
                  You are a GTM Operating System AI. Focus on actionable insights, revenue optimization, and team collaboration. Provide data-driven recommendations with clear next steps.
                </div>
                <Button size="sm" variant="outline" className="text-xs w-full">
                  Edit Prompt
                </Button>
              </div>
            </div>

            {/* API Configuration */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">API Configuration</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-[#404040] rounded">
                  <span className="text-sm text-gray-900 dark:text-gray-100">OpenAI API</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Connected</span>
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-[#404040] rounded">
                  <span className="text-sm text-gray-900 dark:text-gray-100">Anthropic Claude</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Available</span>
                </div>
              </div>
            </div>

            {/* Settings */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Settings</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-[#404040] rounded cursor-pointer">
                  <span className="text-sm text-gray-900 dark:text-gray-100">Response Length</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Detailed</span>
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-[#404040] rounded cursor-pointer">
                  <span className="text-sm text-gray-900 dark:text-gray-100">Auto-save Charts</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Enabled</span>
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-[#404040] rounded cursor-pointer">
                  <span className="text-sm text-gray-900 dark:text-gray-100">Data Retention</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">30 days</span>
                </div>
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
      <div className="w-16 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#171717] flex flex-col">
        <div className="flex flex-col">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  size="sm"
                  className="rounded-none border-0 h-12 w-full"
                  onClick={() => {
                    setActiveTab(tab.id);
                    onToggleCollapse(); // Expand the sidebar
                    onTabClick?.(tab.id);
                  }}
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
    <div className="w-80 border-r border-gray-200 dark:border-[#404040] bg-gray-50 dark:bg-[#171717] flex flex-col transition-all duration-300 overflow-hidden">
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
        <div className="p-4 overflow-hidden">
          {renderTabContent()}
        </div>
      </ScrollArea>
    </div>
  );
}
