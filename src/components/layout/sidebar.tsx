"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Target,
  Users,
  Briefcase,
  CheckCircle,
  Lightbulb,
  Database,
  Settings,
  ChevronRight,
  X
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navigationSections = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
        description: "CEO view with KPIs and funnel"
      }
    ]
  },
  {
    title: "Stages",
    items: [
      {
        title: "First Touch",
        href: "/stages/first-touch",
        icon: Target,
        description: "Unknown → Identified Contact",
        metrics: ["Contacts Created", "Engagement Rate", "Cost per Touch", "Time to Qualify"]
      },
      {
        title: "Qualified",
        href: "/stages/qualified",
        icon: Users,
        description: "Identified → Validated Customer",
        metrics: ["MQLs/SQLs", "ICP Match Score", "Cost per Qualified", "Time to Opportunity"]
      },
      {
        title: "Opportunity",
        href: "/stages/opportunity",
        icon: Briefcase,
        description: "Potential → Active Sales Process",
        metrics: ["Opportunities", "Deal Size", "Cost per Opportunity", "Time to Close"]
      },
      {
        title: "Closed",
        href: "/stages/closed",
        icon: CheckCircle,
        description: "Active → Decided",
        metrics: ["Won Deals", "Win Rate", "CAC", "Sales Cycle Length"]
      }
    ]
  },
  {
    title: "Admin",
    items: [
      {
        title: "Recommendations",
        href: "/admin/recommendations",
        icon: Lightbulb,
        description: "AI-powered insights and actions"
      },
      {
        title: "Data Sources",
        href: "/admin/data-sources",
        icon: Database,
        description: "Connection hub and health monitoring"
      },
      {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings,
        description: "Stage definitions and assumptions"
      }
    ]
  }
];

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>(["Overview", "Stages", "Admin"]);

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionTitle)
        ? prev.filter(s => s !== sectionTitle)
        : [...prev, sectionTitle]
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 transform border-r bg-background transition-transform duration-300 lg:translate-x-0 flex flex-col",
        open ? "translate-x-0" : "-translate-x-full lg:w-16"
      )}>
        {/* Mobile Close Button */}
        <div className="flex h-14 items-center justify-between px-4 lg:hidden">
          <span className="font-semibold">Navigation</span>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 p-2 overflow-y-auto flex-1">
          {navigationSections.map((section) => (
            <div key={section.title}>
              {/* Section Header */}
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-between p-2 h-auto font-medium text-xs uppercase tracking-wide text-muted-foreground hover:text-foreground",
                  !open && "lg:justify-center"
                )}
                onClick={() => toggleSection(section.title)}
              >
                <span className={cn(!open && "lg:hidden")}>{section.title}</span>
                <ChevronRight className={cn(
                  "h-3 w-3 transition-transform",
                  expandedSections.includes(section.title) && "rotate-90",
                  !open && "lg:hidden"
                )} />
              </Button>

              {/* Section Items */}
              {expandedSections.includes(section.title) && (
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link key={item.href} href={item.href}>
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          className={cn(
                            "w-full justify-start gap-3 p-3 h-auto",
                            !open && "lg:justify-center lg:px-2"
                          )}
                        >
                          <item.icon className="h-4 w-4 shrink-0" />
                          <div className={cn("text-left", !open && "lg:hidden")}>
                            <div className="font-medium">{item.title}</div>
                            {item.description && (
                              <div className="text-xs text-muted-foreground">
                                {item.description}
                              </div>
                            )}
                          </div>
                          {isActive && (
                            <Badge variant="default" size="sm" className={cn(!open && "lg:hidden")}>
                              Active
                            </Badge>
                          )}
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              )}

              {section.title !== "Admin" && <Separator className="my-2" />}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
