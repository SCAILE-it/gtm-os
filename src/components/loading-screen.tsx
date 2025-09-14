"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Loader2, Zap, Database } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

interface DataSource {
  name: string;
  status: 'pending' | 'loading' | 'complete';
  description: string;
  icon: string;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  
  const dataSources: DataSource[] = [
    { name: 'Google Analytics 4', status: 'pending', description: 'Website Traffic & Conversions', icon: '📊' },
    { name: 'LinkedIn Ads', status: 'pending', description: 'B2B Campaign Performance', icon: '💼' },
    { name: 'CRM System', status: 'pending', description: 'Sales Pipeline & Contacts', icon: '👥' },
    { name: 'Google Ads', status: 'pending', description: 'Search & Display Campaigns', icon: '🎯' },
    { name: 'Gong', status: 'pending', description: 'Sales Call Intelligence', icon: '🎤' },
    { name: 'Telli', status: 'pending', description: 'Communication Analytics', icon: '📞' },
    { name: 'Semrush', status: 'pending', description: 'SEO & Competitive Intelligence', icon: '🔍' },
    { name: 'Peek AI', status: 'pending', description: 'Behavioral Analytics', icon: '👁️' },
  ];

  const [sources, setSources] = useState(dataSources);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        
        // Update data source status based on progress
        const sourceIndex = Math.floor(newProgress / 12.5);
        if (sourceIndex < sources.length && sourceIndex !== currentStep) {
          setSources(prevSources => 
            prevSources.map((source, index) => ({
              ...source,
              status: index < sourceIndex ? 'complete' : 
                     index === sourceIndex ? 'loading' : 'pending'
            }))
          );
          setCurrentStep(sourceIndex);
        }
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 1000);
          return 100;
        }
        
        return newProgress;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete, sources.length, currentStep]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center">
              <Zap className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            GTM Engine wird gestartet...
          </h1>
          <p className="text-blue-200 text-lg">
            Verbinde mit Datenquellen und lade Intelligence
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-white font-medium">Fortschritt</span>
            <span className="text-blue-200">{Math.round(progress)}%</span>
          </div>
          <Progress 
            value={progress} 
            className="h-3 bg-slate-700"
          />
        </div>

        {/* Data Sources */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Database className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Datenquellen</h3>
            </div>
            
            <div className="grid gap-3">
              {sources.map((source, index) => (
                <div 
                  key={source.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{source.icon}</span>
                    <div>
                      <div className="text-white font-medium">{source.name}</div>
                      <div className="text-slate-400 text-sm">{source.description}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {source.status === 'complete' && (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <Badge variant="secondary" className="bg-green-900/20 text-green-400 border-green-400/20">
                          Verbunden
                        </Badge>
                      </>
                    )}
                    {source.status === 'loading' && (
                      <>
                        <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                        <Badge variant="secondary" className="bg-blue-900/20 text-blue-400 border-blue-400/20">
                          Lädt...
                        </Badge>
                      </>
                    )}
                    {source.status === 'pending' && (
                      <Badge variant="outline" className="border-slate-600 text-slate-400">
                        Wartend
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Status Message */}
        <div className="text-center mt-8">
          <p className="text-blue-200">
            {progress < 25 && "Authentifiziere Datenquellen..."}
            {progress >= 25 && progress < 50 && "Lade historische Daten..."}
            {progress >= 50 && progress < 75 && "Berechne KPIs und Trends..."}
            {progress >= 75 && progress < 95 && "Generiere Insights..."}
            {progress >= 95 && "Finalisiere Dashboard..."}
          </p>
        </div>
      </div>
    </div>
  );
}
