'use client';
import React, { useState } from 'react';
import type { FilterOptions } from '../../types';

export default function Filter({
  onFilter,
  campaignTypes,
}: {
  onFilter: (f: FilterOptions) => void;
  campaignTypes: string[];
}) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [campaignType, setCampaignType] = useState('');

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transition hover:shadow-lg hover:scale-[1.01]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Start Date */}
        <div>
          <label className="block text-m font-medium text-black dark:text-gray-300 mb-1">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm px-3 py-2 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-m font-medium text-black dark:text-gray-300 mb-1">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Campaign Type */}
        <div>
          <label className="block text-m font-medium text-black dark:text-gray-300 mb-1">
            Campaign Type
          </label>
          <select
            value={campaignType}
            onChange={(e) => setCampaignType(e.target.value)}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm px-3 py-2 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">All</option>
            {campaignTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Apply Button */}
        <div className="flex items-end">
          <button
            onClick={() => {
              if (!startDate || !endDate) {
                alert('Please select both start and end dates');
                return;
              }
              onFilter({
                dateRange: {
                  startDate: new Date(startDate),
                  endDate: new Date(endDate),
                },
                campaignType,
              });
            }}
            className="
              w-full rounded-lg 
              border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-900 
              text-sm md:text-base text-gray-900 dark:text-white 
              px-4 py-2.5 
              focus:outline-none focus:ring-2 focus:ring-blue-500 
              transition
            "
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
