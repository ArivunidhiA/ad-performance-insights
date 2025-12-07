import { journeyData } from '@/lib/mockData';
import { cn } from '@/lib/utils';

export function JourneyFunnel() {
  const maxCount = Math.max(...journeyData.map(j => j.count));

  return (
    <div className="glass-card p-6 animate-slide-up opacity-0" style={{ animationDelay: '350ms', animationFillMode: 'forwards' }}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Top Conversion Paths</h3>
        <p className="text-sm text-muted-foreground">Most common user journeys leading to conversion</p>
      </div>
      
      <div className="space-y-3">
        {journeyData.map((journey, index) => (
          <div key={journey.path} className="group">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-foreground font-medium truncate pr-4">
                {journey.path}
              </span>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-sm text-muted-foreground font-mono">
                  {journey.count}
                </span>
                <span className="text-xs text-muted-foreground w-12 text-right">
                  {journey.percentage}%
                </span>
              </div>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full rounded-full transition-all duration-500 ease-out",
                  index === 0 && "bg-gradient-to-r from-chart-1 to-chart-2",
                  index === 1 && "bg-gradient-to-r from-chart-2 to-chart-3",
                  index === 2 && "bg-gradient-to-r from-chart-3 to-chart-4",
                  index === 3 && "bg-chart-1",
                  index === 4 && "bg-chart-2",
                  index === 5 && "bg-chart-3",
                  index === 6 && "bg-chart-4",
                  index === 7 && "bg-muted-foreground/50",
                )}
                style={{ 
                  width: `${(journey.count / maxCount) * 100}%`,
                  transitionDelay: `${400 + index * 50}ms`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
