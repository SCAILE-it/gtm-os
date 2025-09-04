/**
 * Supabase Edge Function Client
 * Fetches data from the dashboard-data edge function
 */

import { KpiData, ChannelData, DataSourceStatus } from './types';

const EDGE_FUNCTION_URL = 'https://aicektoesdoapovcspgy.supabase.co/functions/v1/dashboard-data';

interface EdgeFunctionResponse {
  kpis: {
    totalContacts: EdgeKpiMetric;
    totalRevenue: EdgeKpiMetric;
    winRate: EdgeKpiMetric;
    avgDealSize: EdgeKpiMetric;
    websiteSessions: EdgeKpiMetric;
    emailEngagement: EdgeKpiMetric;
    seoPerformance: EdgeKpiMetric;
    conversionRate: EdgeKpiMetric;
  };
  charts: {
    channelAttribution: unknown[];
    salesFunnel: unknown[];
    revenueTimeline: unknown[];
    topLandingPages: Array<{
      page: string;
      sessions: number;
      conversions: number;
      conversionRate: number;
      avgEngagementTime: number;
    }>;
  };
  insights: {
    topPerformingChannels: string[];
    dealStageBottlenecks: string[];
    seoOpportunities: string[];
    emailCampaignWinners: string[];
  };
  dataSources: Array<{
    id: string;
    name: string;
    status: string;
    lastSync: string;
    recordCount: number;
    coverage: number;
  }>;
  metadata: {
    lastUpdated: string;
    dataRange: {
      startDate: string;
      endDate: string;
    };
    recordCounts: Record<string, number>;
  };
}

interface EdgeKpiMetric {
  value: number | string;
  delta: number;
  tooltip: string;
  badge: string;
  dataSources: string[];
}

/**
 * Fetch data from Supabase edge function
 */
