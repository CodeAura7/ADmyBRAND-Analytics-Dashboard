'use client';
import { useTheme } from 'next-themes';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import React from 'react';

type BarProps = {
  dataKey: string;
  name: string;
  color?: string;
};

type CustomBarChartProps = {
  data: any[];
  xKey: string;
  bars: BarProps[];
  height?: number;
  className?: string;
  title?: string;
};

export default function CustomBarChart({
  data,
  xKey,
  bars,
  height = 300,
  className = '',
  title
}: CustomBarChartProps) {
  const { theme } = useTheme();
  const axisColor = theme === 'dark' ? '#e5e5e5' : '#1f2937';
  const gridColor = theme === 'dark' ? '#444' : '#ccc';
  const tooltipBg = theme === 'dark' ? '#1f2937' : '#ffffff';
  const tooltipText = theme === 'dark' ? '#ffffff' : '#1f2937';

  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-500 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        No data available
      </div>
    );
  }

  return (
    <div
      className={`bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-transform duration-200 hover:scale-[1.01] ${className}`}
    >
      {title && <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-3">{title}</h2>}

      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 10 }} // reduce bottom space
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey={xKey}
            stroke={axisColor}
            tick={{ fontSize: 11, fill: axisColor }} // tighter font
          />
          <YAxis stroke={axisColor} />
          <Tooltip
            contentStyle={{
              backgroundColor: tooltipBg,
              border: 'none',
              borderRadius: '8px',
              color: tooltipText,
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Legend
            iconType="circle"
            wrapperStyle={{
              fontSize: 12,
              color: axisColor,
              marginTop: -12 // pull legend closer
            }}
          />
          {bars.map((bar) => (
            <Bar
              key={bar.dataKey}
              dataKey={bar.dataKey}
              fill={bar.color || '#34d399'} // default: green-400
              name={bar.name}
              barSize={22}
              radius={[4, 4, 0, 0]}
              animationDuration={600}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
