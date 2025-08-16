'use client';

import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AgeGroup, LearningSession } from '@/types';
import { StorageManager } from '@/lib/storage';

export default function ResultPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const ageGroup = params.ageGroup as AgeGroup;
  const sessionId = searchParams.get('sessionId');

  const [session, setSession] = useState<LearningSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      // 从本地存储获取会话数据
      const foundSession = StorageManager.getSession(sessionId);
      setSession(foundSession);
    }
    setLoading(false);
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">正在加载结果...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-100 to-red-200 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold text-red-600 mb-4">找不到学习记录</h1>
          <Link 
            href="/" 
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const accuracy = session.totalQuestions > 0 ? (session.correctAnswers / session.totalQuestions) * 100 : 0;
  
  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes > 0) {
      return `${minutes}分${remainingSeconds}秒`;
    }
    return `${remainingSeconds}秒`;
  };

  const getPerformanceLevel = (accuracy: number) => {
    if (accuracy >= 95) return { level: '完美', color: 'text-purple-600', bg: 'bg-purple-100', emoji: '🏆' };
    if (accuracy >= 90) return { level: '优秀', color: 'text-green-600', bg: 'bg-green-100', emoji: '⭐' };
    if (accuracy >= 80) return { level: '良好', color: 'text-blue-600', bg: 'bg-blue-100', emoji: '👍' };
    if (accuracy >= 70) return { level: '及格', color: 'text-yellow-600', bg: 'bg-yellow-100', emoji: '💪' };
    return { level: '需要努力', color: 'text-red-600', bg: 'bg-red-100', emoji: '🔥' };
  };

  const performance = getPerformanceLevel(accuracy);

  const getEncouragementMessage = (accuracy: number) => {
    if (accuracy >= 95) return "太完美了！你是数学小天才！🌟";
    if (accuracy >= 90) return "表现优秀！继续保持这个水平！⭐";
    if (accuracy >= 80) return "做得很好！再接再厉！👏";
    if (accuracy >= 70) return "不错的开始！多练习会更好！💪";
    return "不要气馁！每次练习都是进步！🚀";
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* 头部 */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link 
            href="/"
            className="text-gray-600 hover:text-gray-800 transition-colors text-sm"
          >
            ← 返回首页
          </Link>
          <h1 className="text-lg font-medium text-gray-800">学习结果</h1>
          <div></div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 overflow-y-auto">
        {/* 结果概览 */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-medium text-gray-800 mb-3">练习完成</h2>
          <p className="text-gray-600">{getEncouragementMessage(accuracy)}</p>
        </div>

        {/* 结果统计 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* 总题数 */}
          <div className="bg-white border border-gray-200 rounded p-4 text-center">
            <div className="text-xl font-medium text-gray-800">{session.totalQuestions}</div>
            <div className="text-sm text-gray-600">总题数</div>
          </div>

          {/* 正确数 */}
          <div className="bg-white border border-gray-200 rounded p-4 text-center">
            <div className="text-xl font-medium text-gray-800">{session.correctAnswers}</div>
            <div className="text-sm text-gray-600">答对数</div>
          </div>

          {/* 正确率 */}
          <div className="bg-white border border-gray-200 rounded p-4 text-center">
            <div className="text-xl font-medium text-gray-800">{Math.round(accuracy)}%</div>
            <div className="text-sm text-gray-600">正确率</div>
          </div>

          {/* 用时 */}
          <div className="bg-white border border-gray-200 rounded p-4 text-center">
            <div className="text-xl font-medium text-gray-800">{formatTime(session.totalTime)}</div>
            <div className="text-sm text-gray-600">总用时</div>
          </div>
        </div>

        {/* 详细信息 */}
        <div className="bg-white border border-gray-200 rounded p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-800 mb-4">详细分析</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 答题情况 */}
            <div>
              <h4 className="font-medium text-gray-700 mb-3">答题情况</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">正确</span>
                  <span className="font-medium">{session.correctAnswers} 题</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">错误</span>
                  <span className="font-medium">{session.totalQuestions - session.correctAnswers} 题</span>
                </div>
              </div>
              
              {/* 进度条 */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 h-2 rounded">
                  <div
                    className="bg-gray-600 h-2 rounded transition-all duration-500"
                    style={{ width: `${accuracy}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* 学习建议 */}
            <div>
              <h4 className="font-medium text-gray-700 mb-3">学习建议</h4>
              <div className="space-y-2 text-sm text-gray-600">
                {accuracy >= 90 ? (
                  <>
                    <p>你的表现非常优秀！</p>
                    <p>可以尝试更高难度的题目</p>
                    <p>建议学习新的数学概念</p>
                  </>
                ) : accuracy >= 70 ? (
                  <>
                    <p>你已经掌握了基础知识</p>
                    <p>继续练习提高熟练度</p>
                    <p>复习错误的题目类型</p>
                  </>
                ) : (
                  <>
                    <p>不要放弃，继续努力！</p>
                    <p>多做基础练习题</p>
                    <p>寻求老师或家长的帮助</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => router.push(`/math/${ageGroup}`)}
            className="bg-gray-800 text-white py-2 px-6 rounded hover:bg-gray-700 transition-colors"
          >
            再做一次
          </button>
          
          <Link
            href="/"
            className="bg-white text-gray-800 py-2 px-6 rounded border border-gray-300 hover:bg-gray-50 transition-colors text-center"
          >
            返回首页
          </Link>
        </div>
      </main>
    </div>
  );
}
