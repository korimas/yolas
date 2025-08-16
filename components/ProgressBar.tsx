'use client';

import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, className = '' }) => {
  const percentage = Math.min((current / total) * 100, 100);
  
  return (
    <div className={`w-full ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* 进度条容器 */}
        <div className="w-full bg-gray-200 h-1">
          {/* 进度条填充 */}
          <div
            className="h-full bg-gray-600 transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
