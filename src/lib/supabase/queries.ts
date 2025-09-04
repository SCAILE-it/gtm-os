import { supabase, isSupabaseConfigured, handleSupabaseError } from './client';
import { 
  KpiData, 
  DataSourceStatus, 
  GA4AcquisitionDaily,
  ChannelData
} from './types';

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
  try {
    console.log('🔍 Testing Supabase connection...');
    console.log('🔧 Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...');
    console.log('🔑 API Key configured:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    console.log('✅ Is configured:', isSupabaseConfigured());
    
    // Simple connection test first
    const { data: testData, error: testError } = await supabase
      .from('ga4_acquisition_daily')
      .select('*')
      .limit(1);

    if (testError) {
      console.log('❌ Supabase connection failed:', testError.message);
      console.log('🔍 Error details:', testError);
      console.log('📊 Using mock data fallback');
      return null; // Use mock data
    }

    console.log('✅ Supabase connected successfully!');
    console.log('📋 Sample data structure:', testData?.[0]);
    console.log('📊 Data count:', testData?.length);
    
    // Now let's fetch and use real data!
    console.log('🚀 Fetching real data from Supabase...');
    
    // Fetch GA4 data for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const { data: ga4Data, error: ga4Error } = await supabase
      .from('ga4_acquisition_daily')
      .select('*')
      .gte('date', thirtyDaysAgo.toISOString().split('T')[0])
      .order('date', { ascending: false });

    if (ga4Error) {
      console.log('⚠️ GA4 data fetch failed:', ga4Error.message);
      return null; // Fall back to mock data
    }

    console.log('📊 GA4 data fetched:', ga4Data?.length, 'records');
    
    // Calculate real metrics
    const mockData = getMockKpiData();
         const totalSessions = ga4Data?.reduce((sum: number, row: GA4AcquisitionDaily) => 
       sum + (row.sessions || 0), 0) || 0;
    
    console.log('🔢 Total sessions from real data:', totalSessions);
    
    // Return real data merged with mock structure
    return {
      ...mockData,
      totalContacts: {
        ...mockData.totalContacts,
        value: totalSessions > 0 ? totalSessions : mockData.totalContacts.value,
        tooltip: totalSessions > 0 
          ? `${totalSessions} total sessions from GA4 (real data)` 
          : mockData.totalContacts.tooltip,
        dataSources: totalSessions > 0 ? ["GA4"] : mockData.totalContacts.dataSources
      }
    };
    
  } catch (error) {
    console.error('❌ Error testing Supabase connection:', error);
    console.log('🔍 Error type:', typeof error);
    console.log('🔍 Error details:', error);
    return null;
  }
}



// Data Sources Status
export async function fetchDataSourcesStatus(): Promise<DataSourceStatus[]> {
  if (!isSupabaseConfigured()) {
    return getMockDataSources();
  }

  try {
    // Check if we have data in our tables to determine connection status
    const [ga4Check, gscCheck] = await Promise.all([
      supabase.from('ga4_acquisition_daily').select('id').limit(1),
      supabase.from('gsc_page_daily').select('id').limit(1)
    ]);

    const dataSources: DataSourceStatus[] = [
      {
        id: "ga4",
        name: "Google Analytics 4",
        provider: "Google",
        status: ga4Check.data && ga4Check.data.length > 0 ? "connected" : "disconnected",
        lastSync: ga4Check.data && ga4Check.data.length > 0 ? "Just now" : "Never",
        coverage: ga4Check.data && ga4Check.data.length > 0 ? 100 : 0,
        records: ga4Check.data && ga4Check.data.length > 0 ? "Active" : "No data",
        description: "Website traffic and user behavior analytics",
        required: true
      },
      {
        id: "gsc",
        name: "Google Search Console",
        provider: "Google", 
        status: gscCheck.data && gscCheck.data.length > 0 ? "connected" : "disconnected",
        lastSync: gscCheck.data && gscCheck.data.length > 0 ? "Just now" : "Never",
        coverage: gscCheck.data && gscCheck.data.length > 0 ? 100 : 0,
        records: gscCheck.data && gscCheck.data.length > 0 ? "Active" : "No data",
        description: "Organic search performance and rankings",
        required: true
      }
    ];

    return dataSources;
  } catch (error) {
    console.error('Failed to fetch data sources:', handleSupabaseError(error));
    return getMockDataSources();
  }
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

// Channel Data for Charts
export async function fetchChannelData(): Promise<ChannelData[]> {
  if (!isSupabaseConfigured()) {
    return getMockChannelData();
  }

  try {
    const { data: ga4Data, error } = await supabase
      .from('ga4_acquisition_daily')
      .select('session_source_medium, sessions, users')
      .gte('date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
      .order('sessions', { ascending: false });

    if (error) throw error;

    if (!ga4Data || ga4Data.length === 0) {
      return getMockChannelData();
    }

    // Group by channel and calculate totals
    const channelTotals: Record<string, { sessions: number; users: number }> = {};
    
    ga4Data.forEach(row => {
      const channel = normalizeChannelName(row.session_source_medium || 'direct');
      if (!channelTotals[channel]) {
        channelTotals[channel] = { sessions: 0, users: 0 };
      }
      channelTotals[channel].sessions += row.sessions || 0;
      channelTotals[channel].users += row.users || 0;
    });

    // Convert to chart format
    const totalSessions = Object.values(channelTotals).reduce((sum, ch) => sum + ch.sessions, 0);
    
    return Object.entries(channelTotals)
      .map(([channel, data]) => ({
        channel,
        value: data.sessions,
        percentage: totalSessions > 0 ? (data.sessions / totalSessions) * 100 : 0,
        share: totalSessions > 0 ? (data.sessions / totalSessions) * 100 : 0,
        delta: 0 // TODO: Calculate delta from previous period
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6); // Top 6 channels

  } catch (error) {
    console.error('Failed to fetch channel data:', error);
    return getMockChannelData();
  }
}

// Helper function to normalize channel names
function normalizeChannelName(sourceMedia: string): string {
  const lower = sourceMedia.toLowerCase();
  if (lower.includes('google') && lower.includes('organic')) return 'Organic Search';
  if (lower.includes('google') && lower.includes('cpc')) return 'Google Ads';
  if (lower.includes('direct')) return 'Direct';
  if (lower.includes('email')) return 'Email';
  if (lower.includes('social')) return 'Social';
  if (lower.includes('referral')) return 'Referral';
  return sourceMedia || 'Other';
}

function getMockChannelData() {
  return [
    { channel: "Organic Search", value: 1247, percentage: 43.8, share: 43.8, delta: 12.3 },
    { channel: "Direct", value: 892, percentage: 31.3, share: 31.3, delta: -2.1 },
    { channel: "Email", value: 234, percentage: 8.2, share: 8.2, delta: 15.7 },
    { channel: "Social", value: 187, percentage: 6.6, share: 6.6, delta: -5.2 },
    { channel: "Referral", value: 156, percentage: 5.5, share: 5.5, delta: 8.9 },
    { channel: "Google Ads", value: 131, percentage: 4.6, share: 4.6, delta: -8.3 }
  ];
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
