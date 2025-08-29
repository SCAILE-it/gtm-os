"use client";

import { useState } from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        {/* Main Content */}
        <main className={cn(
          "flex-1 overflow-auto transition-all duration-300",
          sidebarOpen ? "lg:ml-64" : "lg:ml-16"
        )}>
          <div className="container mx-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
