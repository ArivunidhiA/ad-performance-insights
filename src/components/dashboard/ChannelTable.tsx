import { useChannelSummary } from '@/hooks/useCampaignData';
import { cn } from '@/lib/utils';
import { ArrowUpRight, ArrowDownRight, Loader2 } from 'lucide-react';

export function ChannelTable() {
  const { data: channelPerformance, isLoading } = useChannelSummary();

  const getROASColor = (roas: number) => {
    if (roas >= 2.5) return 'text-success';
    if (roas >= 2.0) return 'text-warning';
    return 'text-destructive';
  };

  const getROASBg = (roas: number) => {
    if (roas >= 2.5) return 'bg-success/10';
    if (roas >= 2.0) return 'bg-warning/10';
    return 'bg-destructive/10';
  };

  return (
    <div className="glass-card p-6 animate-slide-up opacity-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Channel Performance</h3>
        <p className="text-sm text-muted-foreground">Detailed metrics by advertising channel</p>
      </div>
      
      {isLoading ? (
        <div className="h-48 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : !channelPerformance || channelPerformance.length === 0 ? (
        <div className="h-48 flex items-center justify-center text-muted-foreground">
          No data - click "Sync Data" to load
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Channel</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Impressions</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Clicks</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">CTR</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Conv.</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">CVR</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Cost</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Revenue</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">CPA</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">ROAS</th>
              </tr>
            </thead>
            <tbody>
              {channelPerformance.map((row, index) => (
                <tr 
                  key={row.channel} 
                  className="data-table-row border-b border-border/50 last:border-0"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        index === 0 && "bg-chart-1",
                        index === 1 && "bg-chart-2",
                        index === 2 && "bg-chart-3",
                        index === 3 && "bg-chart-4",
                      )} />
                      <span className="font-medium text-foreground">{row.channel}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right text-sm text-muted-foreground font-mono">
                    {row.impressions.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-right text-sm text-muted-foreground font-mono">
                    {row.clicks.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-right text-sm text-muted-foreground font-mono">
                    {row.ctr.toFixed(2)}%
                  </td>
                  <td className="py-4 px-4 text-right text-sm text-foreground font-mono font-medium">
                    {row.conversions.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-right text-sm text-muted-foreground font-mono">
                    {row.cvr.toFixed(2)}%
                  </td>
                  <td className="py-4 px-4 text-right text-sm text-muted-foreground font-mono">
                    ${row.cost.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-right text-sm text-foreground font-mono font-medium">
                    ${row.revenue.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-right text-sm text-muted-foreground font-mono">
                    ${row.cpa.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className={cn(
                      "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-medium font-mono",
                      getROASBg(row.roas),
                      getROASColor(row.roas)
                    )}>
                      {row.roas >= 2.5 ? (
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      ) : (
                        <ArrowDownRight className="h-3.5 w-3.5" />
                      )}
                      {row.roas.toFixed(2)}x
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
