"use client";
import React from 'react';
import { useTheme } from 'next-themes';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

type BarChartProps = {
  data: any[];
  xKey: string;
  bars: { dataKey: string; color?: string; name?: string }[];
  height?: number;
  className?: string;
};

export default function CustomBarChart({
  data,
  xKey,
  bars,
  height = 300,
  className = "",
}: BarChartProps) {
  const { theme } = useTheme();
  const axisColor = theme === 'dark' ? '#cbd5e1' : '#4b5563';

  return (
    <div className={`card p-3 mb-4 ${className}`} style={{ backgroundColor: theme === 'dark' ? '#2c2f33' : '#ffffff' }}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
          <XAxis dataKey={xKey} stroke={axisColor} tick={{ fill: axisColor }} />
          <YAxis stroke={axisColor} tick={{ fill: axisColor }} />
          <Tooltip
            contentStyle={{
              backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
              borderColor: theme === 'dark' ? '#4b5563' : '#e5e7eb',
              borderRadius: '0.5rem'
            }}
            itemStyle={{ color: theme === 'dark' ? '#f9fafb' : '#111827' }}
            labelStyle={{ color: theme === 'dark' ? '#d1d5db' : '#374151' }}
          />
          <Legend wrapperStyle={{ color: axisColor }} />
          {bars.map((bar) => (
            <Bar
              key={bar.dataKey}
              dataKey={bar.dataKey}
              fill={bar.color || "#10b981"}
              name={bar.name}
              barSize={24}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
