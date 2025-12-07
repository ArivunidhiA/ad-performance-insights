// Realistic mock campaign data
export const campaignData = [
  { date: '2024-01-01', impressions: 125400, clicks: 3142, conversions: 89, cost: 4521.50, revenue: 12340.00, channel: 'Search' },
  { date: '2024-01-02', impressions: 132100, clicks: 3456, conversions: 102, cost: 4890.20, revenue: 14280.00, channel: 'Search' },
  { date: '2024-01-03', impressions: 118900, clicks: 2987, conversions: 78, cost: 4120.80, revenue: 10920.00, channel: 'Search' },
  { date: '2024-01-04', impressions: 145200, clicks: 3890, conversions: 115, cost: 5340.60, revenue: 16100.00, channel: 'Search' },
  { date: '2024-01-05', impressions: 139800, clicks: 3654, conversions: 98, cost: 5012.40, revenue: 13720.00, channel: 'Search' },
  { date: '2024-01-06', impressions: 128500, clicks: 3210, conversions: 86, cost: 4678.90, revenue: 12040.00, channel: 'Search' },
  { date: '2024-01-07', impressions: 156700, clicks: 4123, conversions: 128, cost: 5890.20, revenue: 17920.00, channel: 'Search' },
  { date: '2024-01-01', impressions: 245600, clicks: 2456, conversions: 42, cost: 3890.40, revenue: 5880.00, channel: 'Display' },
  { date: '2024-01-02', impressions: 267800, clicks: 2678, conversions: 48, cost: 4234.60, revenue: 6720.00, channel: 'Display' },
  { date: '2024-01-03', impressions: 234500, clicks: 2345, conversions: 38, cost: 3712.50, revenue: 5320.00, channel: 'Display' },
  { date: '2024-01-04', impressions: 289400, clicks: 2894, conversions: 56, cost: 4578.80, revenue: 7840.00, channel: 'Display' },
  { date: '2024-01-05', impressions: 276300, clicks: 2763, conversions: 51, cost: 4372.20, revenue: 7140.00, channel: 'Display' },
  { date: '2024-01-06', impressions: 256700, clicks: 2567, conversions: 45, cost: 4062.40, revenue: 6300.00, channel: 'Display' },
  { date: '2024-01-07', impressions: 298900, clicks: 2989, conversions: 62, cost: 4732.60, revenue: 8680.00, channel: 'Display' },
  { date: '2024-01-01', impressions: 89400, clicks: 4470, conversions: 134, cost: 6234.60, revenue: 18760.00, channel: 'Video' },
  { date: '2024-01-02', impressions: 95600, clicks: 4780, conversions: 148, cost: 6678.40, revenue: 20720.00, channel: 'Video' },
  { date: '2024-01-03', impressions: 82300, clicks: 4115, conversions: 119, cost: 5745.20, revenue: 16660.00, channel: 'Video' },
  { date: '2024-01-04', impressions: 102400, clicks: 5120, conversions: 162, cost: 7168.00, revenue: 22680.00, channel: 'Video' },
  { date: '2024-01-05', impressions: 98700, clicks: 4935, conversions: 151, cost: 6909.00, revenue: 21140.00, channel: 'Video' },
  { date: '2024-01-06', impressions: 91200, clicks: 4560, conversions: 139, cost: 6384.00, revenue: 19460.00, channel: 'Video' },
  { date: '2024-01-07', impressions: 108500, clicks: 5425, conversions: 175, cost: 7595.00, revenue: 24500.00, channel: 'Video' },
  { date: '2024-01-01', impressions: 178900, clicks: 5367, conversions: 98, cost: 5890.80, revenue: 13720.00, channel: 'Social' },
  { date: '2024-01-02', impressions: 192300, clicks: 5769, conversions: 108, cost: 6338.40, revenue: 15120.00, channel: 'Social' },
  { date: '2024-01-03', impressions: 165400, clicks: 4962, conversions: 89, cost: 5458.20, revenue: 12460.00, channel: 'Social' },
  { date: '2024-01-04', impressions: 205800, clicks: 6174, conversions: 119, cost: 6791.40, revenue: 16660.00, channel: 'Social' },
  { date: '2024-01-05', impressions: 198400, clicks: 5952, conversions: 112, cost: 6547.20, revenue: 15680.00, channel: 'Social' },
  { date: '2024-01-06', impressions: 184200, clicks: 5526, conversions: 102, cost: 6078.60, revenue: 14280.00, channel: 'Social' },
  { date: '2024-01-07', impressions: 218700, clicks: 6561, conversions: 128, cost: 7216.80, revenue: 17920.00, channel: 'Social' },
];

export const attributionData = {
  channels: ['Search', 'Display', 'Video', 'Social'],
  firstClick: [0.32, 0.18, 0.28, 0.22],
  lastClick: [0.41, 0.12, 0.31, 0.16],
  linear: [0.28, 0.22, 0.26, 0.24],
  timeDecay: [0.35, 0.15, 0.30, 0.20],
  positionBased: [0.33, 0.17, 0.29, 0.21],
  markov: [0.29, 0.24, 0.25, 0.22],
};

