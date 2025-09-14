"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Target, 
  MessageSquare, 
  Send,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight,
  Zap
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ExecutiveDashboardProps {
  onMetricClick: (metric: string) => void;
  onChatOpen: () => void;
}

export function ExecutiveDashboard({ onMetricClick, onChatOpen }: ExecutiveDashboardProps) {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const metrics = [
    {
      id: 'revenue',
      title: 'Revenue',
      value: '€847K',
      change: '+12.5%',
      trend: 'up',
      period: 'vs. letzter Monat',
      description: 'Gesamtumsatz aller Kanäle'
    },
    {
      id: 'cac',
      title: 'Customer Acquisition Cost',
      value: '€245',
      change: '-8.2%',
      trend: 'down',
      period: 'vs. letzter Monat',
      description: 'Durchschnittliche Kundenakquisitionskosten'
    },
    {
      id: 'conversion',
      title: 'Conversion Rate',
      value: '3.4%',
      change: '+0.7%',
      trend: 'up',
      period: 'vs. letzter Monat',
      description: 'Lead-to-Customer Conversion'
    }
  ];

  const recommendations = [
    {
      id: 1,
      priority: 'high',
      title: 'LinkedIn Campaign Optimierung',
      description: 'CTR ist um 15% gesunken. Neue Ad Creatives testen.',
      assignee: 'Marketing Team',
      action: 'slack'
    },
    {
      id: 2,
      priority: 'medium',
      title: 'Sales Follow-up verbessern',
      description: 'Lead Response Zeit > 2h. Automation einrichten.',
      assignee: 'Sales Team',
      action: 'email'
    },
    {
      id: 3,
      priority: 'low',
      title: 'Content Performance Analyse',
      description: 'Top-performing Blog Posts für SEO optimieren.',
      assignee: 'Content Team',
      action: 'slack'
    }
  ];

  const handleSendRecommendation = (rec: typeof recommendations[0]) => {
    // Simulate sending recommendation
    console.log(`Sending ${rec.action} to ${rec.assignee}: ${rec.title}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Executive Dashboard</h1>
            <p className="text-slate-600 mt-1">Ihre wichtigsten GTM Metriken auf einen Blick</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onChatOpen}>
              <MessageSquare className="w-4 h-4 mr-2" />
              AI Analyst Chat
            </Button>
            <Badge variant="secondary" className="px-3 py-1">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Live Data
            </Badge>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric) => (
            <Card 
              key={metric.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedMetric === metric.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => {
                setSelectedMetric(metric.id);
                onMetricClick(metric.id);
              }}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    {metric.title}
                  </CardTitle>
                  {metric.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-slate-900">
                    {metric.value}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={metric.trend === 'up' ? 'default' : 'destructive'}
                      className="text-xs"
                    >
                      {metric.change}
                    </Badge>
                    <span className="text-sm text-slate-500">{metric.period}</span>
                  </div>
                  <p className="text-sm text-slate-600">{metric.description}</p>
                </div>
                <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                  Details anzeigen <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recommendations Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-600" />
                  Sofortige Handlungsempfehlungen
                </CardTitle>
                <CardDescription>
                  KI-generierte Optimierungsvorschläge basierend auf aktuellen Daten
                </CardDescription>
              </div>
              <Badge variant="outline">
                {recommendations.length} Empfehlungen
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={rec.id}>
                  <div className="flex items-start justify-between p-4 rounded-lg bg-slate-50">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {rec.priority === 'high' && (
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                        )}
                        {rec.priority === 'medium' && (
                          <Clock className="w-4 h-4 text-yellow-500" />
                        )}
                        {rec.priority === 'low' && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                        <Badge 
                          variant={
                            rec.priority === 'high' ? 'destructive' : 
                            rec.priority === 'medium' ? 'default' : 'secondary'
                          }
                          className="text-xs"
                        >
                          {rec.priority.toUpperCase()}
                        </Badge>
                        <span className="text-sm text-slate-500">→ {rec.assignee}</span>
                      </div>
                      <h4 className="font-semibold text-slate-900 mb-1">{rec.title}</h4>
                      <p className="text-slate-600 text-sm">{rec.description}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSendRecommendation(rec)}
                        className="flex items-center gap-1"
                      >
                        <Send className="w-3 h-3" />
                        {rec.action === 'slack' ? 'Slack' : 'Email'}
                      </Button>
                    </div>
                  </div>
                  {index < recommendations.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 text-blue-800">
                <Target className="w-4 h-4" />
                <span className="font-medium">Weitere Datenquellen verfügbar</span>
              </div>
              <p className="text-blue-700 text-sm mt-1">
                Verbinden Sie Reddit, Semrush und Peek AI für noch präzisere Insights.
              </p>
              <Button size="sm" variant="outline" className="mt-2 border-blue-300 text-blue-700">
                Datenquellen hinzufügen
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
