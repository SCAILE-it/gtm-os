"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Database, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  ExternalLink,
  RefreshCw,
  Play,
  Zap,
  BarChart3,
  Mail,
  ShoppingCart,
  Globe,
  Users,
  MessageSquare,
  Calendar
} from "lucide-react";
import { SourceLogo } from "@/components/ui/source-logo";
import { cn } from "@/lib/utils";

interface DataConnection {
  id: string;
  name: string;
  description: string;
  category: "Analytics" | "CRM" | "Marketing" | "E-commerce" | "Support" | "Social";
  status: "connected" | "disconnected" | "testing" | "error";
  icon: string;
  requiresOAuth: boolean;
  setupComplexity: "easy" | "medium" | "advanced";
  lastSync?: string;
  recordCount?: number;
  syncFrequency?: string;
}

export function ConnectionsPage() {
  // TODO: Replace with API call to /api/connections/available
  // Should return all available data sources that can be connected via Airbyte
  // Expected response: DataConnection[]
  const [availableConnections, setAvailableConnections] = useState<DataConnection[]>([
    {
      id: "google-analytics",
      name: "Google Analytics 4",
      description: "Website and app analytics, user behavior, conversion tracking",
      category: "Analytics",
      status: "connected",
      icon: "Google Analytics",
      requiresOAuth: true,
      setupComplexity: "easy",
      lastSync: "2 minutes ago",
      recordCount: 1250000,
      syncFrequency: "Every 6 hours"
    },
    {
      id: "hubspot",
      name: "HubSpot CRM",
      description: "Customer data, deals, contact interactions, sales pipeline",
      category: "CRM", 
      status: "connected",
      icon: "HubSpot",
      requiresOAuth: true,
      setupComplexity: "easy",
      lastSync: "15 minutes ago",
      recordCount: 45000,
      syncFrequency: "Every 2 hours"
    },
    {
      id: "stripe",
      name: "Stripe",
      description: "Payment data, subscription metrics, customer transactions",
      category: "E-commerce",
      status: "disconnected",
      icon: "Stripe", 
      requiresOAuth: true,
      setupComplexity: "easy"
    },
    {
      id: "mailchimp",
      name: "Mailchimp",
      description: "Email campaigns, open rates, click-through rates, subscriber data",
      category: "Marketing",
      status: "disconnected",
      icon: "Mailchimp",
      requiresOAuth: true,
      setupComplexity: "easy"
    },
    {
      id: "mixpanel",
      name: "Mixpanel",
      description: "Product analytics, user journeys, event tracking, cohort analysis",
      category: "Analytics",
      status: "testing",
      icon: "Mixpanel",
      requiresOAuth: true,
      setupComplexity: "medium"
    },
    {
      id: "salesforce",
      name: "Salesforce",
      description: "CRM data, leads, opportunities, account management",
      category: "CRM",
      status: "error",
      icon: "Salesforce",
      requiresOAuth: true,
      setupComplexity: "medium",
      lastSync: "Failed 2 hours ago"
    },
    {
      id: "facebook-ads",
      name: "Facebook Ads",
      description: "Ad performance, audience insights, campaign metrics",
      category: "Marketing",
      status: "disconnected",
      icon: "Facebook",
      requiresOAuth: true,
      setupComplexity: "easy"
    },
    {
      id: "google-ads",
      name: "Google Ads",
      description: "Search ads performance, keyword data, campaign ROI",
      category: "Marketing", 
      status: "disconnected",
      icon: "Google Ads",
      requiresOAuth: true,
      setupComplexity: "easy"
    }
  ]);

  const [testingConnection, setTestingConnection] = useState<string | null>(null);

  const getStatusColor = (status: DataConnection["status"]) => {
    switch (status) {
      case "connected":
        return "text-green-600 bg-green-50 border-green-200";
      case "disconnected":
        return "text-gray-600 bg-gray-50 border-gray-200";
      case "testing":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "error":
        return "text-red-600 bg-red-50 border-red-200";
    }
  };

  const getStatusIcon = (status: DataConnection["status"]) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-4 w-4" />;
      case "disconnected":
        return <Database className="h-4 w-4" />;
      case "testing":
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case "error":
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getCategoryIcon = (category: DataConnection["category"]) => {
    switch (category) {
      case "Analytics":
        return <BarChart3 className="h-4 w-4" />;
      case "CRM":
        return <Users className="h-4 w-4" />;
      case "Marketing":
        return <Mail className="h-4 w-4" />;
      case "E-commerce":
        return <ShoppingCart className="h-4 w-4" />;
      case "Support":
        return <MessageSquare className="h-4 w-4" />;
      case "Social":
        return <Globe className="h-4 w-4" />;
    }
  };

  // TODO: Replace with API call to /api/connections/oauth-url
  // Should return OAuth URL for the specific provider
  // Body: { connectionId: string }
  // Response: { authUrl: string, state: string }
  const handleConnect = async (connectionId: string) => {
    setTestingConnection(connectionId);
    
    // Simulate OAuth flow
    setTimeout(() => {
      setAvailableConnections(prev => 
        prev.map(conn => 
          conn.id === connectionId 
            ? { ...conn, status: "connected", lastSync: "Just now", recordCount: Math.floor(Math.random() * 100000) }
            : conn
        )
      );
      setTestingConnection(null);
    }, 3000);
  };

  // TODO: Replace with API call to /api/connections/test
  // Should test existing connection and return status
  // Body: { connectionId: string }
  // Response: { status: "success" | "error", message: string, recordCount?: number }
  const handleTestConnection = async (connectionId: string) => {
    setTestingConnection(connectionId);
    
    setTimeout(() => {
      setAvailableConnections(prev => 
        prev.map(conn => 
          conn.id === connectionId 
            ? { ...conn, lastSync: "Just now" }
            : conn
        )
      );
      setTestingConnection(null);
    }, 2000);
  };

  // TODO: Replace with API call to /api/connections/disconnect
  // Should disconnect and clean up the connection
  // Body: { connectionId: string }
  const handleDisconnect = (connectionId: string) => {
    setAvailableConnections(prev => 
      prev.map(conn => 
        conn.id === connectionId 
          ? { ...conn, status: "disconnected", lastSync: undefined, recordCount: undefined }
          : conn
      )
    );
  };

  const connectedCount = availableConnections.filter(conn => conn.status === "connected").length;
  const totalRecords = availableConnections
    .filter(conn => conn.recordCount)
    .reduce((sum, conn) => sum + (conn.recordCount || 0), 0);

  const groupedConnections = availableConnections.reduce((groups, connection) => {
    const category = connection.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(connection);
    return groups;
  }, {} as Record<string, DataConnection[]>);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Database className="h-6 w-6" />
            Data Connections
          </h1>
          <p className="text-muted-foreground">
            Connect your tools to enable AI-powered insights. We handle the data warehouse setup.
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{connectedCount}</div>
          <div className="text-sm text-muted-foreground">Connected Sources</div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Records</p>
                <p className="text-2xl font-bold">{(totalRecords / 1000000).toFixed(1)}M</p>
              </div>
              <Database className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Connections</p>
                <p className="text-2xl font-bold">{connectedCount}/{availableConnections.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Data Warehouse</p>
                <p className="text-lg font-semibold text-green-600">Airbyte Ready</p>
              </div>
              <Zap className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Connection Categories */}
      {Object.entries(groupedConnections).map(([category, connections]) => (
        <div key={category} className="space-y-4">
          <div className="flex items-center gap-2">
            {getCategoryIcon(category as DataConnection["category"])}
            <h2 className="text-lg font-semibold">{category}</h2>
            <Badge variant="secondary">{connections.length} sources</Badge>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {connections.map((connection) => (
              <Card key={connection.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-muted/50 rounded-lg flex items-center justify-center p-2">
                          <SourceLogo source={connection.icon} className="w-8 h-8" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{connection.name}</h3>
                          <p className="text-sm text-muted-foreground">{connection.description}</p>
                        </div>
                      </div>
                      
                      <Badge 
                        variant="outline" 
                        className={getStatusColor(connection.status)}
                      >
                        {getStatusIcon(connection.status)}
                        <span className="ml-1 capitalize">{connection.status}</span>
                      </Badge>
                    </div>

                    {/* Connection Details */}
                    {connection.status === "connected" && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Last Sync:</span>
                          <span>{connection.lastSync}</span>
                        </div>
                        {connection.recordCount && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Records:</span>
                            <span>{connection.recordCount.toLocaleString()}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Sync Frequency:</span>
                          <span>{connection.syncFrequency}</span>
                        </div>
                      </div>
                    )}

                    {/* Testing Progress */}
                    {testingConnection === connection.id && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin text-primary" />
                          <span className="text-sm">
                            {connection.status === "disconnected" ? "Connecting..." : "Testing connection..."}
                          </span>
                        </div>
                        <Progress value={66} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          Authenticating with {connection.name} and testing data access...
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {connection.setupComplexity} setup
                        </Badge>
                        {connection.requiresOAuth && (
                          <Badge variant="outline" className="text-xs">
                            OAuth
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {connection.status === "connected" && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleTestConnection(connection.id)}
                              disabled={testingConnection === connection.id}
                            >
                              <RefreshCw className="h-3 w-3 mr-1" />
                              Test
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDisconnect(connection.id)}
                            >
                              Disconnect
                            </Button>
                          </>
                        )}
                        
                        {connection.status === "disconnected" && (
                          <Button 
                            onClick={() => handleConnect(connection.id)}
                            disabled={testingConnection === connection.id}
                            size="sm"
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Connect
                          </Button>
                        )}
                        
                        {connection.status === "error" && (
                          <Button 
                            variant="destructive"
                            onClick={() => handleConnect(connection.id)}
                            disabled={testingConnection === connection.id}
                            size="sm"
                          >
                            <Play className="h-3 w-3 mr-1" />
                            Retry
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {/* Data Flow Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Data Flow & Funnel Mapping
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Funnel Stages */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {/* Awareness Stage */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-center">Awareness</h3>
                <div className="space-y-2">
                  {availableConnections
                    .filter(conn => ["Google Ads", "Facebook Ads"].includes(conn.name))
                    .map(conn => (
                      <div key={conn.id} className={cn(
                        "flex items-center gap-2 p-2 rounded-md border",
                        conn.status === "connected" ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                      )}>
                        <SourceLogo source={conn.icon} className="w-4 h-4" />
                        <span className="text-xs font-medium">{conn.name}</span>
                        {conn.status === "connected" && (
                          <CheckCircle className="h-3 w-3 text-green-600 ml-auto" />
                        )}
                      </div>
                    ))}
                </div>
              </div>

              {/* Consideration Stage */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-center">Consideration</h3>
                <div className="space-y-2">
                  {availableConnections
                    .filter(conn => ["Google Analytics 4", "Mixpanel"].includes(conn.name))
                    .map(conn => (
                      <div key={conn.id} className={cn(
                        "flex items-center gap-2 p-2 rounded-md border",
                        conn.status === "connected" ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                      )}>
                        <SourceLogo source={conn.icon} className="w-4 h-4" />
                        <span className="text-xs font-medium">{conn.name}</span>
                        {conn.status === "connected" && (
                          <CheckCircle className="h-3 w-3 text-green-600 ml-auto" />
                        )}
                      </div>
                    ))}
                </div>
              </div>

              {/* Conversion Stage */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-center">Conversion</h3>
                <div className="space-y-2">
                  {availableConnections
                    .filter(conn => ["HubSpot", "Salesforce"].includes(conn.name))
                    .map(conn => (
                      <div key={conn.id} className={cn(
                        "flex items-center gap-2 p-2 rounded-md border",
                        conn.status === "connected" ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                      )}>
                        <SourceLogo source={conn.icon} className="w-4 h-4" />
                        <span className="text-xs font-medium">{conn.name}</span>
                        {conn.status === "connected" && (
                          <CheckCircle className="h-3 w-3 text-green-600 ml-auto" />
                        )}
                      </div>
                    ))}
                </div>
              </div>

              {/* Retention Stage */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-center">Retention</h3>
                <div className="space-y-2">
                  {availableConnections
                    .filter(conn => ["Stripe", "Mailchimp"].includes(conn.name))
                    .map(conn => (
                      <div key={conn.id} className={cn(
                        "flex items-center gap-2 p-2 rounded-md border",
                        conn.status === "connected" ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                      )}>
                        <SourceLogo source={conn.icon} className="w-4 h-4" />
                        <span className="text-xs font-medium">{conn.name}</span>
                        {conn.status === "connected" && (
                          <CheckCircle className="h-3 w-3 text-green-600 ml-auto" />
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Flow Arrows */}
            <div className="flex justify-center">
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="text-sm">Traffic</span>
                <div className="h-px w-8 bg-primary"></div>
                <span className="text-sm">Engagement</span>
                <div className="h-px w-8 bg-primary"></div>
                <span className="text-sm">Leads</span>
                <div className="h-px w-8 bg-primary"></div>
                <span className="text-sm">Revenue</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Warehouse Info */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Automated Data Warehouse
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            We automatically configure your data warehouse using Airbyte. No complex setup required - just connect your tools and we handle the rest.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Automatic schema detection</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Real-time sync monitoring</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Data quality validation</span>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-3 w-3 mr-1" />
              View Sync Schedule
            </Button>
            <Button variant="outline" size="sm">
              <BarChart3 className="h-3 w-3 mr-1" />
              Data Warehouse Status
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
