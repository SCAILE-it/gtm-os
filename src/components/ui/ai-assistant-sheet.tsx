"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bot, Send, X, TrendingUp, Lightbulb, Target, FileText } from "lucide-react";

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

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function AIAssistantSheet({ open, onClose }: AIAssistantSheetProps) {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock AI responses for different prompts
  const mockResponses: Record<string, string> = {
    "What are my top conversion bottlenecks?": `Based on your GTM data, I've identified 3 critical bottlenecks:

**1. First Touch → Qualified (23% conversion)**
- 77% of visitors don't convert to qualified leads
- Main issue: Landing page messaging mismatch for paid traffic
- Recommendation: A/B test value prop alignment

**2. Qualified → Opportunity (22.5% conversion)**
- Long qualification time (5.8 days average)
- Issue: Manual lead scoring delays
- Recommendation: Implement automated BANT scoring

**3. Demo No-Shows (34% rate)**
- High scheduling but poor attendance
- Issue: Long gap between booking and demo
- Recommendation: Same-day demo booking options

**Quick wins:**
• Fix paid ads landing page copy (Est. +15% qualified conversion)
• Add calendar integration for instant demos (Est. -50% no-shows)
• Automate lead scoring workflow (Est. -60% qualification time)`,

    "Which channels have the best ROI?": `Here's your channel ROI analysis for the last 30 days:

**🥇 Top Performers:**
1. **Organic Search**: 312% ROI
   - Cost: €3,200 | Revenue: €13,200
   - Best converting keywords: "marketing automation", "B2B analytics"
   
2. **Email Marketing**: 287% ROI  
   - Cost: €1,800 | Revenue: €6,970
   - Nurture sequences driving 67% of conversions

3. **Direct Traffic**: 245% ROI
   - Mostly referrals and word-of-mouth
   - Highest quality leads (89% ICP match)

**⚠️ Underperformers:**
4. **Paid Ads**: 89% ROI (Below target)
   - High CPC for competitive keywords
   - Landing page conversion issues
   
5. **Social Media**: 67% ROI
   - Good for awareness, poor for conversion
   - Long sales cycles (45+ days)

**Recommendations:**
• Double down on SEO content for high-ROI keywords
• Pause underperforming paid campaigns
• Optimize social for top-funnel awareness only`,

    "How can I improve my sales velocity?": `Your current sales velocity analysis shows opportunities to accelerate deals:

**Current Metrics:**
• Average cycle: 32 days (industry avg: 45 days) ✅
• Velocity score: 68/100 (room for improvement)

**Velocity Killers:**
1. **Qualification Stage** (5.8 days avg)
   - Too much back-and-forth on BANT
   - Solution: Qualification checklist + scoring

2. **Decision Maker Alignment** (8.2 days avg)  
   - Multiple stakeholder meetings
   - Solution: Champion identification early

3. **Proposal Review** (6.1 days avg)
   - Custom proposals taking too long
   - Solution: Template library + quick customization

**Quick Acceleration Tactics:**
🚀 **Same-day demos** → -40% qualification time
🚀 **Mutual close plans** → -25% decision time  
🚀 **Proposal templates** → -50% proposal time
🚀 **Economic buyer early** → -30% overall cycle

**Expected Impact:**
Implementing all recommendations could reduce your sales cycle to **18-22 days** (44% improvement) and increase win rate by 12%`
  };

  const handleSendPrompt = async () => {
    if (!prompt.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: prompt,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setPrompt("");
    setIsLoading(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      const response = mockResponses[prompt] || `I understand you're asking about "${prompt}". 

Based on your current GTM performance:
• First Touch: 2,847 contacts (+12.3%)
• Qualified: 654 leads (23% conversion)
• Opportunities: 147 active deals
• Closed: 50 won deals (34% win rate)

Let me analyze this further and provide specific recommendations. Would you like me to dive deeper into any particular area?`;

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleTemplateClick = (templatePrompt: string) => {
    setPrompt(templatePrompt);
    // Auto-send the template prompt
    setTimeout(() => handleSendPrompt(), 100);
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

        <div className="flex flex-col h-full">
          {/* Chat Messages */}
          <div className="flex-1 overflow-auto space-y-4 mb-4">
            {messages.length === 0 ? (
              <div className="text-center py-8">
                <Bot className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg mb-2">GTM AI Assistant</h3>
                <p className="text-muted-foreground mb-4">
                  Ask me anything about your go-to-market performance, conversion bottlenecks, or growth opportunities.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Button variant="outline" size="sm" onClick={() => handleTemplateClick("What are my top conversion bottlenecks?")}>
                    🔍 Bottlenecks
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleTemplateClick("Which channels have the best ROI?")}>
                    💰 ROI Analysis
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleTemplateClick("How can I improve my sales velocity?")}>
                    🚀 Velocity Tips
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-muted'
                    }`}>
                      <div className="text-sm">
                        {message.content.split('\n').map((line, index) => {
                          // Handle bold text
                          if (line.includes('**')) {
                            const parts = line.split(/(\*\*[^*]+\*\*)/g);
                            return (
                              <div key={index} className="mb-2">
                                {parts.map((part, partIndex) => 
                                  part.startsWith('**') && part.endsWith('**') ? (
                                    <strong key={partIndex}>{part.slice(2, -2)}</strong>
                                  ) : (
                                    <span key={partIndex}>{part}</span>
                                  )
                                )}
                              </div>
                            );
                          }
                          // Handle bullet points
                          if (line.startsWith('• ') || line.startsWith('- ')) {
                            return (
                              <div key={index} className="ml-4 mb-1 flex items-start gap-2">
                                <span className="text-blue-500 mt-1">•</span>
                                <span>{line.slice(2)}</span>
                              </div>
                            );
                          }
                          // Handle numbered lists
                          if (line.match(/^\d+\./)) {
                            return (
                              <div key={index} className="ml-4 mb-2 flex items-start gap-2">
                                <span className="font-medium text-blue-500">{line.match(/^\d+\./)?.[0]}</span>
                                <span>{line.replace(/^\d+\.\s*/, '')}</span>
                              </div>
                            );
                          }
                          // Handle section headers (lines with emojis or all caps)
                          if (line.includes('🥇') || line.includes('⚠️') || line.includes('🚀') || line.match(/^[A-Z\s]+:$/)) {
                            return (
                              <div key={index} className="font-semibold text-gray-800 mt-3 mb-2 text-base">
                                {line}
                              </div>
                            );
                          }
                          // Regular lines
                          if (line.trim()) {
                            return (
                              <div key={index} className="mb-2">
                                {line}
                              </div>
                            );
                          }
                          return <div key={index} className="mb-1"></div>;
                        })}
                      </div>
                      <div className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-muted-foreground'
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                        <span className="text-sm text-muted-foreground">AI is analyzing your data...</span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t pt-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask about your GTM performance..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendPrompt()}
                disabled={isLoading}
                className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              />
              <Button size="sm" onClick={handleSendPrompt} disabled={!prompt.trim() || isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            {messages.length > 0 && (
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm" onClick={() => handleTemplateClick("What are my top conversion bottlenecks?")}>
                  Bottlenecks
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleTemplateClick("Which channels have the best ROI?")}>
                  ROI Analysis  
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleTemplateClick("How can I improve my sales velocity?")}>
                  Velocity
                </Button>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