export async function fetchEdgeFunctionData(): Promise<EdgeFunctionResponse | null> {
  try {
    console.log('🚀 Fetching data from edge function...');
    
    const response = await fetch(EDGE_FUNCTION_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Edge function request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ Edge function data fetched successfully');
    console.log('📊 Data sources:', data.dataSources?.length || 0);
    console.log('📈 KPIs available:', Object.keys(data.kpis || {}).length);
    
    return data;
  } catch (error) {
    console.error('❌ Edge function fetch failed:', error);
    return null;
  }
}

/**
 * Map edge function KPI data to dashboard KpiData interface
 */
export function mapEdgeKpisToKpiData(edgeKpis: EdgeFunctionResponse['kpis']): KpiData {
  return {
    totalContacts: {
      value: edgeKpis.totalContacts.value,
      delta: edgeKpis.totalContacts.delta,
      tooltip: edgeKpis.totalContacts.tooltip,
      badge: edgeKpis.totalContacts.badge === 'real-data' ? null : 'assumption',
      dataSources: edgeKpis.totalContacts.dataSources.map(mapDataSourceName),
    },
    totalClosedSales: {
      value: edgeKpis.totalRevenue.value,
      delta: edgeKpis.totalRevenue.delta,
      tooltip: edgeKpis.totalRevenue.tooltip,
      badge: edgeKpis.totalRevenue.badge === 'real-data' ? null : 'assumption',
      dataSources: edgeKpis.totalRevenue.dataSources.map(mapDataSourceName),
    },
    winRate: {
      value: edgeKpis.winRate.value,
      delta: edgeKpis.winRate.delta,
      tooltip: edgeKpis.winRate.tooltip,
      badge: edgeKpis.winRate.badge === 'real-data' ? null : 'assumption',
      dataSources: edgeKpis.winRate.dataSources.map(mapDataSourceName),
    },
    cac: {
      value: edgeKpis.avgDealSize.value,
      delta: edgeKpis.avgDealSize.delta,
      tooltip: edgeKpis.avgDealSize.tooltip,
      badge: edgeKpis.avgDealSize.badge === 'real-data' ? null : 'assumption',
      dataSources: edgeKpis.avgDealSize.dataSources.map(mapDataSourceName),
    },
    totalLTV: {
      value: edgeKpis.websiteSessions.value,
      delta: edgeKpis.websiteSessions.delta,
      tooltip: edgeKpis.websiteSessions.tooltip,
      badge: edgeKpis.websiteSessions.badge === 'real-data' ? null : 'assumption',
      dataSources: edgeKpis.websiteSessions.dataSources.map(mapDataSourceName),
    },
    icpMatch: {
      value: edgeKpis.emailEngagement.value,
      delta: edgeKpis.emailEngagement.delta,
      tooltip: edgeKpis.emailEngagement.tooltip,
      badge: edgeKpis.emailEngagement.badge === 'real-data' ? null : 'assumption',
      dataSources: edgeKpis.emailEngagement.dataSources.map(mapDataSourceName),
    },
    timeToClose: {
      value: typeof edgeKpis.seoPerformance.value === 'string' 
        ? parseFloat(edgeKpis.seoPerformance.value.replace('%', '')) 
        : edgeKpis.seoPerformance.value,
      delta: edgeKpis.seoPerformance.delta,
      tooltip: edgeKpis.seoPerformance.tooltip,
      badge: edgeKpis.seoPerformance.badge === 'real-data' ? null : 'assumption',
      dataSources: edgeKpis.seoPerformance.dataSources.map(mapDataSourceName),
    },
  };
}

/**
 * Map edge function data sources to DataSourceStatus interface
 */
export function mapEdgeDataSourcesToStatus(edgeDataSources: EdgeFunctionResponse['dataSources']): DataSourceStatus[] {
  return edgeDataSources.map(source => ({
    id: source.id,
    name: source.name,
    provider: getProviderFromId(source.id),
    status: source.status === 'connected' ? 'connected' : 'disconnected',
    lastSync: source.lastSync,
    coverage: source.coverage,
    records: source.recordCount.toString(),
    description: getDescriptionFromId(source.id),
    required: true,
  }));
}

/**
 * Generate channel data from edge function top landing pages
 */
export function mapEdgeChannelData(topLandingPages: EdgeFunctionResponse['charts']['topLandingPages']): ChannelData[] {
  // Group by page and calculate totals
  const pageGroups = topLandingPages.reduce((acc, page) => {
    const key = page.page === '/' ? 'Homepage' : 'Buckets Page';
    if (!acc[key]) {
      acc[key] = { sessions: 0, conversions: 0, count: 0 };
    }
    acc[key].sessions += page.sessions;
    acc[key].conversions += page.conversions;
    acc[key].count += 1;
    return acc;
  }, {} as Record<string, { sessions: number; conversions: number; count: number }>);

  const totalSessions = Object.values(pageGroups).reduce((sum, group) => sum + group.sessions, 0);

  return Object.entries(pageGroups).map(([channel, data]) => ({
    channel,
    share: (data.sessions / totalSessions) * 100,
    delta: Math.random() * 20 - 10, // Placeholder delta
    value: data.sessions,
    percentage: (data.sessions / totalSessions) * 100,
  }));
}

/**
 * Helper function to map data source names from edge function to dashboard format
 */
function mapDataSourceName(sourceName: string): "CRM" | "GA4" | "GSC" | "Google Ads" | "Email" | "LinkedIn" | "PostHog" | "Manual" | "Calculated" {
  const mapping: Record<string, "CRM" | "GA4" | "GSC" | "Google Ads" | "Email" | "LinkedIn" | "PostHog" | "Manual" | "Calculated"> = {
    'HubSpot CRM': 'CRM',
    'Google Analytics 4': 'GA4',
    'Google Search Console': 'GSC',
    'Instantly.ai': 'Email',
  };
  return mapping[sourceName] || 'Manual';
}

/**
 * Get provider name from data source ID
 */
function getProviderFromId(id: string): string {
  const providers: Record<string, string> = {
    'ga4': 'Google',
    'gsc': 'Google',
    'hubspot': 'HubSpot',
    'instantly': 'Instantly.ai',
  };
  return providers[id] || 'Unknown';
}

/**
 * Get description from data source ID
 */
function getDescriptionFromId(id: string): string {
  const descriptions: Record<string, string> = {
    'ga4': 'Website analytics and user behavior tracking',
    'gsc': 'Search performance and SEO insights',
    'hubspot': 'CRM contacts, deals, and sales pipeline',
    'instantly': 'Email outreach and engagement metrics',
  };
  return descriptions[id] || 'Data source';
}
