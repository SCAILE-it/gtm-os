"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Database, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink,
  Zap,
  Globe,
  Mail,
  Users,
  BarChart3,
  Search,
  MessageSquare,
  Calendar
} from "lucide-react";
import { SourceLogo } from "@/components/ui/source-logo";

interface Connector {
  id: string;
  name: string;
  description: string;
  category: "Analytics" | "CRM" | "Marketing" | "Outbound";
  status: "connected" | "available" | "coming-soon";
  icon: string;
  website: string;
}

export function ConnectionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [connectors] = useState<Connector[]>([
    // Current Connectors
    {
      id: "ga4",
      name: "Google Analytics 4",
      description: "Website analytics, user behavior, conversion tracking",
      category: "Analytics",
      status: "connected",
      icon: "Google Analytics",
      website: "https://analytics.google.com"
    },
    {
      id: "gsc",
      name: "Google Search Console",
      description: "Search performance, keywords, indexing data",
      category: "Analytics", 
      status: "connected",
      icon: "google search console",
      website: "https://search.google.com/search-console"
    },
    {
      id: "hubspot",
      name: "HubSpot",
      description: "CRM, contacts, deals, marketing automation",
      category: "CRM",
      status: "connected", 
      icon: "hubspot",
      website: "https://hubspot.com"
    },
    {
      id: "teamfluence",
      name: "Teamfluence",
      description: "Team collaboration and influence tracking",
      category: "Marketing",
      status: "available",
      icon: "teamfluence",
      website: "https://teamfluence.com"
    },
    {
      id: "instantly",
      name: "Instantly",
      description: "Email outreach and cold email automation",
      category: "Outbound",
      status: "available",
      icon: "instantly",
      website: "https://instantly.ai"
    },
    {
      id: "phantombuster",
      name: "PhantomBuster",
      description: "LinkedIn automation and lead generation",
      category: "Outbound",
      status: "available",
      icon: "phantombuster",
      website: "https://phantombuster.com"
    },
    
    // Coming Soon
    {
      id: "pipedrive",
      name: "Pipedrive",
      description: "Sales CRM and pipeline management",
      category: "CRM",
      status: "coming-soon",
      icon: "pipedrive",
      website: "https://pipedrive.com"
    },
    {
      id: "attio",
      name: "Attio",
      description: "Modern CRM for startups and scale-ups",
      category: "CRM", 
      status: "coming-soon",
      icon: "attio",
      website: "https://attio.com"
    },
    {
      id: "apollo",
      name: "Apollo",
      description: "Sales intelligence and lead database",
      category: "Outbound",
      status: "coming-soon",
      icon: "apollo",
      website: "https://apollo.io"
    },
    {
      id: "clay",
      name: "Clay",
      description: "Data enrichment and lead qualification",
      category: "Outbound",
      status: "coming-soon",
      icon: "clay",
      website: "https://clay.com"
    }
  ]);

  const getStatusBadge = (status: Connector["status"]) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="h-3 w-3 mr-1" />Connected</Badge>;
      case "available":
        return <Badge variant="outline">Available</Badge>;
      case "coming-soon":
        return <Badge variant="secondary">Coming Soon</Badge>;
    }
  };

  const getCategoryIcon = (category: Connector["category"]) => {
    switch (category) {
      case "Analytics": return <BarChart3 className="h-4 w-4" />;
      case "CRM": return <Users className="h-4 w-4" />;
      case "Marketing": return <MessageSquare className="h-4 w-4" />;
      case "Outbound": return <Mail className="h-4 w-4" />;
    }
  };

  // Filter connectors based on search query
  const filteredConnectors = connectors.filter(connector =>
    connector.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    connector.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    connector.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const connectedCount = connectors.filter(c => c.status === "connected").length;
  const availableCount = connectors.filter(c => c.status === "available").length;
  const comingSoonCount = connectors.filter(c => c.status === "coming-soon").length;

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Database className="h-6 w-6" />
            Connectors Library
          </h1>
          <p className="text-muted-foreground">
            Connect your tools to enable AI-powered GTM insights
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>{connectedCount} Connected</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-blue-500" />
            <span>{availableCount} Available</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{comingSoonCount} Coming Soon</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search connectors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        {searchQuery && (
          <div className="text-sm text-muted-foreground">
            {filteredConnectors.length} of {connectors.length} connectors
          </div>
        )}
      </div>

      {/* Connectors Grid */}
      {filteredConnectors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredConnectors.map((connector) => (
          <Card key={connector.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
                    <SourceLogo source={connector.icon} className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-semibold">{connector.name}</CardTitle>
                    <div className="flex items-center gap-1 mt-1">
                      {getCategoryIcon(connector.category)}
                      <span className="text-xs text-muted-foreground">{connector.category}</span>
                    </div>
                  </div>
                </div>
                {getStatusBadge(connector.status)}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {connector.description}
              </p>
              
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8"
                  onClick={() => window.open(connector.website, '_blank')}
                >
                  <ExternalLink className="h-3 w-3 mr-2" />
                  Visit
                </Button>
                
                {connector.status === "connected" && (
                  <Button size="sm" variant="outline" className="h-8">
                    Configure
                  </Button>
                )}
                
                {connector.status === "available" && (
                  <Button size="sm" className="h-8">
                    Connect
                  </Button>
                )}
                
                {connector.status === "coming-soon" && (
                  <Button size="sm" variant="ghost" disabled className="h-8">
                    Coming Soon
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No connectors found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or browse all connectors.
          </p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => setSearchQuery("")}
          >
            Clear Search
          </Button>
        </div>
      )}

      {/* Footer */}
      <div className="text-center pt-8 border-t">
        <p className="text-sm text-muted-foreground">
          Need a connector that's not listed? <Button variant="link" className="p-0 h-auto font-normal">Request a new connector</Button>
        </p>
      </div>
    </div>
  );
}