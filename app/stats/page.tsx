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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [selectedAgeGroup]);

  const loadData = async () => {
    setIsLoading(true);
    // 添加一点延迟以显示加载状态
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const learningStats = StorageManager.getLearningStats(selectedAgeGroup);
    const userProgress = StorageManager.getProgress(selectedAgeGroup);
    const sessions = StorageManager.getSessions()
      .filter(session => session.ageGroup === selectedAgeGroup)
      .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
      .slice(0, 10);

    setStats(learningStats);
    setProgress(userProgress);
    setRecentSessions(sessions);
    setIsLoading(false);
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

  const getAgeGroupLabel = (ageGroup: AgeGroup) => {
    switch (ageGroup) {
      case AgeGroup.PRESCHOOL:
        return '学前班';
      case AgeGroup.ELEMENTARY_LOW:
        return '小学低年级';
      case AgeGroup.ELEMENTARY_HIGH:
        return '小学高年级';
      default:
        return '';
    }
  };

  // 计算进度百分比
  const getProgressPercentage = (current: number, target: number = 100) => {
    return Math.min((current / target) * 100, 100);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)' }}>
        <div className="text-center">
          <div 
            className="w-12 h-12 mx-auto mb-6 rounded-full border-2 border-transparent animate-spin"
            style={{ 
              borderTopColor: 'var(--primary)',
              borderRightColor: 'var(--primary)'
            }}
          ></div>
          <p className="text-body">正在加载统计数据...</p>
        </div>
      </div>
    );
  }

  if (!stats || !progress) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)' }}>
        <div className="text-center">
          <div 
            className="w-20 h-20 mx-auto mb-8 flex items-center justify-center text-3xl"
            style={{ 
              background: 'var(--primary-subtle)',
              borderRadius: 'var(--radius-2xl)',
              color: 'var(--primary)'
            }}
          >
            📊
          </div>
          <h2 className="text-h2 mb-4">暂无学习数据</h2>
          <p className="text-body mb-8">开始你的第一次练习，记录学习成长轨迹</p>
          <Link
            href="/subjects/math"
            className="button button-primary button-lg"
          >
            开始练习
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* 专业导航栏 */}
      <nav className="py-6 border-b" style={{ borderColor: 'var(--border-default)' }}>
        <div className="container container-xl">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="button button-ghost"
            >
              ← 返回首页
            </Link>
            <h1 className="text-h1">学习统计</h1>
            <div className="flex items-center gap-3">
              <button
                onClick={exportData}
                className="button button-default button-sm"
                title="导出学习数据"
              >
                📤 导出
              </button>
              <button
                onClick={clearData}
                className="button button-ghost button-sm"
                title="清空所有数据"
              >
                🗑️ 清空
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-12">
        <div className="container container-xl">
          {/* 年龄段选择器 */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-h2 mb-4">选择年龄段</h2>
              <p className="text-body-sm">查看不同年龄段的学习统计数据</p>
            </div>
            <div className="flex justify-center">
              <div className="flex p-1 rounded-lg" style={{ background: 'var(--border-light)' }}>
                {Object.values(AgeGroup).map((ageGroup) => (
                  <button
                    key={ageGroup}
                    onClick={() => setSelectedAgeGroup(ageGroup)}
                    className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                      selectedAgeGroup === ageGroup
                        ? 'button-primary'
                        : 'bg-transparent hover:bg-white'
                    }`}
                    style={{ 
                      color: selectedAgeGroup === ageGroup 
                        ? 'var(--surface)' 
                        : 'var(--text-secondary)'
                    }}
                  >
                    {getAgeGroupLabel(ageGroup)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 核心统计指标 */}
          <div className="mb-16">
            <h3 className="text-h2 text-center mb-12">学习概览</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* 连续学习天数 */}
              <div className="card-elevated p-8 text-center">
                <div 
                  className="w-16 h-16 mx-auto mb-6 flex items-center justify-center text-2xl"
                  style={{ 
                    background: 'var(--success-light)',
                    borderRadius: 'var(--radius-2xl)',
                    color: 'var(--success)'
                  }}
                >
                  🔥
                </div>
                <div className="text-display text-center mb-2">{stats.streakDays}</div>
                <div className="text-body-sm">连续学习天数</div>
                <div className="mt-4 text-overline">
                  {stats.streakDays >= 7 ? '学习习惯优秀' : '继续保持'}
                </div>
              </div>

              {/* 总答题数 */}
              <div className="card-elevated p-8 text-center">
                <div 
                  className="w-16 h-16 mx-auto mb-6 flex items-center justify-center text-2xl"
                  style={{ 
                    background: 'var(--primary-subtle)',
                    borderRadius: 'var(--radius-2xl)',
                    color: 'var(--primary)'
                  }}
                >
                  📝
                </div>
                <div className="text-display text-center mb-2">{stats.totalQuestions}</div>
                <div className="text-body-sm">总答题数</div>
                <div className="mt-4 text-overline">
                  累计练习量
                </div>
              </div>

              {/* 总正确率 */}
              <div className="card-elevated p-8 text-center">
                <div 
                  className="w-16 h-16 mx-auto mb-6 flex items-center justify-center text-2xl"
                  style={{ 
                    background: 'var(--warning-light)',
                    borderRadius: 'var(--radius-2xl)',
                    color: 'var(--warning)'
                  }}
                >
                  🎯
                </div>
                <div className="text-display text-center mb-2">{Math.round(stats.totalAccuracy)}%</div>
                <div className="text-body-sm">总正确率</div>
                <div className="mt-4">
                  <div 
                    className="h-2 rounded-full"
                    style={{ background: 'var(--border-light)' }}
                  >
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        background: 'var(--warning)',
                        width: `${Math.min(stats.totalAccuracy, 100)}%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* 总学习时长 */}
              <div className="card-elevated p-8 text-center">
                <div 
                  className="w-16 h-16 mx-auto mb-6 flex items-center justify-center text-2xl"
                  style={{ 
                    background: 'var(--error-light)',
                    borderRadius: 'var(--radius-2xl)',
                    color: 'var(--error)'
                  }}
                >
                  ⏱️
                </div>
                <div className="text-h1 text-center mb-2">{formatTime(progress.totalLearningTime)}</div>
                <div className="text-body-sm">总学习时长</div>
                <div className="mt-4 text-overline">
                  专注时间
                </div>
              </div>
            </div>
          </div>

          {/* 今日和本周统计 */}
          <div className="mb-16">
            <h3 className="text-h2 text-center mb-12">学习进度</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 今日学习 */}
              <div className="card-elevated p-8">
                <div className="flex items-center mb-6">
                  <div 
                    className="w-12 h-12 mr-4 flex items-center justify-center text-xl"
                    style={{ 
                      background: 'var(--primary-subtle)',
                      borderRadius: 'var(--radius-lg)',
                      color: 'var(--primary)'
                    }}
                  >
                    📅
                  </div>
                  <h4 className="text-h3">今日学习</h4>
                </div>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-body">答题数量</span>
                    <span className="text-h3">{stats.todayQuestions} 题</span>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-body">正确率</span>
                      <span className="text-h3">{Math.round(stats.todayAccuracy)}%</span>
                    </div>
                    <div 
                      className="h-3 rounded-full"
                      style={{ background: 'var(--border-light)' }}
                    >
                      <div
                        className="h-3 rounded-full transition-all duration-700"
                        style={{ 
                          background: 'var(--primary)',
                          width: `${Math.min(stats.todayAccuracy, 100)}%`
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t" style={{ borderColor: 'var(--border-light)' }}>
                    <div className="text-overline mb-2">今日目标进度</div>
                    <div className="text-body-sm">
                      {stats.todayQuestions >= 10 ? '✅ 已完成每日目标' : `还需完成 ${10 - stats.todayQuestions} 题`}
                    </div>
                  </div>
                </div>
              </div>

              {/* 本周学习 */}
              <div className="card-elevated p-8">
                <div className="flex items-center mb-6">
                  <div 
                    className="w-12 h-12 mr-4 flex items-center justify-center text-xl"
                    style={{ 
                      background: 'var(--success-light)',
                      borderRadius: 'var(--radius-lg)',
                      color: 'var(--success)'
                    }}
                  >
                    📊
                  </div>
                  <h4 className="text-h3">本周学习</h4>
                </div>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-body">答题数量</span>
                    <span className="text-h3">{stats.weeklyQuestions} 题</span>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-body">正确率</span>
                      <span className="text-h3">{Math.round(stats.weeklyAccuracy)}%</span>
                    </div>
                    <div 
                      className="h-3 rounded-full"
                      style={{ background: 'var(--border-light)' }}
                    >
                      <div
                        className="h-3 rounded-full transition-all duration-700"
                        style={{ 
                          background: 'var(--success)',
                          width: `${Math.min(stats.weeklyAccuracy, 100)}%`
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t" style={{ borderColor: 'var(--border-light)' }}>
                    <div className="text-overline mb-2">本周目标进度</div>
                    <div className="text-body-sm">
                      {stats.weeklyQuestions >= 50 ? '🎉 超额完成本周目标' : `本周目标：${stats.weeklyQuestions}/50 题`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 最近练习记录 */}
          <div className="mb-16">
            <h3 className="text-h2 text-center mb-12">最近练习记录</h3>
            <div className="card-elevated p-8">
              {recentSessions.length === 0 ? (
                <div className="text-center py-12">
                  <div 
                    className="w-20 h-20 mx-auto mb-6 flex items-center justify-center text-3xl"
                    style={{ 
                      background: 'var(--border-light)',
                      borderRadius: 'var(--radius-2xl)',
                      color: 'var(--text-quaternary)'
                    }}
                  >
                    📝
                  </div>
                  <h4 className="text-h3 mb-4">还没有练习记录</h4>
                  <p className="text-body mb-8">开始你的第一次练习，记录学习成长轨迹</p>
                  <Link
                    href={`/math/${selectedAgeGroup}`}
                    className="button button-primary button-lg"
                  >
                    开始练习
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentSessions.map((session, index) => (
                    <div
                      key={session.id}
                      className="card p-6 flex items-center justify-between hover:scale-[1.01] transition-all duration-200"
                    >
                      <div className="flex items-center">
                        <div 
                          className="w-12 h-12 mr-4 flex items-center justify-center text-lg font-semibold"
                          style={{ 
                            background: session.correctAnswers / session.totalQuestions >= 0.8 
                              ? 'var(--success-light)' 
                              : session.correctAnswers / session.totalQuestions >= 0.6 
                              ? 'var(--warning-light)' 
                              : 'var(--error-light)',
                            borderRadius: 'var(--radius-lg)',
                            color: session.correctAnswers / session.totalQuestions >= 0.8 
                              ? 'var(--success)' 
                              : session.correctAnswers / session.totalQuestions >= 0.6 
                              ? 'var(--warning)' 
                              : 'var(--error)'
                          }}
                        >
                          {Math.round((session.correctAnswers / session.totalQuestions) * 100)}%
                        </div>
                        <div>
                          <div className="text-body-sm font-medium mb-1">
                            {formatDate(new Date(session.startTime))}
                          </div>
                          <div className="text-body-sm">
                            答对 {session.correctAnswers}/{session.totalQuestions} 题 · 用时 {formatTime(session.totalTime)}
                          </div>
                        </div>
                      </div>
                      
                      <Link
                        href={`/math/${session.ageGroup}/result?sessionId=${session.id}`}
                        className="button button-ghost button-sm"
                      >
                        查看详情 →
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 行动按钮 */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                href={`/math/${selectedAgeGroup}`}
                className="button button-primary button-lg"
              >
                🎯 开始新的练习
              </Link>
              <Link
                href="/subjects/math"
                className="button button-ghost button-lg"
              >
                选择其他年龄段
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}