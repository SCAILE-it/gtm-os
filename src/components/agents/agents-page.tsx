"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Bot,
  Play,
  Square,
  Settings,
  Search,
  PenTool,
  Target,
  MessageSquare,
  BarChart3,
  Globe,
  Mail,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  Zap,
  Database
} from "lucide-react";

interface Agent {
  id: string;
  name: string;
  category: "attract" | "convert" | "close" | "analytics" | "operations";
  description: string;
  status: "deployed" | "available" | "running";
  icon: any;
  lastRun?: Date;
  totalRuns?: number;
  successRate?: number;
  inputs: {
    name: string;
    type: "text" | "textarea" | "select" | "number";
    label: string;
    placeholder?: string;
    options?: string[];
    required?: boolean;
  }[];
}

const agents: Agent[] = [
  // Attract Stage Agents (directly improve dashboard KPIs)
  {
    id: "inbound-clicks-optimizer",
    name: "Inbound Clicks Optimizer",
    category: "attract",
    description: "Boost your 3.1K clicks to hit 3.5K target - analyzes GA4 + Google Ads performance",
    status: "available",
    icon: TrendingUp,
    totalRuns: 12,
    successRate: 88,
    inputs: [
      { name: "current_performance", type: "text", label: "Current Clicks", placeholder: "3.1K (auto-filled from dashboard)", required: true },
      { name: "target_increase", type: "select", label: "Target Increase", options: ["Hit 3.5K target (+400 clicks)", "Exceed to 4K (+900 clicks)", "Conservative 3.3K (+200 clicks)"], required: true },
      { name: "focus_channels", type: "select", label: "Focus Channels", options: ["Optimize Organic (1.8K current)", "Boost Paid Ads (1.0K current)", "Improve SEO Content (0.3K current)", "All Channels"], required: true },
      { name: "timeline", type: "select", label: "Timeline", options: ["1 week", "2 weeks", "1 month"], required: true }
    ]
  },
  {
    id: "linkedin-impressions-booster",
    name: "LinkedIn Impressions Booster", 
    category: "attract",
    description: "Scale from 28.3K to 35K target - optimizes post timing and ad targeting",
    status: "deployed",
    icon: TrendingUp,
    lastRun: new Date(Date.now() - 3 * 60 * 60 * 1000),
    totalRuns: 34,
    successRate: 91,
    inputs: [
      { name: "current_split", type: "text", label: "Current Split", placeholder: "18.5K posts + 9.8K ads (auto-filled)", required: true },
      { name: "boost_strategy", type: "select", label: "Boost Strategy", options: ["Increase Posts to 25K (+6.5K)", "Increase Ads to 15K (+5.2K)", "Balanced Growth (+3K each)", "Focus on Best Performing"], required: true },
      { name: "content_types", type: "select", label: "Content Focus", options: ["Thought Leadership", "Industry News", "Company Updates", "Educational Content", "Mix of All"] },
      { name: "budget_increase", type: "select", label: "Ad Budget Increase", options: ["$500/month", "$1000/month", "$2000/month", "No increase - optimize current"] }
    ]
  },

  // Convert Stage Agents
  {
    id: "lead-conversion-optimizer",
    name: "Lead Conversion Optimizer",
    category: "convert", 
    description: "Improve 0.3K registered leads and 89 qualified leads conversion rates",
    status: "available",
    icon: Users,
    totalRuns: 18,
    successRate: 85,
    inputs: [
      { name: "conversion_focus", type: "select", label: "Focus Area", options: ["Forms (0.18K) - improve conversion", "Surveys (67) - increase completion", "Demos (40) - boost booking rate", "All touchpoints"], required: true },
      { name: "current_funnel", type: "textarea", label: "Current Funnel Performance", placeholder: "Forms: 180 (63%)\nSurveys: 67 (23%)\nDemos: 40 (14%)", required: true },
      { name: "optimization_type", type: "select", label: "Optimization Type", options: ["A/B Test Landing Pages", "Improve Form Fields", "Better CTAs", "Email Follow-up Sequences", "All Above"], required: true }
    ]
  },
  {
    id: "reply-rate-improver",
    name: "Outbound Reply Rate Improver",
    category: "convert",
    description: "Boost 0.1K replies to hit 150 target - analyzes email vs LinkedIn performance",
    status: "deployed",
    icon: Mail,
    lastRun: new Date(Date.now() - 1 * 60 * 60 * 1000),
    totalRuns: 28,
    successRate: 79,
    inputs: [
      { name: "current_split", type: "text", label: "Current Performance", placeholder: "89 email + 35 LinkedIn = 124 total", required: true },
      { name: "improvement_focus", type: "select", label: "Improvement Focus", options: ["Email (89 replies) - subject lines", "LinkedIn (35 replies) - connection messages", "Both channels equally", "Switch budget to better performer"], required: true },
      { name: "test_variants", type: "select", label: "Test Variants", options: ["2 variants", "3 variants", "5 variants (advanced)"], required: true }
    ]
  },

  // Close Stage Agents  
  {
    id: "win-rate-optimizer",
    name: "Win Rate Optimizer",
    category: "close",
    description: "Improve 24.6% win rate to hit 30% target - analyzes lost deal patterns",
    status: "available", 
    icon: Target,
    totalRuns: 22,
    successRate: 92,
    inputs: [
      { name: "current_performance", type: "textarea", label: "Current Win Rate Breakdown", placeholder: "Enterprise: 12 deals (50%)\nSMB: 8 deals (33%)\nStartup: 4 deals (17%)", required: true },
      { name: "focus_segment", type: "select", label: "Focus Segment", options: ["Enterprise (highest volume)", "SMB (growth opportunity)", "Startup (emerging)", "All segments"], required: true },
      { name: "optimization_area", type: "select", label: "Optimization Focus", options: ["Discovery Phase (18 days)", "Proposal Phase (15 days)", "Negotiation Phase (9 days)", "Overall Process"], required: true },
      { name: "qualification_improvement", type: "select", label: "Qualification Focus", options: ["BANT (52 current)", "MEDDIC (37 current)", "Both frameworks", "Custom criteria"], required: true }
    ]
  },
  {
    id: "sales-cycle-accelerator", 
    name: "Sales Cycle Accelerator",
    category: "close",
    description: "Reduce 42-day cycle further - identifies bottlenecks in discovery/proposal phases",
    status: "deployed",
    icon: Clock,
    lastRun: new Date(Date.now() - 4 * 60 * 60 * 1000),
    totalRuns: 41,
    successRate: 87,
    inputs: [
      { name: "current_breakdown", type: "textarea", label: "Current Cycle Breakdown", placeholder: "Discovery: 18 days (43%)\nProposal: 15 days (36%)\nNegotiation: 9 days (21%)", required: true },
      { name: "target_reduction", type: "select", label: "Target Reduction", options: ["5 days (to 37 days)", "8 days (to 34 days)", "10 days (to 32 days)"], required: true },
      { name: "bottleneck_focus", type: "select", label: "Bottleneck Focus", options: ["Discovery Phase (18d)", "Proposal Phase (15d)", "Negotiation Phase (9d)", "Handoff Between Phases"], required: true }
    ]
  },

  // More Attract Stage Agents (SEO, Content, Paid)
  {
    id: "seo-content-optimizer",
    name: "SEO Content Optimizer",
    category: "attract",
    description: "Boost SEO content from 0.3K to 0.8K clicks - optimizes existing pages for better rankings",
    status: "deployed",
    icon: Search,
    lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000),
    totalRuns: 47,
    successRate: 94,
    inputs: [
      { name: "current_seo_performance", type: "text", label: "Current SEO Clicks", placeholder: "0.3K (10% of total)", required: true },
      { name: "target_keywords", type: "textarea", label: "Target Keywords", placeholder: "B2B SaaS\nCRM software\nSales automation", required: true },
      { name: "competitor_analysis", type: "select", label: "Competitor Analysis", options: ["Top 3 competitors", "Top 5 competitors", "Industry leaders", "Skip analysis"], required: true },
      { name: "content_audit", type: "select", label: "Content Audit Depth", options: ["Quick wins only", "Full content audit", "Technical SEO focus"], required: true }
    ]
  },
  {
    id: "google-ads-optimizer",
    name: "Google Ads Optimizer", 
    category: "attract",
    description: "Scale paid ads from 1.0K to 1.5K clicks - optimizes campaigns, keywords, and budgets",
    status: "available",
    icon: Target,
    totalRuns: 23,
    successRate: 89,
    inputs: [
      { name: "current_ad_performance", type: "text", label: "Current Ad Clicks", placeholder: "1.0K (32% of total)", required: true },
      { name: "budget_increase", type: "select", label: "Budget Strategy", options: ["Increase budget 25%", "Increase budget 50%", "Optimize current budget", "Reallocate from underperforming"], required: true },
      { name: "campaign_focus", type: "select", label: "Campaign Focus", options: ["Search campaigns", "Display campaigns", "YouTube campaigns", "Performance Max", "All campaign types"], required: true },
      { name: "keyword_strategy", type: "select", label: "Keyword Strategy", options: ["Expand high-performers", "Add long-tail keywords", "Competitor keywords", "Brand defense"], required: true }
    ]
  },
  {
    id: "content-marketing-engine",
    name: "Content Marketing Engine",
    category: "attract", 
    description: "Creates blog posts, whitepapers, case studies to boost organic traffic and thought leadership",
    status: "available",
    icon: PenTool,
    totalRuns: 31,
    successRate: 85,
    inputs: [
      { name: "content_goal", type: "select", label: "Content Goal", options: ["Boost organic clicks", "Generate more leads", "Thought leadership", "Product education"], required: true },
      { name: "content_type", type: "select", label: "Content Type", options: ["Blog posts (SEO-focused)", "Whitepapers (lead magnets)", "Case studies", "How-to guides", "Industry reports"], required: true },
      { name: "publishing_frequency", type: "select", label: "Publishing Frequency", options: ["1 per week", "2 per week", "1 per month (deep)", "Custom schedule"], required: true },
      { name: "distribution_channels", type: "select", label: "Distribution", options: ["Website + SEO only", "+ LinkedIn promotion", "+ Email newsletter", "+ All social channels"], required: true }
    ]
  },
  
  // Outbound Agents
  {
    id: "lead-crawler",
    name: "Apollo Lead Crawler",
    category: "outbound",
    description: "Finds 500+ qualified leads, enriches with contact data, exports to CRM",
    status: "running",
    icon: Users,
    lastRun: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    totalRuns: 89,
    successRate: 85,
    inputs: [
      { name: "company_size", type: "select", label: "Company Size", options: ["1-10 employees", "11-50 employees", "51-200 employees", "201-1000 employees", "1000+ employees"], required: true },
      { name: "industry", type: "textarea", label: "Industries", placeholder: "B2B SaaS\nFinTech\nMarTech\nHR Tech", required: true },
      { name: "job_titles", type: "textarea", label: "Target Job Titles", placeholder: "Chief Executive Officer\nVP of Sales\nSales Director\nRevenue Operations", required: true },
      { name: "location", type: "select", label: "Geographic Focus", options: ["United States", "North America", "Europe", "APAC", "Global"], required: true },
      { name: "lead_count", type: "select", label: "Lead Target", options: ["250 leads", "500 leads", "1000 leads", "2500 leads"] },
      { name: "technologies", type: "textarea", label: "Tech Stack (optional)", placeholder: "Salesforce\nHubSpot\nSlack\nZoom" }
    ]
  },
  {
    id: "message-drafter",
    name: "Personalized Sequence Creator",
    category: "outbound", 
    description: "Creates 5-7 email sequences with A/B variants, personalization tokens",
    status: "available",
    icon: Mail,
    totalRuns: 67,
    successRate: 76,
    inputs: [
      { name: "prospect_profile", type: "textarea", label: "Ideal Customer Profile", placeholder: "VP Sales at 50-200 person B2B SaaS companies\nPain: Manual sales processes\nGoal: Scale revenue efficiently", required: true },
      { name: "value_prop", type: "textarea", label: "Core Value Proposition", placeholder: "Help sales teams close 30% more deals through automation", required: true },
      { name: "sequence_type", type: "select", label: "Sequence Type", options: ["Cold Outreach (7 emails)", "Warm Introduction (3 emails)", "Follow-up (5 emails)", "Re-engagement (4 emails)"], required: true },
      { name: "personalization", type: "select", label: "Personalization Level", options: ["Basic (Name, Company)", "Standard (+Industry, Role)", "Advanced (+Recent News, Tech Stack)", "Hyper-Personal (+LinkedIn Activity)"] },
      { name: "cta_goal", type: "select", label: "Primary CTA", options: ["Book Demo", "Download Resource", "Schedule Call", "Free Trial", "Case Study"] }
    ]
  },
  {
    id: "lead-qualifier",
    name: "Lead Qualifier Agent",
    category: "outbound",
    description: "Automatically qualifies inbound leads using BANT/MEDDIC frameworks",
    status: "deployed",
    icon: CheckCircle,
    lastRun: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    totalRuns: 156,
    successRate: 91,
    inputs: [
      { name: "qualification_framework", type: "select", label: "Framework", options: ["BANT", "MEDDIC", "CHAMP", "SPICED"], required: true },
      { name: "lead_source", type: "select", label: "Lead Source", options: ["Website Forms", "Demo Requests", "Content Downloads", "Event Signups", "All Sources"] },
      { name: "scoring_criteria", type: "textarea", label: "Custom Scoring Criteria", placeholder: "Company size: 50+ employees\nBudget: $10K+ annually\nDecision timeline: <6 months" },
      { name: "auto_actions", type: "select", label: "Auto Actions", options: ["Score Only", "Score + Route", "Score + Route + Notify", "Full Automation"] }
    ]
  },
  
  // More Convert Stage Agents
  {
    id: "email-nurture-optimizer",
    name: "Email Nurture Optimizer",
    category: "convert",
    description: "Improve email open rates and nurture sequences to boost qualified leads",
    status: "available",
    icon: Mail,
    totalRuns: 19,
    successRate: 82,
    inputs: [
      { name: "current_open_rate", type: "text", label: "Current Open Rate", placeholder: "32.4% (above 30% target)", required: true },
      { name: "nurture_focus", type: "select", label: "Nurture Focus", options: ["Cold leads (no engagement)", "Warm leads (some engagement)", "Hot leads (high engagement)", "All segments"], required: true },
      { name: "sequence_length", type: "select", label: "Sequence Length", options: ["3-email sequence", "5-email sequence", "7-email sequence", "Ongoing nurture"], required: true },
      { name: "personalization_level", type: "select", label: "Personalization", options: ["Industry-based", "Role-based", "Company size-based", "Behavior-based", "All factors"], required: true }
    ]
  },

  // More Close Stage Agents
  {
    id: "deal-acceleration-agent",
    name: "Deal Acceleration Agent", 
    category: "close",
    description: "Identifies stalled deals and provides specific actions to move them forward",
    status: "deployed",
    icon: Zap,
    lastRun: new Date(Date.now() - 6 * 60 * 60 * 1000),
    totalRuns: 67,
    successRate: 88,
    inputs: [
      { name: "deal_stage_focus", type: "select", label: "Deal Stage Focus", options: ["Discovery (18 days avg)", "Proposal (15 days avg)", "Negotiation (9 days avg)", "All stages"], required: true },
      { name: "stalled_definition", type: "select", label: "Stalled Definition", options: ["No activity 7 days", "No activity 14 days", "No activity 30 days", "Custom timeframe"], required: true },
      { name: "acceleration_tactics", type: "select", label: "Acceleration Tactics", options: ["Stakeholder mapping", "Value reinforcement", "Urgency creation", "Objection handling", "All tactics"], required: true }
    ]
  },

  // Analytics & Operations Agents
  {
    id: "funnel-analyzer",
    name: "Funnel Performance Analyzer",
    category: "analytics",
    description: "Deep-dive analysis of your entire GTM funnel performance and bottlenecks",
    status: "deployed",
    icon: BarChart3,
    lastRun: new Date(Date.now() - 8 * 60 * 60 * 1000),
    totalRuns: 23,
    successRate: 96,
    inputs: [
      { name: "analysis_timeframe", type: "select", label: "Analysis Timeframe", options: ["Last 7 days", "Last 30 days", "Last 90 days", "Quarter over quarter"], required: true },
      { name: "focus_area", type: "select", label: "Focus Area", options: ["Conversion rates", "Channel performance", "Quota attainment", "Trend analysis", "Comprehensive"], required: true },
      { name: "benchmark_comparison", type: "select", label: "Benchmark Against", options: ["Industry standards", "Previous periods", "Competitors", "Internal targets"], required: true }
    ]
  },
  {
    id: "data-quality-checker",
    name: "Data Quality Checker",
    category: "operations",
    description: "Audits data sources, identifies gaps, ensures accurate reporting across all tools",
    status: "available",
    icon: Database,
    totalRuns: 34,
    successRate: 94,
    inputs: [
      { name: "data_sources", type: "select", label: "Data Sources to Check", options: ["GA4 + Google Ads", "HubSpot + Pipedrive", "LinkedIn + Apollo", "All connected sources"], required: true },
      { name: "quality_checks", type: "select", label: "Quality Checks", options: ["Duplicate detection", "Missing data fields", "Sync issues", "Data freshness", "All checks"], required: true },
      { name: "reporting_frequency", type: "select", label: "Reporting", options: ["One-time audit", "Weekly reports", "Monthly reports", "Real-time monitoring"], required: true }
    ]
  }
];

