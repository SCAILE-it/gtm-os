# API Integration Guide

This document outlines all the places where mock data needs to be replaced with real API calls for the SCAILE Agentic Growth Engine.

## 🔗 Required API Endpoints

### **Core Dashboard APIs**

#### 1. `/api/kpis`
**Purpose**: Get key performance indicators for TL;DR sidebar
**Method**: GET
**Query Params**: 
- `timeRange`: "1d" | "7d" | "30d" | "90d"
- `location`: string
- `businessUnit`: string  
- `channel`: string
**Response**: 
```typescript
{
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  color: string;
}[]
```
**File**: `src/components/layout/daily-digest-sidebar.tsx:30`

#### 2. `/api/dashboard/kpis`
**Purpose**: Get enhanced KPI data for full dashboard
**Method**: GET
**Query Params**: Same as above
**Response**:
```typescript
{
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: string;
  description: string;
  target: string;
  progress: number;
}[]
```
**File**: `src/components/dashboard/dashboard-content.tsx:50`

#### 3. `/api/dashboard/channels`
**Purpose**: Get channel performance data
**Method**: GET
**Query Params**: Same filter params
**Response**:
```typescript
{
  name: string;
  value: number;
  color: string;
  revenue: string;
  change: string;
  users: number;
}[]
```
**File**: `src/components/dashboard/dashboard-content.tsx:100`

#### 4. `/api/dashboard/insights`
**Purpose**: Get AI-generated strategic insights
**Method**: GET
**Query Params**: Same filter params
**Response**:
```typescript
{
  title: string;
  description: string;
  impact: "High" | "Medium" | "Low";
  trend: "positive" | "negative";
  metric: string;
  type: "opportunity" | "success" | "alert" | "insight";
  recommendation: string;
}[]
```
**File**: `src/components/dashboard/dashboard-content.tsx:138`

#### 5. `/api/insights`
**Purpose**: Get findings and recommendations for TL;DR
**Method**: GET
**Query Params**: Same filter params
**Response**:
```typescript
{
  type: "insight" | "recommendation" | "alert";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}[]
```
**File**: `src/components/layout/daily-digest-sidebar.tsx:64`

### **Chat & AI APIs**

#### 6. `/api/chat/completions`
**Purpose**: Send user message and get AI response
**Method**: POST
**Body**:
```typescript
{
  message: string;
  context?: ContextFile[];
  systemPrompt?: string;
  sessionId?: string;
}
```
**Response**:
```typescript
{
  content: string;
  sources?: DataSource[];
  codeBlocks?: CodeBlock[];
  charts?: ChartData[];
  finalContent?: string;
}
```
**File**: `src/components/ai/agentic-interface.tsx:223`

#### 7. `/api/chat/history`
**Purpose**: Load initial chat messages or conversation history
**Method**: GET
**Query Params**: `sessionId?`: string
**Response**: `Message[]`
**File**: `src/components/ai/agentic-interface.tsx:84`

#### 8. `/api/chat/sessions`
**Purpose**: Get user's chat history
**Method**: GET
**Query Params**: `search?`: string
**Response**:
```typescript
{
  id: string;
  title: string;
  timestamp: string;
  preview: string;
  category: "analysis" | "insights" | "optimization" | "general";
}[]
```
**File**: `src/components/layout/chat-history-sidebar.tsx:124`

#### 9. `/api/suggestions`
**Purpose**: Get contextual question suggestions
**Method**: GET
**Query Params**: `context?`: string
**Response**:
```typescript
{
  icon: string;
  text: string;
  category: string;
}[]
```
**File**: `src/components/ai/agentic-interface.tsx:102`

### **Knowledge & Context APIs**

#### 10. `/api/system-prompt`
**Purpose**: Load and save system prompt
**Method**: GET/PUT
**Body** (PUT):
```typescript
{
  content: string;
}
```
**Response**:
```typescript
{
  content: string;
  lastUpdated: string;
}
```
**File**: `src/components/layout/chat-history-sidebar.tsx:70`

#### 11. `/api/knowledge/suggestions`
**Purpose**: Get AI suggestions for system prompt improvements
**Method**: GET
**Response**:
```typescript
{
  id: string;
  title: string;
  content: string;
  reasoning: string;
}[]
```
**File**: `src/components/layout/chat-history-sidebar.tsx:112`

#### 12. `/api/knowledge/accept-suggestion`
**Purpose**: Accept a knowledge suggestion and update system prompt
**Method**: POST
**Body**:
```typescript
{
  suggestionId: string;
  updatedPrompt: string;
}
```
**File**: `src/components/layout/chat-history-sidebar.tsx:191`

#### 13. `/api/context/upload`
**Purpose**: Upload context files
**Method**: POST
**Body**: FormData with files
**Response**:
```typescript
{
  id: string;
  name: string;
  type: "text" | "json" | "code" | "image" | "other";
  size: number;
  content?: string;
  preview?: string;
  uploadedAt: string;
}[]
```
**File**: `src/components/layout/chat-history-sidebar.tsx:258`

### **Chart APIs**

#### 14. `/api/charts/revenue`
**Purpose**: Get revenue trend data for charts
**Method**: GET
**Query Params**: 
- `timeRange`: string
- `granularity`: "daily" | "weekly" | "monthly"
**Response**:
```typescript
{
  day: string;
  revenue: number;
  date: string;
}[]
```
**File**: `src/components/charts/revenue-chart.tsx:5`

### **User & Settings APIs**

#### 15. `/api/connections`
**Purpose**: Get user's data source connections
**Method**: GET
**Response**:
```typescript
{
  id: string;
  name: string;
  type: string;
  status: "connected" | "disconnected" | "error";
  description: string;
  lastSync?: string;
}[]
```
**File**: `src/components/settings/settings-page.tsx:37`

#### 16. `/api/user/preferences`
**Purpose**: Get/update user notification preferences
**Method**: GET/PUT
**Body** (PUT):
```typescript
{
  dailyDigest: boolean;
  anomalyAlerts: boolean;
  weeklyReports: boolean;
  goalAlerts: boolean;
}
```
**File**: `src/components/settings/settings-page.tsx:78`

## 🔧 Implementation Notes

### **Authentication**
All API calls should include authentication headers:
```typescript
headers: {
  'Authorization': `Bearer ${userToken}`,
  'Content-Type': 'application/json'
}
```

### **Error Handling**
Implement consistent error handling across all API calls:
```typescript
try {
  const response = await fetch('/api/endpoint');
  if (!response.ok) throw new Error('API call failed');
  const data = await response.json();
  // Handle success
} catch (error) {
  // Show user-friendly error message
  console.error('API Error:', error);
}
```

### **Loading States**
All components should show loading states while API calls are in progress.

### **Real-time Updates**
Consider WebSocket connections for real-time data updates in:
- KPI values
- Chat messages
- System alerts

### **Caching Strategy**
Implement appropriate caching for:
- KPI data (5-minute cache)
- Chart data (1-minute cache)
- User preferences (session cache)
- System prompt (local storage backup)

## 🚀 Priority Order for Implementation

1. **Authentication & User Management**
2. **Core KPI APIs** (dashboard functionality)
3. **Chat Completions API** (core AI functionality)
4. **Chart Data APIs** (visualizations)
5. **Settings & Preferences** (user customization)
6. **Advanced Features** (file upload, knowledge base)

This guide provides a complete roadmap for replacing all mock data with real API integrations.
