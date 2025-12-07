import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface SyncStatus {
  id: string;
  sync_type: string;
  status: string;
  started_at: string;
  completed_at: string | null;
  records_synced: number | null;
  error_message: string | null;
}

export function useLastSync() {
  return useQuery({
    queryKey: ["last-sync"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sync_status")
        .select("*")
        .eq("status", "completed")
        .order("completed_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data as SyncStatus | null;
    },
  });
}

export function useSyncData() {
  const queryClient = useQueryClient();
  const [isSyncing, setIsSyncing] = useState(false);

  const syncMutation = useMutation({
    mutationFn: async () => {
      setIsSyncing(true);
      
      const { data, error } = await supabase.functions.invoke("google-ads-sync");
      
      if (error) throw error;
      if (!data.success) throw new Error(data.error || "Sync failed");
      
      return data;
    },
    onSuccess: (data) => {
      toast.success(`Synced ${data.records_synced} records successfully`);
      // Invalidate all data queries to refresh the dashboard
      queryClient.invalidateQueries({ queryKey: ["campaign-data"] });
      queryClient.invalidateQueries({ queryKey: ["attribution-data"] });
      queryClient.invalidateQueries({ queryKey: ["last-sync"] });
      queryClient.invalidateQueries({ queryKey: ["journey-data"] });
    },
    onError: (error: Error) => {
      toast.error(`Sync failed: ${error.message}`);
    },
    onSettled: () => {
      setIsSyncing(false);
    },
  });

  return {
    syncData: syncMutation.mutate,
    isSyncing,
    error: syncMutation.error,
  };
}
