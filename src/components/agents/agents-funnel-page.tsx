"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Bot,
  Play,
  Settings,
  Search,
  PenTool,
  Target,
  BarChart3,
  Globe,
  Mail,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
  Zap,
  Database,
  ArrowRight
} from "lucide-react";

// Import the complete agents data
import { agents, categoryConfig, getStatusColor } from "./complete-agents-data";

export function AgentsFunnelPage() {
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const [agentInputs, setAgentInputs] = useState<Record<string, string>>({});
  const [savedConfigs, setSavedConfigs] = useState<Record<string, Record<string, string>>>({
    // Example saved configurations from previous runs (deployed = configured)
    "seo-keyword-analyzer": {
      "website_url": "https://yourcompany.com",
      "target_keywords": "B2B SaaS\nCRM software\nSales automation",
      "analysis_depth": "Standard (500 keywords)"
    },
    "seo-blog-writer": {
      "blog_topic": "How to reduce customer churn in B2B SaaS",
      "primary_keyword": "customer churn reduction",
      "target_audience": "VP/Directors",
      "word_count": "2000-3000 words",
      "content_style": "Educational How-to"
    },
    "outbound-lead-finder": {
      "company_size": "51-200 employees",
      "job_titles": "VP of Sales\nSales Director\nRevenue Operations Manager",
      "industries": "B2B SaaS\nFinTech\nMarTech",
      "lead_count": "500 leads"
    },
    "outbound-message-writer": {
      "prospect_profile": "VP Sales at 50-200 person B2B SaaS companies\nPain: Manual sales processes",
      "value_proposition": "Help sales teams close 30% more deals through automation",
      "sequence_length": "5-email sequence",
      "personalization_level": "Advanced (+Industry, Recent News)"
    }
  });
  const [isRunning, setIsRunning] = useState<Record<string, boolean>>({});
  const [agentProgress, setAgentProgress] = useState<Record<string, number>>({
    "blog-writer-agent": 34, // Writing blog post
    "linkedin-signal-analyzer": 56, // Analyzing signals
    "lead-nurture-sequencer": 78, // Optimizing sequences
    "meeting-notes-analyzer": 67, // Analyzing sales calls
    "deal-risk-analyzer": 45 // Analyzing deal risks
  });
  const [completedAgents, setCompletedAgents] = useState<Record<string, { timestamp: Date; results: string }>>({});

  const getAgentResults = (agent: any) => {
    const resultTemplates = {
      "inbound-clicks-optimizer": "Identified 3 quick wins: Improve meta descriptions (+180 clicks), Fix page speed (+120 clicks), Add internal links (+100 clicks)",
      "linkedin-impressions-booster": "Optimized posting schedule for 2x engagement. Best times: Tue 9AM, Thu 2PM, Fri 10AM. Suggested 5 new hashtag combinations.",
      "seo-content-optimizer": "Found 12 pages with ranking opportunities. Top priorities: Update 'CRM comparison' page, add FAQ section, optimize images.",
      "win-rate-optimizer": "Analyzed 24 lost deals. Key insight: 67% lost in discovery phase. Recommended: Improve qualification questions, add stakeholder mapping.",
      "sales-cycle-accelerator": "Identified 3 bottlenecks: Proposal approval (avg 8 days), Technical evaluation (avg 6 days). Action plan created."
    };
    
    return resultTemplates[agent.id as keyof typeof resultTemplates] || `${agent.name} completed successfully with actionable recommendations.`;
  };

  const handleRunAgent = (agent: any) => {
    setIsRunning(prev => ({ ...prev, [agent.id]: true }));
    setAgentProgress(prev => ({ ...prev, [agent.id]: 0 }));
    
    // Simulate realistic agent execution with progress
    const steps = [
      "Initializing agent...",
      "Connecting to data sources...",
      "Processing input parameters...",
      "Executing workflow...",
      "Generating results...",
      "Finalizing output..."
    ];
    
    let currentStep = 0;
    const stepInterval = setInterval(() => {
      currentStep++;
      const progress = (currentStep / steps.length) * 100;
      setAgentProgress(prev => ({ ...prev, [agent.id]: progress }));
      console.log(`${agent.name}: ${steps[currentStep - 1]} (${Math.round(progress)}%)`);
      
      if (currentStep >= steps.length) {
        clearInterval(stepInterval);
        setTimeout(() => {
          setIsRunning(prev => ({ ...prev, [agent.id]: false }));
          setAgentProgress(prev => ({ ...prev, [agent.id]: 0 }));
          
          // Set completion state with results
          const results = getAgentResults(agent);
          setCompletedAgents(prev => ({
            ...prev,
            [agent.id]: { 
              timestamp: new Date(), 
              results 
            }
          }));
          
          // Save configuration for future use
          setSavedConfigs(prev => ({
            ...prev,
            [agent.id]: agentInputs
          }));
          
          setSelectedAgent(null);
          setAgentInputs({});
        }, 1000);
      }
    }, 800);
  };

  const deployedCount = agents.filter(a => a.status === "deployed").length;
  const runningCount = agents.filter(a => a.status === "running").length;
  const availableCount = agents.filter(a => a.status === "available").length;

  const attractAgents = agents.filter(a => a.category === "attract");
  const convertAgents = agents.filter(a => a.category === "convert");
  const closeAgents = agents.filter(a => a.category === "close");
  const supportAgents = agents.filter(a => a.category === "analytics" || a.category === "operations");

  const renderSmallAgentCard = (agent: any) => {
    const isAgentRunning = isRunning[agent.id];
    
    return (
      <Card 
        key={agent.id} 
        className="cursor-pointer hover:shadow-sm transition-all duration-200 border border-border/50 rounded-md !p-0"
        onClick={() => setSelectedAgent(agent)}
      >
        <CardContent className="!p-0 !m-0">
          <div className="px-2 py-2 flex items-center justify-between">
            <div className="flex items-center gap-1 flex-1">
              <agent.icon className="h-3 w-3 text-foreground" />
              <span className="text-xs font-medium text-foreground truncate">{agent.name}</span>
            </div>
            <div className="flex items-center gap-0.5">
              {agent.status === "running" && (
                <>
                  <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-blue-500">{agentProgress[agent.id] || 0}%</span>
                </>
              )}
              {agent.status === "deployed" && (
                <div className="w-1 h-1 bg-green-500 rounded-full"></div>
              )}
              {agent.status === "available" && (
                <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderAgentCard = (agent: any) => {
    const isAgentRunning = isRunning[agent.id];
    
    return (
      <Card key={agent.id} className="relative group hover:shadow-md transition-all duration-200 border-2 border-border/50 rounded-md">
        <CardContent className="p-4">
          {/* Agent Header with Status Indicator */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
                <agent.icon className="h-4 w-4 text-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground leading-tight">{agent.name}</h3>
                <div className="flex items-center gap-1 mt-0.5">
                  <div className={`w-2 h-2 rounded-full ${
                    agent.status === "running" ? "bg-blue-500 animate-pulse" :
                    agent.status === "deployed" ? "bg-green-500" :
                    "bg-muted-foreground"
                  }`}></div>
                  <span className="text-xs text-muted-foreground capitalize">{agent.status}</span>
                </div>
              </div>
            </div>
            
            {/* Quick Stats */}
            {agent.successRate && (
              <div className="text-right">
                <div className="text-xs font-medium text-foreground">{agent.successRate}%</div>
                <div className="text-xs text-muted-foreground">success</div>
              </div>
            )}
          </div>
          
          {/* Agent Description */}
          <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{agent.description}</p>
          
          {/* Progress Bar for Running Agents */}
          {(isAgentRunning || agent.status === "running") && (
            <div className="mb-4 p-2 border rounded">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-foreground">Processing...</span>
                <span className="text-xs font-bold text-foreground">{Math.round(agentProgress[agent.id] || 0)}%</span>
              </div>
              <Progress 
                value={agentProgress[agent.id] || 0} 
                className="h-2"
              />
            </div>
          )}
          
          {/* Success Results */}
          {completedAgents[agent.id] && (
            <div className="mb-4 p-3 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-foreground">Completed Successfully</span>
                <span className="text-xs text-muted-foreground ml-auto">
                  {completedAgents[agent.id].timestamp.toLocaleTimeString()}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {completedAgents[agent.id].results}
              </p>
              <Button
                size="sm"
                variant="ghost"
                className="mt-2 h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                onClick={() => setCompletedAgents(prev => {
                  const updated = { ...prev };
                  delete updated[agent.id];
                  return updated;
                })}
              >
                Dismiss
              </Button>
            </div>
          )}
          
          {/* Action Button */}
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              {agent.totalRuns ? `${agent.totalRuns} runs` : "Never run"}
            </div>
            
            {agent.status === "running" || isAgentRunning ? (
              <Button size="sm" disabled className="h-8 px-3 text-xs">
                <Clock className="h-3 w-3 mr-1.5" />
                Running
              </Button>
            ) : agent.status === "deployed" ? (
                        <Button 
                          size="sm" 
                          className="h-8 px-3 text-xs bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => {
                            // Load saved configuration if exists
                            if (savedConfigs[agent.id]) {
                              setAgentInputs(savedConfigs[agent.id]);
                            }
                            setSelectedAgent(agent);
                          }}
                        >
                          <Play className="h-3 w-3 mr-1.5" />
                          Activate
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="h-8 px-3 text-xs"
                          onClick={() => {
                            // Load saved configuration if exists
                            if (savedConfigs[agent.id]) {
                              setAgentInputs(savedConfigs[agent.id]);
                            }
                            setSelectedAgent(agent);
                          }}
                        >
                          <Settings className="h-3 w-3 mr-1.5" />
                          Edit
                        </Button>
                      )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-2 space-y-2 bg-background min-h-screen">
      {/* Status Summary - like dashboard filters */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm text-muted-foreground">{deployedCount} Deployed</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-muted-foreground">{runningCount} Running</span>
          </div>
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{availableCount} Available</span>
          </div>
        </div>
      </div>

      {/* Funnel Machine Layout - Horizontal like Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        
        {/* Attract Stage */}
        <div className="space-y-1">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <h2 className="text-sm font-bold text-foreground">Attract</h2>
              <ArrowRight className="h-4 w-4 text-muted-foreground hidden lg:block" />
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="text-lg font-bold text-foreground">{attractAgents.length}</div>
              <div className="px-1 py-0.5 rounded text-xs bg-muted text-muted-foreground" style={{ fontSize: '10px', padding: '1px 4px' }}>
                Agents
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Generate Traffic & Awareness</p>
          </div>
          
          {/* Clustered by Subcategory */}
          <div className="space-y-1">
            {["SEO/Content", "Paid Advertising", "Outbound Prospecting", "Social & Community"].map(subcategory => {
              const subcategoryAgents = attractAgents.filter(a => a.subcategory === subcategory);
              if (subcategoryAgents.length === 0) return null;
              
              return (
                <div key={subcategory}>
                  <div className="text-xs font-medium text-muted-foreground mb-0.5">{subcategory}</div>
                  <div className="space-y-0.5 mb-1">
                    {subcategoryAgents.map(renderSmallAgentCard)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Convert Stage */}
        <div className="space-y-1">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <h2 className="text-sm font-bold text-foreground">Convert</h2>
              <ArrowRight className="h-4 w-4 text-muted-foreground hidden lg:block" />
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="text-lg font-bold text-foreground">{convertAgents.length}</div>
              <div className="px-1 py-0.5 rounded text-xs bg-muted text-muted-foreground" style={{ fontSize: '10px', padding: '1px 4px' }}>
                Agents
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Turn Traffic into Leads</p>
          </div>
          
          {/* Clustered by Subcategory */}
          <div className="space-y-1">
            {["Lead Nurturing", "Conversion Optimization", "Lead Qualification"].map(subcategory => {
              const subcategoryAgents = convertAgents.filter(a => a.subcategory === subcategory);
              if (subcategoryAgents.length === 0) return null;
              
              return (
                <div key={subcategory}>
                  <div className="text-xs font-medium text-muted-foreground mb-0.5">{subcategory}</div>
                  <div className="space-y-0.5 mb-1">
                    {subcategoryAgents.map(renderSmallAgentCard)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Close Stage */}
        <div className="space-y-1">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <h2 className="text-sm font-bold text-foreground">Close</h2>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="text-lg font-bold text-foreground">{closeAgents.length}</div>
              <div className="px-1 py-0.5 rounded text-xs bg-muted text-muted-foreground" style={{ fontSize: '10px', padding: '1px 4px' }}>
                Agents
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Turn Leads into Customers</p>
          </div>
          
          {/* Clustered by Subcategory */}
          <div className="space-y-1">
            {["Sales Process", "Sales Intelligence"].map(subcategory => {
              const subcategoryAgents = closeAgents.filter(a => a.subcategory === subcategory);
              if (subcategoryAgents.length === 0) return null;
              
              return (
                <div key={subcategory}>
                  <div className="text-xs font-medium text-muted-foreground mb-0.5">{subcategory}</div>
                  <div className="space-y-0.5 mb-1">
                    {subcategoryAgents.map(renderSmallAgentCard)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Support Tools Below */}
      {supportAgents.length > 0 && (
        <div className="mt-4">
          <div className="text-center mb-2">
            <h3 className="text-sm font-bold text-foreground">Analytics & Operations</h3>
            <p className="text-xs text-muted-foreground">Analyze & Optimize Performance</p>
          </div>
          <div className="space-y-1">
            {supportAgents.map(renderSmallAgentCard)}
          </div>
        </div>
      )}

      {/* Configuration Dialog */}
      {selectedAgent && (
        <Dialog open={!!selectedAgent} onOpenChange={() => setSelectedAgent(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <selectedAgent.icon className="h-5 w-5" />
                Configure {selectedAgent.name}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
              <p className="text-sm text-muted-foreground">{selectedAgent.description}</p>
              
              {/* Group inputs by section */}
              {(() => {
                const sections = selectedAgent.inputs.reduce((acc: any, input: any) => {
                  const section = input.section || "Configuration";
                  if (!acc[section]) acc[section] = [];
                  acc[section].push(input);
                  return acc;
                }, {});
                
                return Object.entries(sections).map(([sectionName, sectionInputs]: [string, any]) => (
                  <div key={sectionName} className="space-y-3">
                    <div className="border-b pb-1">
                      <h4 className="text-sm font-semibold text-foreground">{sectionName}</h4>
                    </div>
                    <div className="space-y-3">
                      {sectionInputs.map((input: any) => (
                        <div key={input.name} className="space-y-2">
                          <Label htmlFor={input.name} className="text-sm font-medium">
                            {input.label}
                            {input.required && <span className="text-red-500 ml-1">*</span>}
                          </Label>
                          
                          {input.type === "text" && (
                            <Input
                              id={input.name}
                              placeholder={input.placeholder}
                              value={agentInputs[input.name] || ""}
                              onChange={(e) => setAgentInputs(prev => ({
                                ...prev,
                                [input.name]: e.target.value
                              }))}
                            />
                          )}
                          
                          {input.type === "textarea" && (
                            <Textarea
                              id={input.name}
                              placeholder={input.placeholder}
                              value={agentInputs[input.name] || ""}
                              onChange={(e) => setAgentInputs(prev => ({
                                ...prev,
                                [input.name]: e.target.value
                              }))}
                              rows={3}
                            />
                          )}
                          
                          {input.type === "select" && (
                            <Select
                              value={agentInputs[input.name] || ""}
                              onValueChange={(value) => setAgentInputs(prev => ({
                                ...prev,
                                [input.name]: value
                              }))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder={`Select ${input.label.toLowerCase()}`} />
                              </SelectTrigger>
                              <SelectContent>
                                {input.options?.map((option: string) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                          
                          {input.type === "multiselect" && (
                            <div className="space-y-2">
                              <div className="text-xs text-muted-foreground">Select multiple options:</div>
                              <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto border rounded-md p-2">
                                {input.options?.map((option: string) => {
                                  const currentValues = agentInputs[input.name] ? agentInputs[input.name].split(',') : [];
                                  const isSelected = currentValues.includes(option);
                                  
                                  return (
                                    <label key={option} className="flex items-center space-x-2 cursor-pointer">
                                      <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={(e) => {
                                          const currentValues = agentInputs[input.name] ? agentInputs[input.name].split(',') : [];
                                          let newValues;
                                          if (e.target.checked) {
                                            newValues = [...currentValues, option];
                                          } else {
                                            newValues = currentValues.filter((v: string) => v !== option);
                                          }
                                          setAgentInputs(prev => ({
                                            ...prev,
                                            [input.name]: newValues.join(',')
                                          }));
                                        }}
                                        className="rounded"
                                      />
                                      <span className="text-sm">{option}</span>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                          
                          {input.type === "number" && (
                            <Input
                              id={input.name}
                              type="number"
                              placeholder={input.placeholder}
                              value={agentInputs[input.name] || ""}
                              onChange={(e) => setAgentInputs(prev => ({
                                ...prev,
                                [input.name]: e.target.value
                              }))}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ));
              })()}
              
              <div className="flex items-center justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedAgent(null)}>
                  Cancel
                </Button>
                <Button 
                  onClick={() => handleRunAgent(selectedAgent)}
                  disabled={isRunning[selectedAgent.id]}
                >
                  <Zap className="h-3 w-3 mr-1" />
                  {isRunning[selectedAgent.id] ? "Starting..." : "Run Agent"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
