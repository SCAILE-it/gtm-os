"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout for admin/settings pages without the main header
 * Cleaner interface focused on configuration and settings
 */
export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Sidebar - positioned from top-0 for admin pages */}
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} isAdminLayout={true} />
        
        {/* Main Content */}
        <main className={cn(
          "flex-1 overflow-auto transition-all duration-300",
          sidebarOpen ? "lg:ml-72" : "lg:ml-16"
        )}>
          {/* Mobile menu button - only visible on mobile */}
          <div className="lg:hidden p-4 border-b">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-4 w-4" />
              <span className="ml-2">Menu</span>
            </Button>
          </div>
          
          <div className="container mx-auto p-3 sm:p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
