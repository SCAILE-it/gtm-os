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
  AlertCircle
} from "lucide-react";

export interface Agent {
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
    type: "text" | "textarea" | "select" | "number" | "multiselect";
    label: string;
    placeholder?: string;
    options?: string[];
    required?: boolean;
    section?: string; // Group inputs into sections
  }[];
}

// Common input sections for better organization
export const COMMON_INPUTS = {
  // Company Context - Essential for all agents
  COMPANY_CONTEXT: [
    { 
      name: "company_type", 
      type: "select" as const, 
      label: "Company Type", 
      options: ["B2B SaaS", "B2B Services", "B2B Manufacturing", "B2C E-commerce", "B2C Services", "Marketplace", "Enterprise Software", "Fintech", "Healthcare Tech", "Other"], 
      required: true,
      section: "Company Context"
    },
    { 
      name: "company_size", 
      type: "select" as const, 
      label: "Company Size", 
      options: ["1-10 employees", "11-50 employees", "51-200 employees", "201-500 employees", "501-1000 employees", "1000+ employees"], 
      required: true,
      section: "Company Context"
    },
    { 
      name: "industry", 
      type: "select" as const, 
      label: "Industry", 
      options: ["Technology", "Financial Services", "Healthcare", "Manufacturing", "Retail", "Professional Services", "Education", "Real Estate", "Marketing & Advertising", "Other"], 
      required: true,
      section: "Company Context"
    },
    { 
      name: "target_market", 
      type: "select" as const, 
      label: "Target Market", 
      options: ["SMB (1-50 employees)", "Mid-Market (50-500 employees)", "Enterprise (500+ employees)", "Mixed Market"], 
      required: true,
      section: "Company Context"
    },
    { 
      name: "business_model", 
      type: "select" as const, 
      label: "Business Model", 
      options: ["Subscription (SaaS)", "One-time Purchase", "Usage-based", "Freemium", "Marketplace Commission", "Professional Services", "Hybrid Model"], 
      required: true,
      section: "Company Context"
    }
  ],
  
  // Target Audience - For marketing/sales agents
  TARGET_AUDIENCE: [
    { 
      name: "target_personas", 
      type: "multiselect" as const, 
      label: "Target Personas", 
      options: ["C-Level (CEO, CTO, CMO)", "VP Level (VP Sales, VP Marketing)", "Directors", "Managers", "Individual Contributors", "IT Decision Makers", "Finance Decision Makers"], 
      required: true,
      section: "Target Audience"
    },
    { 
      name: "buyer_journey_stage", 
      type: "select" as const, 
      label: "Buyer Journey Focus", 
      options: ["Awareness (Problem Recognition)", "Consideration (Solution Research)", "Decision (Vendor Selection)", "All Stages"], 
      required: true,
      section: "Target Audience"
    }
  ]
};

