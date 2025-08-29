"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Lightbulb, Filter, Download, Eye, ThumbsUp, ThumbsDown } from "lucide-react";

// Mock recommendations data
const mockRecommendations = [
  {
    id: 1,
    title: "Optimize First Touch Landing Pages",
    channel: "Website",
    stage: "First Touch",
    priority: "High",
    impact: 8,
    effort: 3,
    ice: 8.7,
    owner: "Marketing Team",
    status: "In Progress",
    created: "2024-01-15",
    eta: "2024-01-30",
    evidence: 4,
    confidence: 0.85,
    freshness: "2 hours ago"
  },
  {
    id: 2,
    title: "Improve Email Nurture Sequence",
    channel: "Email",
    stage: "Qualified",
    priority: "Medium",
    impact: 6,
    effort: 4,
    ice: 6.0,
    owner: "Growth Team",
    status: "Backlog",
    created: "2024-01-14",
    eta: "2024-02-15",
    evidence: 3,
    confidence: 0.72,
    freshness: "1 day ago"
  },
  {
    id: 3,
    title: "Reduce Demo No-Show Rate",
    channel: "Sales",
    stage: "Opportunity",
    priority: "High",
    impact: 9,
    effort: 2,
    ice: 9.0,
    owner: "Sales Team",
    status: "Done",
    created: "2024-01-10",
    eta: "2024-01-25",
    evidence: 5,
    confidence: 0.91,
    freshness: "3 days ago"
  },
  {
    id: 4,
    title: "Optimize Pricing Page Conversion",
    channel: "Website",
    stage: "Opportunity",
    priority: "Medium",
    impact: 7,
    effort: 5,
    ice: 5.6,
    owner: "Product Team",
    status: "In Progress",
    created: "2024-01-12",
    eta: "2024-02-01",
    evidence: 3,
    confidence: 0.68,
    freshness: "5 hours ago"
  }
];

export function RecommendationsDashboard() {
  const [selectedChannel, setSelectedChannel] = useState<string>("all");
  const [selectedStage, setSelectedStage] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "destructive";
      case "Medium": return "default";
      case "Low": return "secondary";
      default: return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Done": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Backlog": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredRecommendations = mockRecommendations.filter(rec => {
    return (
      (selectedChannel === "all" || rec.channel === selectedChannel) &&
      (selectedStage === "all" || rec.stage === selectedStage) &&
      (selectedStatus === "all" || rec.status === selectedStatus)
    );
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Recommendations</h1>
          <p className="text-muted-foreground">
            AI-powered insights and actionable recommendations for GTM optimization
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm" className="gap-2">
            <Lightbulb className="h-4 w-4" />
            Generate New
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm text-muted-foreground">Total Recommendations</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">3</div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">5</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">7.2</div>
            <div className="text-sm text-muted-foreground">Avg ICE Score</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Channel:</label>
              <Select value={selectedChannel} onValueChange={setSelectedChannel}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Website">Website</SelectItem>
                  <SelectItem value="Email">Email</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Paid Ads">Paid Ads</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Stage:</label>
              <Select value={selectedStage} onValueChange={setSelectedStage}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="First Touch">First Touch</SelectItem>
                  <SelectItem value="Qualified">Qualified</SelectItem>
                  <SelectItem value="Opportunity">Opportunity</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Status:</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Backlog">Backlog</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recommendations ({filteredRecommendations.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Impact</TableHead>
                <TableHead>Effort</TableHead>
                <TableHead>ICE Score</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Evidence</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecommendations.map((rec) => (
                <TableRow key={rec.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{rec.title}</div>
                      <div className="text-xs text-muted-foreground">
                        Created {rec.created} • ETA {rec.eta}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{rec.channel}</TableCell>
                  <TableCell>{rec.stage}</TableCell>
                  <TableCell>
                    <Badge variant={getPriorityColor(rec.priority)}>
                      {rec.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{rec.impact}/10</TableCell>
                  <TableCell>{rec.effort}/10</TableCell>
                  <TableCell>
                    <div className="font-medium">{rec.ice}</div>
                  </TableCell>
                  <TableCell>{rec.owner}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(rec.status)}>
                      {rec.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-sm">{rec.evidence}</span>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ThumbsDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
