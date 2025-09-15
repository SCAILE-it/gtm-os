"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bot, 
  Send, 
  Loader2, 
  Sparkles, 
  TrendingUp, 
  BarChart3, 
  Search, 
  Database,
  MessageSquare,
  Lightbulb,
  Target,
  Users,
  Play,
  CheckCircle,
  AlertCircle,
  Copy,
  Code,
  BarChart,
  LineChart,
  PieChart,
  ChevronRight
} from "lucide-react";
import Image from "next/image";
import { SourceLogo } from "@/components/ui/source-logo";
import { InlineChart } from "@/components/charts/inline-chart";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: "user" | "agent";
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  sources?: DataSource[];
  codeBlocks?: CodeBlock[];
  charts?: ChartData[];
}

interface DataSource {
  id: string;
  name: string;
  icon: string;
  type: "database" | "api" | "file";
}

interface CodeBlock {
  id: string;
  language: "sql" | "python";
  code: string;
  output?: string;
  status: "running" | "completed" | "error";
}

interface ChartData {
  id: string;
  type: "line" | "bar" | "pie";
  title: string;
  data: Array<Record<string, any>>;
}

interface TaskProgress {
  id: string;
  name: string;
  status: "pending" | "running" | "completed" | "error";
  progress: number;
  details?: string;
}

interface AgenticInterfaceProps {
  className?: string;
  onSaveToWorkspace?: (item: {
    id: string;
    type: "chart" | "spreadsheet" | "table";
    title: string;
    timestamp: Date;
    data?: any;
  }) => void;
}

