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
  Download
} from "lucide-react";
import { AgenticInterface } from "@/components/ai/agentic-interface";
import { AgenticHeader } from "@/components/layout/agentic-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LeftSidebarTabs } from "@/components/layout/left-sidebar-tabs";
import { InlineChart } from "@/components/charts/inline-chart";

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
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
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
        {/* Left Sidebar - Collapsible Tabbed Control Centre */}
        <LeftSidebarTabs 
          dailyDigest={dailyDigest} 
          collapsed={leftSidebarCollapsed}
          onToggleCollapse={() => setLeftSidebarCollapsed(!leftSidebarCollapsed)}
        />

        {/* Center - Flow Interface */}
        <div className="flex-1 flex flex-col">
          
          <div className="flex-1">
            <AgenticInterface 
              className="h-full" 
              onSaveToWorkspace={addToWorkspace}
            />
          </div>
        </div>

        {/* Right Side - Canvas (Always Visible) */}
        <div className="w-96 border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#2A2D3A] flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Canvas</h2>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Save charts and collaborate on tasks</p>
            </div>

            <ScrollArea className="flex-1 p-4">
              {/* Empty State */}
              {workspaceItems.length === 0 && agentTasks.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    <BarChart3 className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Canvas is empty</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 max-w-48">
                    Save charts from your flows or start a task with an agent to see them here
                  </p>
                </div>
              )}

              {/* Active Tasks */}
              {agentTasks.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Active Tasks
                  </h3>
                  <div className="space-y-3">
                    {agentTasks.map((task) => (
                      <Card key={task.id} className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-sm font-medium">{task.title}</h4>
                          <Badge variant={
                            task.status === 'active' ? 'default' :
                            task.status === 'completed' ? 'secondary' : 'outline'
                          } className="text-xs">
                            {task.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{task.description}</p>
                        {task.progress && (
                          <div className="w-full bg-muted rounded-full h-1.5">
                            <div 
                              className="bg-primary h-1.5 rounded-full transition-all"
                              style={{ width: `${task.progress}%` }}
                            />
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Saved Items */}
              {workspaceItems.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Saved Items
                  </h3>
                  <div className="space-y-3">
                    {workspaceItems.map((item) => (
                      <Card key={item.id} className="p-3 bg-white dark:bg-[#363A4A] border border-gray-200 dark:border-gray-600">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {item.type === 'chart' && <BarChart3 className="h-4 w-4 text-blue-600" />}
                            {item.type === 'spreadsheet' && <FileSpreadsheet className="h-4 w-4 text-green-600" />}
                            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.title}</h4>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFromWorkspace(item.id)}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        {/* Render the exact saved chart */}
                        {item.data && item.type === 'chart' && (
                          <div className="mb-3 bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                            <InlineChart chart={item.data} />
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" className="text-xs">
                            <Mail className="h-3 w-3 mr-1" />
                            Email
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs">
                            <Share2 className="h-3 w-3 mr-1" />
                            Share
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs">
                            <Download className="h-3 w-3 mr-1" />
                            Export
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </ScrollArea>
          </div>
      </div>
    </div>
  );
}
