"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Settings, User, LogOut, Sun, Moon, MessageSquare, BarChart3, Database } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

interface AgenticHeaderProps {
  // Props can be added here if needed
}

export function AgenticHeader({}: AgenticHeaderProps) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const isDashboardView = pathname === "/dashboard";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Left side - Logo, Title */}
        <div className="flex items-center gap-4">
          {/* SCAILE Logo - Clickable */}
          <button 
            onClick={() => router.push('/')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="h-8 w-8 flex items-center justify-center">
              <Image 
                src="/scaile-logo.svg" 
                alt="SCAILE" 
                width={32} 
                height={32}
                className="h-8 w-8"
              />
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold text-foreground">
                GTM Operating System
              </h1>
              <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                Beta
              </span>
            </div>
          </button>
        </div>

        {/* Center - Navigation Tabs */}
        <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
          <Button
            variant={!isDashboardView ? "default" : "ghost"}
            size="sm"
            onClick={() => router.push("/")}
            className="h-7 text-xs"
          >
            <MessageSquare className="h-3 w-3 mr-1" />
            Agentic
          </Button>
          <Button
            variant={isDashboardView ? "default" : "ghost"}
            size="sm"
            onClick={() => router.push("/dashboard")}
            className="h-7 text-xs"
          >
            <BarChart3 className="h-3 w-3 mr-1" />
            Analytics
          </Button>
        </div>

        {/* Right side - Settings and Profile */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-8 w-8 p-0"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>


          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="@user" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    U
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">John Doe</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    john.doe@company.com
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/profile')}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/connections');
                }}
              >
                <Database className="mr-2 h-4 w-4" />
                <span>Data Connections</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/settings');
                }}
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
