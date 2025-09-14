"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  MapPin, 
  Building, 
  Zap, 
  Eye, 
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Users,
  Target,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  AlertTriangle,
  CheckCircle,
  Clock,
  Sparkles,
  Filter,
  Download,
  Share,
  RefreshCw,
  X,
  Bot,
  Settings
} from "lucide-react";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { cn } from "@/lib/utils";

interface FullDailyDigestProps {
  onClose: () => void;
}

export function FullDailyDigest({ onClose }: FullDailyDigestProps) {
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState("all");
  const [selectedChannel, setSelectedChannel] = useState("all");
  const [showDashboardAgent, setShowDashboardAgent] = useState(false);

  // Enhanced KPI data
  const kpis = [
    {
      title: "Revenue",
      value: "$142.5K",
      change: "+12.3%",
      trend: "up" as const,
      icon: DollarSign,
      color: "text-green-600",
      description: "Monthly recurring revenue",
      target: "$150K",
      progress: 95
    },
    {
      title: "Active Users",
      value: "2,147",
      change: "+15.7%",
      trend: "up" as const,
      icon: Users,
      color: "text-blue-600",
      description: "Monthly active users",
      target: "2,500",
      progress: 86
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "+0.5%",
      trend: "up" as const,
      icon: Target,
      color: "text-purple-600",
      description: "Lead to customer conversion",
      target: "4.0%",
      progress: 81
    },
    {
      title: "CAC",
      value: "$85",
      change: "-8.2%",
      trend: "down" as const,
      icon: Activity,
      color: "text-green-600",
      description: "Customer acquisition cost",
      target: "$75",
      progress: 88
    }
  ];

  // Enhanced channel data
  const channels = [
    { 
      name: "Email", 
      value: 45, 
      color: "bg-blue-500",
      revenue: "$64.1K",
      change: "+23%",
      users: 1205
    },
    { 
      name: "Social", 
      value: 30, 
      color: "bg-green-500",
      revenue: "$42.8K",
      change: "+40%",
      users: 892
    },
    { 
      name: "Organic", 
      value: 15, 
      color: "bg-yellow-500",
      revenue: "$21.4K",
      change: "+8%",
      users: 456
    },
    { 
      name: "Paid", 
      value: 10, 
      color: "bg-red-500",
      revenue: "$14.2K",
      change: "-5%",
      users: 234
    }
  ];

  // Enhanced insights
  const insights = [
    {
      title: "Email Campaign Performance Surge",
      description: "Q4 email campaigns showing 23% improvement in open rates with highest engagement on Tuesday mornings",
      impact: "High",
      trend: "positive",
      metric: "+23%",
      type: "opportunity",
      recommendation: "Scale successful Tuesday morning campaigns and replicate format"
    },
    {
      title: "Social Media ROI Excellence",
      description: "Social channels delivering 40% higher ROAS than average, particularly LinkedIn and Twitter for B2B",
      impact: "High", 
      trend: "positive",
      metric: "+40%",
      type: "success",
      recommendation: "Increase social media budget allocation by 25%"
    },
    {
      title: "Mobile Conversion Decline",
      description: "Mobile conversion rate decreased by 12% this week, primarily affecting checkout completion",
      impact: "Medium",
      trend: "negative", 
      metric: "-12%",
      type: "alert",
      recommendation: "Urgent: Review mobile checkout flow and implement A/B tests"
    },
    {
      title: "Geographic Performance Shift",
      description: "European market showing 18% growth while US market remains flat",
      impact: "Medium",
      trend: "positive",
      metric: "+18%",
      type: "insight",
      recommendation: "Investigate European success factors for US market application"
    }
  ];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "opportunity":
        return <Sparkles className="h-4 w-4 text-yellow-600" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Eye className="h-4 w-4 text-blue-600" />;
    }
  };

  return (
    <div className="flex h-full bg-background">
      {/* Main Dashboard Content */}
      <div className={cn("flex-1 overflow-auto", showDashboardAgent ? "mr-80" : "")}>
        <div className="p-6 space-y-6">
          {/* Compact Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                TL;DR Analytics
              </h1>
            </div>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </div>

      {/* Compact Filters */}
      <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filters:</span>
        </div>
        
        <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
          <SelectTrigger className="w-40 h-8">
            <Calendar className="h-3 w-3 mr-1" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1d">24 Hours</SelectItem>
            <SelectItem value="7d">7 Days</SelectItem>
            <SelectItem value="30d">30 Days</SelectItem>
            <SelectItem value="90d">90 Days</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className="w-40 h-8">
            <MapPin className="h-3 w-3 mr-1" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="eu">Europe</SelectItem>
            <SelectItem value="asia">Asia Pacific</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedBusinessUnit} onValueChange={setSelectedBusinessUnit}>
          <SelectTrigger className="w-40 h-8">
            <Building className="h-3 w-3 mr-1" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Units</SelectItem>
            <SelectItem value="saas">SaaS</SelectItem>
            <SelectItem value="ecommerce">E-commerce</SelectItem>
            <SelectItem value="consulting">Consulting</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedChannel} onValueChange={setSelectedChannel}>
          <SelectTrigger className="w-40 h-8">
            <Zap className="h-3 w-3 mr-1" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Channels</SelectItem>
            <SelectItem value="organic">Organic</SelectItem>
            <SelectItem value="paid">Paid Media</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="social">Social</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Enhanced KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <kpi.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-3xl font-bold">{kpi.value}</div>
              <div className="flex items-center space-x-2">
                <div className={cn("flex items-center text-sm", kpi.color)}>
                  {kpi.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  {kpi.change}
                </div>
                <span className="text-sm text-muted-foreground">vs last period</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Target: {kpi.target}</span>
                  <span className="font-medium">{kpi.progress}%</span>
                </div>
                <Progress value={kpi.progress} className="h-2" />
              </div>
              <p className="text-xs text-muted-foreground">{kpi.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enhanced Channel Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Channel Performance Deep Dive
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {channels.map((channel, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={cn("w-4 h-4 rounded-full", channel.color)} />
                      <span className="font-medium">{channel.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{channel.revenue}</div>
                      <div className={cn(
                        "text-sm flex items-center",
                        channel.change.startsWith('+') ? "text-green-600" : "text-red-600"
                      )}>
                        {channel.change.startsWith('+') ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {channel.change}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{channel.users} users</span>
                    <span>{channel.value}% of total</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={cn("h-2 rounded-full", channel.color)}
                      style={{ width: `${channel.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chart of the Day - Enhanced */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5" />
              Chart of the Day: Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">Last 7 Days</Badge>
                <div className="text-sm text-muted-foreground">
                  Peak: Tuesday 2PM
                </div>
              </div>
              <div className="h-40 w-full">
                <RevenueChart height={160} showTooltip={true} />
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold text-green-600">+12.3%</div>
                  <div className="text-xs text-muted-foreground">Growth</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">$20.4K</div>
                  <div className="text-xs text-muted-foreground">Daily Avg</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-blue-600">95%</div>
                  <div className="text-xs text-muted-foreground">Target</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Strategic Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {insights.map((insight, index) => (
              <Card key={index} className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getInsightIcon(insight.type)}
                        <h4 className="font-semibold">{insight.title}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={insight.impact === "High" ? "destructive" : "secondary"}
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
                    
                    <p className="text-sm text-muted-foreground">
                      {insight.description}
                    </p>
                    
                    <div className="bg-muted/50 p-3 rounded-md">
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="h-3 w-3 text-primary" />
                        <span className="text-xs font-medium text-primary">Recommendation</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {insight.recommendation}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5" />
            Advanced Analytics Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 flex items-center justify-center bg-muted/50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-muted-foreground mb-2">
                Interactive Analytics Dashboard
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Advanced charts, cohort analysis, and predictive insights will be rendered here
              </p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" size="sm">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Revenue Analytics
                </Button>
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  User Cohorts
                </Button>
                <Button variant="outline" size="sm">
                  <Target className="h-4 w-4 mr-2" />
                  Funnel Analysis
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
        </div>
      </div>

      {/* Dashboard Agent Panel */}
      {showDashboardAgent && (
        <div className="w-80 border-l border-border bg-card flex flex-col h-screen">
          {/* Agent Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">Data Analyst</h3>
                <p className="text-xs text-muted-foreground">Customize charts & analyze numbers</p>
              </div>
            </div>
          </div>

          {/* Agent Content */}
          <div className="flex-1 p-4 space-y-4">
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground uppercase">Quick Actions</h4>
              <div className="space-y-1">
                <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                  <BarChart3 className="h-3 w-3 mr-2" />
                  Add new KPI card
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                  <PieChart className="h-3 w-3 mr-2" />
                  Change chart type
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                  <Settings className="h-3 w-3 mr-2" />
                  Customize layout
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground uppercase">Ask Agent</h4>
              <div className="space-y-1">
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-auto p-2">
                  "Add conversion funnel chart"
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-auto p-2">
                  "Show cohort analysis"
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-auto p-2">
                  "Create custom KPI for LTV"
                </Button>
              </div>
            </div>
          </div>

          {/* Agent Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Customize charts or ask about the data..."
                className="flex-1 px-3 py-2 text-xs border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button size="sm">
                <Send className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
