"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MessageSquare,
  Calendar,
  History,
  Database,
  X,
  CheckCircle2,
  Clock,
  AlertCircle,
  BarChart3,
  FileSpreadsheet,
  Mail,
  Share2,
  Download,
  ChevronRight,
  Edit3,
  RefreshCw,
  Copy
} from "lucide-react";
import { AgenticInterface } from "@/components/ai/agentic-interface";
import { AgenticHeader } from "@/components/layout/agentic-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LeftSidebarTabs } from "@/components/layout/left-sidebar-tabs";
import { InlineChart } from "@/components/charts/inline-chart";
import { TodoList } from "@/components/ui/todo-list";

interface WorkspaceItem {
  id: string;
  type: "chart" | "spreadsheet" | "table";
  title: string;
  timestamp: Date;
  data?: any;
}

interface AgentTask {
  id: string;
  title: string;
  status: "active" | "completed" | "pending";
  progress?: number;
  description: string;
}

export function OperatingSystemLayout() {
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState(320); // 80 * 4 = 320px
  const [rightPanelWidth, setRightPanelWidth] = useState(320); // Match left panel width
  const [workspaceItems, setWorkspaceItems] = useState<WorkspaceItem[]>([]);
  const [agentTasks, setAgentTasks] = useState<AgentTask[]>([
    {
      id: "1",
      title: "Mobile Conversion Optimization",
      status: "active",
      progress: 65,
      description: "Analyzing mobile funnel and preparing recommendations"
    }
  ]);

  // Sample daily digest data
  const dailyDigest = {
    date: "September 14, 2024",
    metrics: [
      { label: "Revenue", value: "$142.5K", change: "+12.3%", trend: "up" },
      { label: "CAC", value: "$85", change: "-8.2%", trend: "down" },
      { label: "Conversion", value: "3.2%", change: "+0.5%", trend: "up" },
      { label: "Active Users", value: "2.1K", change: "+15.7%", trend: "up" }
    ],
    alerts: [
      { type: "warning", message: "Mobile conversion dropped 12%" },
      { type: "success", message: "Email campaigns performing 23% better" }
    ]
  };

  const addToWorkspace = (item: WorkspaceItem) => {
    setWorkspaceItems(prev => [item, ...prev]);
    setWorkspaceOpen(true);
  };

  const removeFromWorkspace = (id: string) => {
    setWorkspaceItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <AgenticHeader />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Sidebar - Resizable */}
        <div 
          className="border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#171717] flex flex-shrink-0 relative"
          style={{ width: leftSidebarCollapsed ? '64px' : `${leftPanelWidth}px` }}
        >
          <LeftSidebarTabs 
            dailyDigest={dailyDigest} 
            collapsed={leftSidebarCollapsed}
            onToggleCollapse={() => setLeftSidebarCollapsed(!leftSidebarCollapsed)}
            onTabClick={(tabId) => {
              setLeftSidebarCollapsed(false);
              // Tab will be set by the component itself
            }}
          />
          
          {/* Left Resize Handle */}
          {!leftSidebarCollapsed && (
            <div 
              className="absolute right-0 top-0 bottom-0 w-1 bg-transparent hover:bg-blue-500 cursor-col-resize transition-colors"
              title="Drag to resize"
            />
          )}
        </div>

        {/* Center - Flow Interface */}
        <div className="flex-1 flex flex-col min-w-0">
          <AgenticInterface 
            className="h-full" 
            onSaveToWorkspace={addToWorkspace}
          />
        </div>

        {/* Right Panel - Always Visible with Tasks + Optional Canvas */}
        <div 
          className="border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#171717] flex flex-col flex-shrink-0 relative"
          style={{ width: `${rightPanelWidth}px` }}
        >
          {/* Left Resize Handle */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-1 bg-transparent hover:bg-blue-500 cursor-col-resize transition-colors"
            title="Drag to resize"
          />

          {/* Tasks Section - Top Half */}
          <div className="border-b border-gray-200 dark:border-gray-700 p-3">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Tasks</h3>
            <TodoList 
              onTaskUpdate={(tasks) => {
                console.log('Tasks updated:', tasks);
              }}
              onOpenLeftPanel={(tab) => {
                setLeftSidebarCollapsed(false);
              }}
            />
          </div>

          {/* Canvas Section - Bottom Half */}
          <div className="flex-1 flex flex-col">
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Canvas</h3>
            </div>

            <ScrollArea className="flex-1 p-3">
                         {/* Enhanced Empty State */}
                         {workspaceItems.length === 0 && (
                           <div className="text-center py-6">
                             <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                               <BarChart3 className="h-6 w-6 text-gray-400" />
                             </div>
                             <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                               Your Canvas
                             </p>
                             <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                               Save charts, tables, and insights here
                             </p>
                             <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                               <div>• Email reports to stakeholders</div>
                               <div>• Export to PDF/PowerPoint</div>
                               <div>• Create executive dashboards</div>
                               <div>• Share with team members</div>
                             </div>
                           </div>
                         )}

                  {/* Canvas Items - Full Collaboration */}
                  {workspaceItems.length > 0 && (
                    <div className="space-y-3">
                      {workspaceItems.map((item) => (
                        <div key={item.id} className="p-3 bg-white dark:bg-[#262626] rounded border border-gray-200 dark:border-gray-600">
                          {/* Header with Edit/Delete */}
                          <div className="flex items-center justify-between mb-3">
                            <input 
                              className="text-sm font-medium text-gray-900 dark:text-gray-100 bg-transparent border-0 outline-none flex-1"
                              defaultValue={item.title}
                              onBlur={(e) => {
                                // TODO: Update item title
                                console.log('Title updated:', e.target.value);
                              }}
                            />
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeFromWorkspace(item.id)}
                              className="h-6 w-6 p-0 text-gray-500 hover:text-red-600"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          {/* Content Preview */}
                          {item.data && (
                            <div className="mb-3 bg-gray-50 dark:bg-gray-700 rounded p-2">
                              {item.type === 'chart' ? (
                                <div className="scale-75 origin-top-left h-20 overflow-hidden">
                                  <InlineChart chart={item.data} />
                                </div>
                              ) : item.type === 'table' ? (
                                <textarea 
                                  className="w-full h-20 text-xs font-mono bg-transparent border-0 outline-none resize-none text-gray-700 dark:text-gray-300"
                                  defaultValue={item.data.output}
                                  placeholder="Edit table content..."
                                />
                              ) : null}
                            </div>
                          )}
                          
                          {/* Single Row Actions */}
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline" className="h-6 w-6 p-0" title="Edit content">
                              <Edit3 className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="h-6 w-6 p-0" title="Refresh data">
                              <RefreshCw className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="h-6 w-6 p-0" title="Email report (Gmail)">
                              <Mail className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="h-6 w-6 p-0" title="Share link">
                              <Share2 className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="h-6 w-6 p-0" title="Download PDF">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
              </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
