"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Maximize2, 
  Minimize2,
  MessageSquare,
  BarChart3,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { AgenticInterface } from "@/components/ai/agentic-interface";
import { DashboardContent } from "@/components/dashboard/dashboard-content";
import { AgenticHeader } from "@/components/layout/agentic-header";

export function SplitScreenLayout() {
  const [leftExpanded, setLeftExpanded] = useState(false);
  const [rightExpanded, setRightExpanded] = useState(false);

  if (leftExpanded) {
    return (
      <div className="min-h-screen bg-background">
        <AgenticHeader />
        <div className="h-[calc(100vh-4rem)] relative">
          <AgenticInterface className="h-full" />
          <Button
            onClick={() => setLeftExpanded(false)}
            className="absolute top-4 right-4 z-50"
            size="sm"
            variant="outline"
          >
            <Minimize2 className="h-4 w-4 mr-2" />
            Split View
          </Button>
        </div>
      </div>
    );
  }

  if (rightExpanded) {
    return (
      <div className="min-h-screen bg-background">
        <AgenticHeader />
        <div className="h-[calc(100vh-4rem)] relative">
          <DashboardContent />
          <Button
            onClick={() => setRightExpanded(false)}
            className="absolute top-4 right-4 z-50"
            size="sm"
            variant="outline"
          >
            <Minimize2 className="h-4 w-4 mr-2" />
            Split View
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AgenticHeader />
      
      {/* Split Screen Container */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Side - Agentic Chat */}
        <div className="flex-1 border-r border-border relative">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">AI Analyst</h2>
              <Badge variant="secondary" className="text-xs">Chat</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/agentic">
                <Button size="sm" variant="ghost" className="text-xs">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Full Screen
                </Button>
              </Link>
              <Button
                onClick={() => setLeftExpanded(true)}
                size="sm"
                variant="ghost"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Chat Interface */}
          <div className="h-[calc(100%-5rem)]">
            <AgenticInterface className="h-full" />
          </div>
        </div>

        {/* Right Side - Dashboard */}
        <div className="flex-1 relative">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-blue-50/30 dark:bg-blue-950/30">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <h2 className="font-semibold">Executive Dashboard</h2>
              <Badge variant="secondary" className="text-xs">Metrics</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/dashboard">
                <Button size="sm" variant="ghost" className="text-xs">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Full Screen
                </Button>
              </Link>
              <Button
                onClick={() => setRightExpanded(true)}
                size="sm"
                variant="ghost"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Dashboard Content */}
          <div className="h-[calc(100%-5rem)] overflow-y-auto">
            <DashboardContent />
          </div>
        </div>
      </div>

      {/* Bottom Hint Bar */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-background/95 backdrop-blur-sm border border-border rounded-full px-4 py-2 shadow-lg">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>💡 Click any metric for detailed breakdown</span>
            <span>•</span>
            <span>🔗 Chat with your data on the left</span>
            <span>•</span>
            <span>📊 Executive view on the right</span>
          </div>
        </div>
      </div>
    </div>
  );
}
