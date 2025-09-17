/**
 * Global Design System Components
 * Enforces GLOBAL_DESIGN_RULES.md standards
 */

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

// Typography Components - Only 3 sizes allowed
export function TextSmall({ children, className, ...props }: { children: ReactNode; className?: string; [key: string]: any }) {
  return <span className={cn("text-xs", className)} {...props}>{children}</span>;
}

export function TextMedium({ children, className, ...props }: { children: ReactNode; className?: string; [key: string]: any }) {
  return <span className={cn("text-sm", className)} {...props}>{children}</span>;
}

export function TextLarge({ children, className, ...props }: { children: ReactNode; className?: string; [key: string]: any }) {
  return <span className={cn("text-lg", className)} {...props}>{children}</span>;
}

// Trend Badge Component
interface TrendBadgeProps {
  value: number;
  className?: string;
}

export function TrendBadge({ value, className }: TrendBadgeProps) {
  const isPositive = value > 0;
  return (
    <div 
      className={cn(
        "rounded",
        isPositive 
          ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400" 
          : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400",
        className
      )}
      style={{ fontSize: '10px', padding: '1px 4px' }}
    >
      {isPositive ? "↗" : "↘"}{Math.abs(value)}%
    </div>
  );
}

// Status Badge Component
interface StatusBadgeProps {
  variant: "success" | "error" | "info" | "neutral";
  children: ReactNode;
  className?: string;
}

export function StatusBadge({ variant, children, className }: StatusBadgeProps) {
  const variants = {
    success: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400",
    error: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400", 
    info: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400",
    neutral: "bg-muted text-muted-foreground"
  };
  
  return (
    <div className={cn("px-2 py-1 rounded text-xs", variants[variant], className)}>
      {children}
    </div>
  );
}

// Clean Card Components
interface CleanCardProps {
  children: ReactNode;
  className?: string;
}

export function CleanCard({ children, className }: CleanCardProps) {
  return (
    <div className={cn("h-full flex flex-col bg-background border border-border rounded-lg", className)}>
      {children}
    </div>
  );
}

export function CleanCardHeader({ children, className }: CleanCardProps) {
  return (
    <div className={cn("pb-3 pt-4 px-4", className)}>
      {children}
    </div>
  );
}

export function CleanCardContent({ children, className }: CleanCardProps) {
  return (
    <div className={cn("flex-1 px-4 pb-4 pt-0 space-y-3", className)}>
      {children}
    </div>
  );
}

export function CleanCardTitle({ children, className }: CleanCardProps) {
  return (
    <h3 className={cn("text-sm font-semibold text-foreground flex items-center gap-2", className)}>
      {children}
    </h3>
  );
}

// Utility Functions
export const designSystem = {
  // Color validation
  isValidColor: (color: string) => {
    const allowed = ['red', 'green', 'blue', 'foreground', 'muted', 'background', 'border'];
    return allowed.some(c => color.includes(c));
  },
  
  // Font size validation  
  isValidFontSize: (size: string) => {
    const allowed = ['text-xs', 'text-sm', 'text-lg'];
    return allowed.includes(size);
  }
};
