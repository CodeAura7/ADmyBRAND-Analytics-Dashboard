'use client';
import React from 'react';

export default function DataTable({
  data,
  columns,
}: {
  data: any[];
  columns: { key: string; label: string }[];
}) {
  return (
    <div className="overflow-x-auto mt-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 font-semibold tracking-wide text-sm border-b dark:border-gray-600"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`border-b dark:border-gray-700 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 ${
                rowIndex % 2 === 1 ? 'bg-gray-50 dark:bg-gray-900' : ''
              }`}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-4 py-3 text-gray-800 dark:text-gray-100"
                >
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
