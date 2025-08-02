"use client";
import React from 'react';
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { useTheme } from "next-themes";

export type LineChartProps = {
  data: Array<Record<string, any>>;
  xKey: string;
  lines: { dataKey: string; color?: string; name?: string }[];
  height?: number;
  className?: string;
};

export default function CustomLineChart({
  data,
  xKey,
  lines,
  height = 300,
  className = "",
}: LineChartProps) {
  const { theme } = useTheme();
  
  // Use fixed dark text color for axis ticks regardless of theme
  const axisColor = '#1f2937';

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md ${className}`}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={theme === 'dark' ? '#374151' : '#e5e7eb'}
          />
          <XAxis dataKey={xKey} stroke={axisColor} tick={{ fill: axisColor }} />
          <YAxis stroke={axisColor} tick={{ fill: axisColor }} />
          <Tooltip
            contentStyle={{
              backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
              borderColor: theme === 'dark' ? '#4b5563' : '#e5e7eb',
              borderRadius: '0.5rem',
            }}
            itemStyle={{ color: theme === 'dark' ? '#f9fafb' : '#111827' }}
            labelStyle={{ color: theme === 'dark' ? '#d1d5db' : '#374151' }}
          />
          <Legend wrapperStyle={{ color: axisColor }} />
          {lines.map((line) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.color || "#6366f1"}
              name={line.name}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
