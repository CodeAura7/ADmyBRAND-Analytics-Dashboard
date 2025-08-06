'use client';
import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-md">
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/5 mb-2"></div>
      <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-2/3 mb-1"></div>
      <div className="h-3 bg-green-300 dark:bg-green-600 rounded w-1/4"></div>
    </div>
  );
}
