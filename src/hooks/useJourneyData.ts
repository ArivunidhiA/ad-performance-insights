import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface JourneyPath {
  path: string;
  count: number;
  percentage: number;
}

export function useJourneyData() {
  return useQuery({
    queryKey: ["journey-data"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_journeys")
        .select("journey_id, channel, touchpoint_order, converted")
        .order("journey_id")
        .order("touchpoint_order");

      if (error) throw error;

      // Group by journey and build paths
      const journeyPaths: Record<string, { channels: string[]; converted: boolean }> = {};
      
      for (const touchpoint of data) {
        if (!journeyPaths[touchpoint.journey_id]) {
          journeyPaths[touchpoint.journey_id] = { channels: [], converted: false };
        }
        journeyPaths[touchpoint.journey_id].channels.push(touchpoint.channel);
        if (touchpoint.converted) {
          journeyPaths[touchpoint.journey_id].converted = true;
        }
      }

      // Count path occurrences (only converting journeys)
      const pathCounts: Record<string, number> = {};
      let totalConverting = 0;

      for (const journey of Object.values(journeyPaths)) {
        if (journey.converted) {
          const pathKey = journey.channels.join(" → ");
          pathCounts[pathKey] = (pathCounts[pathKey] || 0) + 1;
          totalConverting++;
        }
      }

      // Convert to sorted array
      const paths: JourneyPath[] = Object.entries(pathCounts)
        .map(([path, count]) => ({
          path,
          count,
          percentage: totalConverting > 0 ? (count / totalConverting) * 100 : 0,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10); // Top 10 paths

      return paths;
    },
  });
}
