"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Target, 
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AgenticDashboard() {
  // Mock data for dashboard
  const kpis = [
    {
      title: "Revenue",
      value: "$142.5K",
      change: "+12.3%",
      trend: "up" as const,
      icon: DollarSign,
      description: "Monthly recurring revenue"
    },
    {
      title: "Active Users",
      value: "2,147",
      change: "+15.7%",
      trend: "up" as const,
      icon: Users,
      description: "Monthly active users"
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "+0.5%",
      trend: "up" as const,
      icon: Target,
      description: "Lead to customer conversion"
    },
    {
      title: "CAC",
      value: "$85",
      change: "-8.2%",
      trend: "down" as const,
      icon: Activity,
      description: "Customer acquisition cost"
    }
  ];

  const channels = [
    { name: "Email", value: 45, color: "bg-blue-500" },
    { name: "Social", value: 30, color: "bg-green-500" },
    { name: "Organic", value: 15, color: "bg-yellow-500" },
    { name: "Paid", value: 10, color: "bg-red-500" }
  ];

  const insights = [
    {
      title: "Email Campaign Performance",
      description: "Q4 email campaigns showing 23% improvement in open rates",
      impact: "High",
      trend: "positive",
      metric: "+23%"
    },
    {
      title: "Social Media ROI",
      description: "Social channels delivering 40% higher ROAS than average",
      impact: "High",
      trend: "positive",
      metric: "+40%"
    },
    {
      title: "Mobile Conversion Issue",
      description: "Mobile conversion rate decreased by 12% this week",
      impact: "Medium",
      trend: "negative",
      metric: "-12%"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Dashboard Overview</h2>
          <p className="text-muted-foreground">
            Real-time insights and key performance metrics
          </p>
        </div>
        <Badge variant="outline" className="text-xs">
          Last updated: 2 min ago
        </Badge>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center space-x-2 text-xs">
                <div className={cn(
                  "flex items-center",
                  kpi.trend === "up" ? "text-green-600" : "text-red-600"
                )}>
                  {kpi.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  {kpi.change}
                </div>
                <span className="text-muted-foreground">vs last month</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {kpi.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Channel Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Channel Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {channels.map((channel, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={cn("w-3 h-3 rounded-full", channel.color)} />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{channel.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {channel.value}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mt-1">
                      <div
                        className={cn("h-2 rounded-full", channel.color)}
                        style={{ width: `${channel.value}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Key Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <div key={index} className="border-l-2 border-primary pl-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold">{insight.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {insight.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Badge 
                        variant={insight.impact === "High" ? "destructive" : "secondary"}
                        className="text-xs"
                      >
                        {insight.impact}
                      </Badge>
                      <div className={cn(
                        "text-sm font-semibold",
                        insight.trend === "positive" ? "text-green-600" : "text-red-600"
                      )}>
                        {insight.metric}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5" />
            Revenue Trend (Last 30 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Interactive chart will be rendered here
              </p>
              <Button variant="outline" size="sm" className="mt-2">
                View Full Analytics
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
