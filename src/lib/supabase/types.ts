// Supabase Database Types (based on your actual schema)

// GA4 Tables
export interface GA4AcquisitionDaily {
  id: number;
  created_at: string;
  property_id: string;
  date: string;
  session_source_medium: string;
  session_campaign_name?: string;
  sessions?: number;
  users?: number;
  new_users?: number;
  conversions?: number;
}

export interface GA4EventsDaily {
  id: number;
  created_at: string;
  property_id: string;
  date?: string;
  event_name?: string;
  event_count?: number;
}

export interface GA4LandingPageDaily {
  id: number;
  created_at: string;
  property_id: string;
  date: string;
  landing_page: string;
  sessions?: number;
  users?: number;
  bounce_rate?: number;
}

// GSC Tables
export interface GSCPageDaily {
  id: number;
  created_at: string;
  site_url: string;
  page: string;
  date?: string;
  clicks?: number;
  impressions?: number;
  ctr?: number;
  position?: number;
}

export interface GSCSitemaps {
  id: number;
  created_at: string;
  site_url: string;
  sitemap_url?: string;
  status?: string;
  last_submitted?: string;
}

// Dashboard-specific aggregated types
export interface KpiMetric {
  value: string | number;
  delta: number;
  sparkline?: number[];
  tooltip: string;
  badge?: "assumption" | "low-confidence" | "n/a" | "ads-only" | null;
  dataSources: DataSourceType[];
  hidden?: boolean;
}

export type DataSourceType = 
  | "CRM" 
  | "GA4" 
  | "GSC" 
  | "Google Ads" 
  | "Email" 
  | "LinkedIn" 
  | "PostHog" 
  | "Manual" 
  | "Calculated";

export interface KpiData {
  totalContacts: KpiMetric;
  totalClosedSales: KpiMetric;
  winRate: KpiMetric;
  cac: KpiMetric;
  totalLTV: KpiMetric;
  icpMatch: KpiMetric;
  timeToClose: KpiMetric;
}

export interface ChannelData {
  channel: string;
  share: number;
  delta: number;
  value?: number;
  percentage?: number;
}

// Data source status for dashboard
export interface DataSourceStatus {
  id: string;
  name: string;
  provider: string;
  status: "connected" | "warning" | "disconnected" | "syncing";
  lastSync: string;
  coverage: number;
  records: string;
  description: string;
  required: boolean;
}
