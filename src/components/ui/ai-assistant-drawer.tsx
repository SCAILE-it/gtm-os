"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bot, Send, TrendingUp, Lightbulb, Target, FileText } from "lucide-react";

interface AIAssistantSheetProps {
  open: boolean;
  onClose: () => void;
}

// Mock AI assistant data
const mockSummary = {
  topMovers: [
    { metric: "First Touch Conversion", change: "+12.3%", trend: "up" },
    { metric: "Opportunity Win Rate", change: "+5.1%", trend: "up" },
    { metric: "CAC (Paid Ads)", change: "-8.7%", trend: "down" }
  ],
  recommendations: [
    {
      title: "Optimize Landing Page for Paid Traffic",
      impact: "High",
      effort: "Medium", 
      ice: 8.7,
      stage: "First Touch"
    },
    {
      title: "Improve Email Nurture Sequence",
      impact: "Medium",
      effort: "Low",
      ice: 7.2,
      stage: "Qualified"
    },
    {
      title: "Reduce Demo No-Show Rate",
      impact: "High",
      effort: "Low",
      ice: 9.0,
      stage: "Opportunity"
    }
  ],
  keywordInsights: {
    working: ["marketing automation", "lead generation", "sales funnel"],
    mismatch: ["cheap CRM", "free tools", "small business"],
    target: ["enterprise marketing", "B2B analytics", "revenue operations"]
  }
};

export function AIAssistantSheet({ open, onClose }: AIAssistantSheetProps) {
  const [prompt, setPrompt] = useState("");

  const handleSendPrompt = () => {
    if (!prompt.trim()) return;
    // In a real app, this would send to AI service
    // TODO: Implement actual AI integration
    setPrompt("");
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[480px] sm:w-[540px]">
        <SheetHeader className="border-b pb-4 mb-6">
          <SheetTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-600" />
            AI Assistant
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full space-y-6 overflow-auto">
          {/* Prompt Input */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask about your GTM performance..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendPrompt()}
                  className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button size="sm" onClick={handleSendPrompt} disabled={!prompt.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm" onClick={() => setPrompt("What are my top conversion bottlenecks?")}>
                  Bottlenecks
                </Button>
                <Button variant="outline" size="sm" onClick={() => setPrompt("Which channels have the best ROI?")}>
                  ROI Analysis
                </Button>
                <Button variant="outline" size="sm" onClick={() => setPrompt("How can I improve my sales velocity?")}>
                  Velocity Tips
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Summary Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="h-4 w-4" />
                Top Movers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockSummary.topMovers.map((mover, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium">{mover.metric}</span>
                  <Badge variant={mover.trend === "up" ? "default" : "destructive"}>
                    {mover.change}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recommendations Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Lightbulb className="h-4 w-4" />
                Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockSummary.recommendations.map((rec, index) => (
                <div key={index} className="p-3 border rounded-lg space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className="text-sm font-medium">{rec.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      ICE: {rec.ice}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">{rec.stage}</Badge>
                    <Badge variant="outline" className="text-xs">Impact: {rec.impact}</Badge>
                    <Badge variant="outline" className="text-xs">Effort: {rec.effort}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Keywords vs ICP Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Target className="h-4 w-4" />
                Keywords vs ICP Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-green-600 mb-2">✅ Working Keywords</h4>
                <div className="flex flex-wrap gap-1">
                  {mockSummary.keywordInsights.working.map((keyword, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium text-red-600 mb-2">❌ ICP Mismatch</h4>
                <div className="flex flex-wrap gap-1">
                  {mockSummary.keywordInsights.mismatch.map((keyword, index) => (
                    <Badge key={index} variant="destructive" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium text-blue-600 mb-2">🎯 Target Opportunities</h4>
                <div className="flex flex-wrap gap-1">
                  {mockSummary.keywordInsights.target.map((keyword, index) => (
                    <Badge key={index} variant="default" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Evidence Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-4 w-4" />
                Evidence & Sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                <p>Analysis based on:</p>
                <ul className="mt-2 space-y-1">
                  <li>• 156K website sessions (last 30 days)</li>
                  <li>• 12.3K CRM contacts and 450 opportunities</li>
                  <li>• 45K email interactions</li>
                  <li>• 8.9K paid ad clicks and conversions</li>
                </ul>
                <p className="mt-3 text-xs">
                  Last updated: 5 minutes ago • Confidence: 85%
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
}
