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

  const getMotivationalMessage = (accuracy: number, totalQuestions: number) => {
    if (totalQuestions === 0) return "开始答题吧！🌟";
    
    if (accuracy >= 95) return "太完美了！🏆";
    if (accuracy >= 90) return "表现优秀！⭐";
    if (accuracy >= 80) return "做得很好！👍";
    if (accuracy >= 70) return "继续努力！💪";
    if (accuracy >= 60) return "加油！你可以的！🔥";
    return "不要放弃！💪";
  };

  const ageGroupEmojis = {
    [AgeGroup.PRESCHOOL]: "🌟",
    [AgeGroup.ELEMENTARY_LOW]: "🚀", 
    [AgeGroup.ELEMENTARY_HIGH]: "🎯"
  };

  return (
    <div className={className}>
      {/* 标题 */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-medium text-gray-800">学习统计</h3>
      </div>

      {/* 统计项目 */}
      <div className="space-y-3">
        {/* 答题进度 */}
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-sm text-gray-600">已答题数</span>
          <span className="font-medium text-gray-800">{stats.totalQuestions}</span>
        </div>

        {/* 正确答案 */}
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-sm text-gray-600">答对题数</span>
          <span className="font-medium text-gray-800">{stats.correctAnswers}</span>
        </div>

        {/* 正确率 */}
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-sm text-gray-600">正确率</span>
          <span className="font-medium text-gray-800">
            {stats.totalQuestions > 0 ? Math.round(stats.accuracy) : 0}%
          </span>
        </div>

        {/* 用时 */}
        <div className="flex justify-between items-center py-2">
          <span className="text-sm text-gray-600">学习时长</span>
          <span className="font-medium text-gray-800">{formatTime(stats.timeSpent)}</span>
        </div>
      </div>

      {/* 鼓励信息 */}
      {stats.totalQuestions > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-center text-sm text-gray-600">
            {getMotivationalMessage(stats.accuracy, stats.totalQuestions)}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsPanel;
