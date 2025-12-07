import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface AttributionResult {
  id: string;
  channel: string;
  model_type: string;
  attributed_conversions: number;
  attributed_revenue: number;
  date_range_start: string;
  date_range_end: string;
}

export interface AttributionByModel {
  channel: string;
  firstClick: number;
  lastClick: number;
  linear: number;
  timeDecay: number;
  positionBased: number;
}

export function useAttributionData() {
  return useQuery({
    queryKey: ["attribution-data"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("attribution_results")
        .select("*")
        .order("channel");

      if (error) throw error;
      return data as AttributionResult[];
    },
  });
}

export function useAttributionByModel() {
  const { data: attributionData, ...rest } = useAttributionData();

  const attributionByModel: AttributionByModel[] = attributionData
    ? Object.values(
        attributionData.reduce((acc, row) => {
          if (!acc[row.channel]) {
            acc[row.channel] = {
              channel: row.channel,
              firstClick: 0,
              lastClick: 0,
              linear: 0,
              timeDecay: 0,
              positionBased: 0,
            };
          }

          const modelKey = row.model_type.replace(/_/g, '') as keyof Omit<AttributionByModel, 'channel'>;
          const mappedKey = {
            firstclick: 'firstClick',
            lastclick: 'lastClick',
            linear: 'linear',
            timedecay: 'timeDecay',
            positionbased: 'positionBased',
          }[modelKey.toLowerCase()] as keyof Omit<AttributionByModel, 'channel'>;

          if (mappedKey) {
            acc[row.channel][mappedKey] = Number(row.attributed_conversions);
          }

          return acc;
        }, {} as Record<string, AttributionByModel>)
      )
    : [];

  return { data: attributionByModel, ...rest };
}
