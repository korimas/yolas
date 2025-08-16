'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { AgeGroup, LearningSession } from '@/types';
import { StorageManager } from '@/lib/storage';

export default function StatsPage() {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup>(AgeGroup.PRESCHOOL);
  const [stats, setStats] = useState<any>(null);
  const [progress, setProgress] = useState<any>(null);
  const [recentSessions, setRecentSessions] = useState<LearningSession[]>([]);

  useEffect(() => {
    loadData();
  }, [selectedAgeGroup]);

  const loadData = () => {
    const learningStats = StorageManager.getLearningStats(selectedAgeGroup);
    const userProgress = StorageManager.getProgress(selectedAgeGroup);
    const sessions = StorageManager.getSessions()
      .filter(session => session.ageGroup === selectedAgeGroup)
      .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
      .slice(0, 10);

    setStats(learningStats);
    setProgress(userProgress);
    setRecentSessions(sessions);
  };

  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}小时${minutes % 60}分钟`;
    }
    if (minutes > 0) {
      return `${minutes}分钟${seconds % 60}秒`;
    }
    return `${seconds}秒`;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const exportData = () => {
    const data = StorageManager.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `yolas-learning-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearData = () => {
    if (window.confirm('确定要清空所有学习数据吗？此操作不可撤销！')) {
      StorageManager.clearAllData();
      loadData();
      alert('数据已清空！');
    }
  };

  if (!stats || !progress) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">正在加载统计数据...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* 头部 */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link 
            href="/"
            className="text-gray-600 hover:text-gray-800 transition-colors text-sm"
          >
            ← 返回首页
          </Link>
          <h1 className="text-lg font-medium text-gray-800">学习统计</h1>
          <div className="space-x-2">
            <button
              onClick={exportData}
              className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors text-sm"
            >
              导出
            </button>
            <button
              onClick={clearData}
              className="bg-white text-gray-800 border border-gray-300 px-3 py-1 rounded hover:bg-gray-50 transition-colors text-sm"
            >
              清空
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-4 py-6 overflow-y-auto">
        {/* 年龄段选择 */}
        <div className="mb-6">
          <div className="flex justify-center space-x-2">
            {Object.values(AgeGroup).map((ageGroup) => (
              <button
                key={ageGroup}
                onClick={() => setSelectedAgeGroup(ageGroup)}
                className={`px-4 py-2 rounded text-sm transition-colors ${
                  selectedAgeGroup === ageGroup
                    ? 'bg-gray-800 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {ageGroup === AgeGroup.PRESCHOOL && '学前班'}
                {ageGroup === AgeGroup.ELEMENTARY_LOW && '小学低年级'}
                {ageGroup === AgeGroup.ELEMENTARY_HIGH && '小学高年级'}
              </button>
            ))}
          </div>
        </div>

        {/* 总览统计 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded p-4 text-center">
            <div className="text-xl font-medium text-gray-800">{stats.streakDays}</div>
            <div className="text-sm text-gray-600">连续学习天数</div>
          </div>

          <div className="bg-white border border-gray-200 rounded p-4 text-center">
            <div className="text-xl font-medium text-gray-800">{stats.totalQuestions}</div>
            <div className="text-sm text-gray-600">总答题数</div>
          </div>

          <div className="bg-white border border-gray-200 rounded p-4 text-center">
            <div className="text-xl font-medium text-gray-800">{Math.round(stats.totalAccuracy)}%</div>
            <div className="text-sm text-gray-600">总正确率</div>
          </div>

          <div className="bg-white border border-gray-200 rounded p-4 text-center">
            <div className="text-xl font-medium text-gray-800">{formatTime(progress.totalLearningTime)}</div>
            <div className="text-sm text-gray-600">总学习时长</div>
          </div>
        </div>

        {/* 今日和本周统计 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* 今日统计 */}
          <div className="bg-white border border-gray-200 rounded p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-3">今日学习</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">答题数量</span>
                <span className="font-medium">{stats.todayQuestions} 题</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">正确率</span>
                <span className="font-medium">{Math.round(stats.todayAccuracy)}%</span>
              </div>
              <div className="w-full bg-gray-200 h-1">
                <div
                  className="bg-gray-600 h-1 transition-all duration-500"
                  style={{ width: `${Math.min(stats.todayAccuracy, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* 本周统计 */}
          <div className="bg-white border border-gray-200 rounded p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-3">本周学习</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">答题数量</span>
                <span className="font-medium">{stats.weeklyQuestions} 题</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">正确率</span>
                <span className="font-medium">{Math.round(stats.weeklyAccuracy)}%</span>
              </div>
              <div className="w-full bg-gray-200 h-1">
                <div
                  className="bg-gray-600 h-1 transition-all duration-500"
                  style={{ width: `${Math.min(stats.weeklyAccuracy, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* 最近练习记录 */}
        <div className="bg-white border border-gray-200 rounded p-4 mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">最近练习记录</h3>
          
          {recentSessions.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              还没有练习记录，快去开始学习吧！
            </div>
          ) : (
            <div className="space-y-3">
              {recentSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex justify-between items-center p-3 border border-gray-100 rounded hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <div className="font-medium text-gray-800 text-sm">
                      {formatDate(new Date(session.startTime))}
                    </div>
                    <div className="text-xs text-gray-600">
                      {session.correctAnswers}/{session.totalQuestions} 题 · 
                      {Math.round((session.correctAnswers / session.totalQuestions) * 100)}%
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-600">
                      {formatTime(session.totalTime)}
                    </div>
                    <Link
                      href={`/math/${session.ageGroup}/result?sessionId=${session.id}`}
                      className="text-gray-800 hover:text-gray-600 text-xs"
                    >
                      查看详情 →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 开始练习按钮 */}
        <div className="text-center">
          <Link
            href={`/math/${selectedAgeGroup}`}
            className="bg-gray-800 text-white py-2 px-6 rounded hover:bg-gray-700 transition-colors inline-block"
          >
            开始新的练习
          </Link>
        </div>
      </main>
    </div>
  );
}
