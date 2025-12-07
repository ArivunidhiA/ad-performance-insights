import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CampaignPerformance {
  id: string;
  campaign_id: string;
  campaign_name: string;
  channel: string;
  date: string;
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
  revenue: number;
  device: string | null;
  geo: string | null;
}

export interface ChannelSummary {
  channel: string;
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
  revenue: number;
  ctr: number;
  cvr: number;
  cpa: number;
  roas: number;
}

export interface TimeSeriesData {
  date: string;
  revenue: number;
  cost: number;
  conversions: number;
}

export interface KPISummary {
  totalImpressions: number;
  totalClicks: number;
  totalConversions: number;
  totalCost: number;
  totalRevenue: number;
  avgCtr: number;
  avgCvr: number;
  avgCpa: number;
  avgRoas: number;
  impressionsChange: number;
  clicksChange: number;
  conversionsChange: number;
  roasChange: number;
}

export function useCampaignData(startDate?: string, endDate?: string) {
  return useQuery({
    queryKey: ["campaign-data", startDate, endDate],
    queryFn: async () => {
      let query = supabase
        .from("campaign_performance")
        .select("*")
        .order("date", { ascending: false });

      if (startDate) {
        query = query.gte("date", startDate);
      }
      if (endDate) {
        query = query.lte("date", endDate);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as CampaignPerformance[];
    },
  });
}

export function useChannelSummary(startDate?: string, endDate?: string) {
  const { data: campaignData, ...rest } = useCampaignData(startDate, endDate);

  const channelSummary: ChannelSummary[] = campaignData
    ? Object.values(
        campaignData.reduce((acc, row) => {
          if (!acc[row.channel]) {
            acc[row.channel] = {
              channel: row.channel,
              impressions: 0,
              clicks: 0,
              conversions: 0,
              cost: 0,
              revenue: 0,
              ctr: 0,
              cvr: 0,
              cpa: 0,
              roas: 0,
            };
          }
          acc[row.channel].impressions += row.impressions;
          acc[row.channel].clicks += row.clicks;
          acc[row.channel].conversions += row.conversions;
          acc[row.channel].cost += Number(row.cost);
          acc[row.channel].revenue += Number(row.revenue);
          return acc;
        }, {} as Record<string, ChannelSummary>)
      ).map((channel) => ({
        ...channel,
        ctr: channel.impressions > 0 ? (channel.clicks / channel.impressions) * 100 : 0,
        cvr: channel.clicks > 0 ? (channel.conversions / channel.clicks) * 100 : 0,
        cpa: channel.conversions > 0 ? channel.cost / channel.conversions : 0,
        roas: channel.cost > 0 ? channel.revenue / channel.cost : 0,
      }))
    : [];

  return { data: channelSummary, ...rest };
}

export function useTimeSeriesData(startDate?: string, endDate?: string) {
  const { data: campaignData, ...rest } = useCampaignData(startDate, endDate);

  const timeSeriesData: TimeSeriesData[] = campaignData
    ? Object.values(
        campaignData.reduce((acc, row) => {
          if (!acc[row.date]) {
            acc[row.date] = {
              date: row.date,
              revenue: 0,
              cost: 0,
              conversions: 0,
            };
          }
          acc[row.date].revenue += Number(row.revenue);
          acc[row.date].cost += Number(row.cost);
          acc[row.date].conversions += row.conversions;
          return acc;
        }, {} as Record<string, TimeSeriesData>)
      ).sort((a, b) => a.date.localeCompare(b.date))
    : [];

  return { data: timeSeriesData, ...rest };
}

export function useKPISummary(startDate?: string, endDate?: string) {
  const { data: campaignData, ...rest } = useCampaignData(startDate, endDate);

  const kpiSummary: KPISummary | null = campaignData && campaignData.length > 0
    ? (() => {
        const totals = campaignData.reduce(
          (acc, row) => ({
            impressions: acc.impressions + row.impressions,
            clicks: acc.clicks + row.clicks,
            conversions: acc.conversions + row.conversions,
            cost: acc.cost + Number(row.cost),
            revenue: acc.revenue + Number(row.revenue),
          }),
          { impressions: 0, clicks: 0, conversions: 0, cost: 0, revenue: 0 }
        );

        return {
          totalImpressions: totals.impressions,
          totalClicks: totals.clicks,
          totalConversions: totals.conversions,
          totalCost: totals.cost,
          totalRevenue: totals.revenue,
          avgCtr: totals.impressions > 0 ? (totals.clicks / totals.impressions) * 100 : 0,
          avgCvr: totals.clicks > 0 ? (totals.conversions / totals.clicks) * 100 : 0,
          avgCpa: totals.conversions > 0 ? totals.cost / totals.conversions : 0,
          avgRoas: totals.cost > 0 ? totals.revenue / totals.cost : 0,
          // Mock change percentages (in real implementation, compare with previous period)
          impressionsChange: 12.5,
          clicksChange: 8.3,
          conversionsChange: 15.2,
          roasChange: 5.7,
        };
      })()
    : null;

  return { data: kpiSummary, ...rest };
}
