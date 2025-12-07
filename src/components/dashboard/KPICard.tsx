import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  className?: string;
  delay?: number;
}

export function KPICard({ 
  title, 
  value, 
  change, 
  changeLabel = "vs last period",
  icon,
  className,
  delay = 0 
}: KPICardProps) {
  const isPositive = change >= 0;
  
  return (
    <div 
      className={cn(
        "glass-card metric-card p-6 animate-slide-up opacity-0",
        className
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </p>
          <p className="text-3xl font-bold tracking-tight text-foreground">
            {value}
          </p>
        </div>
        {icon && (
          <div className="p-3 rounded-xl bg-primary/10 text-primary">
            {icon}
          </div>
        )}
      </div>
      
      <div className="mt-4 flex items-center gap-2">
        <div className={cn(
          "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full",
          isPositive 
            ? "bg-success/10 text-success" 
            : "bg-destructive/10 text-destructive"
        )}>
          {isPositive ? (
            <TrendingUp className="h-3.5 w-3.5" />
          ) : (
            <TrendingDown className="h-3.5 w-3.5" />
          )}
          <span>{isPositive ? '+' : ''}{change.toFixed(1)}%</span>
        </div>
        <span className="text-xs text-muted-foreground">{changeLabel}</span>
      </div>
    </div>
  );
}
