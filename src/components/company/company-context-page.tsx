"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Building2, 
  Globe, 
  Users, 
  Target, 
  DollarSign,
  MapPin,
  Briefcase,
  TrendingUp,
  Save,
  Edit3,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Plus,
  X,
  Search,
  Filter,
  Calendar,
  BarChart3,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CompanyProfile {
  name: string;
  website: string;
  description: string;
  industry: string;
  companySize: string;
  location: string;
  foundedYear: string;
  businessModel: string;
}

interface ICPData {
  id: string;
  title: string;
  description: string;
  companySize: string;
  industry: string;
  jobTitles: string[];
  painPoints: string[];
  budget: string;
  decisionMakers: string[];
  priority: "high" | "medium" | "low";
}

export function CompanyContextPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>({
    name: "SCAILE AI",
    website: "https://scaile.tech",
    description: "AI-powered GTM intelligence platform that helps B2B companies optimize their go-to-market strategies through data-driven insights and automated recommendations.",
    industry: "SaaS / AI",
    companySize: "11-50 employees",
    location: "San Francisco, CA",
    foundedYear: "2023",
    businessModel: "B2B SaaS"
  });

  const [icpProfiles, setIcpProfiles] = useState<ICPData[]>([
    {
      id: "icp-1",
      title: "VP of Sales - Mid-Market SaaS",
      description: "Sales leaders at growing SaaS companies looking to optimize their sales funnel and improve conversion rates.",
      companySize: "50-500 employees",
      industry: "SaaS",
      jobTitles: ["VP of Sales", "Head of Sales", "Sales Director", "Chief Revenue Officer"],
      painPoints: ["Low conversion rates", "Poor sales visibility", "Inefficient lead scoring", "Manual reporting"],
      budget: "$10K - $50K annually",
      decisionMakers: ["VP Sales", "CRO", "CEO"],
      priority: "high"
    },
    {
      id: "icp-2", 
      title: "Marketing Director - B2B Tech",
      description: "Marketing leaders who need better attribution and ROI measurement across their campaigns.",
      companySize: "100-1000 employees",
      industry: "Technology",
      jobTitles: ["Marketing Director", "VP Marketing", "Head of Growth", "CMO"],
      painPoints: ["Attribution challenges", "Campaign ROI unclear", "Siloed data", "Manual analysis"],
      budget: "$25K - $100K annually",
      decisionMakers: ["CMO", "VP Marketing", "CEO"],
      priority: "high"
    },
    {
      id: "icp-3",
      title: "Founder - Early Stage Startup",
      description: "Founders of early-stage B2B startups who need to establish their initial GTM strategy.",
      companySize: "1-20 employees",
      industry: "Various",
      jobTitles: ["Founder", "CEO", "Co-founder"],
      painPoints: ["No GTM strategy", "Limited budget", "Lack of data", "Resource constraints"],
      budget: "$1K - $10K annually",
      decisionMakers: ["Founder", "CEO"],
      priority: "medium"
    }
  ]);

  const [newICP, setNewICP] = useState<Partial<ICPData>>({});
  const [isAddingICP, setIsAddingICP] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  const handleSaveProfile = () => {
    // TODO: Save to API
    setIsEditing(false);
  };

  const handleAddICP = () => {
    if (newICP.title && newICP.description) {
      const icp: ICPData = {
        id: `icp-${Date.now()}`,
        title: newICP.title || "",
        description: newICP.description || "",
        companySize: newICP.companySize || "",
        industry: newICP.industry || "",
        jobTitles: newICP.jobTitles || [],
        painPoints: newICP.painPoints || [],
        budget: newICP.budget || "",
        decisionMakers: newICP.decisionMakers || [],
        priority: newICP.priority || "medium"
      };
      setIcpProfiles([...icpProfiles, icp]);
      setNewICP({});
      setIsAddingICP(false);
    }
  };

  const handleDeleteICP = (id: string) => {
    setIcpProfiles(icpProfiles.filter(icp => icp.id !== id));
  };

  const getPriorityColor = (priority: ICPData["priority"]) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:text-red-400";
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "low":
        return "text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:text-green-400";
    }
  };

  const filteredICPs = icpProfiles.filter(icp => {
    const matchesSearch = icp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         icp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         icp.industry.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPriority = priorityFilter === "all" || icp.priority === priorityFilter;
    
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="p-4 space-y-6 bg-background min-h-screen overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Company Context
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your company profile and ideal customer profiles (ICPs)
          </p>
        </div>
        <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "outline" : "default"}>
          {isEditing ? (
            <>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      {/* Company Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Company Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="company-name">Company Name</Label>
                {isEditing ? (
                  <Input
                    id="company-name"
                    value={companyProfile.name}
                    onChange={(e) => setCompanyProfile({...companyProfile, name: e.target.value})}
                    className="mt-1"
                  />
                ) : (
                  <div className="mt-1 text-sm font-medium">{companyProfile.name}</div>
                )}
              </div>

              <div>
                <Label htmlFor="website">Website</Label>
                {isEditing ? (
                  <Input
                    id="website"
                    value={companyProfile.website}
                    onChange={(e) => setCompanyProfile({...companyProfile, website: e.target.value})}
                    className="mt-1"
                    placeholder="https://"
                  />
                ) : (
                  <div className="mt-1">
                    <a 
                      href={companyProfile.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      {companyProfile.website}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="industry">Industry</Label>
                {isEditing ? (
                  <Input
                    id="industry"
                    value={companyProfile.industry}
                    onChange={(e) => setCompanyProfile({...companyProfile, industry: e.target.value})}
                    className="mt-1"
                  />
                ) : (
                  <div className="mt-1 text-sm">{companyProfile.industry}</div>
                )}
              </div>

              <div>
                <Label htmlFor="company-size">Company Size</Label>
                {isEditing ? (
                  <Input
                    id="company-size"
                    value={companyProfile.companySize}
                    onChange={(e) => setCompanyProfile({...companyProfile, companySize: e.target.value})}
                    className="mt-1"
                  />
                ) : (
                  <div className="mt-1 text-sm">{companyProfile.companySize}</div>
                )}
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="location">Location</Label>
                {isEditing ? (
                  <Input
                    id="location"
                    value={companyProfile.location}
                    onChange={(e) => setCompanyProfile({...companyProfile, location: e.target.value})}
                    className="mt-1"
                  />
                ) : (
                  <div className="mt-1 text-sm flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {companyProfile.location}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="founded">Founded Year</Label>
                {isEditing ? (
                  <Input
                    id="founded"
                    value={companyProfile.foundedYear}
                    onChange={(e) => setCompanyProfile({...companyProfile, foundedYear: e.target.value})}
                    className="mt-1"
                  />
                ) : (
                  <div className="mt-1 text-sm flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {companyProfile.foundedYear}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="business-model">Business Model</Label>
                {isEditing ? (
                  <Input
                    id="business-model"
                    value={companyProfile.businessModel}
                    onChange={(e) => setCompanyProfile({...companyProfile, businessModel: e.target.value})}
                    className="mt-1"
                  />
                ) : (
                  <div className="mt-1 text-sm flex items-center gap-1">
                    <Briefcase className="h-3 w-3" />
                    {companyProfile.businessModel}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Company Description</Label>
            {isEditing ? (
              <textarea
                id="description"
                value={companyProfile.description}
                onChange={(e) => setCompanyProfile({...companyProfile, description: e.target.value})}
                className="mt-1 w-full min-h-[100px] p-3 border border-border rounded-md resize-none bg-background"
                placeholder="Describe your company, what you do, your mission, and key value propositions..."
              />
            ) : (
              <div className="mt-1 text-sm text-muted-foreground leading-relaxed bg-muted/20 p-4 rounded-lg">
                {companyProfile.description}
              </div>
            )}
          </div>

          {isEditing && (
            <div className="flex items-center gap-2 pt-4">
              <Button onClick={handleSaveProfile}>
                <Save className="h-4 w-4 mr-2" />
                Save Profile
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ICP Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Ideal Customer Profiles (ICPs)
            </CardTitle>
            <Button onClick={() => setIsAddingICP(true)} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add ICP
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search ICPs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={priorityFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setPriorityFilter("all")}
              >
                All
              </Button>
              <Button
                variant={priorityFilter === "high" ? "default" : "outline"}
                size="sm"
                onClick={() => setPriorityFilter("high")}
              >
                High Priority
              </Button>
              <Button
                variant={priorityFilter === "medium" ? "default" : "outline"}
                size="sm"
                onClick={() => setPriorityFilter("medium")}
              >
                Medium
              </Button>
              <Button
                variant={priorityFilter === "low" ? "default" : "outline"}
                size="sm"
                onClick={() => setPriorityFilter("low")}
              >
                Low
              </Button>
            </div>
          </div>

          {/* Add New ICP Form */}
          {isAddingICP && (
            <Card className="border-2 border-dashed border-primary/20 bg-primary/5">
              <CardContent className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="new-icp-title">ICP Title</Label>
                    <Input
                      id="new-icp-title"
                      placeholder="e.g., VP of Sales - Mid-Market SaaS"
                      value={newICP.title || ""}
                      onChange={(e) => setNewICP({...newICP, title: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-icp-priority">Priority</Label>
                    <select
                      id="new-icp-priority"
                      value={newICP.priority || "medium"}
                      onChange={(e) => setNewICP({...newICP, priority: e.target.value as ICPData["priority"]})}
                      className="mt-1 w-full p-2 border border-border rounded-md bg-background"
                    >
                      <option value="high">High Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="low">Low Priority</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="new-icp-description">Description</Label>
                  <textarea
                    id="new-icp-description"
                    placeholder="Describe this ideal customer profile..."
                    value={newICP.description || ""}
                    onChange={(e) => setNewICP({...newICP, description: e.target.value})}
                    className="mt-1 w-full min-h-[80px] p-3 border border-border rounded-md resize-none bg-background"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="new-icp-size">Company Size</Label>
                    <Input
                      id="new-icp-size"
                      placeholder="e.g., 50-500 employees"
                      value={newICP.companySize || ""}
                      onChange={(e) => setNewICP({...newICP, companySize: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-icp-industry">Industry</Label>
                    <Input
                      id="new-icp-industry"
                      placeholder="e.g., SaaS, Technology"
                      value={newICP.industry || ""}
                      onChange={(e) => setNewICP({...newICP, industry: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-icp-budget">Budget Range</Label>
                    <Input
                      id="new-icp-budget"
                      placeholder="e.g., $10K - $50K annually"
                      value={newICP.budget || ""}
                      onChange={(e) => setNewICP({...newICP, budget: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button onClick={handleAddICP}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Add ICP
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddingICP(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* ICP List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredICPs.map((icp) => (
              <Card key={icp.id} className="hover:shadow-lg transition-all duration-200">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{icp.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{icp.description}</p>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-2">
                        <Badge className={cn("text-xs", getPriorityColor(icp.priority))}>
                          {icp.priority} priority
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteICP(icp.id)}
                          className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-3 text-sm">
                      {icp.companySize && (
                        <div className="flex items-center gap-2">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">Company Size:</span>
                          <span>{icp.companySize}</span>
                        </div>
                      )}
                      
                      {icp.industry && (
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">Industry:</span>
                          <span>{icp.industry}</span>
                        </div>
                      )}
                      
                      {icp.budget && (
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">Budget:</span>
                          <span>{icp.budget}</span>
                        </div>
                      )}
                    </div>

                    {/* Job Titles */}
                    {icp.jobTitles.length > 0 && (
                      <div>
                        <div className="text-xs font-medium text-muted-foreground mb-2">Job Titles:</div>
                        <div className="flex flex-wrap gap-1">
                          {icp.jobTitles.slice(0, 3).map((title, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {title}
                            </Badge>
                          ))}
                          {icp.jobTitles.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{icp.jobTitles.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Pain Points */}
                    {icp.painPoints.length > 0 && (
                      <div>
                        <div className="text-xs font-medium text-muted-foreground mb-2">Pain Points:</div>
                        <div className="flex flex-wrap gap-1">
                          {icp.painPoints.slice(0, 2).map((pain, index) => (
                            <Badge key={index} variant="outline" className="text-xs text-red-600 border-red-200">
                              {pain}
                            </Badge>
                          ))}
                          {icp.painPoints.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{icp.painPoints.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredICPs.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No ICPs found matching your criteria.</p>
              <p className="text-sm">Try adjusting your search or filters.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Context Integration */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            AI Context Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Your company profile and ICPs are automatically used to provide personalized insights, recommendations, and benchmarks throughout the platform.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Personalized benchmarks</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Industry-specific insights</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">ICP-focused recommendations</span>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <Button variant="outline" size="sm">
              <BarChart3 className="h-3 w-3 mr-1" />
              View AI Insights
            </Button>
            <Button variant="outline" size="sm">
              <TrendingUp className="h-3 w-3 mr-1" />
              Industry Benchmarks
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


