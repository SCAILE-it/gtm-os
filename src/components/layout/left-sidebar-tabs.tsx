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

type TabType = "flows" | "daily" | "context" | "agents";

export function LeftSidebarTabs({ dailyDigest, collapsed, onToggleCollapse, onTabClick }: LeftSidebarTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("daily");
  
  const tabs = [
    { id: "flows" as TabType, label: "Flow History", icon: History },
    { id: "daily" as TabType, label: "Daily", icon: Calendar },
    { id: "context" as TabType, label: "Context", icon: Database },
    { id: "agents" as TabType, label: "Agents", icon: Bot },
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

            {/* Connected Sources */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                Connected (4)
              </h4>
              
              <div className="space-y-2 mb-4">
                {[
                  { 
                    name: "Google Analytics 4", 
                    description: "Website and app analytics, user behavior",
                    category: "Analytics",
                    status: "connected", 
                    lastSync: "2 minutes ago", 
                    recordCount: 1250000,
                    actions: ["sync", "test", "configure"]
                  },
                  { 
                    name: "HubSpot CRM", 
                    description: "Customer data, deals, contact interactions",
                    category: "CRM",
                    status: "connected", 
                    lastSync: "15 minutes ago", 
                    recordCount: 45000,
                    actions: ["sync", "test", "configure"]
                  },
                  { 
                    name: "Mixpanel", 
                    description: "Product analytics, user journeys",
                    category: "Analytics",
                    status: "testing", 
                    lastSync: "Testing connection...",
                    actions: ["retry", "configure"]
                  },
                  { 
                    name: "Salesforce", 
                    description: "CRM data, leads, opportunities",
                    category: "CRM",
                    status: "error", 
                    lastSync: "Failed 2 hours ago",
                    actions: ["retry", "configure", "logs"]
                  }
                ].map((source, index) => (
                  <div key={index} className="p-2 bg-white dark:bg-[#262626] rounded border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#3A3E4E] group">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        source.status === 'connected' ? 'bg-green-500' :
                        source.status === 'testing' ? 'bg-yellow-500 animate-pulse' :
                        source.status === 'error' ? 'bg-red-500' : 'bg-gray-400'
                      }`} />
                      <div className="text-sm font-medium text-gray-800 dark:text-gray-200 flex-1 min-w-0 truncate">{source.name}</div>
                      <Badge variant="outline" className="text-xs flex-shrink-0">{source.category}</Badge>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-2 truncate">{source.description}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 mb-2">
                      {source.recordCount ? `${(source.recordCount / 1000).toFixed(0)}K records • ` : ''}{source.lastSync}
                    </div>
                    
                    {/* Action Buttons - Compact Icons Only */}
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {source.actions.map((action) => (
                        <Button 
                          key={action} 
                          size="sm" 
                          variant="outline" 
                          className="h-5 w-5 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log(`${action} ${source.name}`);
                          }}
                          title={action}
                        >
                          {action === 'sync' && '🔄'}
                          {action === 'test' && '🧪'}
                          {action === 'configure' && '⚙️'}
                          {action === 'retry' && '🔄'}
                          {action === 'logs' && '📋'}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tool Library - All Available Sources */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Tool Library (50+)</h4>
              
              {/* Analytics Tools */}
              <div className="mb-3">
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Analytics (12)</div>
                <div className="space-y-1">
                  {[
                    { name: "Google Analytics 4", description: "Web analytics, user behavior", category: "Analytics", popular: true },
                    { name: "Adobe Analytics", description: "Enterprise web analytics", category: "Analytics" },
                    { name: "Mixpanel", description: "Product analytics, events", category: "Analytics" },
                    { name: "Amplitude", description: "Product intelligence platform", category: "Analytics" }
                  ].map((tool, index) => (
                    <div key={index} className="p-2 bg-white dark:bg-[#262626] rounded border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#3A3E4E] cursor-pointer group">
                      <div className="flex items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{tool.name}</div>
                            {tool.popular && <Badge variant="outline" className="text-xs bg-blue-50 text-blue-600 border-blue-200">Popular</Badge>}
                            <Badge variant="outline" className="text-xs flex-shrink-0">{tool.category}</Badge>
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 truncate">{tool.description}</div>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                          <Button size="sm" variant="outline" className="h-5 w-5 p-0" title="Test Connection">
                            🧪
                          </Button>
                          <Button size="sm" variant="outline" className="h-5 w-5 p-0" title="Connect">
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="text-xs text-gray-500 dark:text-gray-400 pl-2">+8 more analytics tools</div>
                </div>
              </div>

              {/* CRM Tools */}
              <div className="mb-3">
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">CRM (8)</div>
                <div className="space-y-1">
                  {[
                    { name: "HubSpot", description: "All-in-one CRM platform", category: "CRM", popular: true },
                    { name: "Salesforce", description: "Enterprise CRM solution", category: "CRM", popular: true },
                    { name: "Pipedrive", description: "Sales-focused CRM", category: "CRM" }
                  ].map((tool, index) => (
                    <div key={index} className="p-2 bg-white dark:bg-[#262626] rounded border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#3A3E4E] cursor-pointer group">
                      <div className="flex items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{tool.name}</div>
                            {tool.popular && <Badge variant="outline" className="text-xs bg-blue-50 text-blue-600 border-blue-200">Popular</Badge>}
                            <Badge variant="outline" className="text-xs flex-shrink-0">{tool.category}</Badge>
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 truncate">{tool.description}</div>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                          <Button size="sm" variant="outline" className="h-5 w-5 p-0" title="Test Connection">
                            🧪
                          </Button>
                          <Button size="sm" variant="outline" className="h-5 w-5 p-0" title="Connect">
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="text-xs text-gray-500 dark:text-gray-400 pl-2">+5 more CRM tools</div>
                </div>
              </div>

              {/* Marketing Tools */}
              <div className="mb-3">
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Marketing (15)</div>
                <div className="space-y-1">
                  {[
                    { name: "Google Ads", description: "Search & display advertising", category: "Marketing", popular: true },
                    { name: "Facebook Ads", description: "Social media advertising", category: "Marketing", popular: true },
                    { name: "Mailchimp", description: "Email marketing platform", category: "Marketing" }
                  ].map((tool, index) => (
                    <div key={index} className="p-2 bg-white dark:bg-[#262626] rounded border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#3A3E4E] cursor-pointer group">
                      <div className="flex items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{tool.name}</div>
                            {tool.popular && <Badge variant="outline" className="text-xs bg-blue-50 text-blue-600 border-blue-200">Popular</Badge>}
                            <Badge variant="outline" className="text-xs flex-shrink-0">{tool.category}</Badge>
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 truncate">{tool.description}</div>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                          <Button size="sm" variant="outline" className="h-5 w-5 p-0" title="Test Connection">
                            🧪
                          </Button>
                          <Button size="sm" variant="outline" className="h-5 w-5 p-0" title="Connect">
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="text-xs text-gray-500 dark:text-gray-400 pl-2">+12 more marketing tools</div>
                </div>
              </div>

              {/* E-commerce Tools */}
              <div className="mb-3">
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">E-commerce (10)</div>
                <div className="space-y-1">
                  {[
                    { name: "Stripe", description: "Payment processing & analytics", category: "E-commerce", popular: true },
                    { name: "Shopify", description: "E-commerce platform data", category: "E-commerce" }
                  ].map((tool, index) => (
                    <div key={index} className="p-2 bg-white dark:bg-[#262626] rounded border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#3A3E4E] cursor-pointer group">
                      <div className="flex items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{tool.name}</div>
                            {tool.popular && <Badge variant="outline" className="text-xs bg-blue-50 text-blue-600 border-blue-200">Popular</Badge>}
                            <Badge variant="outline" className="text-xs flex-shrink-0">{tool.category}</Badge>
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 truncate">{tool.description}</div>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                          <Button size="sm" variant="outline" className="h-5 w-5 p-0" title="Test Connection">
                            🧪
                          </Button>
                          <Button size="sm" variant="outline" className="h-5 w-5 p-0" title="Connect">
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="text-xs text-gray-500 dark:text-gray-400 pl-2">+8 more e-commerce tools</div>
                </div>
              </div>

              {/* Social & Communication */}
              <div>
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Social & Communication (5)</div>
                <div className="space-y-1">
                  {[
                    { name: "Slack", description: "Team communication data", category: "Communication" },
                    { name: "LinkedIn", description: "Professional network insights", category: "Social" }
                  ].map((tool, index) => (
                    <div key={index} className="p-2 bg-white dark:bg-[#262626] rounded border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#3A3E4E] cursor-pointer group">
                      <div className="flex items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{tool.name}</div>
                            <Badge variant="outline" className="text-xs flex-shrink-0">{tool.category}</Badge>
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 truncate">{tool.description}</div>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                          <Button size="sm" variant="outline" className="h-5 w-5 p-0" title="Test Connection">
                            🧪
                          </Button>
                          <Button size="sm" variant="outline" className="h-5 w-5 p-0" title="Connect">
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="text-xs text-gray-500 dark:text-gray-400 pl-2">+3 more social tools</div>
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
