import React from 'react';
import { format } from 'date-fns';
import type { HealthData } from '../types';

interface DataTableProps {
  data: HealthData[];
}

export function DataTable({ data }: DataTableProps) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temperature</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Humidity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SpO2</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prediction</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {format(row.timestamp, 'HH:mm:ss')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {row.temperature}°C
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {row.humidity}%
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {row.spo2}%
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {row.prediction}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}