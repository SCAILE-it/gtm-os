"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Settings, Target, Clock, DollarSign, Globe, Save } from "lucide-react";

// Mock settings data
const stageDefinitions = [
  {
    stage: "First Touch",
    definition: "Unknown → Identified Contact",
    exitCondition: "Provides contact info OR demonstrates engagement intent",
    sla: 5,
    criteria: ["Form submission", "Email subscription", "Content download", "Demo request"]
  },
  {
    stage: "Qualified",
    definition: "Identified → Validated Potential Customer",
    exitCondition: "Passes qualification criteria (BANT, MEDDIC, etc.)",
    sla: 10,
    criteria: ["Budget confirmed", "Authority identified", "Need established", "Timeline defined"]
  },
  {
    stage: "Opportunity",
    definition: "Potential → Active Sales Process",
    exitCondition: "Formal sales process initiated (demo scheduled, proposal requested)",
    sla: 30,
    criteria: ["Demo completed", "Proposal sent", "Stakeholders identified", "Technical review"]
  },
  {
    stage: "Closed",
    definition: "Active → Decided",
    exitCondition: "Contract signed OR deal definitively lost",
    sla: 60,
    criteria: ["Contract signed", "Payment processed", "Onboarding started", "Deal marked lost"]
  }
];

export function SettingsDashboard() {
  const [selectedCurrency, setSelectedCurrency] = useState("EUR");
  const [selectedTimezone, setSelectedTimezone] = useState("Europe/Berlin");
  const [selectedAttribution, setSelectedAttribution] = useState("first-touch");
  const [ltvMargin, setLtvMargin] = useState(75);
  const [ltvMonths, setLtvMonths] = useState(24);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Configure stage definitions, SLAs, and business assumptions
          </p>
        </div>
        <Button className="gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="stages" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="stages">Stage Definitions</TabsTrigger>
          <TabsTrigger value="slas">SLAs & Timeouts</TabsTrigger>
          <TabsTrigger value="assumptions">Business Assumptions</TabsTrigger>
          <TabsTrigger value="general">General Settings</TabsTrigger>
        </TabsList>

        {/* Stage Definitions Tab */}
        <TabsContent value="stages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Funnel Stage Dictionary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {stageDefinitions.map((stage, index) => (
                  <div key={stage.stage} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{index + 1}</Badge>
                      <h3 className="font-semibold">{stage.stage}</h3>
                    </div>
                    
                    <div className="pl-8 space-y-2">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Definition</label>
                        <p className="text-sm">{stage.definition}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Exit Condition</label>
                        <p className="text-sm">{stage.exitCondition}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Qualification Criteria</label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {stage.criteria.map((criterion, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {criterion}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {index < stageDefinitions.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SLAs Tab */}
        <TabsContent value="slas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Service Level Agreements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Define maximum time limits for each stage before contacts are flagged as &quot;stuck&quot;
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stageDefinitions.map((stage) => (
                    <div key={stage.stage} className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{stage.stage}</h4>
                        <Badge variant="outline">{stage.sla} days</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Maximum time before flagged as stuck
                      </p>
                      <div className="flex items-center gap-2">
                        <Select defaultValue={stage.sla.toString()}>
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 day</SelectItem>
                            <SelectItem value="3">3 days</SelectItem>
                            <SelectItem value="5">5 days</SelectItem>
                            <SelectItem value="7">7 days</SelectItem>
                            <SelectItem value="10">10 days</SelectItem>
                            <SelectItem value="14">14 days</SelectItem>
                            <SelectItem value="30">30 days</SelectItem>
                            <SelectItem value="60">60 days</SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="text-sm text-muted-foreground">days</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Business Assumptions Tab */}
        <TabsContent value="assumptions" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  LTV Assumptions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Gross Margin</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Select value={ltvMargin.toString()} onValueChange={(value) => setLtvMargin(Number(value))}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50">50%</SelectItem>
                        <SelectItem value="60">60%</SelectItem>
                        <SelectItem value="70">70%</SelectItem>
                        <SelectItem value="75">75%</SelectItem>
                        <SelectItem value="80">80%</SelectItem>
                        <SelectItem value="85">85%</SelectItem>
                        <SelectItem value="90">90%</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-sm text-muted-foreground">margin</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">LTV Period</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Select value={ltvMonths.toString()} onValueChange={(value) => setLtvMonths(Number(value))}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12">12</SelectItem>
                        <SelectItem value="18">18</SelectItem>
                        <SelectItem value="24">24</SelectItem>
                        <SelectItem value="36">36</SelectItem>
                        <SelectItem value="48">48</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-sm text-muted-foreground">months</span>
                  </div>
                </div>

                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm">
                    <strong>Calculated LTV Range:</strong><br />
                    €12,000 - €18,000 per customer
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Attribution Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Default Attribution Model</label>
                  <Select value={selectedAttribution} onValueChange={setSelectedAttribution}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="first-touch">First Touch</SelectItem>
                      <SelectItem value="last-touch">Last Touch</SelectItem>
                      <SelectItem value="data-driven">Data Driven</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Used for origin analysis and keyword attribution
                  </p>
                </div>

                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm">
                    <strong>Note:</strong> Attribution model affects origin panels and keyword analysis, but not stage counts.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* General Settings Tab */}
        <TabsContent value="general" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Localization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Currency</label>
                  <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="CHF">CHF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Timezone</label>
                  <Select value={selectedTimezone} onValueChange={setSelectedTimezone}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Europe/Berlin">Europe/Berlin (CET)</SelectItem>
                      <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                      <SelectItem value="America/Los_Angeles">America/Los_Angeles (PST)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Asia/Tokyo (JST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Retention</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Historical Data</label>
                  <Select defaultValue="24">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12 months</SelectItem>
                      <SelectItem value="24">24 months</SelectItem>
                      <SelectItem value="36">36 months</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    How long to retain raw data for analysis
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium">Aggregated Data</label>
                  <Select defaultValue="unlimited">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="36">36 months</SelectItem>
                      <SelectItem value="60">60 months</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    How long to retain aggregated metrics
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
