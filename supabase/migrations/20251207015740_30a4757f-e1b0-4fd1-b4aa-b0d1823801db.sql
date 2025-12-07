-- Campaign performance table (matches Google Ads API structure)
CREATE TABLE public.campaign_performance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id TEXT NOT NULL,
  campaign_name TEXT NOT NULL,
  channel TEXT NOT NULL,
  date DATE NOT NULL,
  impressions INTEGER NOT NULL DEFAULT 0,
  clicks INTEGER NOT NULL DEFAULT 0,
  conversions INTEGER NOT NULL DEFAULT 0,
  cost DECIMAL(12,2) NOT NULL DEFAULT 0,
  revenue DECIMAL(12,2) NOT NULL DEFAULT 0,
  device TEXT,
  geo TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(campaign_id, date)
);

-- User journeys for attribution modeling
CREATE TABLE public.user_journeys (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  journey_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  channel TEXT NOT NULL,
  touchpoint_order INTEGER NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  converted BOOLEAN NOT NULL DEFAULT false,
  conversion_value DECIMAL(12,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Attribution results by model type
CREATE TABLE public.attribution_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  channel TEXT NOT NULL,
  model_type TEXT NOT NULL,
  attributed_conversions DECIMAL(12,4) NOT NULL DEFAULT 0,
  attributed_revenue DECIMAL(12,2) NOT NULL DEFAULT 0,
  date_range_start DATE NOT NULL,
  date_range_end DATE NOT NULL,
  calculated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(channel, model_type, date_range_start, date_range_end)
);

-- Sync status tracking
CREATE TABLE public.sync_status (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sync_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  records_synced INTEGER DEFAULT 0,
  error_message TEXT
);

-- Create indexes for performance
CREATE INDEX idx_campaign_performance_date ON public.campaign_performance(date);
CREATE INDEX idx_campaign_performance_channel ON public.campaign_performance(channel);
CREATE INDEX idx_user_journeys_journey_id ON public.user_journeys(journey_id);
CREATE INDEX idx_attribution_results_model ON public.attribution_results(model_type);

-- Enable RLS (but allow public access for this demo)
ALTER TABLE public.campaign_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_journeys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attribution_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sync_status ENABLE ROW LEVEL SECURITY;

-- Public read/write policies for demo purposes
CREATE POLICY "Allow public read campaign_performance" ON public.campaign_performance FOR SELECT USING (true);
CREATE POLICY "Allow public insert campaign_performance" ON public.campaign_performance FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete campaign_performance" ON public.campaign_performance FOR DELETE USING (true);

CREATE POLICY "Allow public read user_journeys" ON public.user_journeys FOR SELECT USING (true);
CREATE POLICY "Allow public insert user_journeys" ON public.user_journeys FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete user_journeys" ON public.user_journeys FOR DELETE USING (true);

CREATE POLICY "Allow public read attribution_results" ON public.attribution_results FOR SELECT USING (true);
CREATE POLICY "Allow public insert attribution_results" ON public.attribution_results FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete attribution_results" ON public.attribution_results FOR DELETE USING (true);

CREATE POLICY "Allow public read sync_status" ON public.sync_status FOR SELECT USING (true);
CREATE POLICY "Allow public insert sync_status" ON public.sync_status FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update sync_status" ON public.sync_status FOR UPDATE USING (true);