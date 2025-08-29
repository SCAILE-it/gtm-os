"use client";

import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Database, Globe, Search, Mail, Users, BarChart3, Calendar, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type DataSource = 
  | "CRM" 
  | "GA4" 
  | "GSC" 
  | "Google Ads" 
  | "Email" 
  | "LinkedIn" 
  | "PostHog"
  | "Manual"
  | "Calculated";

interface DataSourceBadgeProps {
  sources: DataSource[];
  className?: string;
  showTooltip?: boolean;
  size?: "sm" | "default";
}

const sourceConfig = {
  "CRM": { 
    icon: Users, 
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    label: "CRM",
    description: "Customer Relationship Management system (HubSpot, Salesforce, etc.)"
  },
  "GA4": { 
    icon: Globe, 
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    label: "GA4",
    description: "Google Analytics 4 - Website traffic and behavior"
  },
  "GSC": { 
    icon: Search, 
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    label: "GSC",
    description: "Google Search Console - SEO performance and search queries"
  },
  "Google Ads": { 
    icon: BarChart3, 
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    label: "Ads",
    description: "Google Ads - Paid advertising performance and spend"
  },
  "Email": { 
    icon: Mail, 
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    label: "Email",
    description: "Email marketing platform (Mailchimp, ConvertKit, etc.)"
  },
  "LinkedIn": { 
    icon: Users, 
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    label: "LinkedIn",
    description: "LinkedIn Sales Navigator or Teamfluence"
  },
  "PostHog": { 
    icon: Zap, 
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    label: "PostHog",
    description: "Product analytics and user behavior tracking"
  },
  "Manual": { 
    icon: Database, 
    color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    label: "Manual",
    description: "Manually entered or calculated data"
  },
  "Calculated": { 
    icon: Database, 
    color: "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300",
    label: "Calc",
    description: "Calculated from multiple data sources"
  }
};

export function DataSourceBadge({ sources, className, showTooltip = true, size = "sm" }: DataSourceBadgeProps) {
  if (sources.length === 0) return null;

  const primarySource = sources[0];
  const config = sourceConfig[primarySource];
  const Icon = config.icon;

  const badgeContent = (
    <Badge 
      variant="outline" 
      className={cn(
        "gap-1 font-normal",
        size === "sm" ? "text-xs h-5 px-2" : "text-sm h-6 px-3",
        config.color,
        className
      )}
    >
      <Icon className={size === "sm" ? "h-3 w-3" : "h-4 w-4"} />
      {sources.length === 1 ? config.label : `${config.label} +${sources.length - 1}`}
    </Badge>
  );

  if (!showTooltip) return badgeContent;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {badgeContent}
        </TooltipTrigger>
        <TooltipContent>
          <div className="max-w-xs">
            <p className="font-medium mb-1">Data Sources:</p>
            <ul className="space-y-1">
              {sources.map((source) => (
                <li key={source} className="text-sm flex items-center gap-2">
                  <div 
                    className={cn(
                      "w-2 h-2 rounded-full",
                      sourceConfig[source].color.includes("blue") && "bg-blue-500",
                      sourceConfig[source].color.includes("green") && "bg-green-500",
                      sourceConfig[source].color.includes("yellow") && "bg-yellow-500",
                      sourceConfig[source].color.includes("red") && "bg-red-500",
                      sourceConfig[source].color.includes("purple") && "bg-purple-500",
                      sourceConfig[source].color.includes("orange") && "bg-orange-500",
                      sourceConfig[source].color.includes("gray") && "bg-gray-500",
                      sourceConfig[source].color.includes("slate") && "bg-slate-500"
                    )}
                  />
                  <span>{source}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground mt-2">
              {config.description}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
