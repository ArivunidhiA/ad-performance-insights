import { Eye, MousePointerClick, ShoppingCart, DollarSign } from 'lucide-react';
import { Header } from '@/components/dashboard/Header';
import { KPICard } from '@/components/dashboard/KPICard';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import { AttributionChart } from '@/components/dashboard/AttributionChart';
import { ChannelTable } from '@/components/dashboard/ChannelTable';
import { RecommendationCard } from '@/components/dashboard/RecommendationCard';
import { JourneyFunnel } from '@/components/dashboard/JourneyFunnel';
import { kpiSummary, recommendations } from '@/lib/mockData';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header />
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KPICard
            title="Impressions"
            value={`${(kpiSummary.totalImpressions / 1000000).toFixed(2)}M`}
            change={kpiSummary.impressionChange}
            icon={<Eye className="h-5 w-5" />}
            delay={0}
          />
          <KPICard
            title="Clicks"
            value={`${(kpiSummary.totalClicks / 1000).toFixed(1)}K`}
            change={kpiSummary.clickChange}
            icon={<MousePointerClick className="h-5 w-5" />}
            delay={50}
          />
          <KPICard
            title="Conversions"
            value={kpiSummary.totalConversions.toLocaleString()}
            change={kpiSummary.conversionChange}
            icon={<ShoppingCart className="h-5 w-5" />}
            delay={100}
          />
          <KPICard
            title="ROAS"
            value={`${kpiSummary.avgROAS.toFixed(2)}x`}
            change={kpiSummary.roasChange * 10}
            changeLabel="vs benchmark"
            icon={<DollarSign className="h-5 w-5" />}
            delay={150}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <PerformanceChart />
          <AttributionChart />
        </div>

        {/* Channel Table */}
        <div className="mb-8">
          <ChannelTable />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recommendations */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Optimization Recommendations</h3>
              <span className="text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
                {recommendations.length} actions
              </span>
            </div>
            <div className="space-y-3">
              {recommendations.slice(0, 4).map((rec, index) => (
                <RecommendationCard key={rec.id} recommendation={rec} index={index} />
              ))}
            </div>
          </div>

          {/* Journey Funnel */}
          <JourneyFunnel />
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>Campaign Analytics Dashboard • Powered by Multi-Touch Attribution</p>
            <p>Data refreshed every 5 minutes</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
