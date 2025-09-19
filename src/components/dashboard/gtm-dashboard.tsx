"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SourceLogo } from "@/components/ui/source-logo";
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  ArrowRight,
  ExternalLink,
  Info,
  CheckCircle2,
  Clock,
  AlertCircle,
  Bot,
  BarChart3,
  Globe,
  Calendar,
  Zap,
  Settings,
  Plus,
  ChevronDown,
  ChevronUp
} from "lucide-react";

interface FunnelMetric {
  label: string;
  value: string;
  change: {
    day: number;
    week: number;
    month: number;
  };
  benchmark: {
    target: number;
    timeframe?: "day" | "week" | "month";
    status: "above" | "below" | "at";
    editable: boolean;
    setViaChat?: boolean;
  };
  dataSources: string[];
  calculation?: string;
  subMetrics?: {
    [key: string]: {
      label: string;
      value: string;
      percentage: number;
      change: {
        day: number;
        week: number;
        month: number;
      };
    };
  };
}

interface DailyTask {
  id: string;
  title: string;
  impact: string;
  urgency: "high" | "medium" | "low";
  category: "attract" | "convert" | "close";
  dataSources: string[];
}

export function GTMDashboard() {
  const [selectedLocation, setSelectedLocation] = useState("Global");
  const [selectedChannel, setSelectedChannel] = useState("All Channels");
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState("All Units");
  const [selectedTimeframe, setSelectedTimeframe] = useState("Last 30 days");
  const [selectedComparison, setSelectedComparison] = useState<"day" | "week" | "month">("day");
  const [configMode, setConfigMode] = useState(false);
  const [taskStatuses, setTaskStatuses] = useState<{[key: string]: string}>({});
  const [expandedMetric, setExpandedMetric] = useState<string | null>(null);
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [tldrExpanded, setTldrExpanded] = useState(false);
  
  const [detailView, setDetailView] = useState<string | null>(null);
  const [activeKPIs, setActiveKPIs] = useState<Record<string, string[]>>({
    attract: ["inboundClicks", "linkedinImpressions", "outboundContacted"],
    convert: ["inboundRegistered", "outboundReplies", "qualifiedLeads"], 
    close: ["newARR", "winRate", "salesCycle"]
  });
  const [showKPIManager, setShowKPIManager] = useState<string | null>(null);
  const [expandedEngineKPI, setExpandedEngineKPI] = useState<string | null>(null);

  // Funnel totals
  const funnelTotals = {
    attract: {
      label: "Total People Addressed",
      value: "4.8K",
      change: { day: 9.2, week: 6.1, month: 14.7 }
    },
    convert: {
      label: "Total People in Contact", 
      value: "1.2K",
      change: { day: 4.3, week: 8.9, month: 16.2 }
    },
    close: {
      label: "Total Leads Closed",
      value: "47", // Keep as is - small number
      change: { day: 3.2, week: 8.5, month: 15.9 }
    }
  };

  const funnelMetrics = {
    attract: {
      inboundClicks: {
        label: "Inbound Clicks", 
        value: "3.1K",
        change: { day: 5.2, week: -2.1, month: 8.9 },
        benchmark: { target: 3500, timeframe: "month" as const, status: "below" as const, editable: true },
        dataSources: ["GA4", "Google Ads"],
        calculation: "1.8K organic + 1.0K paid + 0.3K SEO",
        subMetrics: {
          organic: {
            label: "Organic",
            value: "1.8K",
            percentage: 58,
            change: { day: 3.2, week: -1.5, month: 6.8 }
          },
          ads: {
            label: "Google Ads",
            value: "1.0K",
            percentage: 32,
            change: { day: 7.8, week: -2.9, month: 11.2 }
          },
          seo: {
            label: "SEO Content",
            value: "0.3K",
            percentage: 10,
            change: { day: 4.1, week: -0.8, month: 8.5 }
          }
        }
      },
      linkedinImpressions: {
        label: "LinkedIn Impressions",
        value: "28.3K",
        change: { day: 12.4, week: 18.7, month: 24.1 },
        benchmark: { target: 35000, timeframe: "month" as const, status: "below" as const, editable: true },
        dataSources: ["LinkedIn", "Teamfluence"],
        calculation: "18.5K posts + 9.8K ads",
        subMetrics: {
          posts: {
            label: "Organic Posts",
            value: "18.5K",
            percentage: 65,
            change: { day: 8.2, week: 12.1, month: 18.7 }
          },
          ads: {
            label: "LinkedIn Ads",
            value: "9.8K",
            percentage: 35,
            change: { day: 18.9, week: 25.3, month: 31.2 }
          }
        }
      },
      outboundContacted: {
        label: "Outbound Contacted",
        value: "1.8K",
        change: { day: 15.3, week: 8.7, month: 18.2 },
        benchmark: { target: 1500, timeframe: "month" as const, status: "above" as const, editable: true },
        dataSources: ["Apollo", "Instantly"],
        calculation: "1.2K email + 0.6K LinkedIn",
        subMetrics: {
          email: {
            label: "Email Outreach",
            value: "1.2K",
            percentage: 67,
            change: { day: 12.1, week: 8.3, month: 15.2 }
          },
          linkedin: {
            label: "LinkedIn Outreach",
            value: "0.6K",
            percentage: 33,
            change: { day: 21.4, week: 9.1, month: 22.8 }
          }
        }
      },
      emailsSent: {
        label: "Emails Sent",
        value: "3.2K",
        change: { day: 18.7, week: 12.4, month: 22.1 },
        benchmark: { target: 3000, timeframe: "month" as const, status: "above" as const, editable: true },
        dataSources: ["Instantly", "Lemlist"],
        calculation: "Total outbound emails sent"
      },
      linkedinConnects: {
        label: "LinkedIn Connects",
        value: "0.5K",
        change: { day: 12.3, week: 8.9, month: 15.6 },
        benchmark: { target: 400, timeframe: "month" as const, status: "above" as const, editable: true },
        dataSources: ["LinkedIn", "Sales Navigator"],
        calculation: "LinkedIn connection requests sent"
      }
    },
    convert: {
      inboundRegistered: {
        label: "Inbound Registered Leads",
        value: "0.3K",
        change: { day: 8.4, week: 12.1, month: 18.7 },
        benchmark: { target: 250, timeframe: "month" as const, status: "above" as const, editable: true },
        dataSources: ["HubSpot", "GA4"],
        calculation: "0.18K forms + 67 surveys + 40 demos",
        subMetrics: {
          forms: {
            label: "Contact Forms",
            value: "0.18K",
            percentage: 63,
            change: { day: 5.2, week: 8.1, month: 12.3 }
          },
          surveys: {
            label: "Surveys",
            value: "67",
            percentage: 23,
            change: { day: 12.8, week: 15.2, month: 22.1 }
          },
          demos: {
            label: "Demo Requests",
            value: "40",
            percentage: 14,
            change: { day: 18.3, week: 21.7, month: 28.9 }
          }
        }
      },
      outboundReplies: {
        label: "Outbound Replies",
        value: "0.1K",
        change: { day: 15.2, week: -3.1, month: 22.8 },
        benchmark: { target: 150, timeframe: "month" as const, status: "below" as const, editable: true },
        dataSources: ["Apollo", "Instantly"],
        calculation: "89 email + 35 LinkedIn replies",
        subMetrics: {
          email: {
            label: "Email Replies",
            value: "89",
            percentage: 72,
            change: { day: 12.1, week: -5.2, month: 18.3 }
          },
          linkedin: {
            label: "LinkedIn Replies",
            value: "35",
            percentage: 28,
            change: { day: 22.4, week: 2.1, month: 31.7 }
          }
        }
      },
      qualifiedLeads: {
        label: "Qualified Leads",
        value: "89",
        change: { day: 6.7, week: 9.2, month: 14.3 },
        benchmark: { target: 75, status: "above" as const, editable: true },
        dataSources: ["HubSpot", "Pipedrive"],
        calculation: "52 BANT + 37 MEDDIC qualified",
        subMetrics: {
          bant: {
            label: "BANT Qualified",
            value: "52",
            percentage: 58,
            change: { day: 8.2, week: 12.1, month: 16.8 }
          },
          meddic: {
            label: "MEDDIC Qualified",
            value: "37",
            percentage: 42,
            change: { day: 4.8, week: 5.2, month: 10.9 }
          }
        }
      },
      emailOpenRate: {
        label: "Email Open Rate",
        value: "32.4%",
        change: { day: 2.1, week: 3.8, month: 5.2 },
        benchmark: { target: 30, timeframe: "month" as const, status: "above" as const, editable: true },
        dataSources: ["Instantly", "Lemlist"],
        calculation: "Emails opened / Emails delivered * 100"
      },
      emailReplyRate: {
        label: "Email Reply Rate",
        value: "4.8%",
        change: { day: 0.3, week: 0.7, month: 1.2 },
        benchmark: { target: 4, timeframe: "month" as const, status: "above" as const, editable: true },
        dataSources: ["Instantly", "Lemlist"],
        calculation: "Email replies / Emails sent * 100"
      },
      linkedinAcceptRate: {
        label: "LinkedIn Accept Rate",
        value: "68.2%",
        change: { day: 1.4, week: 2.8, month: 4.1 },
        benchmark: { target: 65, timeframe: "month" as const, status: "above" as const, editable: true },
        dataSources: ["LinkedIn", "Sales Navigator"],
        calculation: "Connection requests accepted / Requests sent * 100"
      }
    },
    close: {
      newARR: {
        label: "New ARR",
        value: "$567K",
        change: { day: 12.3, week: 18.7, month: 24.1 },
        benchmark: { target: 480000, timeframe: "month" as const, status: "above" as const, editable: true },
        dataSources: ["Stripe", "HubSpot"],
        calculation: "Annual recurring revenue from new customers",
        subMetrics: {
          enterprise: {
            label: "Enterprise",
            value: "$340K",
            percentage: 60,
            change: { day: 8.1, week: 15.2, month: 22.7 }
          },
          smb: {
            label: "SMB",
            value: "$170K",
            percentage: 30,
            change: { day: 18.9, week: 24.1, month: 28.3 }
          },
          startup: {
            label: "Startup",
            value: "$57K",
            percentage: 10,
            change: { day: 15.2, week: 12.8, month: 18.9 }
          }
        }
      },
      winRate: {
        label: "Win Rate",
        value: "24.6%",
        change: { day: 0.8, week: 1.2, month: 2.3 },
        benchmark: { target: 30, timeframe: "month" as const, status: "below" as const, editable: true },
        dataSources: ["HubSpot", "Pipedrive"],
        calculation: "24 won / 98 total opportunities",
        subMetrics: {
          enterprise: {
            label: "Enterprise Deals",
            value: "12",
            percentage: 50,
            change: { day: 2.1, week: 4.8, month: 8.2 }
          },
          smb: {
            label: "SMB Deals",
            value: "8",
            percentage: 33,
            change: { day: -1.2, week: -2.1, month: 1.8 }
          },
          startup: {
            label: "Startup Deals",
            value: "4",
            percentage: 17,
            change: { day: 5.2, week: 8.9, month: 12.1 }
          }
        }
      },
      salesCycle: {
        label: "Avg. Sales Cycle",
        value: "42 days",
        change: { day: -1.2, week: -3.8, month: -8.1 },
        benchmark: { target: 45, status: "above" as const, editable: true },
        dataSources: ["HubSpot", "Pipedrive"],
        calculation: "Days from opportunity to closed-won",
        subMetrics: {
          discovery: {
            label: "Discovery Phase",
            value: "18 days",
            percentage: 43,
            change: { day: -0.8, week: -2.1, month: -4.2 }
          },
          proposal: {
            label: "Proposal Phase", 
            value: "15 days",
            percentage: 36,
            change: { day: -0.3, week: -1.2, month: -2.8 }
          },
          negotiation: {
            label: "Negotiation Phase",
            value: "9 days",
            percentage: 21,
            change: { day: -0.1, week: -0.5, month: -1.1 }
          }
        }
      },
      avgDealSize: {
        label: "Avg. Deal Size",
        value: "$12.1K",
        change: { day: 4.2, week: 8.3, month: 15.7 },
        benchmark: { target: 10000, status: "above" as const, editable: true },
        dataSources: ["HubSpot", "Stripe"],
        calculation: "Total ARR / Number of deals closed"
      },
      pipelineVelocity: {
        label: "Pipeline Velocity",
        value: "$8.9K/day",
        change: { day: 12.1, week: 18.4, month: 24.7 },
        benchmark: { target: 7500, status: "above" as const, editable: true },
        dataSources: ["HubSpot", "Pipedrive"],
        calculation: "Pipeline value moved / Days in period"
      },
      meetingsScheduled: {
        label: "Meetings Scheduled",
        value: "0.1K",
        change: { day: 8.4, week: 12.7, month: 18.9 },
        benchmark: { target: 100, status: "above" as const, editable: true },
        dataSources: ["Calendly", "HubSpot", "Pipedrive"],
        calculation: "Total sales meetings booked and completed"
      }
    }
  };

  // Helper function to parse metric values correctly
  const parseMetricValue = (value: string): number => {
    const cleanValue = value.replace(/[^0-9.]/g, '');
    const numValue = parseFloat(cleanValue);
    
    if (value.includes('K')) {
      return numValue * 1000;
    }
    if (value.includes('M')) {
      return numValue * 1000000;
    }
    return numValue;
  };

  // Helper function to scale benchmarks using dreisatz (proportional scaling)
  const getScaledBenchmark = (benchmark: FunnelMetric['benchmark'], targetTimeframe: "day" | "week" | "month"): number => {
    if (!benchmark.timeframe || benchmark.timeframe === targetTimeframe) {
      return benchmark.target;
    }
    
    // Conversion factors (days per period)
    const timeframeDays = {
      day: 1,
      week: 7,
      month: 30
    };
    
    // Scale using dreisatz: original_target / original_days = scaled_target / target_days
    const originalDays = timeframeDays[benchmark.timeframe];
    const targetDays = timeframeDays[targetTimeframe];
    
    return (benchmark.target / originalDays) * targetDays;
  };

  return (
    <div className="p-1 space-y-1 bg-background min-h-screen">

      {/* Filters */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-foreground">Filters</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setFiltersExpanded(!filtersExpanded)}
            className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
          >
            {filtersExpanded ? "−" : "+"}
          </Button>
        </div>
        
        {filtersExpanded && (
          <div className="flex flex-wrap items-center gap-2 p-3 bg-muted/20 rounded-lg">
            {/* Location Filter */}
            <div className="flex items-center gap-1">
              <Globe className="h-3 w-3 text-muted-foreground" />
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-32 h-8 text-xs border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Global">Global</SelectItem>
                  <SelectItem value="North America">North America</SelectItem>
                  <SelectItem value="Europe">Europe</SelectItem>
                  <SelectItem value="Asia Pacific">Asia Pacific</SelectItem>
                </SelectContent>
              </Select>
            </div>
        
            {/* Channel Filter */}
            <div className="flex items-center gap-1">
              <ArrowRight className="h-3 w-3 text-muted-foreground" />
              <Select value={selectedChannel} onValueChange={setSelectedChannel}>
                <SelectTrigger className="w-32 h-8 text-xs border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Channels">All Channels</SelectItem>
                  <SelectItem value="Inbound">Inbound</SelectItem>
                  <SelectItem value="Outbound">Outbound</SelectItem>
                  <SelectItem value="Referral">Referral</SelectItem>
                </SelectContent>
              </Select>
            </div>
        
            {/* Business Unit Filter */}
            <Select value={selectedBusinessUnit} onValueChange={setSelectedBusinessUnit}>
              <SelectTrigger className="w-28 h-8 text-xs border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Units">All Units</SelectItem>
                <SelectItem value="Enterprise">Enterprise</SelectItem>
                <SelectItem value="SMB">SMB</SelectItem>
                <SelectItem value="Startup">Startup</SelectItem>
              </SelectContent>
            </Select>
        
            {/* Timeframe Filter */}
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 text-muted-foreground" />
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-36 h-8 text-xs border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Last 7 days">Last 7 days</SelectItem>
                  <SelectItem value="Last 30 days">Last 30 days</SelectItem>
                  <SelectItem value="Last 90 days">Last 90 days</SelectItem>
                  <SelectItem value="This month">This month</SelectItem>
                  <SelectItem value="Last month">Last month</SelectItem>
                  <SelectItem value="This quarter">This quarter</SelectItem>
                  <SelectItem value="Custom range">Custom range...</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Comparison Filter */}
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-muted-foreground" />
              <Select value={selectedComparison} onValueChange={(value) => setSelectedComparison(value as "day" | "week" | "month")}>
                <SelectTrigger className="w-40 h-8 text-xs border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Day over Day</SelectItem>
                  <SelectItem value="week">Week over Week</SelectItem>
                  <SelectItem value="month">Month over Month</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setConfigMode(!configMode)}
                className="ml-2 h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
              >
                <Settings className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* GTM Funnel - Combined Box */}
      <Card className="border border-border rounded-lg">
        <CardContent className="p-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Attract Stage */}
            <div className="space-y-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h3 className="text-sm font-bold text-foreground">Attract</h3>
                  <ArrowRight className="h-4 w-4 text-muted-foreground hidden lg:block" />
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="text-lg font-bold text-foreground">{funnelTotals.attract.value}</div>
                  <div className={`px-1 py-0.5 rounded text-xs ${
                    funnelTotals.attract.change[selectedComparison] > 0 
                      ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400" 
                      : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400"
                  }`} style={{ fontSize: '10px', padding: '1px 4px' }}>
                    {funnelTotals.attract.change[selectedComparison] > 0 ? "↗" : "↘"}{Math.abs(funnelTotals.attract.change[selectedComparison])}%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Total People Addressed</p>
              </div>
              
              <div className="space-y-2">
                {/* Main KPIs */}
                {activeKPIs.attract.map((kpiKey) => {
                  const metric = funnelMetrics.attract[kpiKey as keyof typeof funnelMetrics.attract];
                  if (!metric) return null;
                  const change = metric.change[selectedComparison];
                  const isExpanded = expandedMetric === `attract-${kpiKey}`;
                  
                  return (
                    <div key={kpiKey} className="space-y-2">
                      <div 
                        className="flex items-center justify-between cursor-pointer hover:bg-muted/20 rounded p-1 transition-colors"
                        onClick={() => setExpandedMetric(isExpanded ? null : `attract-${kpiKey}`)}
                      >
                        <span className="text-xs font-medium text-foreground">{metric.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-foreground">{metric.value}</span>
                          <div className={`px-1 py-0.5 rounded text-xs ${
                            change > 0 ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400" :
                            "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400"
                          }`} style={{ fontSize: '10px', padding: '1px 4px' }}>
                            {change > 0 ? "↗" : "↘"}{Math.abs(change)}%
                          </div>
                          {isExpanded && (
                            <div className="flex items-center gap-1 ml-2">
                              {metric.dataSources.map((source, idx) => (
                                <div key={idx} className="relative group">
                                  <SourceLogo 
                                    source={source} 
                                    className="w-4 h-4 opacity-70 hover:opacity-100 transition-opacity cursor-help" 
                                  />
                                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-background border border-border rounded text-xs text-foreground opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                    <div className="font-medium">{source}</div>
                                    <div className="text-muted-foreground text-xs">
                                      {source === "GA4" && "events, page_views, sessions"}
                                      {source === "Google Ads" && "campaigns, ad_groups, keywords"}
                                      {source === "HubSpot" && "contacts, deals, activities"}
                                      {source === "Pipedrive" && "deals, persons, activities"}
                                      {source === "Apollo" && "contacts, sequences, replies"}
                                      {source === "Instantly" && "campaigns, emails, opens"}
                                      {source === "LinkedIn" && "posts, impressions, connections"}
                                      {source === "Stripe" && "customers, subscriptions, revenue"}
                                      {source === "Calendly" && "events, bookings, attendees"}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Benchmark Bar */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden relative">
                          {/* 100% quota mark at 80% of bar */}
                          <div className="absolute left-[80%] top-0 w-0.5 h-full bg-foreground/60"></div>
                          <div 
                            className="h-full bg-foreground/60 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${Math.min(120, (parseMetricValue(metric.value) / metric.benchmark.target) * 100)}%` 
                            }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {metric.benchmark.target.toLocaleString()}
                        </span>
                      </div>
                      
                      {/* Detail KPIs (sub-metrics) if expanded */}
                      {isExpanded && (metric as any).subMetrics && (
                        <div className="mt-2 space-y-1 pl-2 border-l-2 border-border/30">
                          {Object.entries((metric as any).subMetrics).map(([subKey, subMetric]: [string, any]) => (
                            <div key={subKey} className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">{subMetric.label} ({subMetric.percentage}%)</span>
                              <span className="font-semibold text-foreground">{subMetric.value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Convert Stage */}
            <div className="space-y-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h3 className="text-sm font-bold text-foreground">Convert</h3>
                  <ArrowRight className="h-4 w-4 text-muted-foreground hidden lg:block" />
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="text-lg font-bold text-foreground">{funnelTotals.convert.value}</div>
                  <div className={`px-1 py-0.5 rounded text-xs ${
                    funnelTotals.convert.change[selectedComparison] > 0 
                      ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400" 
                      : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400"
                  }`} style={{ fontSize: '10px', padding: '1px 4px' }}>
                    {funnelTotals.convert.change[selectedComparison] > 0 ? "↗" : "↘"}{Math.abs(funnelTotals.convert.change[selectedComparison])}%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Total People in Contact</p>
              </div>
              
              <div className="space-y-2">
                {/* Main KPIs */}
                {activeKPIs.convert.map((kpiKey) => {
                  const metric = funnelMetrics.convert[kpiKey as keyof typeof funnelMetrics.convert];
                  if (!metric) return null;
                  const change = metric.change[selectedComparison];
                  const isExpanded = expandedMetric === `convert-${kpiKey}`;
                  
                  return (
                    <div key={kpiKey} className="space-y-2">
                      <div 
                        className="flex items-center justify-between cursor-pointer hover:bg-muted/20 rounded p-1 transition-colors"
                        onClick={() => setExpandedMetric(isExpanded ? null : `convert-${kpiKey}`)}
                      >
                        <span className="text-xs font-medium text-foreground">{metric.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-foreground">{metric.value}</span>
                          <div className={`px-1 py-0.5 rounded text-xs ${
                            change > 0 ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400" :
                            "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400"
                          }`} style={{ fontSize: '10px', padding: '1px 4px' }}>
                            {change > 0 ? "↗" : "↘"}{Math.abs(change)}%
                          </div>
                        </div>
                      </div>
                      
                      {/* Benchmark Bar */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden relative">
                          {/* 100% quota mark at 80% of bar */}
                          <div className="absolute left-[80%] top-0 w-0.5 h-full bg-foreground/60"></div>
                          <div 
                            className="h-full bg-foreground/60 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${Math.min(120, (parseMetricValue(metric.value) / metric.benchmark.target) * 100)}%` 
                            }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {metric.benchmark.target.toLocaleString()}
                        </span>
                      </div>
                      
                      {/* Detail KPIs (sub-metrics) if expanded */}
                      {isExpanded && (metric as any).subMetrics && (
                        <div className="mt-2 space-y-1 pl-2 border-l-2 border-border/30">
                          {Object.entries((metric as any).subMetrics).map(([subKey, subMetric]: [string, any]) => (
                            <div key={subKey} className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">{subMetric.label} ({subMetric.percentage}%)</span>
                              <span className="font-semibold text-foreground">{subMetric.value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Close Stage */}
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-sm font-bold text-foreground">Close</h3>
                <div className="flex items-center justify-center gap-2">
                  <div className="text-lg font-bold text-foreground">{funnelTotals.close.value}</div>
                  <div className={`px-1 py-0.5 rounded text-xs ${
                    funnelTotals.close.change[selectedComparison] > 0 
                      ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400" 
                      : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400"
                  }`} style={{ fontSize: '10px', padding: '1px 4px' }}>
                    {funnelTotals.close.change[selectedComparison] > 0 ? "↗" : "↘"}{Math.abs(funnelTotals.close.change[selectedComparison])}%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Total Leads Closed</p>
              </div>
              
              <div className="space-y-2">
                {/* Main KPIs */}
                {activeKPIs.close.map((kpiKey) => {
                  const metric = funnelMetrics.close[kpiKey as keyof typeof funnelMetrics.close];
                  if (!metric) return null;
                  const change = metric.change[selectedComparison];
                  const isExpanded = expandedMetric === `close-${kpiKey}`;
                  
                  return (
                    <div key={kpiKey} className="space-y-2">
                      <div 
                        className="flex items-center justify-between cursor-pointer hover:bg-muted/20 rounded p-1 transition-colors"
                        onClick={() => setExpandedMetric(isExpanded ? null : `close-${kpiKey}`)}
                      >
                        <span className="text-xs font-medium text-foreground">{metric.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-foreground">{metric.value}</span>
                          <div className={`px-1 py-0.5 rounded text-xs ${
                            change > 0 ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400" :
                            "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400"
                          }`} style={{ fontSize: '10px', padding: '1px 4px' }}>
                            {change > 0 ? "↗" : "↘"}{Math.abs(change)}%
                          </div>
                        </div>
                      </div>
                      
                      {/* Benchmark Bar */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden relative">
                          {/* 100% quota mark at 80% of bar */}
                          <div className="absolute left-[80%] top-0 w-0.5 h-full bg-foreground/60"></div>
                          <div 
                            className="h-full bg-foreground/60 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${Math.min(120, (parseMetricValue(metric.value) / metric.benchmark.target) * 100)}%` 
                            }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {metric.benchmark.target.toLocaleString()}
                        </span>
                      </div>
                      
                      {/* Detail KPIs (sub-metrics) if expanded */}
                      {isExpanded && (metric as any).subMetrics && (
                        <div className="mt-2 space-y-1 pl-2 border-l-2 border-border/30">
                          {Object.entries((metric as any).subMetrics).map(([subKey, subMetric]: [string, any]) => (
                            <div key={subKey} className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">{subMetric.label} ({subMetric.percentage}%)</span>
                              <span className="font-semibold text-foreground">{subMetric.value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
        {/* Daily TL;DR */}
        <Card className="h-full flex flex-col cursor-pointer hover:shadow-md transition-shadow" onClick={() => setTldrExpanded(!tldrExpanded)}>
          <CardHeader className="pb-3 pt-4 px-4">
            <CardTitle className="text-sm font-semibold text-foreground flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Daily TL;DR
                {tldrExpanded ? <ChevronUp className="h-3 w-3 text-muted-foreground" /> : <ChevronDown className="h-3 w-3 text-muted-foreground" />}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">GTM Score</span>
                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <span className="text-xs font-bold text-green-800 dark:text-green-400">87</span>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 px-4 pb-4 pt-0 space-y-3">
            {[
              {
                id: "trending-up",
                title: "LinkedIn momentum building",
                subtitle: "+24% growth this month",
                impact: "Best performing channel",
                action: "From 18K to 28K impressions - double down on successful post types from last 2 weeks"
              },
              {
                id: "concerning-trend",
                title: "Outbound replies declining",
                subtitle: "-3.1% this week vs +15.2% daily",
                impact: "Weekly trend reversing",
                action: "Email performance dropped - check if recent subject line changes caused decline"
              },
              {
                id: "seasonal-insight",
                title: "Sales cycle shortening",
                subtitle: "-8.1% to 42 days this month",
                impact: "Deals closing faster",
                action: "Q4 urgency effect - maintain momentum into Q1 with better qualification"
              }
            ].map((item, index) => (
              <div key={item.id} className="group">
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="text-xs font-semibold text-foreground">{item.title}</span>
                    <span className="text-xs text-muted-foreground"> {item.subtitle} - </span>
                    <span className="text-xs font-bold text-foreground">{item.impact}</span>
                    {tldrExpanded && (
                      <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {item.action}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Deep Analysis Button - Only show when expanded */}
            {tldrExpanded && (
              <div className="pt-2 mt-2 border-t border-border/30">
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full h-6 text-xs"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card collapse
                    // TODO: Trigger deep GTM analysis
                    console.log("Running deep GTM analysis...");
                  }}
                >
                  <BarChart3 className="h-3 w-3 mr-1" />
                  Deep Analysis
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Daily Tasks for Improvements */}
        <Card className="h-full flex flex-col">
          <CardHeader className="pb-3 pt-4 px-4">
            <CardTitle className="text-sm font-semibold text-foreground flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Daily Tasks
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
              >
                <Plus className="h-2.5 w-2.5" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 px-4 pb-4 pt-0 space-y-3">
            {[
              { id: "mobile-ux", name: "Mobile UX Audit", status: "done" },
              { id: "email-campaigns", name: "Scale Email Campaigns", status: "running" },
              { id: "social-budget", name: "Social Media Budget Increase", status: "pending" }
            ].map((task) => {
              const currentStatus = taskStatuses[task.id] || task.status;
              return (
                <div 
                  key={task.id} 
                  className="flex items-center justify-between py-1 hover:bg-muted/20 rounded transition-colors cursor-pointer"
                  onClick={() => console.log(`Open task:`, task.name)}
                >
                  <span 
                    className={`text-xs font-medium transition-all ${
                      currentStatus === "done" 
                        ? "text-muted-foreground dark:text-muted-foreground line-through" 
                        : "text-foreground"
                    }`}
                  >
                    {task.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-4 h-4 p-0 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                    style={{
                      borderColor: currentStatus === "done" ? "#22c55e" : 
                                  currentStatus === "running" ? "#3b82f6" : "#6b7280",
                      backgroundColor: currentStatus === "done" ? "#22c55e" : "transparent"
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      const nextStatus = currentStatus === "pending" ? "running" : 
                                       currentStatus === "running" ? "done" : "pending";
                      setTaskStatuses(prev => ({
                        ...prev,
                        [task.id]: nextStatus
                      }));
                    }}
                  >
                    {currentStatus === "done" && (
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    )}
                    {currentStatus === "running" && (
                      <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-pulse"></div>
                    )}
                  </Button>
                </div>
              );
            })}
            
            {/* Summary */}
            <div className="pt-2 mt-2 border-t border-border/30">
              <div className="text-xs text-muted-foreground dark:text-muted-foreground text-center">
                {(() => {
                  const tasks = [
                    { id: "mobile-ux", name: "Mobile UX Audit", status: "done" },
                    { id: "email-campaigns", name: "Scale Email Campaigns", status: "running" },
                    { id: "social-budget", name: "Social Media Budget Increase", status: "pending" }
                  ];
                  const completed = tasks.filter(t => (taskStatuses[t.id] || t.status) === "done").length;
                  const inProgress = tasks.filter(t => (taskStatuses[t.id] || t.status) === "running").length;
                  const pending = tasks.filter(t => (taskStatuses[t.id] || t.status) === "pending").length;
                  
                  return `${completed} completed • ${inProgress} in progress • ${pending} pending`;
                })()}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Market Sentiment Insights */}
        <Card className="h-full flex flex-col">
          <CardHeader className="pb-3 pt-4 px-4">
            <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Market Sentiment
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 px-4 pb-4 pt-0 space-y-3">
            {[
              {
                topic: "AI Marketing Tools",
                sentiment: "Positive",
                change: "+15%",
                source: "Reddit + Google News",
                insight: "Increased interest in automation",
                link: "https://www.reddit.com/r/marketing/comments/ai_marketing_tools",
                confidence: 94,
                mentions: 2847,
                trending: "🔥"
              },
              {
                topic: "B2B SaaS Pricing",
                sentiment: "Cautious", 
                change: "-8%",
                source: "Reddit + Google News",
                insight: "Budget constraints mentioned",
                link: "https://news.ycombinator.com/item?id=saas_pricing_2024",
                confidence: 87,
                mentions: 1203,
                trending: "📉"
              },
              {
                topic: "Remote Sales Effectiveness",
                sentiment: "Optimistic",
                change: "+12%",
                source: "Reddit + Google News", 
                insight: "Hybrid approaches gaining traction",
                link: "https://www.reddit.com/r/sales/comments/remote_effectiveness",
                confidence: 91,
                mentions: 892,
                trending: "📈"
              }
            ].map((item, index) => (
              <div key={index} className="group">
                <a 
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-1 bg-muted/20 rounded hover:bg-muted/40 cursor-pointer transition-colors group border border-transparent hover:border-border"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="text-xs font-medium text-foreground truncate">
                        {item.topic}
                      </span>
                      <span className="text-xs">{item.trending}</span>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Badge 
                        variant="outline" 
                        className="text-xs px-1 py-0.5 bg-muted text-foreground/80 border-border"
                      >
                        {item.sentiment}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5 leading-tight">
                    {item.insight}
                  </div>
                </a>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}