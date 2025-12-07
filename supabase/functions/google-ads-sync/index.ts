import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const CHANNELS = ['Search', 'Display', 'Video', 'Social'];
const CAMPAIGNS = [
  { id: 'camp_search_brand', name: 'Brand Search Campaign', channel: 'Search' },
  { id: 'camp_search_generic', name: 'Generic Search Campaign', channel: 'Search' },
  { id: 'camp_display_retarget', name: 'Display Retargeting', channel: 'Display' },
  { id: 'camp_display_prospect', name: 'Display Prospecting', channel: 'Display' },
  { id: 'camp_video_awareness', name: 'Video Awareness', channel: 'Video' },
  { id: 'camp_video_action', name: 'Video Action', channel: 'Video' },
  { id: 'camp_social_engage', name: 'Social Engagement', channel: 'Social' },
  { id: 'camp_social_convert', name: 'Social Conversion', channel: 'Social' },
];

function generateMockCampaignData(days: number = 30) {
  const data = [];
  const today = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    for (const campaign of CAMPAIGNS) {
      // Base metrics vary by channel
      const channelMultipliers: Record<string, { imp: number; ctr: number; cvr: number; cpc: number }> = {
        'Search': { imp: 1, ctr: 0.05, cvr: 0.08, cpc: 2.5 },
        'Display': { imp: 10, ctr: 0.003, cvr: 0.02, cpc: 0.8 },
        'Video': { imp: 5, ctr: 0.02, cvr: 0.03, cpc: 1.2 },
        'Social': { imp: 3, ctr: 0.015, cvr: 0.04, cpc: 1.5 },
      };
      
      const mult = channelMultipliers[campaign.channel];
      const dayVariance = 0.7 + Math.random() * 0.6; // 70% to 130%
      
      const impressions = Math.floor((5000 + Math.random() * 15000) * mult.imp * dayVariance);
      const clicks = Math.floor(impressions * mult.ctr * (0.8 + Math.random() * 0.4));
      const conversions = Math.floor(clicks * mult.cvr * (0.8 + Math.random() * 0.4));
      const cost = Number((clicks * mult.cpc * (0.9 + Math.random() * 0.2)).toFixed(2));
      const revenue = Number((conversions * (50 + Math.random() * 150)).toFixed(2));
      
      data.push({
        campaign_id: campaign.id,
        campaign_name: campaign.name,
        channel: campaign.channel,
        date: dateStr,
        impressions,
        clicks,
        conversions,
        cost,
        revenue,
        device: ['desktop', 'mobile', 'tablet'][Math.floor(Math.random() * 3)],
        geo: ['US', 'UK', 'CA', 'AU', 'DE'][Math.floor(Math.random() * 5)],
      });
    }
  }
  
  return data;
}

function generateMockJourneys(count: number = 500) {
  const journeys = [];
  const channels = CHANNELS;
  
  for (let i = 0; i < count; i++) {
    const journeyId = `journey_${i}`;
    const touchpointCount = 1 + Math.floor(Math.random() * 5);
    const converted = Math.random() > 0.7;
    const conversionValue = converted ? 50 + Math.random() * 200 : null;
    
    const baseTime = new Date();
    baseTime.setDate(baseTime.getDate() - Math.floor(Math.random() * 30));
    
    for (let t = 0; t < touchpointCount; t++) {
      const touchpointTime = new Date(baseTime);
      touchpointTime.setHours(touchpointTime.getHours() + t * (1 + Math.random() * 24));
      
      journeys.push({
        journey_id: journeyId,
        session_id: `session_${journeyId}_${t}`,
        channel: channels[Math.floor(Math.random() * channels.length)],
        touchpoint_order: t + 1,
        timestamp: touchpointTime.toISOString(),
        converted: t === touchpointCount - 1 ? converted : false,
        conversion_value: t === touchpointCount - 1 ? conversionValue : null,
      });
    }
  }
  
  return journeys;
}

