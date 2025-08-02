export interface Metric {
  id: string;
  title: string;
  value: number;
}

export interface ChartData {
  date: string;
  users: number;
  revenue: number;
  conversions: number;
  growth: number;
}

export interface FilterOptions {
  dateRange: {
    startDate: Date;
    endDate: Date;
  };
  campaignType: string;
}