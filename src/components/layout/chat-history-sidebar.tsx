"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageSquare, 
  Plus, 
  Search, 
  MoreHorizontal,
  Clock,
  TrendingUp,
  BarChart3,
  Users,
  Target,
  FileText,
  Brain,
  Lightbulb,
  Check,
  X,
  AlertCircle,
  Upload,
  Image,
  Code,
  FileJson,
  File,
  Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatHistoryProps {
  expanded: boolean;
  onToggleExpand: () => void;
}

interface KnowledgeSuggestion {
  id: string;
  title: string;
  content: string;
  reasoning: string;
}

interface ContextFile {
  id: string;
  name: string;
  type: "text" | "json" | "code" | "image" | "other";
  size: number;
  content?: string;
  preview?: string;
  uploadedAt: Date;
}

interface ChatSession {
  id: string;
  title: string;
  timestamp: string;
  preview: string;
  category: "analysis" | "insights" | "optimization" | "general";
}

export function ChatHistorySidebar({ expanded, onToggleExpand }: ChatHistoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"chats" | "context" | "knowledge">("chats");
  const [contextInput, setContextInput] = useState("");
  const [contextFiles, setContextFiles] = useState<ContextFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // TODO: Replace with API call to /api/system-prompt
  // Should load and save system prompt from database
  // Expected response: { content: string, lastUpdated: string }
  const [systemPrompt, setSystemPrompt] = useState(`# System Instructions

## Analysis Guidelines
• Always use proper table joins in SQL queries
• Limit results to 1000 rows by default
• Include data validation checks
• Use meaningful table aliases

## Report Structure
Always include:
• Executive Summary
• Key Metrics
• Methodology
• Limitations
• Next Steps

## Attribution Rules
• First-touch: Awareness metrics
• Last-touch: Conversion metrics  
• Multi-touch: Full funnel analysis

## Data Privacy
• Never include PII in outputs
• Aggregate data to minimum 100 users
• Use anonymized identifiers only

## Core Metrics
CAC = Marketing Spend ÷ New Customers
LTV = Avg Revenue × Customer Lifespan
ROAS = Revenue ÷ Ad Spend

## Mobile Analysis
Always segment mobile data by:
• Device type (phone/tablet)
• OS version
• Screen size
• Network type`);

  const [isEditing, setIsEditing] = useState(false);
  // TODO: Replace with API call to /api/knowledge/suggestions
  // Should return AI-generated suggestions for system prompt improvements
  // Expected response: { id, title, content, reasoning }[]
  const [knowledgeSuggestions, setKnowledgeSuggestions] = useState<KnowledgeSuggestion[]>([
    {
      id: "1",
      title: "Add Email Analysis Standards",
      content: "## Email Analysis\n• Always segment by device type\n• Include deliverability metrics\n• Track engagement over time",
      reasoning: "Noticed inconsistent email analysis approaches across conversations"
    }
  ]);

  // TODO: Replace with API call to /api/chat/sessions
  // Should return user's chat history with search/filter capabilities
  // Expected response: { id, title, timestamp, preview, category }[]
  const chatSessions: ChatSession[] = [
    {
      id: "1",
      title: "Revenue Analysis Q4",
      timestamp: "2 hours ago",
      preview: "What's driving the revenue increase?",
      category: "analysis"
    },
    {
      id: "2", 
      title: "Mobile Conversion Issues",
      timestamp: "Yesterday",
      preview: "How can I improve mobile conversion?",
      category: "optimization"
    },
    {
      id: "3",
      title: "Email Campaign Performance",
      timestamp: "2 days ago", 
      preview: "Show me email campaign metrics",
      category: "insights"
    },
    {
      id: "4",
      title: "Customer Segments",
      timestamp: "3 days ago",
      preview: "Which customer segments are growing?",
      category: "analysis"
    },
    {
      id: "5",
      title: "Channel Attribution",
      timestamp: "1 week ago",
      preview: "SQL query on user behavior",
      category: "analysis"
    },
    {
      id: "6",
      title: "Social Media ROI",
      timestamp: "1 week ago",
      preview: "Social channels performance analysis",
      category: "insights"
    }
  ];

  const getCategoryIcon = (category: ChatSession["category"]) => {
    switch (category) {
      case "analysis":
        return BarChart3;
      case "insights":
        return TrendingUp;
      case "optimization":
        return Target;
      default:
        return MessageSquare;
    }
  };

  const getCategoryColor = (category: ChatSession["category"]) => {
    return "bg-muted/50 text-muted-foreground";
  };

  // TODO: Replace with API call to /api/knowledge/accept-suggestion
  // Should update system prompt and remove suggestion from list
  // Body: { suggestionId, updatedPrompt }
  const handleAcceptSuggestion = (suggestionId: string) => {
    const suggestion = knowledgeSuggestions.find(s => s.id === suggestionId);
    if (suggestion) {
      setSystemPrompt(prev => prev + '\n\n' + suggestion.content);
      setKnowledgeSuggestions(prev => prev.filter(s => s.id !== suggestionId));
    }
  };

  const handleRejectSuggestion = (suggestionId: string) => {
    setKnowledgeSuggestions(prev => prev.filter(s => s.id !== suggestionId));
  };

  const getFileType = (fileName: string): ContextFile["type"] => {
    const ext = fileName.toLowerCase().split('.').pop();
    switch (ext) {
      case 'json':
        return 'json';
      case 'js':
      case 'ts':
      case 'jsx':
      case 'tsx':
      case 'py':
      case 'sql':
      case 'css':
      case 'html':
        return 'code';
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'svg':
        return 'image';
      case 'txt':
      case 'md':
      case 'csv':
        return 'text';
      default:
        return 'other';
    }
  };

  const getFileIcon = (type: ContextFile["type"]) => {
    switch (type) {
      case 'json':
        return FileJson;
      case 'code':
        return Code;
      case 'image':
        return Image;
      case 'text':
        return FileText;
      default:
        return File;
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // TODO: Replace with API call to /api/context/upload
  // Should upload files to server and return file metadata
  // Body: FormData with files
  // Response: { id, name, type, size, content?, preview? }[]
  const handleFileUpload = async (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileType = getFileType(file.name);
      
      // Read file content for text-based files
      let content = '';
      let preview = '';
      
      if (fileType === 'text' || fileType === 'json' || fileType === 'code') {
        const text = await file.text();
        content = text;
        preview = text.length > 200 ? text.substring(0, 200) + '...' : text;
      } else if (fileType === 'image') {
        // For images, create a data URL for preview
        const reader = new FileReader();
        reader.onload = (e) => {
          const newFile: ContextFile = {
            id: Date.now().toString() + i,
            name: file.name,
            type: fileType,
            size: file.size,
            content: e.target?.result as string,
            preview: 'Image file',
            uploadedAt: new Date()
          };
          setContextFiles(prev => [...prev, newFile]);
        };
        reader.readAsDataURL(file);
        continue;
      }

      const newFile: ContextFile = {
        id: Date.now().toString() + i,
        name: file.name,
        type: fileType,
        size: file.size,
        content,
        preview,
        uploadedAt: new Date()
      };

      setContextFiles(prev => [...prev, newFile]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const removeFile = (fileId: string) => {
    setContextFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const filteredSessions = chatSessions.filter(session =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={cn(
      "bg-card border-r border-border transition-all duration-300 flex flex-col h-full",
      expanded ? "w-80" : "w-16"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleExpand}
            className="h-8 w-8 p-0"
          >
            <Brain className="h-4 w-4" />
          </Button>
          
          {expanded && (
            <>
              <h2 className="text-sm font-semibold">Assistant Panel</h2>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Plus className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>

        {/* Tabs */}
        {expanded && (
          <div className="mt-3 flex space-x-1 bg-muted p-1 rounded-lg">
            <Button
              variant={activeTab === "chats" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("chats")}
              className="flex-1 h-8 p-0"
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
            <Button
              variant={activeTab === "context" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("context")}
              className="flex-1 h-8 p-0"
            >
              <FileText className="h-4 w-4" />
            </Button>
            <Button
              variant={activeTab === "knowledge" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("knowledge")}
              className="flex-1 h-8 p-0"
            >
              <Brain className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Search - only for chats and knowledge */}
        {expanded && (activeTab === "chats" || activeTab === "knowledge") && (
          <div className="mt-3 relative">
            <Search className="absolute left-2 top-2.5 h-3 w-3 text-muted-foreground" />
            <input
              type="text"
              placeholder={activeTab === "chats" ? "Search conversations..." : "Search knowledge..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-7 pr-3 py-2 text-xs border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        )}
      </div>

      {/* Content Area */}
      <ScrollArea className="flex-1">
        {expanded ? (
          <div className="p-2">
            {/* Chat History Tab */}
            {activeTab === "chats" && (
              <div className="space-y-2">
                <Button className="w-full justify-start text-sm h-8">
                  <Plus className="h-4 w-4 mr-2" />
                  New Chat
                </Button>
                <div className="space-y-1">
                  {filteredSessions.map((session) => {
                    const CategoryIcon = getCategoryIcon(session.category);
                    return (
                      <div 
                        key={session.id} 
                        className="cursor-pointer hover:bg-muted/50 transition-colors rounded-md p-2 group"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <div className="p-1 rounded-sm bg-muted/50">
                                <CategoryIcon className="h-2.5 w-2.5 text-muted-foreground" />
                              </div>
                              <h4 className="text-xs font-medium truncate">{session.title}</h4>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-4 w-4 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <MoreHorizontal className="h-2.5 w-2.5" />
                            </Button>
                          </div>
                          
                          <p className="text-xs text-muted-foreground truncate pl-5">
                            {session.preview}
                          </p>
                          
                          <div className="flex items-center gap-1 text-xs text-muted-foreground pl-5">
                            <Clock className="h-2.5 w-2.5" />
                            {session.timestamp}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Context Tab */}
            {activeTab === "context" && (
              <div className="space-y-3">
                <div>
                  <h3 className="text-xs font-medium text-muted-foreground mb-2">Temporary Context</h3>
                  <textarea
                    placeholder="Add context for this conversation (e.g., current campaign details, specific metrics to focus on, etc.)"
                    value={contextInput}
                    onChange={(e) => setContextInput(e.target.value)}
                    className="w-full h-24 p-2 text-xs border border-border rounded-md bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-muted-foreground">
                      {contextInput.length}/500
                    </span>
                    <Button size="sm" className="h-6 text-xs">
                      Save Context
                    </Button>
                  </div>
                </div>

                {/* File Upload Area */}
                <div>
                  <h3 className="text-xs font-medium text-muted-foreground mb-2">Context Files</h3>
                  <div
                    className={cn(
                      "border-2 border-dashed rounded-lg p-4 text-center transition-colors",
                      isDragOver 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50"
                    )}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                  >
                    <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground mb-2">
                      Drop files here or click to upload
                    </p>
                    <p className="text-xs text-muted-foreground/70">
                      Supports: Text, JSON, Code, Images
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 h-6 text-xs"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Choose Files
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".txt,.md,.json,.js,.ts,.jsx,.tsx,.py,.sql,.css,.html,.csv,.png,.jpg,.jpeg,.gif,.svg"
                      onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                      className="hidden"
                    />
                  </div>

                  {/* Uploaded Files */}
                  {contextFiles.length > 0 && (
                    <div className="mt-3 space-y-1">
                      {contextFiles.map((file) => {
                        const FileIcon = getFileIcon(file.type);
                        return (
                          <div key={file.id} className="flex items-start gap-2 p-2 bg-muted/50 rounded-md group">
                            <FileIcon className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium truncate">{file.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {formatFileSize(file.size)} • {file.type}
                              </p>
                              {file.preview && file.type !== 'image' && (
                                <p className="text-xs text-muted-foreground mt-1 truncate">
                                  {file.preview}
                                </p>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeFile(file.id)}
                            >
                              <Trash2 className="h-3 w-3 text-red-500" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-xs font-medium text-muted-foreground mb-2">Quick Context</h3>
                  <div className="space-y-1">
                    {[
                      "Q4 2024 Campaign",
                      "Mobile App Launch",
                      "European Market",
                      "B2B Focus"
                    ].map((context, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start h-7 text-xs"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        {context}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Knowledge Base Tab */}
            {activeTab === "knowledge" && (
              <div className="space-y-3">
                {/* Knowledge Suggestions */}
                {knowledgeSuggestions.length > 0 && (
                  <div>
                    <h3 className="text-xs font-medium text-muted-foreground mb-2 flex items-center">
                      <Lightbulb className="h-3 w-3 mr-1" />
                      Knowledge Suggestions
                    </h3>
                    <div className="space-y-2">
                      {knowledgeSuggestions.map((suggestion) => (
                        <Card key={suggestion.id} className="p-2 border-orange-200 bg-orange-50/50 dark:bg-orange-950/20 dark:border-orange-800">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between">
                              <h4 className="text-xs font-medium text-foreground">{suggestion.title}</h4>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-5 w-5 p-0 text-green-600 hover:bg-green-100"
                                  onClick={() => handleAcceptSuggestion(suggestion.id)}
                                >
                                  <Check className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-5 w-5 p-0 text-red-600 hover:bg-red-100"
                                  onClick={() => handleRejectSuggestion(suggestion.id)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            <pre className="text-xs text-foreground/80 whitespace-pre-wrap font-mono">
                              {suggestion.content}
                            </pre>
                            <p className="text-xs text-muted-foreground italic">
                              {suggestion.reasoning}
                            </p>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Master System Prompt */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-medium text-muted-foreground">System Prompt</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 text-xs"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? "Save" : "Edit"}
                    </Button>
                  </div>
                  
                  {isEditing ? (
                    <textarea
                      value={systemPrompt}
                      onChange={(e) => setSystemPrompt(e.target.value)}
                      className="w-full h-64 p-3 text-xs font-mono border border-border rounded-md bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent leading-relaxed"
                      placeholder="Enter system instructions..."
                    />
                  ) : (
                    <div className="border border-border rounded-md p-3 bg-muted/30 max-h-64 overflow-y-auto">
                      <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono leading-relaxed">
                        {systemPrompt}
                      </pre>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                    <span>{systemPrompt.length} characters</span>
                    <span>Last updated: 2 min ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Collapsed view - just visual indicators */
          <div className="p-1 space-y-1">
            {chatSessions.slice(0, 8).map((session) => {
              const CategoryIcon = getCategoryIcon(session.category);
              return (
                <div
                  key={session.id}
                  className="w-full h-10 p-1 flex flex-col items-center justify-center"
                >
                  <CategoryIcon className="h-3 w-3 text-muted-foreground" />
                  <div className="w-1 h-1 bg-muted-foreground rounded-full mt-0.5" />
                </div>
              );
            })}
          </div>
        )}
      </ScrollArea>

      {/* Footer */}
      {expanded && (
        <div className="p-3 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {activeTab === "chats" && `${filteredSessions.length} conversations`}
              {activeTab === "knowledge" && `System prompt ready`}
              {activeTab === "context" && `${contextFiles.length} files • Context ready`}
            </span>
            <Badge variant="secondary" className="text-xs">
              <Users className="h-3 w-3 mr-1" />
              Pro
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
}
