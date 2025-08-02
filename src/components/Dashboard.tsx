'use client';

import React, { useState, useEffect } from 'react';
import { Metric, ChartData, FilterOptions } from '../types';
import CustomLineChart from './LineChart';
import CustomBarChart from './BarChart';
import DonutChart from './DonutChart';
import DataTable from './DataTable';
import Filter from './Filter';
import ThemeToggle from './ThemeToggle';

const dummyChartData: ChartData[] = [
  { date: '2024-01-01', users: 120, revenue: 1000, conversions: 30, growth: 5 },
  { date: '2024-01-02', users: 150, revenue: 1200, conversions: 40, growth: 6 },
  { date: '2024-01-03', users: 170, revenue: 1400, conversions: 50, growth: 7 },
  { date: '2024-01-04', users: 160, revenue: 1350, conversions: 45, growth: 6.5 },
  { date: '2024-01-05', users: 180, revenue: 1500, conversions: 55, growth: 7.2 },
  { date: '2024-01-06', users: 200, revenue: 1650, conversions: 60, growth: 8 },
  { date: '2024-01-07', users: 220, revenue: 1800, conversions: 65, growth: 8.5 },
];

const dummyMetrics: Metric[] = [
  { id: 'total-users', title: 'Total Users', value: 12500 },
  { id: 'total-revenue', title: 'Total Revenue', value: 75000 },
  { id: 'conversion-rate', title: 'Conversion Rate', value: 3.5 },
  { id: 'avg-cpc', title: 'Avg. CPC', value: 1.25 },
];

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<Metric[]>(dummyMetrics);
  const [chartData, setChartData] = useState<ChartData[]>(dummyChartData);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    dateRange: {
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-07'),
    },
    campaignType: '',
  });

  const handleExport = () => {
    console.log("Exporting data with current filters:", filterOptions);
    console.log("Data to export:", chartData);
  };

  useEffect(() => {
    const filteredData = dummyChartData.filter((d) => {
      const date = new Date(d.date);
      const start = filterOptions.dateRange.startDate.toISOString().split('T')[0];
      const end = filterOptions.dateRange.endDate.toISOString().split('T')[0];
      const current = date.toISOString().split('T')[0];
      return current >= start && current <= end;
    });
    setChartData(filteredData);
  }, [filterOptions]);

  return (
    <div className="container py-4">
      <header className="d-flex flex-column flex-sm-row justify-content-between align-items-center mb-4">
        <h1 className="text-center text-sm-start fw-bold mb-3 mb-sm-0">
          ADmyBRAND Insights Dashboard
        </h1>
        <div className="d-flex gap-2">
          <ThemeToggle />
          <button
            onClick={handleExport}
            className="btn btn-primary"
          >
            Export Data
          </button>
        </div>
      </header>

      <Filter
        onFilter={(filters) => setFilterOptions(filters)}
        campaignTypes={['Social', 'Email', 'Search Ads', 'Display']}
      />

      <div className="row g-3 mb-4">
        {metrics.map((metric) => (
          <div className="col-12 col-sm-6 col-lg-3" key={metric.id}>
            <div className="card text-center h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-muted">{metric.title}</h5>
                <h2 className="text-primary fw-bold mt-2">
                  {metric.title.includes('Rate') || metric.title.includes('Growth')
                    ? `${metric.value}%`
                    : metric.value.toLocaleString()}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4 my-4">
        <div className="col-12 col-lg-6">
          <CustomLineChart
            data={chartData}
            xKey="date"
            lines={[
              { dataKey: 'users', name: 'Users', color: '#0d6efd' },
              { dataKey: 'revenue', name: 'Revenue', color: '#198754' },
            ]}
            className="h-100"
          />
        </div>
        <div className="col-12 col-lg-6">
          <CustomBarChart
            data={chartData}
            xKey="date"
            bars={[
              { dataKey: 'conversions', name: 'Conversions', color: '#ffc107' },
              { dataKey: 'growth', name: 'Growth %', color: '#dc3545' },
            ]}
            className="h-100"
          />
        </div>
        <div className="col-12">
          <DonutChart
            data={[
              { name: 'Social', value: 300 },
              { name: 'Email', value: 200 },
              { name: 'Search Ads', value: 500 },
              { name: 'Display', value: 150 },
            ]}
            className="h-100"
          />
        </div>
      </div>

      <h2 className="fw-bold mb-3 detailed-heading">Detailed Data</h2>
      <DataTable
        data={chartData}
        columns={[
          { key: 'date', label: 'Date' },
          { key: 'users', label: 'Users' },
          { key: 'revenue', label: 'Revenue' },
          { key: 'conversions', label: 'Conversions' },
          { key: 'growth', label: 'Growth %' },
        ]}
      />
    </div>
  );
};

export default Dashboard;
