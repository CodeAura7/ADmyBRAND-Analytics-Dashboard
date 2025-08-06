'use client';
import React from 'react';

export default function SkeletonTable() {
  return (
    <div className="space-y-3 p-6 bg-white dark:bg-gray-900 rounded-xl shadow animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
      ))}
    </div>
  );
}
