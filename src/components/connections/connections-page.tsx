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
  Calendar,
  Search,
  Filter,
  ArrowRight
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
    },
    {
      id: "linkedin-ads",
      name: "LinkedIn Ads", 
      description: "B2B advertising campaigns, lead generation, professional targeting",
      category: "Marketing",
      status: "disconnected",
      icon: "LinkedIn",
      requiresOAuth: true,
      setupComplexity: "easy"
    },
    {
      id: "klaviyo",
      name: "Klaviyo",
      description: "Email marketing automation, customer segmentation, revenue tracking", 
      category: "Marketing",
      status: "disconnected",
      icon: "Klaviyo",
      requiresOAuth: true,
      setupComplexity: "easy"
    },
    {
      id: "intercom",
      name: "Intercom",
      description: "Customer messaging, support tickets, user engagement data",
      category: "Support", 
      status: "disconnected",
      icon: "Intercom",
      requiresOAuth: true,
      setupComplexity: "medium"
    },
    {
      id: "amplitude",
      name: "Amplitude", 
      description: "Product analytics, user behavior, retention analysis",
      category: "Analytics",
      status: "disconnected",
      icon: "Amplitude",
      requiresOAuth: true,
      setupComplexity: "medium"
    },
    {
      id: "pipedrive",
      name: "Pipedrive",
      description: "Sales pipeline management, deal tracking, activity logging",
      category: "CRM",
      status: "disconnected", 
      icon: "Pipedrive",
      requiresOAuth: true,
      setupComplexity: "easy"
    },
    {
      id: "zendesk",
      name: "Zendesk",
      description: "Customer support tickets, satisfaction scores, agent performance",
      category: "Support",
      status: "disconnected",
      icon: "Zendesk", 
      requiresOAuth: true,
      setupComplexity: "easy"
    },
    {
      id: "shopify",
      name: "Shopify",
      description: "E-commerce sales, product performance, customer orders",
      category: "E-commerce",
      status: "disconnected",
      icon: "Shopify",
      requiresOAuth: true,
      setupComplexity: "easy"
    },
    {
      id: "segment",
      name: "Segment",
      description: "Customer data platform, event tracking, audience building",
      category: "Analytics",
      status: "disconnected",
      icon: "Segment",
      requiresOAuth: true,
      setupComplexity: "medium"
    },
    {
      id: "typeform",
      name: "Typeform", 
      description: "Form responses, survey data, lead capture metrics",
      category: "Marketing",
      status: "disconnected",
      icon: "Typeform",
      requiresOAuth: true,
      setupComplexity: "easy"
    },
    {
      id: "airtable",
      name: "Airtable",
      description: "Database records, project tracking, team collaboration data",
      category: "CRM",
      status: "disconnected",
      icon: "Airtable",
      requiresOAuth: true,
      setupComplexity: "easy"
    },
    {
      id: "notion",
      name: "Notion",
      description: "Documentation, project data, team knowledge base",
      category: "CRM", 
      status: "disconnected",
      icon: "Notion",
      requiresOAuth: true,
      setupComplexity: "medium"
    }
  ]);

  const [testingConnection, setTestingConnection] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

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

  // Map tools to funnel stages
  const stageMapping = {
    "awareness": ["Google Ads", "Facebook Ads", "LinkedIn Ads"],
    "interest": ["Google Analytics 4", "Mixpanel", "Amplitude", "Segment"],
    "consideration": ["Typeform", "Klaviyo", "Mailchimp"],
    "conversion": ["HubSpot", "Salesforce", "Pipedrive", "Airtable"],
    "retention": ["Stripe", "Shopify", "Intercom", "Zendesk", "Notion"]
  };

  // Filter tools based on search and stage
  const filteredConnections = availableConnections.filter(conn => {
    const matchesSearch = conn.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conn.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStage = selectedStage === "all" || 
                        stageMapping[selectedStage as keyof typeof stageMapping]?.includes(conn.name);
    
    const matchesCategory = selectedCategory === "all" || conn.category === selectedCategory;
    
    return matchesSearch && matchesStage && matchesCategory;
  });

  const groupedConnections = filteredConnections.reduce((groups, connection) => {
    const category = connection.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(connection);
    return groups;
  }, {} as Record<string, DataConnection[]>);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 overflow-auto h-full">
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

      {/* Funnel Flow Visualization - Top Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            GTM Funnel Flow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-red-50 via-yellow-50 to-green-50 dark:from-red-950/20 dark:via-yellow-950/20 dark:to-green-950/20 rounded-lg">
            {/* Awareness */}
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold text-sm">Awareness</h3>
              <p className="text-xs text-muted-foreground">Drive Traffic</p>
              <div className="mt-2 text-xs font-medium">
                {stageMapping.awareness.filter(tool => 
                  availableConnections.find(conn => conn.name === tool)?.status === "connected"
                ).length}/{stageMapping.awareness.length} connected
              </div>
            </div>

            <ArrowRight className="h-6 w-6 text-muted-foreground" />

            {/* Interest */}
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl">👀</span>
              </div>
              <h3 className="font-semibold text-sm">Interest</h3>
              <p className="text-xs text-muted-foreground">Track Behavior</p>
              <div className="mt-2 text-xs font-medium">
                {stageMapping.interest.filter(tool => 
                  availableConnections.find(conn => conn.name === tool)?.status === "connected"
                ).length}/{stageMapping.interest.length} connected
              </div>
            </div>

            <ArrowRight className="h-6 w-6 text-muted-foreground" />

            {/* Consideration */}
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl">🤔</span>
              </div>
              <h3 className="font-semibold text-sm">Consideration</h3>
              <p className="text-xs text-muted-foreground">Nurture Leads</p>
              <div className="mt-2 text-xs font-medium">
                {stageMapping.consideration.filter(tool => 
                  availableConnections.find(conn => conn.name === tool)?.status === "connected"
                ).length}/{stageMapping.consideration.length} connected
              </div>
            </div>

            <ArrowRight className="h-6 w-6 text-muted-foreground" />

            {/* Conversion */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="font-semibold text-sm">Conversion</h3>
              <p className="text-xs text-muted-foreground">Close Sales</p>
              <div className="mt-2 text-xs font-medium">
                {stageMapping.conversion.filter(tool => 
                  availableConnections.find(conn => conn.name === tool)?.status === "connected"
                ).length}/{stageMapping.conversion.length} connected
              </div>
            </div>

            <ArrowRight className="h-6 w-6 text-muted-foreground" />

            {/* Retention */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="font-semibold text-sm">Retention</h3>
              <p className="text-xs text-muted-foreground">Keep Customers</p>
              <div className="mt-2 text-xs font-medium">
                {stageMapping.retention.filter(tool => 
                  availableConnections.find(conn => conn.name === tool)?.status === "connected"
                ).length}/{stageMapping.retention.length} connected
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Stage Filter */}
            <Button
              variant={selectedStage === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStage("all")}
            >
              All Stages
            </Button>
            <Button
              variant={selectedStage === "awareness" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStage("awareness")}
            >
              🎯 Awareness
            </Button>
            <Button
              variant={selectedStage === "interest" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStage("interest")}
            >
              👀 Interest
            </Button>
            <Button
              variant={selectedStage === "consideration" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStage("consideration")}
            >
              🤔 Consideration
            </Button>
            <Button
              variant={selectedStage === "conversion" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStage("conversion")}
            >
              💰 Conversion
            </Button>
            <Button
              variant={selectedStage === "retention" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStage("retention")}
            >
              🔄 Retention
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tool Library */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Available Tools Library</h2>
          <div className="text-sm text-muted-foreground">
            {filteredConnections.length} of {availableConnections.length} tools
          </div>
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
