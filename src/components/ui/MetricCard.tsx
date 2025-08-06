import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';

interface MetricCardProps {
  title: string;
  value: string;
  growth: string;
  subtext: string;
}

export function MetricCard({ title, value, growth, subtext }: MetricCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {/* You can add an icon here */}
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-baseline space-x-2 text-sm mt-2">
          <span className="text-green-500">{growth}</span>
          <span className="text-muted-foreground">{subtext}</span>
        </div>
      </CardContent>
    </Card>
  );
}