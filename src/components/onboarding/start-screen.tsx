"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  BarChart3, 
  Sparkles, 
  TrendingUp, 
  Users, 
  Target,
  ArrowRight,
  Brain,
  ChevronRight
} from "lucide-react";
import Image from "next/image";

interface StartScreenProps {
  onSelectMode: (mode: "analyst" | "dashboard") => void;
}

export function StartScreen({ onSelectMode }: StartScreenProps) {
  const [hoveredMode, setHoveredMode] = useState<"analyst" | "dashboard" | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Image 
              src="/scaile-logo.svg" 
              alt="SCAILE" 
              width={48} 
              height={48}
              className="h-12 w-12"
            />
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                SCAILE GTM Operating System
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Your complete Go-to-Market intelligence platform
              </p>
            </div>
          </div>
          
          <Badge variant="secondary" className="px-4 py-2">
            <Sparkles className="h-4 w-4 mr-2" />
            Choose your workspace mode
          </Badge>
        </div>

        {/* Mode Selection */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Analyst Mode */}
          <Card 
            className={`relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] ${
              hoveredMode === "analyst" ? "ring-2 ring-primary shadow-2xl scale-[1.02]" : ""
            }`}
            onMouseEnter={() => setHoveredMode("analyst")}
            onMouseLeave={() => setHoveredMode(null)}
            onClick={() => onSelectMode("analyst")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />
            <CardHeader className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <MessageSquare className="h-8 w-8" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Analyst Mode</CardTitle>
                  <p className="text-muted-foreground">AI-powered analysis & insights</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="relative space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Brain className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Intelligent Analysis</p>
                    <p className="text-sm text-muted-foreground">
                      Ask questions, get instant insights from your data
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Task Delegation</p>
                    <p className="text-sm text-muted-foreground">
                      Send analysis summaries directly to team via Slack/Email
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Real-time Insights</p>
                    <p className="text-sm text-muted-foreground">
                      Deep-dive into revenue trends, conversion funnels, and more
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                  size="lg"
                >
                  Start Analysis
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Dashboard Mode */}
          <Card 
            className={`relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] ${
              hoveredMode === "dashboard" ? "ring-2 ring-primary shadow-2xl scale-[1.02]" : ""
            }`}
            onMouseEnter={() => setHoveredMode("dashboard")}
            onMouseLeave={() => setHoveredMode(null)}
            onClick={() => onSelectMode("dashboard")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-500/10" />
            <CardHeader className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600">
                  <BarChart3 className="h-8 w-8" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Dashboard Mode</CardTitle>
                  <p className="text-muted-foreground">Executive overview & metrics</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="relative space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <BarChart3 className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium">High-level Performance</p>
                    <p className="text-sm text-muted-foreground">
                      Revenue, CAC, Conversion Rates at a glance
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Detailed Breakdowns</p>
                    <p className="text-sm text-muted-foreground">
                      Click any metric for deeper analysis and trends
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Team Collaboration</p>
                    <p className="text-sm text-muted-foreground">
                      Share insights and trigger urgent notifications
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <Button 
                  variant="outline"
                  className="w-full border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  size="lg"
                >
                  View Dashboard
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-12 text-sm text-muted-foreground">
          <p>
            💡 You can switch between modes anytime using the toggle in the header
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Badge variant="outline" className="text-xs">
              Loading data from GA4, LinkedIn, CRM
            </Badge>
            <Badge variant="outline" className="text-xs">
              + Gong, Reddit, SEMrush, Google Ads
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