const categoryConfig = {
  attract: { label: "Attract", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400", icon: Globe },
  convert: { label: "Convert", color: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400", icon: Users },
  close: { label: "Close", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400", icon: CheckCircle },
  analytics: { label: "Analytics", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400", icon: BarChart3 },
  operations: { label: "Operations", color: "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-400", icon: Settings }
};

export function AgentsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [agentInputs, setAgentInputs] = useState<Record<string, string>>({});
  const [isRunning, setIsRunning] = useState<Record<string, boolean>>({});

  const filteredAgents = selectedCategory === "all" 
    ? agents 
    : agents.filter(agent => agent.category === selectedCategory);

  const getStatusColor = (status: Agent["status"]) => {
    switch (status) {
      case "deployed": return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400";
      case "running": return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400";
      case "available": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleRunAgent = (agent: Agent) => {
    setIsRunning(prev => ({ ...prev, [agent.id]: true }));
    
    // Simulate realistic agent execution with progress updates
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
      console.log(`${agent.name}: ${steps[currentStep - 1]}`);
      
      if (currentStep >= steps.length) {
        clearInterval(stepInterval);
        setTimeout(() => {
          setIsRunning(prev => ({ ...prev, [agent.id]: false }));
          console.log(`✅ Agent ${agent.name} completed successfully with inputs:`, agentInputs);
          setSelectedAgent(null);
          setAgentInputs({});
          
          // Show success notification (could be replaced with proper toast)
          alert(`🎉 ${agent.name} completed successfully! Check the results in your connected tools.`);
        }, 1000);
      }
    }, 800);
  };

  const deployedCount = agents.filter(a => a.status === "deployed").length;
  const runningCount = agents.filter(a => a.status === "running").length;
  const availableCount = agents.filter(a => a.status === "available").length;

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Agentic Engine</h1>
          <p className="text-muted-foreground">Deploy and manage AI agents for your GTM operations</p>
        </div>
        
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

      {/* Category Filter */}
      <div className="flex items-center gap-2">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("all")}
        >
          All Agents ({agents.length})
        </Button>
        
        {/* Funnel Stage Categories First */}
        {["attract", "convert", "close"].map((key) => {
          const config = categoryConfig[key as keyof typeof categoryConfig];
          const count = agents.filter(a => a.category === key).length;
          return (
            <Button
              key={key}
              variant={selectedCategory === key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(key)}
              className="flex items-center gap-2"
            >
              <config.icon className="h-3 w-3" />
              {config.label} ({count})
            </Button>
          );
        })}
        
        <div className="w-px h-6 bg-border mx-2" />
        
        {/* Support Categories */}
        {["analytics", "operations"].map((key) => {
          const config = categoryConfig[key as keyof typeof categoryConfig];
          const count = agents.filter(a => a.category === key).length;
          return (
            <Button
              key={key}
              variant={selectedCategory === key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(key)}
              className="flex items-center gap-2"
            >
              <config.icon className="h-3 w-3" />
              {config.label} ({count})
            </Button>
          );
        })}
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAgents.map((agent) => {
          const categoryInfo = categoryConfig[agent.category as keyof typeof categoryConfig];
          const CategoryIcon = categoryInfo?.icon || Bot;
          const isAgentRunning = isRunning[agent.id];
          
          return (
            <Card key={agent.id} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <agent.icon className="h-5 w-5 text-foreground" />
                    <CardTitle className="text-sm font-semibold">{agent.name}</CardTitle>
                  </div>
                  <Badge className={getStatusColor(agent.status)}>
                    {agent.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{agent.description}</p>
                
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className={categoryInfo?.color || "bg-muted text-muted-foreground"}>
                    <CategoryIcon className="h-3 w-3 mr-1" />
                    {categoryInfo?.label || agent.category}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                {/* Agent Stats */}
                {agent.totalRuns && (
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Total Runs:</span>
                      <span className="font-medium text-foreground">{agent.totalRuns}</span>
                    </div>
                    {agent.successRate && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Success Rate:</span>
                        <span className={`font-medium ${agent.successRate >= 90 ? 'text-green-600' : agent.successRate >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {agent.successRate}%
                        </span>
                      </div>
                    )}
                    {agent.lastRun && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Last Run:</span>
                        <span className="font-medium text-foreground">{agent.lastRun.toLocaleTimeString()}</span>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  {agent.status === "running" ? (
                    <Button size="sm" disabled className="flex-1">
                      <Clock className="h-3 w-3 mr-1" />
                      Running...
                    </Button>
                  ) : (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => setSelectedAgent(agent)}
                          disabled={isAgentRunning}
                        >
                          <Play className="h-3 w-3 mr-1" />
                          {isAgentRunning ? "Starting..." : "Run Agent"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <agent.icon className="h-5 w-5" />
                            Configure {agent.name}
                          </DialogTitle>
                        </DialogHeader>
                        
                        <div className="space-y-4 py-4">
                          <p className="text-sm text-muted-foreground">{agent.description}</p>
                          
                          {/* Agent Inputs */}
                          <div className="space-y-4">
                            {agent.inputs.map((input) => (
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
                                      {input.options?.map((option) => (
                                        <SelectItem key={option} value={option}>
                                          {option}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
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
                          
                          {/* Action Buttons */}
                          <div className="flex items-center justify-end gap-2 pt-4">
                            <Button variant="outline" onClick={() => setSelectedAgent(null)}>
                              Cancel
                            </Button>
                            <Button 
                              onClick={() => handleRunAgent(agent)}
                              disabled={isAgentRunning}
                            >
                              <Zap className="h-3 w-3 mr-1" />
                              {isAgentRunning ? "Starting..." : "Run Agent"}
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                  
                  <Button variant="outline" size="sm">
                    <Settings className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