export const agents: Agent[] = [
  // ATTRACT STAGE - Generate Awareness & Traffic
  
  // SEO/Content Agents
  {
    id: "keyword-research-agent",
    name: "Keyword Research Agent",
    category: "attract",
    description: "Finds high-opportunity keywords for SEO, AEO, and SEA campaigns",
    status: "deployed",
    icon: Search,
    lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000),
    totalRuns: 47,
    successRate: 94,
    inputs: [
      ...COMMON_INPUTS.COMPANY_CONTEXT,
      ...COMMON_INPUTS.TARGET_AUDIENCE,
      { name: "website_url", type: "text", label: "Website URL", placeholder: "https://yourcompany.com", required: true, section: "Technical Setup" },
      { name: "target_keywords", type: "textarea", label: "Seed Keywords", placeholder: "B2B SaaS\nCRM software\nSales automation", required: true, section: "Technical Setup" },
      { name: "competitor_urls", type: "textarea", label: "Competitor URLs", placeholder: "https://competitor1.com\nhttps://competitor2.com", section: "Competitive Analysis" },
      { name: "channel_focus", type: "select", label: "Channel Focus", options: ["SEO only", "SEA only", "AEO only", "All channels"], required: true, section: "Strategy" },
      { name: "analysis_depth", type: "select", label: "Analysis Depth", options: ["Quick (100 keywords)", "Standard (500 keywords)", "Deep (1000+ keywords)"], required: true, section: "Strategy" }
    ]
  },
  {
    id: "seo-aeo-auditor",
    name: "SEO/AEO Technical Auditor", 
    category: "attract",
    description: "Comprehensive technical audit for SEO and AEO (Answer Engine Optimization)",
    status: "deployed",
    icon: Settings,
    lastRun: new Date(Date.now() - 4 * 60 * 60 * 1000),
    totalRuns: 31,
    successRate: 96,
    inputs: [
      { name: "website_url", type: "text", label: "Website URL", placeholder: "https://yourcompany.com", required: true },
      { name: "audit_type", type: "select", label: "Audit Type", options: ["SEO Technical", "AEO Optimization", "Both SEO + AEO"], required: true },
      { name: "priority_pages", type: "textarea", label: "Priority Pages", placeholder: "/product\n/pricing\n/blog\n/case-studies" },
      { name: "audit_depth", type: "select", label: "Audit Depth", options: ["Critical issues only", "Full technical audit", "Competitive analysis"], required: true }
    ]
  },
  {
    id: "blog-writer-agent",
    name: "SEO Blog Writer", 
    category: "attract",
    description: "Writes SEO and AEO optimized blog posts with keyword research and CTAs",
    status: "running",
    icon: PenTool,
    lastRun: new Date(Date.now() - 1 * 60 * 60 * 1000),
    totalRuns: 23,
    successRate: 91,
    inputs: [
      ...COMMON_INPUTS.COMPANY_CONTEXT,
      ...COMMON_INPUTS.TARGET_AUDIENCE,
      { name: "blog_topic", type: "text", label: "Blog Topic", placeholder: "How to reduce customer churn in B2B SaaS", required: true, section: "Content Strategy" },
      { name: "primary_keyword", type: "text", label: "Primary Keyword", placeholder: "customer churn reduction", required: true, section: "Content Strategy" },
      { name: "optimization_focus", type: "select", label: "Optimization Focus", options: ["SEO (Google)", "AEO (ChatGPT, Claude)", "Both SEO + AEO"], required: true, section: "Content Strategy" },
      { name: "content_style", type: "select", label: "Content Style", options: ["Educational How-to", "Industry Analysis", "Case Study", "Thought Leadership"], required: true, section: "Content Strategy" },
      { name: "cta_focus", type: "select", label: "Call-to-Action Focus", options: ["Lead Magnet Download", "Product Demo", "Free Trial", "Consultation Booking", "Newsletter Signup"], required: true, section: "Conversion Strategy" }
    ]
  },
  {
    id: "traffic-source-analyzer",
    name: "Traffic Source Analyzer",
    category: "attract",
    description: "Semrush-like analysis: Where do leads come from? SEO, SEA, AEO, referrals, keywords",
    status: "deployed",
    icon: BarChart3,
    lastRun: new Date(Date.now() - 3 * 60 * 60 * 1000),
    totalRuns: 67,
    successRate: 98,
    inputs: [
      { name: "analysis_period", type: "select", label: "Analysis Period", options: ["Last 7 days", "Last 30 days", "Last 90 days", "Custom range"], required: true },
      { name: "traffic_sources", type: "select", label: "Focus Sources", options: ["SEO traffic", "SEA traffic", "AEO traffic", "Referral traffic", "All sources"], required: true },
      { name: "keyword_analysis", type: "select", label: "Keyword Analysis", options: ["Top performing keywords", "Keyword gaps", "Competitor keywords", "All keyword data"], required: true },
      { name: "lead_attribution", type: "select", label: "Lead Attribution", options: ["First touch", "Last touch", "Multi-touch", "All attribution models"], required: true }
    ]
  },

  // Paid Advertising Agents
  {
    id: "google-ads-setup",
    name: "Google Ads Campaign Setup",
    category: "attract",
    description: "Creates complete Google Ads campaigns with keywords, ad copy, and targeting",
    status: "available",
    icon: Target,
    totalRuns: 12,
    successRate: 87,
    inputs: [
      { name: "product_service", type: "text", label: "Product/Service", placeholder: "B2B CRM Software", required: true },
      { name: "target_audience", type: "textarea", label: "Target Audience", placeholder: "Sales managers at 50-500 person companies\nPain: Manual sales processes", required: true },
      { name: "monthly_budget", type: "number", label: "Monthly Budget ($)", placeholder: "5000", required: true },
      { name: "campaign_types", type: "select", label: "Campaign Types", options: ["Search only", "Display only", "Search + Display", "Performance Max"], required: true },
      { name: "geo_targeting", type: "textarea", label: "Geographic Targeting", placeholder: "United States\nCanada\nUnited Kingdom" }
    ]
  },

  // Outbound Agents
  {
    id: "lead-crawler-enricher",
    name: "Lead Crawler & Enricher",
    category: "attract",
    description: "Crawls, enriches, qualifies and scores leads using Apollo and custom engines",
    status: "deployed",
    icon: Users,
    lastRun: new Date(Date.now() - 5 * 60 * 60 * 1000),
    totalRuns: 89,
    successRate: 85,
    inputs: [
      { name: "company_criteria", type: "textarea", label: "Company Criteria", placeholder: "50-500 employees\nB2B SaaS companies\n$1M+ revenue", required: true },
      { name: "job_titles", type: "textarea", label: "Target Job Titles", placeholder: "VP of Sales\nSales Director\nRevenue Operations", required: true },
      { name: "lead_count", type: "select", label: "Number of Leads", options: ["250 leads", "500 leads", "1000 leads", "2500 leads"], required: true },
      { name: "enrichment_level", type: "select", label: "Enrichment Level", options: ["Basic (email, phone)", "Standard (+social profiles)", "Advanced (+tech stack, funding)"], required: true },
      { name: "qualification_criteria", type: "textarea", label: "Qualification Criteria", placeholder: "Budget: $10K+\nTimeline: <6 months\nDecision maker: Yes" }
    ]
  },
  {
    id: "outbound-message-drafter",
    name: "Outbound Message Drafter",
    category: "attract",
    description: "Drafts personalized outbound messages for email and LinkedIn campaigns",
    status: "deployed",
    icon: Mail,
    lastRun: new Date(Date.now() - 6 * 60 * 60 * 1000),
    totalRuns: 67,
    successRate: 76,
    inputs: [
      { name: "prospect_profile", type: "textarea", label: "Ideal Customer Profile", placeholder: "VP Sales at 50-200 person B2B SaaS companies\nPain: Manual sales processes", required: true },
      { name: "value_proposition", type: "textarea", label: "Value Proposition", placeholder: "Help sales teams close 30% more deals through automation", required: true },
      { name: "message_channels", type: "select", label: "Message Channels", options: ["Email only", "LinkedIn only", "Both email + LinkedIn"], required: true },
      { name: "sequence_length", type: "select", label: "Sequence Length", options: ["3-message sequence", "5-message sequence", "7-message sequence"], required: true },
      { name: "personalization_level", type: "select", label: "Personalization", options: ["Basic (Name, Company)", "Advanced (+Industry, Recent News)", "Hyper-Personal (+LinkedIn Activity)"], required: true }
    ]
  },
  {
    id: "linkedin-signal-analyzer",
    name: "LinkedIn Signal Analyzer",
    category: "attract",
    description: "Analyzes LinkedIn signals to find engagement opportunities and trending topics",
    status: "available",
    icon: TrendingUp,
    totalRuns: 34,
    successRate: 88,
    inputs: [
      { name: "target_audience", type: "textarea", label: "Target Audience", placeholder: "VP Sales\nSales Directors\nRevenue Operations", required: true },
      { name: "industry_focus", type: "text", label: "Industry Focus", placeholder: "B2B SaaS, FinTech, MarTech", required: true },
      { name: "signal_types", type: "select", label: "Signal Types", options: ["Job changes", "Company growth", "Funding announcements", "All signals"], required: true },
      { name: "engagement_strategy", type: "select", label: "Engagement Strategy", options: ["Congratulate on achievements", "Share relevant content", "Offer help/insights", "All strategies"], required: true }
    ]
  },
  {
    id: "newsletter-interaction-analyzer",
    name: "Newsletter Interaction Analyzer",
    category: "attract",
    description: "Analyzes newsletter interactions to optimize email campaigns and content",
    status: "available",
    icon: Mail,
    totalRuns: 19,
    successRate: 82,
    inputs: [
      { name: "newsletter_platform", type: "select", label: "Newsletter Platform", options: ["Mailchimp", "ConvertKit", "Substack", "HubSpot", "Other"], required: true },
      { name: "analysis_metrics", type: "select", label: "Analysis Focus", options: ["Open rates", "Click rates", "Unsubscribe patterns", "All metrics"], required: true },
      { name: "content_optimization", type: "select", label: "Content Optimization", options: ["Subject lines", "Email content", "Send timing", "All elements"], required: true }
    ]
  },

  // CONVERT STAGE - Turn Traffic into Qualified Leads
  
  // Lead Nurturing Agents
  {
    id: "lead-nurture-sequencer",
    name: "Lead Nurture Sequencer",
    category: "convert",
    description: "Creates multi-channel nurture campaigns to move leads through the funnel",
    status: "running", // Currently optimizing sequences
    icon: TrendingUp,
    lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000),
    totalRuns: 34,
    successRate: 88,
    inputs: [
      { name: "lead_segments", type: "select", label: "Lead Segments", options: ["Cold leads (no engagement)", "Warm leads (some engagement)", "Hot leads (high engagement)", "All segments"], required: true },
      { name: "nurture_channels", type: "select", label: "Nurture Channels", options: ["Email only", "Email + LinkedIn", "Email + Retargeting", "All channels"], required: true },
      { name: "nurture_goal", type: "select", label: "Nurturing Goal", options: ["Book demo", "Download resource", "Schedule call", "Free trial signup"], required: true },
      { name: "sequence_length", type: "select", label: "Sequence Length", options: ["3-touch sequence", "5-touch sequence", "7-touch sequence", "Ongoing nurture"], required: true }
    ]
  },
  {
    id: "conversion-rate-optimizer",
    name: "Conversion Rate Optimizer",
    category: "convert",
    description: "A/B tests landing pages, forms, and CTAs to improve conversion rates",
    status: "deployed",
    icon: Target,
    lastRun: new Date(Date.now() - 6 * 60 * 60 * 1000),
    totalRuns: 45,
    successRate: 89,
    inputs: [
      { name: "page_to_optimize", type: "select", label: "Page to Optimize", options: ["Homepage", "Product pages", "Pricing page", "Landing pages", "All pages"], required: true },
      { name: "optimization_focus", type: "select", label: "Optimization Focus", options: ["Headlines", "CTAs", "Form fields", "Page layout", "All elements"], required: true },
      { name: "test_variants", type: "select", label: "Test Variants", options: ["2 variants (A/B)", "3 variants (A/B/C)", "5 variants (multivariate)"], required: true },
      { name: "success_metric", type: "select", label: "Success Metric", options: ["Form submissions", "Demo bookings", "Trial signups", "Page engagement"], required: true }
    ]
  },
  {
    id: "lead-scoring-engine",
    name: "Lead Scoring Engine",
    category: "convert",
    description: "Auto-scores leads using BANT/MEDDIC and behavioral data for better qualification",
    status: "deployed",
    icon: CheckCircle,
    lastRun: new Date(Date.now() - 4 * 60 * 60 * 1000),
    totalRuns: 156,
    successRate: 91,
    inputs: [
      { name: "scoring_framework", type: "select", label: "Scoring Framework", options: ["BANT", "MEDDIC", "CHAMP", "SPICED", "Custom"], required: true },
      { name: "behavioral_signals", type: "select", label: "Behavioral Signals", options: ["Website activity", "Email engagement", "Content downloads", "All signals"], required: true },
      { name: "scoring_thresholds", type: "select", label: "Scoring Thresholds", options: ["Conservative (high bar)", "Balanced", "Aggressive (low bar)"], required: true },
      { name: "auto_routing", type: "select", label: "Auto Routing", options: ["Score only", "Score + route to sales", "Score + route + notify"], required: true }
    ]
  },

  // CLOSE STAGE - Turn Qualified Leads into Customers
  
  // Sales Process Agents
  {
    id: "proposal-generator",
    name: "Proposal Generator", 
    category: "close",
    description: "Creates customized sales proposals and quotes based on prospect needs and pain points",
    status: "deployed",
    icon: PenTool,
    lastRun: new Date(Date.now() - 5 * 60 * 60 * 1000),
    totalRuns: 28,
    successRate: 89,
    inputs: [
      { name: "prospect_company", type: "text", label: "Prospect Company", placeholder: "Acme Corp", required: true },
      { name: "company_size", type: "select", label: "Company Size", options: ["Startup (1-50)", "SMB (51-200)", "Enterprise (200+)"], required: true },
      { name: "pain_points", type: "textarea", label: "Key Pain Points", placeholder: "Manual sales processes\nPoor lead tracking\nLong sales cycles", required: true },
      { name: "proposal_type", type: "select", label: "Proposal Type", options: ["Standard package", "Custom solution", "Pilot program"], required: true },
      { name: "budget_range", type: "select", label: "Budget Range", options: ["<$10K", "$10K-$50K", "$50K-$100K", "$100K+"], required: true }
    ]
  },
  {
    id: "meeting-notes-analyzer",
    name: "Meeting Notes Analyzer", 
    category: "close",
    description: "Analyzes sales call recordings and notes to extract insights and next steps",
    status: "running", // Currently analyzing calls
    icon: MessageSquare,
    lastRun: new Date(Date.now() - 1 * 60 * 60 * 1000),
    totalRuns: 89,
    successRate: 93,
    inputs: [
      { name: "meeting_source", type: "select", label: "Meeting Source", options: ["Zoom recordings", "Teams recordings", "Manual notes", "Gong/Chorus", "All sources"], required: true },
      { name: "analysis_focus", type: "select", label: "Analysis Focus", options: ["Pain points", "Decision criteria", "Objections", "Next steps", "All insights"], required: true },
      { name: "output_format", type: "select", label: "Output Format", options: ["Summary + action items", "CRM field updates", "Follow-up email drafts", "All outputs"], required: true },
      { name: "auto_crm_update", type: "select", label: "Auto CRM Update", options: ["Manual review", "Auto-update fields", "Suggest updates"], required: true }
    ]
  },
  {
    id: "deal-risk-analyzer",
    name: "Deal Risk Analyzer", 
    category: "close",
    description: "Identifies deals at risk of stalling and provides specific actions to move them forward",
    status: "deployed",
    icon: AlertCircle,
    lastRun: new Date(Date.now() - 3 * 60 * 60 * 1000),
    totalRuns: 67,
    successRate: 88,
    inputs: [
      { name: "risk_indicators", type: "select", label: "Risk Indicators", options: ["No activity 7+ days", "Proposal sent >14 days ago", "Multiple stakeholders silent", "All indicators"], required: true },
      { name: "deal_stage_focus", type: "select", label: "Deal Stage Focus", options: ["Discovery phase", "Proposal phase", "Negotiation phase", "All stages"], required: true },
      { name: "action_recommendations", type: "select", label: "Action Recommendations", options: ["Email templates", "Call scripts", "Stakeholder outreach", "All actions"], required: true }
    ]
  },

];

export const categoryConfig = {
  attract: { label: "Attract", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400", icon: Globe },
  convert: { label: "Convert", color: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400", icon: Users },
  close: { label: "Close", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400", icon: CheckCircle },
  analytics: { label: "Analytics", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400", icon: BarChart3 },
  operations: { label: "Operations", color: "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-400", icon: Settings }
};

export const getStatusColor = (status: Agent["status"]) => {
  switch (status) {
    case "deployed": return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400";
    case "running": return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400";
    case "available": return "bg-muted text-muted-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};
