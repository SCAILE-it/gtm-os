"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  Database, 
  Zap, 
  Mail, 
  BarChart3, 
  Shield, 
  Bell, 
  User,
  Key,
  CheckCircle,
  AlertCircle,
  Plus
} from "lucide-react";

interface Connection {
  id: string;
  name: string;
  type: string;
  status: "connected" | "disconnected" | "error";
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  lastSync?: string;
}

export function SettingsPage() {
  // TODO: Replace with API call to /api/connections
  // Should return user's configured data connections with status
  // Expected response: { id, name, type, status, description, lastSync? }[]
  const [connections, setConnections] = useState<Connection[]>([
    {
      id: "ga4",
      name: "Google Analytics 4",
      type: "Analytics",
      status: "connected",
      icon: BarChart3,
      description: "Website and app analytics data",
      lastSync: "2 minutes ago"
    },
    {
      id: "hubspot",
      name: "HubSpot CRM",
      type: "CRM",
      status: "connected",
      icon: Database,
      description: "Customer relationship management",
      lastSync: "5 minutes ago"
    },
    {
      id: "mailchimp",
      name: "Mailchimp",
      type: "Email Marketing",
      status: "disconnected",
      icon: Mail,
      description: "Email campaign performance",
    },
    {
      id: "zapier",
      name: "Zapier",
      type: "Automation",
      status: "error",
      icon: Zap,
      description: "Workflow automation platform",
      lastSync: "Failed 1 hour ago"
    }
  ]);

  // TODO: Replace with API call to /api/user/preferences
  // Should load and save user notification preferences
  // Expected response: { dailyDigest, anomalyAlerts, weeklyReports, goalAlerts }
  const [notifications, setNotifications] = useState({
    dailyDigest: true,
    anomalyAlerts: true,
    weeklyReports: false,
    goalAlerts: true
  });

  const getStatusColor = (status: Connection["status"]) => {
    switch (status) {
      case "connected":
        return "text-green-600 bg-green-50 border-green-200";
      case "disconnected":
        return "text-gray-600 bg-gray-50 border-gray-200";
      case "error":
        return "text-red-600 bg-red-50 border-red-200";
    }
  };

  const getStatusIcon = (status: Connection["status"]) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-4 w-4" />;
      case "disconnected":
        return <AlertCircle className="h-4 w-4" />;
      case "error":
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="h-6 w-6" />
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your integrations, preferences, and account settings
        </p>
      </div>

      <Tabs defaultValue="connections" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="connections">Connections</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Connections Tab */}
        <TabsContent value="connections" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Data Connections</h3>
              <p className="text-sm text-muted-foreground">
                Connect your tools to enable AI-powered insights
              </p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Connection
            </Button>
          </div>

          <div className="grid gap-4">
            {connections.map((connection) => (
              <Card key={connection.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                        <connection.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">{connection.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {connection.description}
                        </p>
                        {connection.lastSync && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Last sync: {connection.lastSync}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant="outline" 
                        className={getStatusColor(connection.status)}
                      >
                        {getStatusIcon(connection.status)}
                        <span className="ml-1 capitalize">{connection.status}</span>
                      </Badge>
                      
                      <Button 
                        variant={connection.status === "connected" ? "outline" : "default"}
                        size="sm"
                      >
                        {connection.status === "connected" ? "Configure" : "Connect"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Notification Preferences</h3>
            <p className="text-sm text-muted-foreground">
              Choose what notifications you'd like to receive
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Email Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="daily-digest">Daily Digest</Label>
                  <p className="text-sm text-muted-foreground">
                    Get a daily summary of your key metrics and insights
                  </p>
                </div>
                <Switch 
                  id="daily-digest"
                  checked={notifications.dailyDigest}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, dailyDigest: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="anomaly-alerts">Anomaly Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when unusual patterns are detected
                  </p>
                </div>
                <Switch 
                  id="anomaly-alerts"
                  checked={notifications.anomalyAlerts}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, anomalyAlerts: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="tldr-subscription">TL;DR Subscription</Label>
                  <p className="text-sm text-muted-foreground">
                    Daily summary with key metrics and insights
                  </p>
                </div>
                <Switch 
                  id="tldr-subscription"
                  checked={notifications.weeklyReports}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, weeklyReports: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="analytics-subscription">Full Analytics Subscription</Label>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive weekly analytics reports with deep insights
                  </p>
                </div>
                <Switch 
                  id="analytics-subscription"
                  checked={notifications.weeklyReports}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, weeklyReports: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="goal-alerts">Goal Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifications when you reach or miss targets
                  </p>
                </div>
                <Switch 
                  id="goal-alerts"
                  checked={notifications.goalAlerts}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, goalAlerts: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Profile Information</h3>
            <p className="text-sm text-muted-foreground">
              Update your personal information and preferences
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" defaultValue="John" />
                </div>
                <div>
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" defaultValue="Doe" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john.doe@company.com" />
              </div>
              
              <div>
                <Label htmlFor="company">Company</Label>
                <Input id="company" defaultValue="SCAILE" />
              </div>
              
                {/* TODO: Add API call to /api/user/profile */}
                <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Security Settings</h3>
            <p className="text-sm text-muted-foreground">
              Manage your account security and API access
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Keys
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Production API Key</p>
                  <p className="text-sm text-muted-foreground">
                    sk-...4f2a (Created 30 days ago)
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Regenerate
                </Button>
              </div>
              
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create New API Key
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Button variant="outline">Enable</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
