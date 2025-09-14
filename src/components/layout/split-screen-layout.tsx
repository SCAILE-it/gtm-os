"use client";

import { useState } from "react";
import { AgenticHeader } from "./agentic-header";
import { AgenticInterface } from "@/components/ai/agentic-interface";
import { DashboardContent } from "@/components/dashboard/dashboard-content";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  BarChart3, 
  Maximize2, 
  Minimize2,
  ArrowLeftRight
} from "lucide-react";

export function SplitScreenLayout() {
  const [leftExpanded, setLeftExpanded] = useState(false);
  const [rightExpanded, setRightExpanded] = useState(false);

  // If either side is expanded, show only that side
  if (leftExpanded) {
    return (
      <div className="min-h-screen bg-background">
        <AgenticHeader />
        <div className="h-[calc(100vh-4rem)] relative">
          <div className="absolute top-4 right-4 z-10">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLeftExpanded(false)}
              className="bg-background/80 backdrop-blur-sm"
            >
              <Minimize2 className="h-4 w-4 mr-2" />
              Split View
            </Button>
          </div>
          <AgenticInterface className="h-full" />
        </div>
      </div>
    );
  }

  if (rightExpanded) {
    return (
      <div className="min-h-screen bg-background">
        <AgenticHeader />
        <div className="h-[calc(100vh-4rem)] relative">
          <div className="absolute top-4 left-4 z-10">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRightExpanded(false)}
              className="bg-background/80 backdrop-blur-sm"
            >
              <Minimize2 className="h-4 w-4 mr-2" />
              Split View
            </Button>
          </div>
          <DashboardContent />
        </div>
      </div>
    );
  }

  // Split screen view (default)
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <AgenticHeader />
      
      <div className="h-[calc(100vh-4rem)] flex">
        {/* Left Side - Agentic Chat */}
        <div className="flex-1 flex flex-col border-r border-border">
          {/* Left Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-muted/20">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <MessageSquare className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold">AI Analyst</h2>
                <p className="text-xs text-muted-foreground">Ask questions, get insights</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                Live Analysis
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLeftExpanded(true)}
                className="h-8 w-8 p-0"
              >
                <Maximize2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
          
          {/* Chat Interface */}
          <div className="flex-1 overflow-hidden">
            <AgenticInterface className="h-full" />
          </div>
        </div>

        {/* Separator */}
        <div className="w-1 bg-border relative group cursor-col-resize">
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 flex items-center justify-center">
            <div className="w-1 h-8 bg-muted-foreground/20 rounded-full group-hover:bg-primary/50 transition-colors" />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-background border border-border rounded-md p-1 shadow-sm">
              <ArrowLeftRight className="h-3 w-3 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Right Side - Dashboard */}
        <div className="flex-1 flex flex-col">
          {/* Right Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-muted/20">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600">
                <BarChart3 className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold">Executive Dashboard</h2>
                <p className="text-xs text-muted-foreground">Performance overview</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                Real-time
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setRightExpanded(true)}
                className="h-8 w-8 p-0"
              >
                <Maximize2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
          
          {/* Dashboard Content */}
          <div className="flex-1 overflow-hidden">
            <DashboardContent />
          </div>
        </div>
      </div>

      {/* Footer Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
        <div className="bg-background/80 backdrop-blur-sm border border-border rounded-full px-4 py-2 shadow-sm">
          <p className="text-xs text-muted-foreground flex items-center gap-2">
            <ArrowLeftRight className="h-3 w-3" />
            Drag separator to resize • Click maximize to focus
          </p>
        </div>
      </div>
    </div>
  );
}
