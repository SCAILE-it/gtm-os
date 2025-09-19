"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AgenticHeader } from "@/components/layout/agentic-header";
import { GTMDashboard } from "@/components/dashboard/gtm-dashboard";
import { AgentsFunnelPage } from "@/components/agents/agents-funnel-page";
import { AgenticInterface } from "@/components/ai/agentic-interface";

export function DashboardChatLayout() {
  const pathname = usePathname();
  const [selectedContext, setSelectedContext] = useState<string | null>(null);
  const [dashboardWidth, setDashboardWidth] = useState(66.67); // Start at 2/3 (66.67%)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDashboardItemClick = (context: string, tabType: string) => {
    setSelectedContext(context);
    // TODO: Open detailed tab for the clicked item
    console.log(`Opening ${tabType} tab with context:`, context);
  };

  const handleSaveToClipboard = (item: any) => {
    // TODO: Save to clipboard functionality
    console.log("Saving to clipboard:", item);
  };

  // Drag functionality
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      
      // Constrain between 30% and 80%
      const constrainedWidth = Math.min(Math.max(newWidth, 30), 80);
      setDashboardWidth(constrainedWidth);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="min-h-screen bg-background">
      <AgenticHeader />
      
      <div ref={containerRef} className="flex h-[calc(100vh-4rem)]">
        {/* Dashboard or Agents - Dynamic width with responsive behavior */}
        <div 
          className="overflow-auto min-w-0 md:block"
          style={{ width: `${dashboardWidth}%` }}
        >
          {pathname === "/agents" ? <AgentsFunnelPage /> : <GTMDashboard />}
        </div>

        {/* Drag Handle - Hidden on mobile */}
        <div 
          className="w-1 bg-border hover:bg-muted-foreground cursor-col-resize transition-colors relative group hidden md:block"
          onMouseDown={() => setIsDragging(true)}
        >
          <div className="absolute inset-y-0 -left-1 -right-1 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-1 h-8 bg-muted-foreground rounded-full"></div>
          </div>
        </div>

        {/* Chat + Pills - Dynamic width with responsive behavior */}
        <div 
          className="border-l border-border bg-background flex flex-col min-w-0 overflow-hidden"
          style={{ width: `${100 - dashboardWidth}%` }}
        >
          {/* Context Pills */}
          {selectedContext && (
            <div className="p-3 border-b border-border bg-background">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  Context: {selectedContext}
                </Badge>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-5 w-5 p-0 text-muted-foreground"
                  onClick={() => setSelectedContext(null)}
                >
                  ×
                </Button>
              </div>
            </div>
          )}
          
          {/* Chat Interface */}
          <div className="flex-1 overflow-hidden">
            <AgenticInterface 
              className="h-full w-full"
              onSaveToWorkspace={handleSaveToClipboard}
              context={selectedContext}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
