'use client';
import { useTheme } from 'next-themes';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import React, { useState, useEffect } from 'react';

const DEFAULT_COLORS = ['#3b82f6', '#10b981', '#f97316', '#f43f5e', '#6366f1'];

type DonutChartProps = {
  data: { name: string; value: number }[];
  colors?: string[];
  height?: number;
  className?: string;
};

export default function DonutChart({
  data,
  colors = DEFAULT_COLORS,
  height = 300,
  className = '',
}: DonutChartProps) {
  const { theme } = useTheme();
  const [transitionKey, setTransitionKey] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) setTransitionKey((prev) => prev + 1);
  }, [theme]);

  if (!mounted) return null;


  return (
    <div
      className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transition-transform duration-200 hover:scale-[1.01] ${className}`}
    >
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Campaign Breakdown
      </h2>

      <ResponsiveContainer key={transitionKey} width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={3}
            label={({ name, percent }: any) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            isAnimationActive
          >
            {data.map((_, i) => (
              <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: theme === 'dark' ? '#1f2937' : '#f9fafb',
              borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
              color: theme === 'dark' ? '#f3f4f6' : '#111827',
              borderRadius: 8,
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
            }}
            itemStyle={{
              fontSize: 13,
              color: theme === 'dark' ? '#f9fafb' : '#111827',
            }}
          />
          <Legend
            iconType="circle"
            wrapperStyle={{
              color: theme === 'dark' ? '#e5e5e5' : '#1f2937',
              fontSize: 12,
            }}
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
