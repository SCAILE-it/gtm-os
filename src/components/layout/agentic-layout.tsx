"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AgenticHeader } from "./agentic-header";
import { ChatHistorySidebar } from "./chat-history-sidebar";
import { DailyDigestSidebar } from "./daily-digest-sidebar";
import { AgenticInterface } from "@/components/ai/agentic-interface";
import { FullDailyDigest } from "@/components/dashboard/full-daily-digest";

interface AgenticLayoutProps {
  children?: React.ReactNode;
}

export function AgenticLayout({ children }: AgenticLayoutProps) {
  const pathname = usePathname();
  const isDashboardPage = pathname === "/dashboard";
  const isAgenticPage = pathname === "/" || pathname === "/agentic";
  const hasCustomContent = children !== undefined;
  const [leftSidebarExpanded, setLeftSidebarExpanded] = useState(true);
  const [rightSidebarExpanded, setRightSidebarExpanded] = useState(true);
  const [rightSidebarFullscreen, setRightSidebarFullscreen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <AgenticHeader />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {isDashboardPage || (hasCustomContent && !isAgenticPage) ? (
          /* Dashboard/Settings/Connections View - Clean layout */
          <main className="flex-1 overflow-hidden">
            {children}
          </main>
        ) : (
          /* Agentic View - Full layout with sidebars */
          <>
            {/* Left Sidebar - Chat History */}
            {!rightSidebarFullscreen && (
              <ChatHistorySidebar
                expanded={leftSidebarExpanded}
                onToggleExpand={() => setLeftSidebarExpanded(!leftSidebarExpanded)}
              />
            )}
            
            {/* Main Content Area */}
            {!rightSidebarFullscreen && (
              <main className="flex-1 overflow-hidden">
                <AgenticInterface className="h-full" />
              </main>
            )}

            {/* Right Sidebar - Daily Digest */}
            {!rightSidebarFullscreen && (
              <DailyDigestSidebar
                expanded={rightSidebarExpanded}
                onToggleExpand={() => setRightSidebarExpanded(!rightSidebarExpanded)}
                fullscreen={rightSidebarFullscreen}
                onToggleFullscreen={() => setRightSidebarFullscreen(true)}
              />
            )}

            {/* Fullscreen Daily Digest Dashboard */}
            {rightSidebarFullscreen && (
              <div className="fixed inset-y-16 inset-x-0 z-50 bg-background">
                <FullDailyDigest onClose={() => setRightSidebarFullscreen(false)} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
