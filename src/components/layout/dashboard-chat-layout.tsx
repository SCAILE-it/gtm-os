"use client";

import { useState } from "react";
import { AgenticHeader } from "@/components/layout/agentic-header";
import { GTMDashboard } from "@/components/dashboard/gtm-dashboard";
import { AgenticInterface } from "@/components/ai/agentic-interface";

export function DashboardChatLayout() {
  const [selectedContext, setSelectedContext] = useState<string | null>(null);

  const handleDashboardItemClick = (context: string, tabType: string) => {
    setSelectedContext(context);
    // TODO: Open detailed tab for the clicked item
    console.log(`Opening ${tabType} tab with context:`, context);
  };

  const handleSaveToClipboard = (item: any) => {
    // TODO: Save to clipboard functionality
    console.log("Saving to clipboard:", item);
  };

  return (
    <div className="min-h-screen bg-background">
      <AgenticHeader />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Dashboard - 2/3 width */}
        <div className="flex-1 w-2/3 overflow-auto">
          <GTMDashboard />
        </div>

        {/* Chat + Pills - 1/3 width */}
        <div className="w-1/3 border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#171717] flex flex-col">
          {/* Context Pills */}
          {selectedContext && (
            <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#262626]">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  Context: {selectedContext}
                </Badge>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-5 w-5 p-0 text-gray-400"
                  onClick={() => setSelectedContext(null)}
                >
                  ×
                </Button>
              </div>
            </div>
          )}
          
          {/* Chat Interface */}
          <div className="flex-1">
            <AgenticInterface 
              className="h-full"
              onSaveToWorkspace={handleSaveToClipboard}
              context={selectedContext}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
