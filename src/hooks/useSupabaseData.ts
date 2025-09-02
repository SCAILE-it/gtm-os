import { useState, useEffect } from 'react';
import { fetchKpiData, fetchDataSourcesStatus } from '@/lib/supabase/queries';
import { KpiData, DataSourceStatus } from '@/lib/supabase/types';

interface UseKpiDataReturn {
  data: KpiData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  retry: () => Promise<void>;
  isRetrying: boolean;
}

export function useKpiData(): UseKpiDataReturn {
  const [data, setData] = useState<KpiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  const fetchData = async (isRetry = false) => {
    try {
      if (isRetry) {
        setIsRetrying(true);
      } else {
        setLoading(true);
      }
      setError(null);
      
      const kpiData = await fetchKpiData();
      setData(kpiData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch KPI data';
      setError(errorMessage);
      
      // Log error for monitoring
      console.error('KPI Data fetch failed:', err);
    } finally {
      setLoading(false);
      setIsRetrying(false);
    }
  };

  const retry = async () => {
    await fetchData(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: () => fetchData(),
    retry,
    isRetrying
  };
}

interface UseDataSourcesReturn {
  dataSources: DataSourceStatus[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useDataSources(): UseDataSourcesReturn {
  const [dataSources, setDataSources] = useState<DataSourceStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const sources = await fetchDataSourcesStatus();
      setDataSources(sources);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data sources');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    dataSources,
    loading,
    error,
    refetch: fetchData
  };
}

// Hook for real-time updates (polls every 30 seconds when data sources are connected)
export function useRealtimeKpiData(): UseKpiDataReturn {
  const kpiData = useKpiData();

  useEffect(() => {
    if (!kpiData.data) return;

    const interval = setInterval(() => {
      kpiData.refetch();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [kpiData.data, kpiData.refetch]);

  return kpiData;
}
