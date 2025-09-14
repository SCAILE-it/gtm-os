"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, MessageSquare, TrendingUp, Users, Zap, Brain } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StartScreenProps {
  onModeSelect: (mode: 'dashboard' | 'analyst') => void;
}

export function StartScreen({ onModeSelect }: StartScreenProps) {
  const [selectedMode, setSelectedMode] = useState<'dashboard' | 'analyst' | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            SCAILE GTM Operating System
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Wählen Sie Ihren Arbeitsbereich: Übersicht für Führungskräfte oder detaillierte Analysen
          </p>
        </div>

        {/* Mode Selection */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Dashboard Mode */}
          <Card 
            className={`cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${
              selectedMode === 'dashboard' ? 'border-blue-500 shadow-xl' : 'border-slate-200'
            }`}
            onClick={() => setSelectedMode('dashboard')}
          >
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl text-slate-900">Dashboard</CardTitle>
              <CardDescription className="text-lg">
                Executive Overview & Quick Actions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="text-slate-700">High-level Performance Metrics</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-yellow-600" />
                  <span className="text-slate-700">Instant Recommendations</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="text-slate-700">Team Task Assignment</span>
                </div>
              </div>
              <div className="pt-4">
                <Badge variant="secondary" className="mb-2">Ideal für:</Badge>
                <p className="text-sm text-slate-600">
                  Führungskräfte, die schnelle Einblicke in Revenue, CAC und Conversion Rates benötigen
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Analyst Mode */}
          <Card 
            className={`cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${
              selectedMode === 'analyst' ? 'border-purple-500 shadow-xl' : 'border-slate-200'
            }`}
            onClick={() => setSelectedMode('analyst')}
          >
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-2xl text-slate-900">Analyst</CardTitle>
              <CardDescription className="text-lg">
                Deep Dive Analytics & AI Chat
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  <span className="text-slate-700">AI-Powered Analysis Chat</span>
                </div>
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  <span className="text-slate-700">Detailed Data Breakdowns</span>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                  <span className="text-slate-700">Custom Analysis Tools</span>
                </div>
              </div>
              <div className="pt-4">
                <Badge variant="secondary" className="mb-2">Ideal für:</Badge>
                <p className="text-sm text-slate-600">
                  Analysten und Marketer, die tiefere Einblicke und detaillierte Untersuchungen benötigen
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <Button
            size="lg"
            className="px-12 py-4 text-lg"
            disabled={!selectedMode}
            onClick={() => selectedMode && onModeSelect(selectedMode)}
          >
            {selectedMode === 'dashboard' ? 'Zum Dashboard' : selectedMode === 'analyst' ? 'Zum Analyst' : 'Modus wählen'}
          </Button>
        </div>

        {/* Data Sources Preview */}
        <div className="mt-16 text-center">
          <h3 className="text-lg font-semibold text-slate-700 mb-4">Verbundene Datenquellen</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['Google Analytics 4', 'LinkedIn Ads', 'CRM', 'Gong', 'Telli', 'Reddit', 'Semrush', 'Peek AI', 'Google Ads'].map((source) => (
              <Badge key={source} variant="outline" className="px-3 py-1">
                {source}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