function calculateAttribution(journeys: any[], startDate: string, endDate: string) {
  const models = ['first_click', 'last_click', 'linear', 'time_decay', 'position_based'];
  const channelCredits: Record<string, Record<string, { conversions: number; revenue: number }>> = {};
  
  // Initialize
  for (const channel of CHANNELS) {
    channelCredits[channel] = {};
    for (const model of models) {
      channelCredits[channel][model] = { conversions: 0, revenue: 0 };
    }
  }
  
  // Group journeys by journey_id
  const journeyGroups: Record<string, any[]> = {};
  for (const touchpoint of journeys) {
    if (!journeyGroups[touchpoint.journey_id]) {
      journeyGroups[touchpoint.journey_id] = [];
    }
    journeyGroups[touchpoint.journey_id].push(touchpoint);
  }
  
  // Calculate attribution for each converting journey
  for (const [journeyId, touchpoints] of Object.entries(journeyGroups)) {
    const sorted = touchpoints.sort((a, b) => a.touchpoint_order - b.touchpoint_order);
    const lastTouchpoint = sorted[sorted.length - 1];
    
    if (!lastTouchpoint.converted) continue;
    
    const value = lastTouchpoint.conversion_value || 100;
    const n = sorted.length;
    
    for (const model of models) {
      for (let i = 0; i < n; i++) {
        const channel = sorted[i].channel;
        let credit = 0;
        
        switch (model) {
          case 'first_click':
            credit = i === 0 ? 1 : 0;
            break;
          case 'last_click':
            credit = i === n - 1 ? 1 : 0;
            break;
          case 'linear':
            credit = 1 / n;
            break;
          case 'time_decay':
            // More credit to later touchpoints
            credit = (i + 1) / ((n * (n + 1)) / 2);
            break;
          case 'position_based':
            // 40% first, 40% last, 20% middle
            if (i === 0) credit = 0.4;
            else if (i === n - 1) credit = 0.4;
            else credit = n > 2 ? 0.2 / (n - 2) : 0;
            break;
        }
        
        channelCredits[channel][model].conversions += credit;
        channelCredits[channel][model].revenue += credit * value;
      }
    }
  }
  
  // Convert to insertable format
  const results = [];
  for (const channel of CHANNELS) {
    for (const model of models) {
      results.push({
        channel,
        model_type: model,
        attributed_conversions: Number(channelCredits[channel][model].conversions.toFixed(4)),
        attributed_revenue: Number(channelCredits[channel][model].revenue.toFixed(2)),
        date_range_start: startDate,
        date_range_end: endDate,
      });
    }
  }
  
  return results;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Starting Google Ads data sync (mock data)...');

    // Create sync status record
    const { data: syncRecord, error: syncError } = await supabase
      .from('sync_status')
      .insert({ sync_type: 'google_ads', status: 'in_progress' })
      .select()
      .single();

    if (syncError) {
      console.error('Error creating sync record:', syncError);
      throw syncError;
    }

    const syncId = syncRecord.id;

    // Clear existing data
    await supabase.from('campaign_performance').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('user_journeys').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('attribution_results').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    console.log('Cleared existing data');

    // Generate and insert campaign performance data
    const campaignData = generateMockCampaignData(30);
    const { error: campError } = await supabase
      .from('campaign_performance')
      .insert(campaignData);

    if (campError) {
      console.error('Error inserting campaign data:', campError);
      throw campError;
    }

    console.log(`Inserted ${campaignData.length} campaign performance records`);

    // Generate and insert user journeys
    const journeyData = generateMockJourneys(500);
    
    // Insert in batches to avoid payload size limits
    const batchSize = 100;
    for (let i = 0; i < journeyData.length; i += batchSize) {
      const batch = journeyData.slice(i, i + batchSize);
      const { error: journeyError } = await supabase
        .from('user_journeys')
        .insert(batch);
      
      if (journeyError) {
        console.error('Error inserting journey data:', journeyError);
        throw journeyError;
      }
    }

    console.log(`Inserted ${journeyData.length} user journey records`);

    // Calculate and insert attribution
    const today = new Date().toISOString().split('T')[0];
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const startDate = thirtyDaysAgo.toISOString().split('T')[0];

    const attributionData = calculateAttribution(journeyData, startDate, today);
    const { error: attrError } = await supabase
      .from('attribution_results')
      .insert(attributionData);

    if (attrError) {
      console.error('Error inserting attribution data:', attrError);
      throw attrError;
    }

    console.log(`Inserted ${attributionData.length} attribution records`);

    // Update sync status
    const totalRecords = campaignData.length + journeyData.length + attributionData.length;
    await supabase
      .from('sync_status')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
        records_synced: totalRecords,
      })
      .eq('id', syncId);

    console.log('Sync completed successfully');

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Data sync completed',
        records_synced: totalRecords,
        sync_id: syncId,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error('Sync error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
