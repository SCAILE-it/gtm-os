// Supabase Database Types (based on your schema)

export interface DataSource {
  id: string;
  data_source_id: string;
  site_url: string;
  permission_level: string;
  created_at?: string;
  updated_at?: string;
}

export interface GSCMetric {
  id: string;
  site_url: string;
  date: string;
  query?: string;
  page?: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  created_at?: string;
}

export interface GSCSite {
  id: string;
  data_source_id: string;
  site_url: string;
  permission_level: string;
  created_at?: string;
  updated_at?: string;
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