export const channelPerformance = [
  { 
    channel: 'Search', 
    impressions: 946700, 
    clicks: 24462, 
    conversions: 696, 
    cost: 34454.60, 
    revenue: 97320.00,
    ctr: 2.58,
    cvr: 2.84,
    cpa: 49.50,
    roas: 2.82
  },
  { 
    channel: 'Display', 
    impressions: 1869200, 
    clicks: 18692, 
    conversions: 342, 
    cost: 29583.50, 
    revenue: 47880.00,
    ctr: 1.00,
    cvr: 1.83,
    cpa: 86.50,
    roas: 1.62
  },
  { 
    channel: 'Video', 
    impressions: 668100, 
    clicks: 33405, 
    conversions: 1028, 
    cost: 46713.60, 
    revenue: 143920.00,
    ctr: 5.00,
    cvr: 3.08,
    cpa: 45.44,
    roas: 3.08
  },
  { 
    channel: 'Social', 
    impressions: 1343700, 
    clicks: 40311, 
    conversions: 756, 
    cost: 44321.40, 
    revenue: 105840.00,
    ctr: 3.00,
    cvr: 1.88,
    cpa: 58.63,
    roas: 2.39
  },
];

export const timeSeriesData = [
  { date: 'Jan 1', impressions: 639300, clicks: 15435, conversions: 363, cost: 20537.30, revenue: 50700 },
  { date: 'Jan 2', impressions: 687800, clicks: 16683, conversions: 406, cost: 22141.60, revenue: 56840 },
  { date: 'Jan 3', impressions: 601100, clicks: 14409, conversions: 324, cost: 19036.70, revenue: 45360 },
  { date: 'Jan 4', impressions: 742800, clicks: 18078, conversions: 452, cost: 23878.80, revenue: 63280 },
  { date: 'Jan 5', impressions: 713200, clicks: 17304, conversions: 412, cost: 22840.80, revenue: 57680 },
  { date: 'Jan 6', impressions: 660600, clicks: 15863, conversions: 372, cost: 21203.90, revenue: 52080 },
  { date: 'Jan 7', impressions: 782800, clicks: 19098, conversions: 493, cost: 25434.60, revenue: 69020 },
];

export const recommendations = [
  {
    id: 1,
    title: 'Reduce Display Ad Spend',
    priority: 'high' as const,
    impact: '$8,540 potential savings',
    description: 'Display channel showing 1.62x ROAS, below 2.0x threshold. Consider reducing budget by 30%.',
    action: 'Reallocate $8,875 from Display to Video channel for improved efficiency.',
    expectedOutcome: 'Improve overall ROAS from 2.47x to 2.89x'
  },
  {
    id: 2,
    title: 'Scale Video Advertising',
    priority: 'high' as const,
    impact: '+156 conversions',
    description: 'Video channel achieving 3.08x ROAS with highest conversion rate at 3.08%.',
    action: 'Increase Video budget by 25% using reallocated Display funds.',
    expectedOutcome: 'Capture additional 156 conversions at $45.44 CPA'
  },
  {
    id: 3,
    title: 'Attribution Model Switch',
    priority: 'medium' as const,
    impact: '24% more Display credit',
    description: 'Markov attribution shows Display drives 24% more value than last-click suggests.',
    action: 'Adopt data-driven attribution for budget allocation decisions.',
    expectedOutcome: 'More accurate channel valuation and optimized media mix'
  },
  {
    id: 4,
    title: 'Optimize Ad Scheduling',
    priority: 'medium' as const,
    impact: '-$12.30 CPA reduction',
    description: 'Performance peaks between 10AM-2PM and 7PM-10PM across all channels.',
    action: 'Implement dayparting with +20% bid adjustments during peak hours.',
    expectedOutcome: 'Reduce overall CPA from $59.02 to $46.72'
  },
  {
    id: 5,
    title: 'Creative Refresh: Search Ads',
    priority: 'low' as const,
    impact: 'Prevent 15% CTR decline',
    description: 'Search ad CTR showing 8% week-over-week decline indicating ad fatigue.',
    action: 'Rotate in 3 new ad variations with updated messaging.',
    expectedOutcome: 'Restore CTR to 2.8%+ baseline levels'
  },
];

export const kpiSummary = {
  totalImpressions: 4827700,
  totalClicks: 116870,
  totalConversions: 2822,
  totalCost: 155073.00,
  totalRevenue: 394960.00,
  avgCTR: 2.42,
  avgCVR: 2.41,
  avgCPA: 54.96,
  avgROAS: 2.55,
  impressionChange: 12.4,
  clickChange: 8.7,
  conversionChange: 15.2,
  roasChange: 0.32,
};

export const journeyData = [
  { path: 'Search → Video → Conversion', count: 234, percentage: 18.2 },
  { path: 'Social → Search → Conversion', count: 198, percentage: 15.4 },
  { path: 'Display → Social → Video → Conversion', count: 167, percentage: 13.0 },
  { path: 'Video → Conversion', count: 156, percentage: 12.1 },
  { path: 'Search → Conversion', count: 143, percentage: 11.1 },
  { path: 'Social → Video → Conversion', count: 128, percentage: 9.9 },
  { path: 'Display → Search → Conversion', count: 112, percentage: 8.7 },
  { path: 'Other Paths', count: 150, percentage: 11.6 },
];
