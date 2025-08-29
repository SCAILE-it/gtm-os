"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { useUser } from "@/components/user-provider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AIAssistantSheet } from "@/components/ui/ai-assistant-sheet";
import { Menu, Search, Calendar, Activity, Bot, Sun, Moon } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [aiSheetOpen, setAiSheetOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user } = useUser();

  return (
    <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full items-center justify-between px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Activity className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold">Hi, {user.name}</span>
          </div>
        </div>

        {/* Center Section - Global Controls */}
        <div className="hidden md:flex items-center gap-4">
          {/* Search */}
          <Button variant="outline" size="sm" className="gap-2">
            <Search className="h-4 w-4" />
            <span className="hidden lg:inline">Search</span>
            <kbd className="hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              ⌘K
            </kbd>
          </Button>

          {/* Zeitraum Filter */}
          <Select defaultValue="last-30-days">
            <SelectTrigger className="w-[140px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7-days">Last 7 days</SelectItem>
              <SelectItem value="last-30-days">Last 30 days</SelectItem>
              <SelectItem value="last-90-days">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>

          {/* Attribution Model */}
          <Select defaultValue="first-touch">
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="first-touch">First Touch</SelectItem>
              <SelectItem value="last-touch">Last Touch</SelectItem>
              <SelectItem value="data-driven">Data Driven</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* AI Assistant Button */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setAiSheetOpen(true)}
            className="gap-2"
          >
            <Bot className="h-4 w-4" />
            <span className="hidden sm:inline">AI Assistant</span>
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Data Health Status */}
          <Badge variant="secondary" className="gap-1">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            Data OK
          </Badge>

          {/* User Menu */}
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-sm">
              {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* AI Assistant Sheet */}
      <AIAssistantSheet 
        open={aiSheetOpen} 
        onClose={() => setAiSheetOpen(false)} 
      />
    </header>
  );
}
