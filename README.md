<div align="center">

# 📊 Campaign Analytics Dashboard

### Multi-Touch Attribution & Performance Insights Platform

A comprehensive marketing analytics dashboard that provides real-time campaign performance tracking, multi-touch attribution modeling, and actionable optimization recommendations. Built with React, TypeScript, and PostgreSQL for enterprise-grade reliability and scalability.

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

---

## 📸 Screenshots

<div align="center">

### Dashboard Overview
![Dashboard Overview](public/images/dashboard-overview.png)
*Real-time KPI cards with impressions, clicks, conversions, and ROAS metrics alongside interactive performance charts*

### Channel Performance Analytics
![Channel Performance](public/images/channel-performance.png)
*Detailed breakdown of metrics by advertising channel including CTR, CVR, CPA, and revenue analysis*

### Optimization Recommendations
![Optimization Recommendations](public/images/recommendations.png)
*AI-powered recommendations and top conversion path analysis for campaign optimization*

</div>

---

## 🎯 Overview

Campaign Analytics Dashboard is a full-stack marketing analytics platform designed for digital marketers and data analysts who need deep insights into their advertising performance across multiple channels. The platform aggregates data from various advertising sources (Google Ads, Facebook, Display networks) and provides unified analytics with advanced attribution modeling.

### Key Highlights

- **Real-time Metrics**: Live dashboard updates with key performance indicators
- **Multi-Touch Attribution**: 5 attribution models (First Click, Last Click, Linear, Time Decay, Position-Based)
- **Channel Analytics**: Detailed performance breakdown by Search, Display, Video, and Social channels
- **Conversion Path Analysis**: Visual representation of top-converting user journeys
- **Smart Recommendations**: Data-driven optimization suggestions with impact estimates

---

## ✨ Features

### Core Analytics
| Feature | Description |
|---------|-------------|
| **KPI Dashboard** | Real-time impressions, clicks, conversions, and ROAS with trend indicators |
| **Performance Charts** | Interactive time-series visualization of revenue and cost trends |
| **Attribution Modeling** | Compare conversion credit across 5 different attribution models |
| **Channel Comparison** | Side-by-side analysis of all advertising channels |

### Advanced Capabilities
- 📈 **30-Day Trend Analysis** - Historical performance visualization
- 🔄 **Data Sync** - One-click data refresh from connected sources
- 📊 **Multi-Model Attribution** - First Click, Last Click, Linear, Time Decay, Position-Based
- 🛤️ **Journey Mapping** - Top conversion paths with percentage breakdowns
- 💡 **AI Recommendations** - Priority-ranked optimization suggestions
- 📱 **Responsive Design** - Fully optimized for desktop, tablet, and mobile

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library with hooks and functional components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling with custom design system
- **Recharts** - Data visualization library
- **TanStack Query** - Server state management and caching
- **React Router** - Client-side routing

### Backend
- **PostgreSQL** - Primary database for analytics data
- **Edge Functions** - Serverless API endpoints (Deno runtime)
- **Row Level Security** - Database-level access control

### Development
- **Vite** - Next-generation frontend tooling
- **ESLint** - Code linting and formatting
- **date-fns** - Date manipulation utilities

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **npm** or **bun** package manager
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/campaign-analytics-dashboard.git
   cd campaign-analytics-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Configure your `.env` file:
   ```env
   VITE_SUPABASE_URL=your_database_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
   ```

4. **Run database migrations**
   ```bash
   npm run db:migrate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:5173
   ```

---

## 📁 Project Structure

```
campaign-analytics-dashboard/
├── public/
│   └── images/              # Static assets and screenshots
├── src/
│   ├── components/
│   │   ├── dashboard/       # Dashboard-specific components
│   │   │   ├── Header.tsx
│   │   │   ├── KPICard.tsx
│   │   │   ├── PerformanceChart.tsx
│   │   │   ├── AttributionChart.tsx
│   │   │   ├── ChannelTable.tsx
│   │   │   ├── JourneyFunnel.tsx
│   │   │   └── RecommendationCard.tsx
│   │   └── ui/              # Reusable UI components
│   ├── hooks/
│   │   ├── useCampaignData.ts
│   │   ├── useAttribution.ts
│   │   ├── useJourneyData.ts
│   │   └── useSyncData.ts
│   ├── integrations/        # External service integrations
│   ├── lib/                 # Utility functions
│   ├── pages/               # Route components
│   └── index.css            # Global styles and design tokens
├── supabase/
│   ├── functions/           # Edge functions
│   │   └── google-ads-sync/ # Data sync function
│   └── config.toml          # Database configuration
└── README.md
```

