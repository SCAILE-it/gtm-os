"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { TrendingUp, TrendingDown, Eye, Search, Users, Mail } from "lucide-react";

interface ExposureMetric {
  source: "SEO" | "Ads" | "LinkedIn" | "Newsletter";
  impressions: number;
  clicks: number;
  ctr: number;
  avgPosition?: number;
  spend?: number;
  engagement?: number;
  delta: number;
  available: boolean;
}

interface ExposureRailProps {
  metrics: ExposureMetric[];
  chartData: Array<{
    date: string;
    seo_impressions: number;
    ads_impressions: number;
    linkedin_impressions: number;
    newsletter_opens: number;
  }>;
  className?: string;
}

const sourceIcons = {
  SEO: Search,
  Ads: Eye,
  LinkedIn: Users,
  Newsletter: Mail
};

const sourceColors = {
  SEO: "#10b981",
  Ads: "#3b82f6", 
  LinkedIn: "#0077b5",
  Newsletter: "#f59e0b"
};

// Mock data for demonstration
const mockExposureData = [
  {
    source: "SEO" as const,
    impressions: 45600,
    clicks: 1520,
    ctr: 3.3,
    avgPosition: 4.2,
    delta: 8.7,
    available: true
  },
  {
    source: "Ads" as const,
    impressions: 12300,
    clicks: 890,
    ctr: 7.2,
    spend: 2400,
    delta: -2.1,
    available: true
  },
  {
    source: "LinkedIn" as const,
    impressions: 8900,
    clicks: 340,
    ctr: 3.8,
    engagement: 1250,
    delta: 15.3,
    available: false // Would be true if connected
  },
  {
    source: "Newsletter" as const,
    impressions: 5600, // Opens
    clicks: 420,
    ctr: 7.5,
    delta: 4.2,
    available: true
  }
];

const mockChartData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  seo_impressions: 1500 + Math.random() * 500,
  ads_impressions: 400 + Math.random() * 200,
  linkedin_impressions: 300 + Math.random() * 150,
  newsletter_opens: 180 + Math.random() * 80
}));

export function ExposureRail({ metrics, chartData, className }: ExposureRailProps) {
  // Use mock data if no data provided
  const exposureMetrics = metrics.length > 0 ? metrics : mockExposureData;
  const exposureChartData = chartData.length > 0 ? chartData : mockChartData;

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Exposure (pre-session)
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Awareness metrics that precede website sessions
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {exposureMetrics.map((metric) => {
              const Icon = sourceIcons[metric.source];
              return (
                <div 
                  key={metric.source} 
                  className={`p-4 rounded-lg border ${
                    metric.available ? 'bg-background' : 'bg-muted/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" style={{ color: sourceColors[metric.source] }} />
                      <span className="font-medium text-sm">{metric.source}</span>
                    </div>
                    {!metric.available && (
                      <Badge variant="outline" className="text-xs">
                        Not Connected
                      </Badge>
                    )}
                  </div>
                  
                  {metric.available ? (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Impressions</span>
                        <span className="text-sm font-medium">{formatNumber(metric.impressions)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {metric.source === 'Newsletter' ? 'Opens' : 'Clicks'}
                        </span>
                        <span className="text-sm font-medium">{formatNumber(metric.clicks)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">CTR</span>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium">{metric.ctr}%</span>
                          <div className={`flex items-center ${
                            metric.delta > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {metric.delta > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            <span className="text-xs">{Math.abs(metric.delta)}%</span>
                          </div>
                        </div>
                      </div>
                      {metric.avgPosition && (
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Avg Position</span>
                          <span className="text-sm font-medium">{metric.avgPosition}</span>
                        </div>
                      )}
                      {metric.spend && (
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Spend</span>
                          <span className="text-sm font-medium">€{formatNumber(metric.spend)}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-2">
                      <p className="text-xs text-muted-foreground">Connect to view metrics</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Exposure Trends Chart */}
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={exposureChartData}>
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  tickFormatter={formatNumber}
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  labelFormatter={(date) => new Date(date).toLocaleDateString()}
                  formatter={(value: number, name: string) => [
                    formatNumber(value), 
                    name.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="seo_impressions"
                  stroke={sourceColors.SEO}
                  strokeWidth={2}
                  dot={false}
                  name="SEO Impressions"
                />
                <Line
                  type="monotone"
                  dataKey="ads_impressions"
                  stroke={sourceColors.Ads}
                  strokeWidth={2}
                  dot={false}
                  name="Ads Impressions"
                />
                <Line
                  type="monotone"
                  dataKey="linkedin_impressions"
                  stroke={sourceColors.LinkedIn}
                  strokeWidth={2}
                  dot={false}
                  name="LinkedIn Impressions"
                  strokeDasharray="5 5"
                />
                <Line
                  type="monotone"
                  dataKey="newsletter_opens"
                  stroke={sourceColors.Newsletter}
                  strokeWidth={2}
                  dot={false}
                  name="Newsletter Opens"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-3 h-0.5 bg-green-500" />
              <span>SEO</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-0.5 bg-blue-500" />
              <span>Ads</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-0.5 bg-blue-700" style={{ borderTop: '1px dashed' }} />
              <span>LinkedIn (not connected)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-0.5 bg-amber-500" />
              <span>Newsletter</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
