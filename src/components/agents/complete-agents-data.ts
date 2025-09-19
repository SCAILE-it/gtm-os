import {
  Bot,
  Search,
  PenTool,
  Target,
  Mail,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
  Zap,
  Database,
  BarChart3,
  Globe,
  MessageSquare,
  Settings,
  AlertCircle,
  FileText,
  Brain,
  Route,
  Calculator
} from "lucide-react";

export interface Agent {
  id: string;
  name: string;
  category: "attract" | "convert" | "close";
  subcategory: string;
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

export const agents: Agent[] = [
  // ATTRACT STAGE
  
  // SEO/Content Subcategory
  {
    id: "keyword-research-agent",
    name: "Keyword Research Agent",
    category: "attract",
    subcategory: "SEO/Content",
    description: "Find opportunities across SEO, AEO, and SEA channels",
    status: "deployed",
    icon: Search,
    lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000),
    totalRuns: 47,
    successRate: 94,
    inputs: [
      { name: "website_url", type: "text", label: "Website URL", placeholder: "https://yourcompany.com", required: true },
      { name: "target_keywords", type: "textarea", label: "Seed Keywords", placeholder: "B2B SaaS\nCRM software", required: true },
      { name: "channel_focus", type: "select", label: "Channel Focus", options: ["SEO only", "SEA only", "AEO only", "All channels"], required: true }
    ]
  },
  {
    id: "blog-writer-agent",
    name: "Blog Writer Agent",
    category: "attract",
    subcategory: "SEO/Content",
    description: "Create content that ranks for SEO and AEO",
    status: "running",
    icon: PenTool,
    lastRun: new Date(Date.now() - 1 * 60 * 60 * 1000),
    totalRuns: 23,
    successRate: 91,
    inputs: [
      { name: "blog_topic", type: "text", label: "Blog Topic", placeholder: "How to reduce customer churn", required: true },
      { name: "optimization_focus", type: "select", label: "Optimization Focus", options: ["SEO (Google)", "AEO (ChatGPT, Claude)", "Both"], required: true }
    ]
  },
  {
    id: "content-gap-analyzer",
    name: "Content Gap Analyzer",
    category: "attract",
    subcategory: "SEO/Content",
    description: "Find missing content vs competitors",
    status: "available",
    icon: Search,
    totalRuns: 15,
    successRate: 89,
    inputs: [
      { name: "competitor_urls", type: "textarea", label: "Competitor URLs", placeholder: "https://competitor1.com", required: true },
      { name: "content_types", type: "select", label: "Content Types", options: ["Blog posts", "Landing pages", "Resources", "All content"], required: true }
    ]
  },
  {
    id: "technical-seo-auditor",
    name: "Technical SEO Auditor",
    category: "attract",
    subcategory: "SEO/Content",
    description: "Fix site issues hurting rankings",
    status: "deployed",
    icon: Settings,
    lastRun: new Date(Date.now() - 4 * 60 * 60 * 1000),
    totalRuns: 31,
    successRate: 96,
    inputs: [
      { name: "website_url", type: "text", label: "Website URL", placeholder: "https://yourcompany.com", required: true },
      { name: "audit_focus", type: "select", label: "Audit Focus", options: ["Core Web Vitals", "Technical issues", "Both"], required: true }
    ]
  },

  // Paid Advertising Subcategory
  {
    id: "google-ads-setup",
    name: "Google Ads Campaign Setup",
    category: "attract",
    subcategory: "Paid Advertising",
    description: "Create search/display campaigns",
    status: "available",
    icon: Target,
    totalRuns: 12,
    successRate: 87,
    inputs: [
      { name: "product_service", type: "text", label: "Product/Service", placeholder: "B2B CRM Software", required: true },
      { name: "monthly_budget", type: "number", label: "Monthly Budget ($)", placeholder: "5000", required: true }
    ]
  },
  {
    id: "linkedin-ads-setup",
    name: "LinkedIn Ads Campaign Setup",
    category: "attract",
    subcategory: "Paid Advertising",
    description: "Create LinkedIn sponsored content",
    status: "available",
    icon: Target,
    totalRuns: 8,
    successRate: 83,
    inputs: [
      { name: "campaign_objective", type: "select", label: "Campaign Objective", options: ["Lead generation", "Website visits", "Brand awareness"], required: true },
      { name: "target_audience", type: "textarea", label: "Target Audience", placeholder: "VP Sales, Sales Directors", required: true }
    ]
  },

