import { Calendar, RefreshCw, Download, Settings, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSyncData, useLastSync } from '@/hooks/useSyncData';
import { format } from 'date-fns';

export function Header() {
  const { syncData, isSyncing } = useSyncData();
  const { data: lastSync } = useLastSync();

  const getLastSyncText = () => {
    if (!lastSync?.completed_at) return 'Never synced';
    const syncDate = new Date(lastSync.completed_at);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - syncDate.getTime()) / 60000);
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
    return format(syncDate, 'MMM d, h:mm a');
  };

  return (
    <header className="mb-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <svg className="h-5 w-5 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3v18h18" />
                <path d="M18 9l-5-6-4 8-3-2" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">
                Campaign Analytics
              </h1>
              <p className="text-sm text-muted-foreground">
                Multi-touch attribution & performance insights
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Last 30 days</span>
            <span className="sm:hidden">30d</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={() => syncData()}
            disabled={isSyncing}
          >
            {isSyncing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">{isSyncing ? 'Syncing...' : 'Sync Data'}</span>
          </Button>
          
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>

          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="mt-4 flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 text-success text-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
          </span>
          {lastSync ? 'Data synced' : 'Mock data'}
        </div>
        <span className="text-xs text-muted-foreground">Last updated: {getLastSyncText()}</span>
      </div>
    </header>
  );
}