---

## 📊 Database Schema

### Tables

#### `campaign_performance`
Stores daily campaign metrics by channel.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `campaign_id` | TEXT | Unique campaign identifier |
| `campaign_name` | TEXT | Human-readable campaign name |
| `channel` | TEXT | Advertising channel (Search, Display, Video, Social) |
| `date` | DATE | Performance date |
| `impressions` | INTEGER | Number of ad impressions |
| `clicks` | INTEGER | Number of clicks |
| `conversions` | INTEGER | Number of conversions |
| `cost` | DECIMAL | Total ad spend |
| `revenue` | DECIMAL | Generated revenue |

#### `attribution_results`
Pre-calculated attribution by model type.

| Column | Type | Description |
|--------|------|-------------|
| `channel` | TEXT | Advertising channel |
| `model_type` | TEXT | Attribution model (first_click, last_click, linear, time_decay, position_based) |
| `attributed_conversions` | DECIMAL | Credited conversions |
| `attributed_revenue` | DECIMAL | Credited revenue |

#### `user_journeys`
Touchpoint-level data for attribution modeling.

| Column | Type | Description |
|--------|------|-------------|
| `journey_id` | TEXT | Unique journey identifier |
| `channel` | TEXT | Touchpoint channel |
| `touchpoint_order` | INTEGER | Sequence in journey |
| `converted` | BOOLEAN | Whether journey converted |

---

## 🔧 Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_SUPABASE_URL` | Yes | Database connection URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Yes | Public API key |
| `GOOGLE_ADS_CLIENT_ID` | No | Google Ads OAuth client ID |
| `GOOGLE_ADS_CLIENT_SECRET` | No | Google Ads OAuth client secret |

### Attribution Models

The platform supports 5 attribution models:

1. **First Click** - 100% credit to first touchpoint
2. **Last Click** - 100% credit to last touchpoint
3. **Linear** - Equal credit across all touchpoints
4. **Time Decay** - More credit to recent touchpoints
5. **Position-Based** - 40% first, 40% last, 20% middle

---

## 📈 Usage

### Syncing Data

Click the **"Sync Data"** button in the header to:
- Fetch latest campaign performance data
- Recalculate attribution models
- Update conversion path analysis

### Analyzing Performance

1. **KPI Cards** - Quick overview of key metrics with period-over-period changes
2. **Performance Chart** - Identify revenue and cost trends over time
3. **Attribution Chart** - Compare how different models credit each channel
4. **Channel Table** - Deep dive into individual channel performance
5. **Conversion Paths** - Understand common user journeys

### Optimization

Review the **Optimization Recommendations** section for:
- High-impact budget reallocation suggestions
- Underperforming channel alerts
- Scheduling optimization tips

---

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run end-to-end tests
npm run test:e2e
```

---

## 🚢 Deployment

### Production Build

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Write meaningful commit messages
- Add tests for new features

---

## 📋 Roadmap

- [ ] Google Ads API live integration
- [ ] Facebook Ads connector
- [ ] Custom date range picker
- [ ] PDF/CSV export functionality
- [ ] Email scheduled reports
- [ ] A/B test performance tracking
- [ ] Budget forecasting module
- [ ] Team collaboration features

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Recharts](https://recharts.org/) for beautiful charts
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [TanStack Query](https://tanstack.com/query) for server state management

---

<div align="center">

**Built with ❤️ for marketers who love data**

[Report Bug](https://github.com/yourusername/campaign-analytics-dashboard/issues) · [Request Feature](https://github.com/yourusername/campaign-analytics-dashboard/issues)

</div>
