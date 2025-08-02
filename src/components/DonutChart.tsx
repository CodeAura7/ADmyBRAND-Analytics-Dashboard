"use client";
import React, { useEffect, useState } from 'react';
import { useTheme } from "next-themes";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

type DonutChartProps = {
  data: { name: string; value: number }[];
  colors?: string[];
  height?: number;
  className?: string;
};

const DEFAULT_COLORS = ["#6366f1", "#10b981", "#f59e42", "#ef4444", "#a78bfa", "#0ea5e9", "#eab308"];

export default function DonutChart({
  data,
  colors = DEFAULT_COLORS,
  height = 300,
  className = "",
}: DonutChartProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <div className={`card ${className} transition-colors duration-300`}>
      <div className="card-body">
        {/* 🔁 Force re-render on theme change */}
        <ResponsiveContainer width="100%" height={height} key={theme}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={5}
              cornerRadius={5}
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((_, idx) => (
                <Cell key={`cell-${idx}`} fill={colors[idx % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? '#1f2937' : '#ffffff',
                borderColor: isDark ? '#4b5563' : '#e5e7eb',
                borderRadius: '0.5rem',
                transition: 'all 0.3s ease',
              }}
              itemStyle={{
                color: isDark ? '#f9fafb' : '#111827',
                transition: 'color 0.3s ease',
              }}
              labelStyle={{
                color: isDark ? '#d1d5db' : '#374151',
                transition: 'color 0.3s ease',
              }}
            />
            <Legend
              wrapperStyle={{
                color: isDark ? '#cbd5e1' : '#4b5563',
                transition: 'color 0.3s ease',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
