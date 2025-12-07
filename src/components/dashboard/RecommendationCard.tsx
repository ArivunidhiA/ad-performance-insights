import { cn } from '@/lib/utils';
import { AlertTriangle, TrendingUp, Lightbulb, ChevronRight } from 'lucide-react';

interface Recommendation {
  id: number;
  title: string;
  priority: 'high' | 'medium' | 'low';
  impact: string;
  description: string;
  action: string;
  expectedOutcome: string;
}

interface RecommendationCardProps {
  recommendation: Recommendation;
  index: number;
}

export function RecommendationCard({ recommendation, index }: RecommendationCardProps) {
  const priorityConfig = {
    high: {
      icon: AlertTriangle,
      bg: 'bg-destructive/10',
      text: 'text-destructive',
      border: 'border-destructive/30',
      label: 'High Priority'
    },
    medium: {
      icon: TrendingUp,
      bg: 'bg-warning/10',
      text: 'text-warning',
      border: 'border-warning/30',
      label: 'Medium Priority'
    },
    low: {
      icon: Lightbulb,
      bg: 'bg-primary/10',
      text: 'text-primary',
      border: 'border-primary/30',
      label: 'Low Priority'
    }
  };

  const config = priorityConfig[recommendation.priority];
  const Icon = config.icon;

  return (
    <div 
      className={cn(
        "glass-card p-5 border-l-4 animate-slide-up opacity-0 group cursor-pointer transition-all duration-300 hover:translate-x-1",
        config.border
      )}
      style={{ animationDelay: `${500 + index * 100}ms`, animationFillMode: 'forwards' }}
    >
      <div className="flex items-start gap-4">
        <div className={cn("p-2.5 rounded-xl", config.bg)}>
          <Icon className={cn("h-5 w-5", config.text)} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="font-semibold text-foreground truncate">
              {recommendation.title}
            </h4>
            <span className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full shrink-0",
              config.bg,
              config.text
            )}>
              {config.label}
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {recommendation.description}
          </p>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Impact:</span>
              <span className="text-sm font-medium text-primary">{recommendation.impact}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors">
              View details
              <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
