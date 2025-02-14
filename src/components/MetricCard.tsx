import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { MetricCardProps } from '../types';

export function MetricCard({ title, value, unit, icon, trend, prediction }: MetricCardProps) {
  const isPositiveTrend = trend >= 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        </div>
        <div className={`flex items-center space-x-1 ${isPositiveTrend ? 'text-green-500' : 'text-red-500'}`}>
          {isPositiveTrend ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
          <span className="text-sm font-medium">{Math.abs(trend)}%</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-gray-900">{value}</span>
          <span className="text-gray-500">{unit}</span>
        </div>
        <p className="text-sm text-gray-600">
          AI Prediction: <span className="font-medium">{prediction}</span>
        </p>
      </div>
    </div>
  );
}