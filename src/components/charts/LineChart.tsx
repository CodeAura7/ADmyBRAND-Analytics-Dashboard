'use client';
import React from 'react';
import { useTheme } from 'next-themes';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

type LineProps = {
  dataKey: string;
  name: string;
  color?: string;
};

type CustomLineChartProps = {
  data: any[];
  xKey: string;
  lines: LineProps[];
  height?: number;
  className?: string;
};

export default function CustomLineChart({
  data,
  xKey,
  lines,
  height = 300,
  className = '',
}: CustomLineChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const axisColor = isDark ? '#e5e5e5' : '#1f2937';
  const gridColor = isDark ? '#444' : '#ccc';
  const tooltipBg = isDark ? '#1f2937' : '#ffffff';
  const tooltipText = isDark ? '#ffffff' : '#1f2937';

  return (
    <div
      className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transition-transform duration-200 hover:scale-[1.01] ${className}`}
    >
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Performance Trends
      </h2>

      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey={xKey}
            stroke={axisColor}
            tick={{ fontSize: 12, fill: axisColor }}
            axisLine={{ stroke: axisColor }}
            tickLine={{ stroke: axisColor }}
          />
          <YAxis
            stroke={axisColor}
            tick={{ fontSize: 12, fill: axisColor }}
            axisLine={{ stroke: axisColor }}
            tickLine={{ stroke: axisColor }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: tooltipBg,
              borderRadius: '8px',
              border: 'none',
              color: tooltipText,
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
            }}
            labelStyle={{ color: tooltipText }}
            itemStyle={{ color: tooltipText }}
          />
          <Legend
            wrapperStyle={{
              color: axisColor,
              fontSize: 12,
              paddingTop: 8,
            }}
          />
          {lines.map((line) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.color || '#3b82f6'}
              name={line.name}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
              isAnimationActive
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
