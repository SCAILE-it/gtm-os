# GTM Dashboard

A comprehensive Go-to-Market analytics dashboard built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

## 🚀 Features

### Overview Dashboard
- **CEO KPI Ribbon**: 7 key performance indicators with smart visibility rules
- **Horizontal Funnel**: 4-stage funnel visualization (First Touch → Qualified → Opportunity → Closed)
- **Quick Actions**: AI Assistant, Recommendations, and Data Sources shortcuts

### Stage-Based Navigation
- **First Touch**: Unknown → Identified Contact
  - Metrics: Contacts Created, Engagement Rate, Cost per Touch, Time to Qualify
- **Qualified**: Identified → Validated Potential Customer
  - Metrics: MQLs/SQLs, ICP Match Score, Cost per Qualified, Time to Opportunity
- **Opportunity**: Potential → Active Sales Process
  - Metrics: Opportunities, Deal Size, Cost per Opportunity, Time to Close
- **Closed**: Active → Decided
  - Metrics: Won Deals, Win Rate, CAC, Sales Cycle Length

### Admin Section
- **Recommendations**: AI-powered insights with ICE scoring and workflow management
- **Data Sources**: Connection hub with health monitoring and progressive enhancement
- **Settings**: Stage definitions, SLAs, business assumptions, and localization

### Key Design Features
- **MECE Funnel Structure**: Mutually Exclusive, Collectively Exhaustive 4-stage funnel
- **Smart KPI Visibility**: Hide CAC when no paid ads data, show N/A for missing dependencies
- **Progressive Data Enhancement**: Core value with Website + CRM, enhanced with additional sources
- **ChatGPT-style UI**: Clean, minimal design with rounded corners and soft shadows
- **Responsive Layout**: Mobile-first approach with adaptive navigation

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Recharts (ready for integration)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 🏃‍♂️ Running the Application

The development server is already running on:
```
http://localhost:3000
```

### Available Routes

#### Main Navigation
- `/` - Overview Dashboard
- `/stages/first-touch` - First Touch Stage Analysis
- `/stages/qualified` - Qualified Stage Analysis  
- `/stages/opportunity` - Opportunity Stage Analysis
- `/stages/closed` - Closed Stage Analysis
- `/admin/recommendations` - Recommendations Management
- `/admin/data-sources` - Data Sources Configuration
- `/admin/settings` - Settings and Configuration

## 📊 Data Architecture

### 4-Stage Universal Funnel
```
First Touch → Qualified → Opportunity → Closed
```

Each stage has clear:
- **Definition**: What the stage represents
- **MECE Criteria**: How contacts progress
- **Exit Condition**: When they move to next stage
- **Metrics**: Volume, Quality, Efficiency, Velocity

### Data Source Strategy
- **Required**: Website Analytics + CRM (core functionality)
- **Optional**: Email Marketing, Paid Ads, Social Media, Events
- **Progressive Enhancement**: Features unlock as sources are added

### Smart Feature Gating
- CAC metrics only visible with paid advertising data
- Attribution analysis enhanced with multi-channel data
- Cross-channel insights require multiple sources

## 🎨 Design System

### Color Scheme
- **First Touch**: Blue (`blue-500`)
- **Qualified**: Purple (`purple-500`)
- **Opportunity**: Green (`green-500`)
- **Closed**: Orange (`orange-500`)

### Component Library
- `KpiCard`: Standardized metric display with delta, sparklines, badges
- `FunnelCard`: Stage visualization with headlines and bullets
- `AIAssistantDrawer`: Context-aware AI assistant with recommendations
- Global layout components with responsive sidebar navigation

## 🔧 Configuration

### Stage Definitions
All stages are configurable in Settings with:
- Custom definitions and exit criteria
- SLA timeouts for "stuck" contact detection
- Qualification criteria and business rules

### Business Assumptions
- LTV calculations with configurable margin and period
- Attribution model selection (First Touch, Last Touch, Data Driven)
- Currency and timezone localization

## 🤖 AI Integration

The AI Assistant provides:
- **Top Movers**: Key metric changes and trends
- **Recommendations**: ICE-scored action items with evidence
- **Keyword Analysis**: ICP alignment and optimization opportunities
- **Context Awareness**: Stage-specific insights and suggestions

## 📈 Next Steps

To extend this dashboard:

1. **Connect Real Data Sources**
   - Implement Supabase integration
   - Add OAuth flows for CRM/marketing tools
   - Set up data transformation pipelines

2. **Add Chart Components**
   - Implement Recharts visualizations
   - Add time series analysis
   - Create conversion funnel charts

3. **Enhance AI Features**
   - Integrate OpenAI API
   - Add natural language querying
   - Implement automated recommendation generation

4. **Add Real-time Features**
   - WebSocket connections for live data
   - Push notifications for alerts
   - Real-time collaboration features

## 📝 Notes

This implementation focuses on:
- **Clean Architecture**: Modular, reusable components
- **User Experience**: Intuitive navigation and progressive disclosure
- **Data Flexibility**: Works with varying data source availability
- **Scalability**: Ready for real data integration and feature expansion

The dashboard successfully demonstrates a complete GTM analytics solution with a focus on actionable insights and user-friendly design.