  // Outbound Prospecting Subcategory
  {
    id: "lead-crawler-enricher",
    name: "Lead Crawler & Enricher",
    category: "attract",
    subcategory: "Outbound Prospecting",
    description: "Find and enrich prospects",
    status: "deployed",
    icon: Users,
    lastRun: new Date(Date.now() - 5 * 60 * 60 * 1000),
    totalRuns: 89,
    successRate: 85,
    inputs: [
      { name: "job_titles", type: "textarea", label: "Target Job Titles", placeholder: "VP of Sales\nSales Director", required: true },
      { name: "lead_count", type: "select", label: "Number of Leads", options: ["250", "500", "1000"], required: true }
    ]
  },
  {
    id: "outbound-campaign-setup",
    name: "Outbound Campaign Setup",
    category: "attract",
    subcategory: "Outbound Prospecting",
    description: "Set up LinkedIn and email sequences",
    status: "available",
    icon: Mail,
    totalRuns: 34,
    successRate: 78,
    inputs: [
      { name: "campaign_channels", type: "select", label: "Channels", options: ["Email only", "LinkedIn only", "Both"], required: true },
      { name: "sequence_length", type: "select", label: "Sequence Length", options: ["3 touches", "5 touches", "7 touches"], required: true }
    ]
  },
  {
    id: "message-template-creator",
    name: "Message Template Creator",
    category: "attract",
    subcategory: "Outbound Prospecting",
    description: "Draft personalized messages",
    status: "deployed",
    icon: MessageSquare,
    lastRun: new Date(Date.now() - 3 * 60 * 60 * 1000),
    totalRuns: 56,
    successRate: 82,
    inputs: [
      { name: "message_type", type: "select", label: "Message Type", options: ["Cold email", "LinkedIn message", "Follow-up"], required: true },
      { name: "value_proposition", type: "textarea", label: "Value Prop", placeholder: "Help sales teams close 30% more deals", required: true }
    ]
  },

