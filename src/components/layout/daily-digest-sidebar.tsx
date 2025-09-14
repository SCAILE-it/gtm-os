"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronRight, ChevronDown, TrendingUp, TrendingDown, Calendar, MapPin, Building, Zap, Eye, Maximize2, Minimize2, Rocket, BarChart4, Zap as Lightning, Mail, BarChart3, Bell } from "lucide-react";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { cn } from "@/lib/utils";

interface DailyDigestSidebarProps {
  expanded: boolean;
  onToggleExpand: () => void;
  fullscreen: boolean;
  onToggleFullscreen: () => void;
}

export function DailyDigestSidebar({ 
  expanded, 
  onToggleExpand, 
  fullscreen, 
  onToggleFullscreen 
}: DailyDigestSidebarProps) {
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState("all");
  const [selectedChannel, setSelectedChannel] = useState("all");

  // TODO: Replace with API call to /api/kpis
  // Should accept filters: timeRange, location, businessUnit, channel
  // Expected response: { title, value, change, trend, color }[]
  const kpis = [
    {
      title: "Revenue",
      value: "$142.5K",
      change: "+12.3%",
      trend: "up" as const,
      color: "text-muted-foreground"
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "+0.5%",
      trend: "up" as const,
      color: "text-muted-foreground"
    },
    {
      title: "CAC",
      value: "$85",
      change: "-8.2%",
      trend: "down" as const,
      color: "text-muted-foreground"
    },
    {
      title: "Active Users",
      value: "2.1K",
      change: "+15.7%",
      trend: "up" as const,
      color: "text-muted-foreground"
    }
  ];

  // TODO: Replace with API call to /api/insights
  // Should return AI-generated findings and recommendations
  // Expected response: { type, title, description, priority }[]
  const findings = [
    {
      type: "insight",
      title: "Email campaigns performing 23% better",
      description: "Q4 email campaigns showing significant improvement in open rates",
      priority: "high"
    },
    {
      type: "recommendation",
      title: "Increase social media budget",
      description: "Social channels showing 40% higher ROAS than average",
      priority: "medium"
    },
    {
      type: "alert",
      title: "Website conversion drop",
      description: "Mobile conversion rate decreased by 12% this week",
      priority: "high"
    }
  ];

  return (
    <div className={cn(
      "relative bg-card border-r border-border transition-all duration-300 flex flex-col",
      fullscreen ? "w-screen" : expanded ? "w-80" : "w-16",
      fullscreen ? "h-screen" : "h-[calc(100vh-4rem)]"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleExpand}
            className="h-8 w-8 p-0"
          >
            {expanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
          
          {expanded && (
            <>
              <h2 className="text-sm font-semibold">TL;DR</h2>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  title="Subscribe to notifications"
                >
                  <Bell className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggleFullscreen}
                  className="h-8 px-2 text-xs font-medium"
                >
                  {fullscreen ? (
                    <>
                      <Minimize2 className="h-3 w-3 mr-1" />
                      Exit
                    </>
                  ) : (
                    <>
                      <Rocket className="h-3 w-3 mr-1" />
                      Analytics
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Filters - Less prominent */}
        {expanded && (
          <div className="mt-3 space-y-2">
            <details className="group">
              <summary className="flex items-center justify-between text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                <span>Filters</span>
                <ChevronRight className="h-3 w-3 group-open:rotate-90 transition-transform" />
              </summary>
              <div className="mt-2 space-y-2">
                <div className="grid grid-cols-2 gap-1">
                  <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                    <SelectTrigger className="h-7 text-xs border-muted">
                      <Calendar className="h-3 w-3 mr-1" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1d">1 Day</SelectItem>
                      <SelectItem value="7d">7 Days</SelectItem>
                      <SelectItem value="30d">30 Days</SelectItem>
                      <SelectItem value="90d">90 Days</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="h-7 text-xs border-muted">
                      <MapPin className="h-3 w-3 mr-1" />
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="eu">Europe</SelectItem>
                      <SelectItem value="asia">Asia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-1">
                  <Select value={selectedBusinessUnit} onValueChange={setSelectedBusinessUnit}>
                    <SelectTrigger className="h-7 text-xs border-muted">
                      <Building className="h-3 w-3 mr-1" />
                      <SelectValue placeholder="Business Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Units</SelectItem>
                      <SelectItem value="saas">SaaS</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedChannel} onValueChange={setSelectedChannel}>
                    <SelectTrigger className="h-7 text-xs border-muted">
                      <Zap className="h-3 w-3 mr-1" />
                      <SelectValue placeholder="Channel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Channels</SelectItem>
                      <SelectItem value="organic">Organic</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="social">Social</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </details>
          </div>
        )}
      </div>

      {/* Content */}
      {expanded && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* KPIs */}
          <div className="space-y-3">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Key Metrics
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {kpis.map((kpi, index) => (
                <Card key={index} className="p-3">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">{kpi.title}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">{kpi.value}</span>
                      <div className="flex items-center text-xs text-muted-foreground">
                        {kpi.trend === "up" ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {kpi.change}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Chart of the Day */}
          <div className="space-y-3">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Chart of the Day
            </h3>
            <Card className="p-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">Revenue Trend</span>
                  <Badge variant="secondary" className="text-xs">7 Days</Badge>
                </div>
                <div className="space-y-2">
                  <div className="h-12 bg-muted/30 rounded flex items-end justify-between px-2 pb-1">
                    {[18.5, 22.4, 19.8, 21.2, 24.6, 20.8, 26.1].map((value, index) => {
                      const height = (value / 26.1) * 100; // Normalize to highest value
                      return (
                        <div
                          key={index}
                          className="bg-primary rounded-t w-2"
                          style={{ height: `${Math.max(height * 0.4, 6)}px` }}
                        />
                      );
                    })}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground px-1">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                      <span key={index}>{day}</span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Revenue up 12.3% this week
                </p>
              </div>
            </Card>
          </div>


          {/* Findings & Recommendations */}
          <div className="space-y-3">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Findings & Recommendations
            </h3>
            <div className="space-y-2">
              {findings.map((finding, index) => (
                <Card key={index} className="p-3">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                    <Badge 
                      variant="secondary"
                      className="text-xs"
                    >
                      {finding.type}
                    </Badge>
                      <Eye className="h-3 w-3 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs font-medium">{finding.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {finding.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
