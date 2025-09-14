"use client";

import { useState } from "react";
import { StartScreen } from "@/components/start-screen";
import { LoadingScreen } from "@/components/loading-screen";
import { ExecutiveDashboard } from "@/components/executive-dashboard";
import { AgenticLayout } from "@/components/layout/agentic-layout";

type AppState = 'start' | 'loading' | 'dashboard' | 'analyst' | 'metric-detail';

export default function HomePage() {
  const [appState, setAppState] = useState<AppState>('start');
  const [selectedMode, setSelectedMode] = useState<'dashboard' | 'analyst' | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const handleModeSelect = (mode: 'dashboard' | 'analyst') => {
    setSelectedMode(mode);
    setAppState('loading');
  };

  const handleLoadingComplete = () => {
    if (selectedMode === 'dashboard') {
      setAppState('dashboard');
    } else {
      setAppState('analyst');
    }
  };

  const handleMetricClick = (metric: string) => {
    setSelectedMetric(metric);
    setAppState('metric-detail');
  };

  const handleChatOpen = () => {
    setAppState('analyst');
  };

  // Render based on current state
  switch (appState) {
    case 'start':
      return <StartScreen onModeSelect={handleModeSelect} />;
    
    case 'loading':
      return <LoadingScreen onComplete={handleLoadingComplete} />;
    
    case 'dashboard':
      return (
        <ExecutiveDashboard 
          onMetricClick={handleMetricClick}
          onChatOpen={handleChatOpen}
        />
      );
    
    case 'analyst':
    case 'metric-detail':
      return <AgenticLayout selectedMetric={selectedMetric} />;
    
    default:
      return <StartScreen onModeSelect={handleModeSelect} />;
  }
}