  // Social & Community Subcategory
  {
    id: "linkedin-signal-analyzer",
    name: "LinkedIn Signal Analyzer",
    category: "attract",
    subcategory: "Social & Community",
    description: "Find engagement opportunities",
    status: "running",
    icon: TrendingUp,
    lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000),
    totalRuns: 34,
    successRate: 88,
    inputs: [
      { name: "signal_types", type: "select", label: "Signal Types", options: ["Job changes", "Company growth", "All signals"], required: true }
    ]
  },
  {
    id: "reddit-community-finder",
    name: "Reddit/Community Finder",
    category: "attract",
    subcategory: "Social & Community",
    description: "Find relevant discussions",
    status: "available",
    icon: MessageSquare,
    totalRuns: 12,
    successRate: 76,
    inputs: [
      { name: "keywords", type: "textarea", label: "Keywords", placeholder: "B2B sales\nCRM", required: true }
    ]
  },
  {
    id: "newsletter-interaction-analyzer",
    name: "Newsletter Interaction Analyzer",
    category: "attract",
    subcategory: "Social & Community",
    description: "Optimize email campaigns",
    status: "available",
    icon: Mail,
    totalRuns: 19,
    successRate: 82,
    inputs: [
      { name: "analysis_focus", type: "select", label: "Analysis Focus", options: ["Open rates", "Click rates", "All metrics"], required: true }
    ]
  },

  // CONVERT STAGE
  
  // Lead Nurturing Subcategory
  {
    id: "lead-nurture-sequencer",
    name: "Lead Nurture Sequencer",
    category: "convert",
    subcategory: "Lead Nurturing",
    description: "Multi-channel nurture campaigns",
    status: "running",
    icon: TrendingUp,
    lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000),
    totalRuns: 34,
    successRate: 88,
    inputs: [
      { name: "nurture_channels", type: "select", label: "Channels", options: ["Email", "Email + LinkedIn", "All channels"], required: true }
    ]
  },
  {
    id: "email-drip-optimizer",
    name: "Email Drip Campaign Optimizer",
    category: "convert",
    subcategory: "Lead Nurturing",
    description: "Improve open/click rates",
    status: "deployed",
    icon: Mail,
    lastRun: new Date(Date.now() - 6 * 60 * 60 * 1000),
    totalRuns: 45,
    successRate: 89,
    inputs: [
      { name: "optimization_focus", type: "select", label: "Focus", options: ["Subject lines", "Content", "Timing"], required: true }
    ]
  },
  {
    id: "behavioral-trigger-setup",
    name: "Behavioral Trigger Setup",
    category: "convert",
    subcategory: "Lead Nurturing",
    description: "Action-based automation",
    status: "available",
    icon: Zap,
    totalRuns: 23,
    successRate: 91,
    inputs: [
      { name: "trigger_events", type: "select", label: "Trigger Events", options: ["Email opens", "Website visits", "Downloads"], required: true }
    ]
  },

  // Conversion Optimization Subcategory
  {
    id: "landing-page-ab-tester",
    name: "Landing Page A/B Tester",
    category: "convert",
    subcategory: "Conversion Optimization",
    description: "Optimize conversion rates",
    status: "deployed",
    icon: Target,
    lastRun: new Date(Date.now() - 4 * 60 * 60 * 1000),
    totalRuns: 67,
    successRate: 85,
    inputs: [
      { name: "page_to_test", type: "select", label: "Page to Test", options: ["Homepage", "Pricing", "Product"], required: true }
    ]
  },
  {
    id: "form-optimizer",
    name: "Form Optimizer",
    category: "convert",
    subcategory: "Conversion Optimization",
    description: "Reduce form abandonment",
    status: "available",
    icon: FileText,
    totalRuns: 28,
    successRate: 87,
    inputs: [
      { name: "form_type", type: "select", label: "Form Type", options: ["Contact form", "Demo request", "Trial signup"], required: true }
    ]
  },
  {
    id: "demo-booking-optimizer",
    name: "Chat/Demo Booking Optimizer",
    category: "convert",
    subcategory: "Conversion Optimization",
    description: "Improve demo conversion",
    status: "available",
    icon: MessageSquare,
    totalRuns: 15,
    successRate: 79,
    inputs: [
      { name: "booking_type", type: "select", label: "Booking Type", options: ["Live chat", "Demo booking", "Both"], required: true }
    ]
  },

  // Lead Qualification Subcategory
  {
    id: "lead-scoring-engine",
    name: "Lead Scoring Engine",
    category: "convert",
    subcategory: "Lead Qualification",
    description: "Auto-score using BANT/MEDDIC",
    status: "deployed",
    icon: CheckCircle,
    lastRun: new Date(Date.now() - 3 * 60 * 60 * 1000),
    totalRuns: 156,
    successRate: 91,
    inputs: [
      { name: "scoring_framework", type: "select", label: "Framework", options: ["BANT", "MEDDIC", "CHAMP"], required: true }
    ]
  },
  {
    id: "intent-signal-analyzer",
    name: "Intent Signal Analyzer",
    category: "convert",
    subcategory: "Lead Qualification",
    description: "Identify buying signals",
    status: "available",
    icon: Brain,
    totalRuns: 43,
    successRate: 88,
    inputs: [
      { name: "signal_sources", type: "select", label: "Signal Sources", options: ["Website behavior", "Email engagement", "All sources"], required: true }
    ]
  },
  {
    id: "lead-routing-optimizer",
    name: "Lead Routing Optimizer",
    category: "convert",
    subcategory: "Lead Qualification",
    description: "Route to right sales rep",
    status: "available",
    icon: Route,
    totalRuns: 29,
    successRate: 84,
    inputs: [
      { name: "routing_criteria", type: "select", label: "Routing Criteria", options: ["Geography", "Company size", "Industry"], required: true }
    ]
  },

  // CLOSE STAGE
  
  // Sales Process Subcategory
  {
    id: "proposal-generator",
    name: "Proposal Generator",
    category: "close",
    subcategory: "Sales Process",
    description: "Custom proposals based on needs",
    status: "deployed",
    icon: PenTool,
    lastRun: new Date(Date.now() - 5 * 60 * 60 * 1000),
    totalRuns: 28,
    successRate: 89,
    inputs: [
      { name: "prospect_company", type: "text", label: "Prospect Company", placeholder: "Acme Corp", required: true },
      { name: "proposal_type", type: "select", label: "Proposal Type", options: ["Standard", "Custom", "Pilot"], required: true }
    ]
  },
  {
    id: "meeting-notes-analyzer",
    name: "Meeting Notes Analyzer",
    category: "close",
    subcategory: "Sales Process",
    description: "Extract insights from sales calls",
    status: "running",
    icon: MessageSquare,
    lastRun: new Date(Date.now() - 1 * 60 * 60 * 1000),
    totalRuns: 89,
    successRate: 93,
    inputs: [
      { name: "meeting_source", type: "select", label: "Meeting Source", options: ["Zoom", "Teams", "Manual notes"], required: true }
    ]
  },
  {
    id: "objection-handler",
    name: "Objection Handler",
    category: "close",
    subcategory: "Sales Process",
    description: "Scripts for common objections",
    status: "available",
    icon: MessageSquare,
    totalRuns: 34,
    successRate: 86,
    inputs: [
      { name: "objection_types", type: "select", label: "Objection Types", options: ["Price", "Timing", "Features", "All"], required: true }
    ]
  },
  {
    id: "deal-risk-analyzer",
    name: "Deal Risk Analyzer",
    category: "close",
    subcategory: "Sales Process",
    description: "Identify deals at risk of stalling",
    status: "running",
    icon: AlertCircle,
    lastRun: new Date(Date.now() - 3 * 60 * 60 * 1000),
    totalRuns: 67,
    successRate: 88,
    inputs: [
      { name: "risk_indicators", type: "select", label: "Risk Indicators", options: ["No activity 7+ days", "Proposal sent >14 days", "All indicators"], required: true }
    ]
  },

  // Sales Intelligence Subcategory
  {
    id: "competitor-intelligence",
    name: "Competitor Intelligence",
    category: "close",
    subcategory: "Sales Intelligence",
    description: "Research prospect's current solutions",
    status: "available",
    icon: Search,
    totalRuns: 21,
    successRate: 92,
    inputs: [
      { name: "prospect_company", type: "text", label: "Prospect Company", placeholder: "Acme Corp", required: true },
      { name: "research_depth", type: "select", label: "Research Depth", options: ["Basic", "Comprehensive"], required: true }
    ]
  },
  {
    id: "stakeholder-mapper",
    name: "Stakeholder Mapper",
    category: "close",
    subcategory: "Sales Intelligence",
    description: "Identify all decision makers",
    status: "available",
    icon: Users,
    totalRuns: 45,
    successRate: 90,
    inputs: [
      { name: "company_size", type: "select", label: "Company Size", options: ["Startup", "SMB", "Enterprise"], required: true }
    ]
  },
  {
    id: "roi-calculator",
    name: "ROI Calculator",
    category: "close",
    subcategory: "Sales Intelligence",
    description: "Build business case for prospects",
    status: "deployed",
    icon: Calculator,
    lastRun: new Date(Date.now() - 7 * 60 * 60 * 1000),
    totalRuns: 52,
    successRate: 94,
    inputs: [
      { name: "prospect_metrics", type: "textarea", label: "Prospect Metrics", placeholder: "Current revenue\nTeam size\nPain points", required: true }
    ]
  }
];

export const categoryConfig = {
  attract: { label: "Attract", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400", icon: Globe },
  convert: { label: "Convert", color: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400", icon: Users },
  close: { label: "Close", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400", icon: CheckCircle }
};

export const getStatusColor = (status: Agent["status"]) => {
  switch (status) {
    case "deployed": return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400";
    case "running": return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400";
    case "available": return "bg-muted text-muted-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};
