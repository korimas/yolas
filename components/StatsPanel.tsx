'use client';

import React from 'react';
import { AgeGroup } from '@/types';

interface Stats {
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  timeSpent: number;
}

interface StatsPanelProps {
  stats: Stats;
  ageGroup: AgeGroup;
  className?: string;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ stats, ageGroup, className = '' }) => {
  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes > 0) {
      return `${minutes}分${remainingSeconds}秒`;
    }
    return `${remainingSeconds}秒`;
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-green-600';
    if (accuracy >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAccuracyBgColor = (accuracy: number) => {
    if (accuracy >= 90) return 'bg-green-100';
    if (accuracy >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const ageGroupEmojis = {
    [AgeGroup.PRESCHOOL]: "🌟",
    [AgeGroup.ELEMENTARY_LOW]: "🚀", 
    [AgeGroup.ELEMENTARY_HIGH]: "🎯"
  };

  return (
    <div className={className}>

      {/* 统计项目 - 紧凑布局 */}
      <div className="grid grid-cols-2 gap-3">
        {/* 答题进度 */}
        <div className="text-center p-1 rounded-lg" style={{ background: 'var(--primary-subtle)' }}>
          <div className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>{stats.totalQuestions}</div>
          <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>已答题数</div>
        </div>

        {/* 正确答案 */}
        <div className="text-center p-1 rounded-lg" style={{ background: 'var(--success-light)' }}>
          <div className="text-2xl font-bold" style={{ color: 'var(--success)' }}>{stats.correctAnswers}</div>
          <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>答对题数</div>
        </div>

        {/* 正确率 */}
        <div className="text-center p-1 rounded-lg" style={{ background: 'var(--warning-light)' }}>
          <div className="text-2xl font-bold" style={{ color: 'var(--warning)' }}>
            {stats.totalQuestions > 0 ? Math.round(stats.accuracy) : 0}%
          </div>
          <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>正确率</div>
        </div>

        {/* 用时 */}
        <div className="text-center p-1 rounded-lg" style={{ background: 'var(--error-light)' }}>
          <div className="text-lg font-bold" style={{ color: 'var(--error)' }}>{formatTime(stats.timeSpent)}</div>
          <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>学习时长</div>
        </div>
      </div>

    </div>
  );
};

export default StatsPanel;
