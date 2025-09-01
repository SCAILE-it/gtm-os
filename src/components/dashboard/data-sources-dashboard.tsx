"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Database, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  RefreshCw,
  Settings,
  Plus,
  Globe,
  Mail,
  Search,
  Users,
  Calendar
} from "lucide-react";

// Mock data sources
const dataSources = [
  {
    id: "website",
    name: "Website Analytics",
    provider: "Google Analytics 4",
    icon: Globe,
    status: "connected",
    required: true,
    lastSync: "2 minutes ago",
    coverage: 98,
    records: "156K sessions",
    description: "Website traffic, conversions, and user behavior"
  },
  {
    id: "crm", 
    name: "CRM System",
    provider: "HubSpot",
    icon: Users,
    status: "connected",
    required: true,
    lastSync: "5 minutes ago",
    coverage: 95,
    records: "12.3K contacts",
    description: "Contacts, deals, and sales pipeline data"
  },
  {
    id: "email",
    name: "Email Marketing",
    provider: "Mailchimp",
    icon: Mail,
    status: "connected",
    required: false,
    lastSync: "1 hour ago",
    coverage: 87,
    records: "45K emails",
    description: "Email campaigns, opens, clicks, and conversions"
  },
  {
    id: "ads",
    name: "Paid Advertising",
    provider: "Google Ads",
    icon: Search,
    status: "warning",
    required: false,
    lastSync: "3 hours ago",
    coverage: 76,
    records: "8.9K clicks",
    description: "Ad spend, impressions, clicks, and conversions",
    issues: ["API rate limit reached", "Missing conversion tracking"]
  },
  {
    id: "social",
    name: "Social Media",
    provider: "LinkedIn Sales Navigator",
    icon: Users,
    status: "disconnected",
    required: false,
    lastSync: "Never",
    coverage: 0,
    records: "Not connected",
    description: "Social media engagement and lead generation"
  },
  {
    id: "events",
    name: "Events & Webinars",
    provider: "Eventbrite",
    icon: Calendar,
    status: "disconnected",
    required: false,
    lastSync: "Never",
    coverage: 0,
    records: "Not connected",
    description: "Event attendance and lead capture"
  }
];



const getStatusIcon = (status: string) => {
  switch (status) {
    case "connected": return CheckCircle;
    case "warning": return AlertCircle;
    case "disconnected": return XCircle;
    default: return XCircle;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "connected": return "default";
    case "warning": return "destructive";
    case "disconnected": return "secondary";
    default: return "secondary";
  }
};

export function DataSourcesDashboard() {
  const [refreshing, setRefreshing] = useState<string | null>(null);

  const handleRefresh = async (sourceId: string) => {
    setRefreshing(sourceId);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(null);
  };

  const connectedSources = dataSources.filter(s => s.status === "connected").length;
  const totalSources = dataSources.length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Data Sources</h1>
          <p className="text-muted-foreground">
            Manage your data connections and monitor integration health
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Data Source
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{connectedSources}/{totalSources}</div>
                <div className="text-sm text-muted-foreground">Sources Connected</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">98%</div>
            <div className="text-sm text-muted-foreground">Avg Data Quality</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">2.3M</div>
            <div className="text-sm text-muted-foreground">Total Records</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">5 min</div>
            <div className="text-sm text-muted-foreground">Avg Sync Time</div>
          </CardContent>
        </Card>
      </div>

      {/* Required Sources */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Required Sources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dataSources.filter(source => source.required).map((source) => {
            const StatusIcon = getStatusIcon(source.status);
            return (
              <Card key={source.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <source.icon className="h-5 w-5 text-blue-600" />
                      <div>
                        <CardTitle className="text-base">{source.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{source.provider}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusBadge(source.status)} className="gap-1">
                        <StatusIcon className="h-3 w-3" />
                        {source.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{source.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Data Coverage</span>
                      <span className="font-medium">{source.coverage}%</span>
                    </div>
                    <Progress value={source.coverage} className="h-2" />
                    
                    <div className="flex items-center justify-between text-sm">
                      <span>Records</span>
                      <span className="font-medium">{source.records}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span>Last Sync</span>
                      <span className="font-medium">{source.lastSync}</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleRefresh(source.id)}
                      disabled={refreshing === source.id}
                      className="gap-2"
                    >
                      <RefreshCw className={`h-3 w-3 ${refreshing === source.id ? 'animate-spin' : ''}`} />
                      Sync Now
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Settings className="h-3 w-3" />
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Optional Sources */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Optional Sources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dataSources.filter(source => !source.required).map((source) => {
            const StatusIcon = getStatusIcon(source.status);
            return (
              <Card key={source.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <source.icon className="h-5 w-5 text-blue-600" />
                      <div>
                        <CardTitle className="text-base">{source.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{source.provider}</p>
                      </div>
                    </div>
                    <Badge variant={getStatusBadge(source.status)} className="gap-1">
                      <StatusIcon className="h-3 w-3" />
                      {source.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{source.description}</p>
                  
                  {source.status === "connected" && (
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span>Coverage: {source.coverage}%</span>
                        <span>{source.records}</span>
                      </div>
                      <Progress value={source.coverage} className="h-2" />
                    </div>
                  )}

                  {source.issues && source.issues.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-yellow-600 mb-2">Issues:</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {source.issues.map((issue, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="h-1 w-1 bg-yellow-500 rounded-full" />
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    {source.status === "connected" ? (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleRefresh(source.id)}
                          disabled={refreshing === source.id}
                          className="gap-2"
                        >
                          <RefreshCw className={`h-3 w-3 ${refreshing === source.id ? 'animate-spin' : ''}`} />
                          Sync
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Settings className="h-3 w-3" />
                          Settings
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" className="gap-2">
                        <Plus className="h-3 w-3" />
                        Connect
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
