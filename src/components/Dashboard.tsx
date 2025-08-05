'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import CustomLineChart from '@/components/LineChart';
import CustomBarChart from '@/components/BarChart';
import DonutChart from '@/components/DonutChart';
import DataTable from '@/components/DataTable';
import ThemeToggle from '@/components/ThemeToggle';
import Filter from '@/components/Filter';

const CSVLink = dynamic(() => import('react-csv').then(mod => mod.CSVLink), { ssr: false });

const dummyChartData = [
  { date: '2025-07-02', users: 200, revenue: 6000, conversions: 45, growth: 8, source: 'Google Ads' },
  { date: '2025-07-03', users: 180, revenue: 5500, conversions: 40, growth: 7, source: 'Facebook' },
  { date: '2025-07-05', users: 190, revenue: 6500, conversions: 35, growth: 6, source: 'Google Ads' },
  { date: '2025-07-06', users: 160, revenue: 5000, conversions: 27, growth: 3, source: 'Facebook' },
  { date: '2025-07-07', users: 220, revenue: 7500, conversions: 48, growth: 9, source: 'Instagram' },
  { date: '2025-07-08', users: 205, revenue: 6700, conversions: 42, growth: 6, source: 'Google Ads' },
  { date: '2025-07-10', users: 215, revenue: 7100, conversions: 46, growth: 7, source: 'Instagram' },
  { date: '2025-07-11', users: 185, revenue: 5900, conversions: 34, growth: 4, source: 'Facebook' },
  { date: '2025-07-13', users: 210, revenue: 7200, conversions: 47, growth: 8, source: 'Instagram' },
  { date: '2025-07-15', users: 230, revenue: 7700, conversions: 55, growth: 9, source: 'Google Ads' },
  { date: '2025-07-17', users: 150, revenue: 4700, conversions: 22, growth: 1, source: 'Facebook' }
];

const dummyMetrics = [
  { id: 'revenue', title: 'Revenue', value: 12500, diff: 10 },
  { id: 'users', title: 'Users', value: 3200, diff: 5 },
  { id: 'conversions', title: 'Conversions', value: 450, diff: 8 },
  { id: 'growth', title: 'Growth Percentage', value: 15, diff: 2 }
];

type FiltersType = {
  dateRange: { startDate: Date; endDate: Date };
  campaignType: string;
};

export default function Dashboard() {
  const [metrics, setMetrics] = useState(dummyMetrics);
  const [chartData, setChartData] = useState(dummyChartData);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(chartData.length / rowsPerPage);
  const paginatedData = chartData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const updated = dummyMetrics.map((m) => ({
        ...m,
        value: Math.round(m.value * (1 + Math.random() * 0.05)),
      }));
      setMetrics(updated);
      setLoading(false);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleFilter = (filters: FiltersType) => {
    setLoading(true);
    setTimeout(() => {
      const filteredData = dummyChartData.filter(d => {
        const date = new Date(d.date);
        const startDate = new Date(filters.dateRange.startDate);
        const endDate = new Date(filters.dateRange.endDate);
        const typeMatch = !filters.campaignType || d.source === filters.campaignType;
        return date >= startDate && date <= endDate && typeMatch;
      });
      setChartData(filteredData);
      setCurrentPage(1);
      setLoading(false);
    }, 500);
  };

  const campaignTypes = ['Google Ads', 'Facebook', 'Instagram'];

  return (
    <section className="space-y-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
          <p className="text-base text-gray-500 dark:text-gray-400 mt-1">
            Overview of your marketing performance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <CSVLink
            data={chartData}
            filename={'admybrand-insights.csv'}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
              bg-blue-600 text-white shadow hover:shadow-md
              hover:bg-blue-700 active:scale-95 transition"
          >
            📤 Export CSV
          </CSVLink>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-md hover:shadow-lg transition">
        <Filter onFilter={handleFilter} campaignTypes={campaignTypes} />
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const isCurrency = metric.id === 'revenue';
          const isPercentage = metric.id === 'growth';
          return (
            <div
              key={metric.id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-md hover:shadow-lg transition"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">{metric.title}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {isCurrency
                  ? `$${metric.value.toLocaleString()}`
                  : isPercentage
                  ? `${metric.value}%`
                  : metric.value.toLocaleString()}
              </p>
              <p className="text-green-500 text-sm mt-1">+{metric.diff}%</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="shadow-xl hover:shadow-2xl rounded-xl transition">
          <CustomLineChart
            data={chartData}
            xKey="date"
            lines={[{ dataKey: 'revenue', name: 'Weekly Revenue', color: '#22d3ee' }]}
            className="h-full"
          />
        </div>

        <div className="shadow-xl hover:shadow-2xl rounded-xl transition">
          <CustomBarChart
            data={chartData}
            xKey="date"
            bars={[{ dataKey: 'users', name: 'Ad Platform Performance', color: '#3b82f6' }]}
            className="h-full"
          />
        </div>
      </div>

      {/* Donut */}
      <div className="shadow-xl hover:shadow-2xl rounded-xl transition mt-6">
        <DonutChart
          data={[
            { name: 'Facebook', value: chartData.filter(d => d.source === 'Facebook').length },
            { name: 'Google Ads', value: chartData.filter(d => d.source === 'Google Ads').length },
            { name: 'Instagram', value: chartData.filter(d => d.source === 'Instagram').length }
          ]}
          className="h-full"
        />
      </div>

      {/* Table with Pagination */}
      {!loading && chartData.length > 0 && (
        <div className="shadow-xl hover:shadow-2xl rounded-xl transition mt-6 bg-white dark:bg-gray-900 p-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Campaign Details</h3>
          <DataTable
            data={paginatedData}
            columns={[
              { key: 'date', label: 'Date' },
              { key: 'users', label: 'Users' },
              { key: 'revenue', label: 'Revenue' },
              { key: 'conversions', label: 'Conversions' },
              { key: 'growth', label: 'Growth (%)' }
            ]}
          />

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              className="px-3 py-1 text-sm rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              ◀ Prev
            </button>

            <span className="text-sm text-gray-700 dark:text-gray-300">
              Page {currentPage} of {totalPages}
            </span>

            <button
              className="px-3 py-1 text-sm rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next ▶
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
