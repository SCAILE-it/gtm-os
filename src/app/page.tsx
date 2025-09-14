"use client";

import { useState } from "react";
import { AgenticLayout } from "@/components/layout/agentic-layout";
import { StartScreen } from "@/components/onboarding/start-screen";
import { DashboardContent } from "@/components/dashboard/dashboard-content";

export default function HomePage() {
  const [selectedMode, setSelectedMode] = useState<"analyst" | "dashboard" | null>(null);

  if (!selectedMode) {
    return <StartScreen onSelectMode={setSelectedMode} />;
  }

  if (selectedMode === "dashboard") {
    return (
      <AgenticLayout>
        <DashboardContent />
      </AgenticLayout>
    );
  }

  // Analyst mode (default chat interface)
  return <AgenticLayout />;
}