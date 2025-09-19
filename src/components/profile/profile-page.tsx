"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Building2, 
  MapPin, 
  Phone, 
  Globe, 
  Calendar,
  Edit3,
  Save,
  X,
  Bell,
  Shield,
  Key,
  CreditCard,
  Settings,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  title: string;
  company: string;
  location: string;
  phone: string;
  website: string;
  bio: string;
  timezone: string;
  avatar?: string;
}

interface NotificationSettings {
  dailyDigest: boolean;
  weeklyReports: boolean;
  anomalyAlerts: boolean;
  goalAlerts: boolean;
  agentUpdates: boolean;
}

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: "Federico De Ponte",
    email: "federico@scaile.tech",
    title: "Founder & CEO",
    company: "SCAILE AI",
    location: "San Francisco, CA",
    phone: "+1 (555) 123-4567",
    website: "https://scaile.tech",
    bio: "Building AI-powered GTM intelligence to help B2B companies optimize their go-to-market strategies.",
    timezone: "PST (UTC-8)"
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    dailyDigest: true,
    weeklyReports: true,
    anomalyAlerts: true,
    goalAlerts: true,
    agentUpdates: false
  });

  const [activeTab, setActiveTab] = useState<"profile" | "notifications" | "security" | "billing">("profile");

  const handleSave = () => {
    // TODO: Save profile changes to API
    setIsEditing(false);
  };

  const handleCancel = () => {
    // TODO: Reset changes
    setIsEditing(false);
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <User className="h-6 w-6" />
            Profile Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        {[
          { id: "profile", label: "Profile", icon: User },
          { id: "notifications", label: "Notifications", icon: Bell },
          { id: "security", label: "Security", icon: Shield },
          { id: "billing", label: "Billing", icon: CreditCard }
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab(tab.id as any)}
            className="h-8"
          >
            <tab.icon className="h-4 w-4 mr-2" />
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Avatar & Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-lg">{profile.name}</h3>
                  <p className="text-muted-foreground">{profile.title}</p>
                  <p className="text-sm text-muted-foreground">{profile.company}</p>
                </div>
                <Button variant="outline" size="sm" disabled={!isEditing}>
                  Upload New Photo
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    disabled={!isEditing}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    disabled={!isEditing}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    value={profile.title}
                    disabled={!isEditing}
                    onChange={(e) => setProfile(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={profile.company}
                    disabled={!isEditing}
                    onChange={(e) => setProfile(prev => ({ ...prev, company: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profile.location}
                    disabled={!isEditing}
                    onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    disabled={!isEditing}
                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={profile.website}
                    disabled={!isEditing}
                    onChange={(e) => setProfile(prev => ({ ...prev, website: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input
                    id="timezone"
                    value={profile.timezone}
                    disabled={!isEditing}
                    onChange={(e) => setProfile(prev => ({ ...prev, timezone: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  disabled={!isEditing}
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Notification Preferences</CardTitle>
            <p className="text-sm text-muted-foreground">
              Choose what notifications you'd like to receive
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: "dailyDigest", label: "Daily TL;DR", description: "Daily summary of your GTM performance" },
              { key: "weeklyReports", label: "Weekly Reports", description: "Comprehensive weekly analytics report" },
              { key: "anomalyAlerts", label: "Anomaly Alerts", description: "Instant alerts for unusual performance changes" },
              { key: "goalAlerts", label: "Goal Alerts", description: "Notifications when you hit or miss targets" },
              { key: "agentUpdates", label: "Agent Updates", description: "Updates from your deployed AI agents" }
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{item.label}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <Button
                  variant={notifications[item.key as keyof NotificationSettings] ? "default" : "outline"}
                  size="sm"
                  onClick={() => setNotifications(prev => ({
                    ...prev,
                    [item.key]: !prev[item.key as keyof NotificationSettings]
                  }))}
                >
                  {notifications[item.key as keyof NotificationSettings] ? "Enabled" : "Disabled"}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Password & Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Password</h4>
                  <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                </div>
                <Button variant="outline">
                  <Key className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Button variant="outline">
                  <Shield className="h-4 w-4 mr-2" />
                  Enable 2FA
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">Current Session</p>
                      <p className="text-sm text-muted-foreground">San Francisco, CA • Chrome on macOS</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Billing Tab */}
      {activeTab === "billing" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Current Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium flex items-center gap-2">
                    Pro Plan
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-600">Current</Badge>
                  </h4>
                  <p className="text-sm text-muted-foreground">$99/month • Billed monthly</p>
                </div>
                <Button variant="outline">
                  Manage Plan
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Usage This Month</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>API Calls</span>
                  <span>8,450 / 10,000</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '84.5%' }}></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Data Sources</span>
                  <span>3 / 5</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
