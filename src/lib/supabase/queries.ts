import { supabase, TABLES, isSupabaseConfigured, handleSupabaseError } from './client';
import { KpiData, DataSourceStatus, GSCMetric, DataSource } from './types';

// KPI Data Queries
export async function fetchKpiData(): Promise<KpiData> {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured, using mock data');
    return getMockKpiData();
  }

  try {
    // Try to fetch real data from Supabase
    const kpiData = await fetchRealKpiData();
    
    // If no data available yet, fall back to mock data
    if (!kpiData) {
      console.info('No data in Supabase yet, using mock data');
      return getMockKpiData();
    }
    
    return kpiData;
  } catch (error) {
    console.error('Supabase query failed:', handleSupabaseError(error));
    return getMockKpiData();
  }
}

async function fetchRealKpiData(): Promise<KpiData | null> {
  // Example: Fetch GSC data for organic traffic metrics
  const { data: gscData, error: gscError } = await supabase
    .from(TABLES.GSC_METRICS)
    .select('*')
    .gte('date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()) // Last 30 days
    .order('date', { ascending: false });

  if (gscError) {
    throw gscError;
  }

  // If no data available, return null to trigger fallback
  if (!gscData || gscData.length === 0) {
    return null;
  }

  // Calculate KPIs from real data
  const totalClicks = gscData.reduce((sum: number, row: GSCMetric) => sum + row.clicks, 0);
  
  // Get mock data as base and override with real data
  const mockData = getMockKpiData();
  
  // TODO: Add more real data calculations as your data sources come online
  return {
    ...mockData,
    totalContacts: {
      ...mockData.totalContacts,
      value: totalClicks, // Using GSC clicks as proxy for now
      tooltip: "Organic traffic from Google Search Console (real data)",
      dataSources: ["GSC"]
    }
  };
}

// Data Sources Status
export async function fetchDataSourcesStatus(): Promise<DataSourceStatus[]> {
  if (!isSupabaseConfigured()) {
    return getMockDataSources();
  }

  try {
    const { data, error } = await supabase
      .from(TABLES.DATA_SOURCES)
      .select('*');

    if (error) throw error;

    // Transform Supabase data to dashboard format
    return data.map((source: DataSource) => ({
      id: source.id,
      name: getDataSourceName(source.data_source_id),
      provider: getProviderName(source.data_source_id),
      status: "connected" as const,
      lastSync: "Just now",
      coverage: 100,
      records: "Active",
      description: `Connected via ${source.permission_level} access`,
      required: true
    }));
  } catch (error) {
    console.error('Failed to fetch data sources:', handleSupabaseError(error));
    return getMockDataSources();
  }
}

// Helper functions
function getDataSourceName(dataSourceId: string): string {
  const mapping: Record<string, string> = {
    'gsc': 'Google Search Console',
    'ga4': 'Google Analytics 4',
    'google_ads': 'Google Ads',
    'hubspot': 'HubSpot CRM',
    'salesforce': 'Salesforce CRM'
  };
  return mapping[dataSourceId] || dataSourceId;
}

function getProviderName(dataSourceId: string): string {
  const mapping: Record<string, string> = {
    'gsc': 'Google',
    'ga4': 'Google',
    'google_ads': 'Google',
    'hubspot': 'HubSpot',
    'salesforce': 'Salesforce'
  };
  return mapping[dataSourceId] || 'Unknown';
}

// Mock data fallbacks (same as before)
function getMockKpiData(): KpiData {
  return {
    totalContacts: { 
      value: 2847, 
      delta: 12.3, 
      sparkline: [100, 120, 140, 135, 160, 180, 170, 190, 210, 200],
      tooltip: "Distinct CRM contacts; sparkline = new contacts/day",
      dataSources: ["CRM", "GA4"]
    },
    totalClosedSales: { 
      value: 485000, 
      delta: -3.2, 
      sparkline: [400000, 420000, 450000, 480000, 485000],
      tooltip: "Total Closed Sales or ARR in €",
      badge: null,
      dataSources: ["CRM"]
    },
    winRate: { 
      value: "34%", 
      delta: 5.1,
      tooltip: "closed-won / closed-any (CRM)",
      badge: null,
      dataSources: ["CRM"]
    },
    cac: { 
      value: 1850, 
      delta: -8.7, 
      badge: "ads-only", 
      hidden: false,
      tooltip: "Σ Ads spend / new customers. Hidden if no Ads or spend=0",
      dataSources: ["Google Ads", "CRM"]
    },
    totalLTV: { 
      value: 45000, 
      delta: 8.3,
      tooltip: "Total Customer Lifetime Value in € (Prediction how much revenue can be expected)",
      badge: "assumption",
      dataSources: ["Calculated"]
    },
    icpMatch: { 
      value: "78%", 
      delta: 4.2,
      tooltip: "How many deals were actually closed with an interaction of the previously defined ICP = Target Persona for ads and Outreach",
      dataSources: ["CRM"]
    },
    timeToClose: { 
      value: 32, 
      delta: -1.8,
      tooltip: "Average days from first touch to closed-won",
      dataSources: ["CRM", "GA4"]
    }
  };
}

function getMockDataSources(): DataSourceStatus[] {
  return [
    {
      id: "gsc",
      name: "Google Search Console",
      provider: "Google",
      status: "connected",
      lastSync: "2 minutes ago",
      coverage: 98,
      records: "156K queries",
      description: "Organic search performance and rankings",
      required: true
    },
    {
      id: "ga4", 
      name: "Google Analytics 4",
      provider: "Google",
      status: "connected",
      lastSync: "5 minutes ago",
      coverage: 95,
      records: "12.3K sessions",
      description: "Website traffic and user behavior",
      required: true
    }
  ];
}