export function AgenticInterface({ className, onSaveToWorkspace }: AgenticInterfaceProps) {
  // TODO: Replace with API call to /api/chat/history
  // Should load previous conversation or generate welcome message from current data
  // Expected response: Message[]
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "agent",
      content: "**Daily Brief**\n\nRevenue $142.5K (+12.3%) • CAC $85 (-8.2%) • Conv 3.2% (+0.5%) • Users 2.1K (+15.7%)\n\nEmail 45% revenue (+23% performance) → Scale +$30K/month\nMobile conv -12% → Fix saves $60K/month\nSocial ROAS +40% → Double budget\nCustomer LTV up 8% → Retention improving\nPaid ads CPC down 15% → Efficiency gains\n\nTop priority: Mobile conversion fix"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const [currentTasks, setCurrentTasks] = useState<TaskProgress[]>([]);
  const [promptQueue, setPromptQueue] = useState<string[]>([]);
  const [processingQueue, setProcessingQueue] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // TODO: Replace with API call to /api/suggestions
  // Should return contextual questions based on current data and user behavior
  // Expected response: { icon, text, category }[]
  const suggestedQuestions = [
    {
      icon: TrendingUp,
      text: "What's driving the revenue increase?",
      category: "Performance"
    },
    {
      icon: BarChart3,
      text: "Create a conversion funnel chart",
      category: "Visualization"
    },
    {
      icon: Target,
      text: "How can I improve mobile conversion?",
      category: "Optimization"
    },
    {
      icon: Users,
      text: "Show customer segment analysis",
      category: "Insights"
    },
    {
      icon: Database,
      text: "Run SQL query on user behavior",
      category: "Data"
    },
    {
      icon: LineChart,
      text: "Generate revenue trend chart",
      category: "Visualization"
    },
    {
      icon: PieChart,
      text: "Create channel breakdown chart",
      category: "Visualization"
    },
    {
      icon: Search,
      text: "Find patterns in historical data",
      category: "Research"
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAgentResponse = async (userMessage: string) => {
    setIsLoading(true);
    setOverallProgress(0);

    // Determine tasks based on user message
    const isComplexQuery = userMessage.toLowerCase().includes('analysis') || 
                          userMessage.toLowerCase().includes('report') || 
                          userMessage.toLowerCase().includes('funnel') ||
                          userMessage.toLowerCase().includes('segments');

    let tasks: TaskProgress[] = [];

    if (isComplexQuery) {
      // Complex multi-step analysis
      tasks = [
        { id: "1", name: "Parse Query", status: "pending", progress: 0, details: "Understanding your request..." },
        { id: "2", name: "Data Retrieval", status: "pending", progress: 0, details: "Connecting to data sources..." },
        { id: "3", name: "SQL Query", status: "pending", progress: 0, details: "Running database queries..." },
        { id: "4", name: "Statistical Analysis", status: "pending", progress: 0, details: "Computing metrics and trends..." },
        { id: "5", name: "Generate Insights", status: "pending", progress: 0, details: "Analyzing patterns and correlations..." },
        { id: "6", name: "Format Response", status: "pending", progress: 0, details: "Preparing your report..." }
      ];
    } else {
      // Simple query
      tasks = [
        { id: "1", name: "Analyze Question", status: "pending", progress: 0, details: "Processing your question..." },
        { id: "2", name: "Fetch Data", status: "pending", progress: 0, details: "Retrieving relevant information..." },
        { id: "3", name: "Generate Response", status: "pending", progress: 0, details: "Preparing answer..." }
      ];
    }

    setCurrentTasks(tasks);

    // Execute tasks sequentially
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      
      // Start task
      setCurrentTasks(prev => prev.map(t => 
        t.id === task.id 
          ? { ...t, status: "running", progress: 0 }
          : t
      ));

      // Simulate task progress
      for (let progress = 0; progress <= 100; progress += 20) {
        await new Promise(resolve => setTimeout(resolve, 150));
        
        setCurrentTasks(prev => prev.map(t => 
          t.id === task.id 
            ? { ...t, progress }
            : t
        ));
      }

      // Complete task
      setCurrentTasks(prev => prev.map(t => 
        t.id === task.id 
          ? { ...t, status: "completed", progress: 100 }
          : t
      ));

      // Update overall progress
      const overallProgressValue = ((i + 1) / tasks.length) * 100;
      setOverallProgress(overallProgressValue);
    }

    // TODO: Replace with API call to /api/chat/completions
    // Should send user message and receive structured response with sources, code, charts
    // Expected response: { content, sources?, codeBlocks?, charts?, finalContent }
    const responseTemplates = [
      {
        content: "I'll analyze your revenue drivers by querying our data sources:",
        sources: [
          { id: "ga4", name: "Google Analytics", icon: "Google Analytics", type: "api" as const },
          { id: "hubspot", name: "HubSpot", icon: "HubSpot", type: "api" as const },
          { id: "stripe", name: "Stripe", icon: "Stripe", type: "api" as const }
        ],
        codeBlocks: [
          {
            id: "sql1",
            language: "sql" as const,
            code: `SELECT 
  channel,
  SUM(revenue) as total_revenue,
  COUNT(DISTINCT user_id) as users,
  AVG(conversion_rate) as avg_conversion
FROM marketing_data 
WHERE date >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY channel
ORDER BY total_revenue DESC;`,
            output: "✓ Found 4 channels, $142.5K total revenue\n📧 Email: $64.1K (45% share) - TOP PERFORMER\n📱 Social: $42.8K (30% share) - HIGH ROI\n🌐 Organic: $21.4K (15% share) - STABLE\n💰 Paid: $14.2K (10% share) - UNDERPERFORMING",
            status: "completed" as const
          }
        ],
        charts: [
          {
            id: "revenue1",
            type: "pie",
            title: "Revenue by Channel",
            data: [
              { name: "Email", value: 64100, percentage: 45 },
              { name: "Social", value: 42800, percentage: 30 },
              { name: "Organic", value: 21400, percentage: 15 },
              { name: "Paid", value: 14200, percentage: 10 }
            ]
          }
        ],
        finalContent: "Based on my analysis:\n\n📈 **Key Insight**: Email campaigns are driving 45% of your revenue ($64.1K) with 23% growth - this is your golden channel.\n\n⚠️ **Action Required**: Mobile conversion dropped 12% this week, potentially costing you $8-12K in lost revenue.\n\n💡 **Opportunity**: Social media shows 40% higher ROAS than average - scaling this could add $15-20K monthly.\n\n**Recommended Actions:**\n1. Double down on successful email campaigns\n2. Urgent mobile UX audit needed\n3. Increase social media budget by 25%\n\nWould you like me to create a detailed action plan?"
      },
      {
        content: "Let me create a conversion funnel visualization:",
        sources: [
          { id: "mixpanel", name: "Mixpanel", icon: "Mixpanel", type: "api" as const },
          { id: "ga4", name: "Google Analytics", icon: "Google Analytics", type: "api" as const }
        ],
        codeBlocks: [
          {
            id: "python1",
            language: "python" as const,
            code: `import pandas as pd
import matplotlib.pyplot as plt

# Fetch funnel data
funnel_data = {
    'stage': ['Visitors', 'Leads', 'Customers'],
    'count': [10200, 3200, 102],
    'conversion': [100, 31.4, 3.2]
}

df = pd.DataFrame(funnel_data)
print(df)`,
            output: "   stage    count  conversion  drop_off\n0  Visitors  10200      100.0%     -\n1  Leads      3200       31.4%    68.6%\n2  Customers   102        3.2%    96.8%\n\n💡 INSIGHT: Biggest drop is visitor→lead (68.6% loss)\n⚠️  CONCERN: Lead→customer conversion only 3.2%\n🎯 FOCUS: Optimize lead nurturing process",
            status: "completed" as const
          }
        ],
        charts: [
          {
            id: "funnel1",
            type: "bar",
            title: "Conversion Funnel",
            data: [
              { stage: "Visitors", count: 10200, percentage: 100 },
              { stage: "Leads", count: 3200, percentage: 31.4 },
              { stage: "Customers", count: 102, percentage: 3.2 }
            ]
          }
        ],
        finalContent: "Here's your conversion funnel analysis:\n\n📊 **Funnel Health**: You're losing 68.6% of visitors before they become leads - this is your biggest leak.\n\n💰 **Revenue Impact**: If you improve visitor→lead conversion by just 5%, you'd gain ~500 more leads monthly.\n\n🎯 **Critical Issue**: Only 3.2% of leads convert to customers. Industry benchmark is 5-8%.\n\n**Immediate Actions:**\n1. A/B test your lead magnets (could gain 200+ leads)\n2. Audit lead nurturing emails (potential 2x conversion)\n3. Review mobile experience (12% conversion gap)\n\nShould I create a conversion optimization roadmap?"
      }
    ];

    const randomTemplate = responseTemplates[Math.floor(Math.random() * responseTemplates.length)];
    
    const messageId = Date.now().toString();
    setMessages(prev => [...prev, {
      id: messageId,
      type: "agent",
      content: randomTemplate.content,
      sources: randomTemplate.sources,
      codeBlocks: randomTemplate.codeBlocks,
      charts: randomTemplate.charts,
      timestamp: new Date(),
    }]);

    // Simulate code execution and final response
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, content: randomTemplate.finalContent }
          : msg
      ));
    }, 3000);

    setIsLoading(false);
    setOverallProgress(0);
    setCurrentTasks([]);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      type: "user" as const,
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    
    // Simple direct processing - no queue for now
    await simulateAgentResponse(userMessage.content);
  };

  const handleSuggestedQuestion = async (question: string) => {
    if (isLoading) return;
    
    const userMessage = {
      id: Date.now().toString(),
      type: "user" as const,
      content: question,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    await simulateAgentResponse(question);
  };

  return (
    <div className={cn("flex flex-col h-full bg-background", className)}>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                message.type === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.type === "agent" && (
                <Avatar className="h-8 w-8 bg-primary/10">
                  <AvatarFallback className="bg-primary/10">
                    <Image 
                      src="/scaile-logo.svg" 
                      alt="SCAILE AI" 
                      width={16} 
                      height={16}
                      className="h-4 w-4"
                    />
                  </AvatarFallback>
                </Avatar>
              )}
              
                     <div className={cn(
                       "w-full max-w-[85%] transition-all duration-200",
                       message.type === "user" 
                         ? "bg-gray-50/80 dark:bg-[#223248]/30 text-gray-900 dark:text-gray-100 ml-auto rounded-lg px-3 py-2" 
                         : "bg-gray-50/50 dark:bg-[#223248]/20 border-0 rounded-lg px-3 py-2"
                     )}>
                <div className="space-y-3">
                  <div 
                    className="text-xs leading-relaxed prose prose-xs dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: message.content
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\n/g, '<br>')
                        .replace(/• /g, '• ')
                    }}
                  />

                  {/* Data Sources - Just logos */}
                  {message.sources && message.sources.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Sources:</span>
                      {message.sources.map((source) => (
                        <div 
                          key={source.id} 
                          className="w-6 h-6 bg-background border border-border rounded flex items-center justify-center p-1"
                          title={source.name}
                        >
                          <SourceLogo source={source.icon} className="w-4 h-4" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Code Blocks - Output visible, code collapsible */}
                  {message.codeBlocks && message.codeBlocks.map((codeBlock) => (
                    <div key={codeBlock.id} className="space-y-2">
                      {/* Output - Always visible */}
                      {codeBlock.output && (
                        <div className="bg-gray-50/70 dark:bg-[#223248]/30 border border-gray-200/50 dark:border-gray-700/50 rounded-md p-3 relative group">
                          <div className="flex items-center gap-2 mb-1">
                            <Play className="h-3 w-3 text-gray-600 dark:text-gray-400" />
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Result</span>
                            {codeBlock.status === "completed" && (
                              <CheckCircle className="h-3 w-3 text-gray-600 dark:text-gray-400" />
                            )}
                            {onSaveToWorkspace && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-xs h-5 px-1 ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => onSaveToWorkspace({
                                  id: `table-${codeBlock.id}-${Date.now()}`,
                                  type: "table",
                                  title: `${codeBlock.language.toUpperCase()} Result`,
                                  timestamp: new Date(),
                                  data: { output: codeBlock.output, code: codeBlock.code }
                                })}
                              >
                                Save
                              </Button>
                            )}
                          </div>
                          <pre className="text-xs font-mono whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                            {codeBlock.output}
                          </pre>
                        </div>
                      )}

                      {/* Code - Collapsible */}
                      <details className="group">
                        <summary className="flex items-center justify-between cursor-pointer p-2 bg-muted/50 rounded-md hover:bg-muted/70 transition-colors">
                          <div className="flex items-center gap-2">
                            <Code className="h-3 w-3" />
                            <span className="text-xs font-medium uppercase">{codeBlock.language}</span>
                            <span className="text-xs text-muted-foreground">View code</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Copy className="h-3 w-3" />
                            </Button>
                            <ChevronRight className="h-3 w-3 group-open:rotate-90 transition-transform" />
                          </div>
                        </summary>
                        
                        <div className="mt-2">
                          <div className="bg-muted/80 rounded-md p-3 font-mono text-xs overflow-x-auto">
                            <pre className="whitespace-pre-wrap">{codeBlock.code}</pre>
                          </div>
                        </div>
                      </details>
                    </div>
                  ))}

                  {/* Generated Charts - Clean & Clickable */}
                  {message.charts && message.charts.map((chart) => (
                    <div key={chart.id} className="my-4">
                             <div 
                               className="bg-gray-50/60 dark:bg-gray-800/25 rounded p-2 cursor-pointer hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors border border-gray-200/60 dark:border-gray-700/40 relative group"
                        onClick={() => {
                          // TODO: Open chart in detailed view
                          console.log('Chart clicked:', chart.title);
                        }}
                      >
                        {onSaveToWorkspace && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-1 right-1 text-xs h-5 px-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSaveToWorkspace({
                                id: `chart-${chart.id}-${Date.now()}`,
                                type: "chart",
                                title: chart.title,
                                timestamp: new Date(),
                                data: chart
                              });
                            }}
                          >
                            Save
                          </Button>
                        )}
                        <div className="w-full h-32 overflow-hidden">
                          <InlineChart chart={chart} />
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className={cn(
                    "text-xs mt-3 opacity-70 flex items-center gap-1",
                    message.type === "user" ? "text-primary-foreground justify-end" : "text-muted-foreground"
                  )}>
                    {message.type === "agent" && (
                      <Sparkles className="h-3 w-3 animate-pulse" />
                    )}
                    {message.timestamp?.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    }) || 'Now'}
                  </div>
                </div>
              </div>

              {message.type === "user" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {/* Loading indicator with multi-task progress */}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <Avatar className="h-8 w-8 bg-primary/10">
                <AvatarFallback className="bg-primary/10">
                  <Image 
                    src="/scaile-logo.svg" 
                    alt="SCAILE AI" 
                    width={16} 
                    height={16}
                    className="h-4 w-4"
                  />
                </AvatarFallback>
              </Avatar>
              <Card className="bg-muted max-w-[80%] min-w-[300px]">
                <CardContent className="p-3">
                  <div className="space-y-3">
                    {/* Overall Progress */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Overall Progress</span>
                        <span className="text-xs text-muted-foreground">
                          {Math.round(overallProgress)}%
                        </span>
                      </div>
                      <Progress value={overallProgress} className="h-2" />
                    </div>

                    {/* Individual Tasks */}
                    <div className="space-y-2">
                      {currentTasks.map((task) => (
                        <div key={task.id} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {task.status === "running" && (
                                <Loader2 className="h-3 w-3 animate-spin text-primary" />
                              )}
                              {task.status === "completed" && (
                                <div className="h-3 w-3 rounded-full bg-green-500 flex items-center justify-center">
                                  <div className="h-1.5 w-1.5 rounded-full bg-white" />
                                </div>
                              )}
                              {task.status === "pending" && (
                                <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />
                              )}
                              <span className={cn(
                                "text-xs",
                                task.status === "completed" ? "text-muted-foreground line-through" : "text-foreground"
                              )}>
                                {task.name}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {task.progress}%
                            </span>
                          </div>
                          
                          {task.status === "running" && (
                            <div className="ml-5">
                              <Progress value={task.progress} className="h-1" />
                              <p className="text-xs text-muted-foreground mt-1">
                                {task.details}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Suggested Questions - Always show, but adapt size */}
      {!isLoading && (
        <div className={cn(
          "border-t border-border",
          messages.length <= 1 ? "p-4" : "p-2"
        )}>
          {messages.length <= 1 && (
            <div className="mb-3">
              <p className="text-sm text-muted-foreground">
                Ask me anything about your GTM performance:
              </p>
            </div>
          )}
          
          <div className={cn(
            "grid gap-1",
            messages.length <= 1 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2" 
              : "grid-cols-2 lg:grid-cols-4 gap-1"
          )}>
            {(messages.length <= 1 ? suggestedQuestions.slice(0, 3) : suggestedQuestions.slice(0, 2)).map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                       className={cn(
                         "justify-start text-left h-auto text-xs hover:bg-gray-50/80 dark:hover:bg-gray-800/30 hover:border-gray-300/50 dark:hover:border-gray-600/50 transition-all duration-200 group w-full",
                         messages.length <= 1 ? "p-3" : "p-2"
                       )}
                onClick={() => handleSuggestedQuestion(question.text)}
              >
                <question.icon className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" />
                <div className="flex-1 min-w-0 overflow-hidden">
                  <div className={cn(
                    "font-medium leading-tight text-wrap hyphens-auto",
                    messages.length <= 1 ? "" : "text-xs"
                  )}>
                    {question.text}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      )}


      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask me anything about your GTM performance..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 placeholder:text-muted-foreground/60"
              disabled={isLoading}
            />
          </div>
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputValue.trim() || isLoading}
            size="default"
            className="px-3 py-2 bg-primary hover:bg-primary/90 transition-colors"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-center mt-3 text-xs text-muted-foreground">
          <span>
            Powered by{" "}
            <span className="font-medium text-primary">SCAILE</span>
            {" "}using{" "}
            <span className="font-medium">Gemini 2.5 Pro</span>
            {" "}and{" "}
            <span className="font-medium">Google ADK</span>
            {" • "}
            <button 
              className="underline hover:text-foreground transition-colors"
              onClick={() => window.open('/privacy', '_blank')}
            >
              Learn more about data privacy
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
