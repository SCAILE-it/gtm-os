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
import { SourceLogo } from "@/components/ui/source-logo";

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
                className={`p-3 rounded border cursor-pointer transition-all duration-200 ${
                  flow.status === 'active' 
                    ? 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#262626] hover:bg-gray-100 dark:hover:bg-[#404040] shadow-sm' 
                    : !flow.read
                    ? 'border-gray-300 dark:border-gray-500 bg-white dark:bg-[#171717] hover:bg-gray-50 dark:hover:bg-[#262626] shadow-sm'
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-[#171717]/50 hover:bg-gray-50 dark:hover:bg-[#262626]'
                }`}
              >
                <div className="space-y-2">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm truncate ${
                        !flow.read ? 'font-bold text-gray-900 dark:text-gray-100' : 'font-medium text-gray-700 dark:text-gray-300'
                      }`}>
                        {flow.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">{flow.time}</div>
                    </div>
                    
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {flow.status === 'active' && (
                        <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">{flow.progress}%</div>
                      )}
                      
                      {/* Status Indicator */}
                      {flow.status === 'active' ? (
                        <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse" />
                      ) : !flow.read ? (
                        <div className="w-3 h-3 bg-gray-800 dark:bg-gray-200 rounded-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-white dark:bg-gray-800 rounded-full" />
                        </div>
                      ) : (
                        <div className="w-2 h-2 bg-gray-400 rounded-full" />
                      )}
                    </div>
                  </div>
                  
                  {/* Progress Bar for Active Flows */}
                  {flow.status === 'active' && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600 dark:text-gray-400">{flow.task}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div 
                          className="bg-gray-600 dark:bg-gray-400 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${flow.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Unread Indicator */}
                  {!flow.read && flow.status === 'completed' && (
                    <div className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-[#404040] px-2 py-1 rounded">
                      New insights available
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        );

      case "daily":
        return (
          <div className="space-y-4">
            {/* Customizable KPI Dashboard */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Your KPIs</h4>
                <Button size="sm" variant="ghost" className="text-xs h-5 px-2" title="Customize KPIs">
                  Edit
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Revenue", value: "$142.5K", change: "+12.3%", trend: "up" },
                  { label: "CAC", value: "$85", change: "-8.2%", trend: "down" },
                  { label: "Conversion", value: "3.2%", change: "+0.5%", trend: "up" },
                  { label: "Users", value: "2.1K", change: "+15.7%", trend: "up" }
                ].map((kpi, index) => (
                  <div key={index} className="p-2 bg-white dark:bg-[#262626] rounded border border-gray-200 dark:border-gray-600">
                    <div className="text-xs text-gray-600 dark:text-gray-400">{kpi.label}</div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{kpi.value}</span>
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        {kpi.trend === 'up' ? '↗' : '↘'} {kpi.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Insights - Cleaner */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Key Insights</h4>
              <div className="space-y-2">
                <div className="p-2 bg-white dark:bg-[#262626] rounded border border-gray-200 dark:border-gray-600">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Email = Top Performer</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">45% revenue • Scale for +$30K/month</div>
                </div>
                
                <div className="p-2 bg-white dark:bg-[#262626] rounded border border-gray-200 dark:border-gray-600">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Mobile = Urgent Fix</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Down 12% • Fix saves $60K/month</div>
                </div>
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
                      task.status === 'completed' ? 'bg-gray-600' :
                      task.status === 'pending' ? 'bg-gray-400' : 'bg-gray-300'
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
            {/* Search Only */}
            <div>
              <Input
                placeholder="Search connectors..."
                className="text-sm"
              />
            </div>

            {/* Connector Library - Airbyte Style */}
            <div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  // Connected (solid outline)
                  { name: "Google Analytics", logo: "Google Analytics", connected: true },
                  { name: "HubSpot", logo: "HubSpot", connected: true },
                  { name: "Gmail", logo: "Gmail", connected: true },
                  { name: "Mixpanel", logo: "Mixpanel", connected: false },
                  { name: "Salesforce", logo: "Salesforce", connected: false },
                  { name: "Stripe", logo: "Stripe", connected: false },
                  { name: "Google Ads", logo: "Google Ads", connected: false },
                  { name: "Facebook Ads", logo: "Facebook", connected: false },
                  { name: "Mailchimp", logo: "Mailchimp", connected: false },
                  { name: "Slack", logo: "Slack", connected: false },
                  { name: "Shopify", logo: "Shopify", connected: false },
                  { name: "Adobe Analytics", logo: "Adobe Analytics", connected: false },
                  { name: "Amplitude", logo: "Amplitude", connected: false },
                  { name: "Pipedrive", logo: "Pipedrive", connected: false },
                  { name: "Outlook", logo: "Outlook", connected: false },
                  { name: "LinkedIn Ads", logo: "LinkedIn", connected: false }
                ].map((connector, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-[#404040] transition-colors ${
                      connector.connected 
                        ? 'border-2 border-gray-400 dark:border-gray-500 bg-white dark:bg-[#262626]' 
                        : 'border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50/50 dark:bg-[#171717]/50'
                    }`}
                  >
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="w-8 h-8 flex-shrink-0">
                        <SourceLogo source={connector.logo} className="w-8 h-8" />
                      </div>
                      <div className="text-xs font-medium text-gray-900 dark:text-gray-100 truncate w-full">
                        {connector.name}
                      </div>
                      {connector.connected && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Connected
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Show More */}
              <div className="text-center pt-2">
                <Button variant="ghost" size="sm" className="text-xs text-gray-500 hover:text-gray-700">
                  Show all 50+ connectors
                </Button>
              </div>
            </div>
          </div>
        );

      case "agents":
        return (
          <div className="space-y-4">
            {/* Search */}
            <div>
              <Input
                placeholder="Search agents..."
                className="text-sm"
              />
            </div>

            {/* Agent Library - Individual Cards */}
            <div>
              <div className="grid grid-cols-1 gap-2">
                {[
                  // Inbound - Website
                  { name: "Keywords Research", category: "Inbound • Website", active: false },
                  { name: "SEMrush Analysis", category: "Inbound • Website", active: true },
                  { name: "Peek AI Optimization", category: "Inbound • Website", active: false },
                  { name: "Website Health Check", category: "Inbound • Website", active: false },
                  { name: "Conversion Optimization", category: "Inbound • Website", active: true },
                  { name: "Google Ads Audit", category: "Inbound • Website", active: false },
                  
                  // Inbound - Content & Social
                  { name: "LinkedIn Content Writer", category: "Inbound • Content", active: false },
                  { name: "YouTube Snippet Creator", category: "Inbound • Content", active: false },
                  { name: "Newsletter Writer", category: "Inbound • Content", active: true },
                  { name: "Webinar Content", category: "Inbound • Content", active: false },
                  
                  // Outbound
                  { name: "Lead Crawler", category: "Outbound", active: false },
                  { name: "Lead Enrichment", category: "Outbound", active: false },
                  { name: "Message Writer", category: "Outbound", active: false },
                  { name: "Campaign Setup", category: "Outbound", active: false },
                  { name: "Campaign Runner", category: "Outbound", active: false },
                  
                  // CRM
                  { name: "Data Cleanup", category: "CRM", active: true },
                  { name: "Issue Escalation", category: "CRM", active: false },
                  { name: "Sales Rep Alerts", category: "CRM", active: false },
                  { name: "Pipeline Management", category: "CRM", active: false }
                ].map((agent, index) => (
                  <div 
                    key={index} 
                    className={`p-2 rounded border cursor-pointer transition-colors ${
                      agent.active 
                        ? 'border-2 border-gray-400 dark:border-gray-500 bg-white dark:bg-[#262626]' 
                        : 'border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50/50 dark:bg-[#171717]/50'
                    } hover:bg-gray-50 dark:hover:bg-[#404040]`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          {agent.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {agent.category}
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-2">
                        {agent.active ? (
                          <div className="text-xs text-gray-600 dark:text-gray-400">Active</div>
                        ) : (
                          <Button size="sm" variant="ghost" className="text-xs h-4 w-4 p-0 text-gray-400 hover:text-gray-600" title="Activate">
                            +
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Show More */}
              <div className="text-center pt-2">
                <Button variant="ghost" size="sm" className="text-xs text-gray-500 hover:text-gray-700">
                  Show all 30+ agents
                </Button>
              </div>
            </div>
          </div>
        );

      case "system":
        return (
          <div className="space-y-4">
            {/* System Prompt Editor */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">System Prompt</h4>
              <div className="p-3 bg-white dark:bg-[#262626] rounded border border-gray-200 dark:border-gray-600">
                <textarea 
                  className="w-full h-20 text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-[#404040] p-2 rounded font-mono border-0 outline-none resize-none mb-3"
                  defaultValue="You are a GTM Operating System AI. Focus on actionable insights, revenue optimization, and team collaboration. Provide data-driven recommendations with clear next steps."
                  placeholder="Edit system prompt..."
                />
                <div className="flex gap-1">
                  <Button size="sm" variant="outline" className="text-xs flex-1">
                    Save Changes
                  </Button>
                  <Button size="sm" variant="ghost" className="text-xs px-2">
                    Reset
                  </Button>
                </div>
              </div>
            </div>

            {/* Prompt Suggestions */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Suggested Improvements</h4>
              <div className="space-y-2">
                {[
                  {
                    title: "Executive Focus",
                    description: "Add: 'Prioritize executive-level insights with revenue impact estimates'",
                    impact: "Better C-suite relevance"
                  },
                  {
                    title: "Industry Context", 
                    description: "Add: 'Consider industry benchmarks and competitive context'",
                    impact: "More strategic insights"
                  },
                  {
                    title: "Action Urgency",
                    description: "Add: 'Classify recommendations by urgency and effort required'",
                    impact: "Clearer prioritization"
                  }
                ].map((suggestion, index) => (
                  <div key={index} className="p-2 bg-white dark:bg-[#262626] rounded border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#404040] cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{suggestion.title}</div>
                      <Button size="sm" variant="ghost" className="text-xs h-4 w-4 p-0" title="Apply">
                        +
                      </Button>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">{suggestion.description}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">{suggestion.impact}</div>
                  </div>
                ))}
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
                               ? 'bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900' 
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
