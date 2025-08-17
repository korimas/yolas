'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { AgeGroup, MathQuestion, AnswerRecord, LearningSession } from '@/types';
import { QuestionGenerator } from '@/lib/questionGenerator';
import { StorageManager } from '@/lib/storage';
import QuestionDisplay from '../../../components/QuestionDisplay';
import AnswerInput from '../../../components/AnswerInput';
import StatsPanel from '../../../components/StatsPanel';


export default function MathPracticePage() {
  const params = useParams();
  const router = useRouter();
  const ageGroup = params.ageGroup as AgeGroup;

  // 状态管理
  const [questions, setQuestions] = useState<MathQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isShowResult, setIsShowResult] = useState(false);

  const [session, setSession] = useState<LearningSession | null>(null);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [questionStartTime, setQuestionStartTime] = useState<Date>(new Date());

  // 验证年龄组
  const isValidAgeGroup = Object.values(AgeGroup).includes(ageGroup);

  // 当前题目
  const currentQuestion = useMemo(() => {
    return questions[currentQuestionIndex] || null;
  }, [questions, currentQuestionIndex]);

  // 统计信息
  const stats = useMemo(() => {
    const correctAnswers = answers.filter(a => a.isCorrect).length;
    const totalQuestions = answers.length;
    const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

    return {
      totalQuestions,
      correctAnswers,
      accuracy,
      timeSpent: new Date().getTime() - startTime.getTime()
    };
  }, [answers, startTime]);

  // 年龄组配置
  const ageGroupConfig = useMemo(() => {
    const configs = {
      [AgeGroup.PRESCHOOL]: {
        title: '学前班练习',
        totalQuestions: 10,
        fontSize: 'text-2xl sm:text-4xl',
        buttonSize: 'text-lg sm:text-2xl px-4 sm:px-8 py-2 sm:py-4'
      },
      [AgeGroup.ELEMENTARY_LOW]: {
        title: '小学低年级练习',
        totalQuestions: 15,
        fontSize: 'text-xl sm:text-3xl',
        buttonSize: 'text-base sm:text-xl px-4 sm:px-6 py-2 sm:py-3'
      },
      [AgeGroup.ELEMENTARY_HIGH]: {
        title: '小学高年级练习',
        totalQuestions: 20,
        fontSize: 'text-lg sm:text-2xl',
        buttonSize: 'text-sm sm:text-lg px-4 sm:px-6 py-2'
      }
    };
    return configs[ageGroup] || configs[AgeGroup.PRESCHOOL];
  }, [ageGroup]);

  // 生成题目
  const generateQuestions = useCallback(() => {
    const newQuestions = QuestionGenerator.generateQuestions(ageGroup, ageGroupConfig.totalQuestions);
    setQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setStartTime(new Date());
    setQuestionStartTime(new Date());

    // 创建新的学习会话
    const newSession: LearningSession = {
      id: `session_${Date.now()}`,
      ageGroup,
      startTime: new Date(),
      totalQuestions: ageGroupConfig.totalQuestions,
      correctAnswers: 0,
      totalTime: 0,
      questions: []
    };
    setSession(newSession);
  }, [ageGroup, ageGroupConfig.totalQuestions]);

  // 初始化
  useEffect(() => {
    if (isValidAgeGroup) {
      generateQuestions();
    }
  }, [isValidAgeGroup, generateQuestions]);

  // 完成学习会话
  const completeSession = useCallback(() => {
    if (!session) return;

    const endTime = new Date();
    const totalTime = endTime.getTime() - startTime.getTime();
    const correctAnswers = questions.filter(a => a.answerRecord && a.answerRecord.isCorrect).length;

    const completedSession: LearningSession = {
      ...session,
      endTime,
      totalTime,
      correctAnswers,
      questions
    };

    // 保存到本地存储
    StorageManager.saveSession(completedSession);

    // 跳转到结果页面
    router.push(`/math/${ageGroup}/result?sessionId=${completedSession.id}`);
  }, [session, startTime, answers, router, ageGroup]);

  // 更新答案
  const handleUpdateAnswer = useCallback((value: string) => {
    setIsShowResult(false);
    setUserAnswer(value)
  }, [userAnswer]);

  // 提交答案
  const handleSubmitAnswer = useCallback(() => {
    if (!currentQuestion || userAnswer.trim() === '') return; // 如果当前题目为空或用户答案为空，则返回
    const numericAnswer = parseInt(userAnswer);
    const isCorrect = numericAnswer === currentQuestion.correctAnswer;
    if (currentQuestion.answerRecord && currentQuestion.answerRecord.isCorrect) return; // 如果当前题目已答对，则返回

    const timeSpent = new Date().getTime() - questionStartTime.getTime();

    if (currentQuestion.answerRecord) {
      // 更新答案记录
      currentQuestion.answerRecord.userAnswer = numericAnswer;
      currentQuestion.answerRecord.isCorrect = isCorrect;
      currentQuestion.answerRecord.timeSpent = timeSpent;
      currentQuestion.answerRecord.timestamp = new Date();
    } else {
      // 创建新的答案记录
      const newAnswerRecord: AnswerRecord = {
        questionId: currentQuestion.id,
        userAnswer: numericAnswer,
        isCorrect,
        timeSpent,
        timestamp: new Date()
      };

      currentQuestion.answerRecord = newAnswerRecord;
      // setAnswers(prev => [...prev, newAnswerRecord]);
    }

    // 如果答对，0.5秒后自动切换下一题
    if (isCorrect) {
      setIsShowResult(true);
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
          setUserAnswer('');
          setIsShowResult(false);
          setQuestionStartTime(new Date());
        } else {
          // 完成所有题目
          completeSession();
        }
      }, 500);
    } else {
      setIsShowResult(true);
    }
  }, [currentQuestion, userAnswer, questionStartTime, currentQuestionIndex, questions.length, completeSession]);


  // 如果年龄组无效，显示错误页面
  if (!isValidAgeGroup) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-100 to-red-200 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold text-red-600 mb-4">无效的年龄组</h1>
          <p className="text-gray-600 mb-6">请选择正确的年龄段</p>
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

  // 加载中状态
  if (questions.length === 0) {
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
            🧮
          </div>
          <div
            className="w-16 h-16 mx-auto mb-8 rounded-full border-3 border-transparent animate-spin"
            style={{
              borderTopColor: 'var(--primary)',
              borderRightColor: 'var(--primary)'
            }}
          ></div>
          <h2 className="text-h2 mb-4">正在准备题目</h2>
          <p className="text-body">为你精心挑选合适的练习题目...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--background)' }}>
      {/* 专业导航栏 */}
      <nav className="py-4 border-b" style={{ borderColor: 'var(--border-default)' }}>
        <div className="container container-xl">
          <div className="flex items-center justify-between">
            <Link
              href="/subjects/math"
              className="button button-ghost"
            >
              ← 返回选择
            </Link>
            <div className="text-center">
              <h1 className="text-h2">{ageGroupConfig.title}</h1>
              <p className="text-body-sm">第 {currentQuestionIndex + 1} 题 / 共 {questions.length} 题</p>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </nav>

      {/* 进度指示器 */}
      <div className="py-4" style={{ background: 'var(--surface)' }}>
        <div className="container container-xl">
          <div className="mb-2 flex justify-between items-center">
            <span className="text-body-sm">学习进度</span>
            <span className="text-body-sm font-medium">{Math.round(((currentQuestionIndex) / questions.length) * 100)}%</span>
          </div>
          <div
            className="h-2 rounded-full overflow-hidden"
            style={{ background: 'var(--border-light)' }}
          >
            <div
              className="h-full transition-all duration-500 rounded-full"
              style={{
                background: 'var(--primary)',
                width: `${((currentQuestionIndex) / questions.length) * 100}%`
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <main className="flex-1 py-2">
        <div className="container container-xl h-full">
          <div className="max-w-4xl mx-auto w-full">
            {/* 统计信息面板 - 放在算式上面 */}
            <div className="mb-4">
              <div className="card-outlined p-4">
                <StatsPanel
                  stats={stats}
                  ageGroup={ageGroup}
                  className=""
                />
              </div>
            </div>

            {/* 题目和答题区域 */}
            <div className="card-elevated h-full p-8 lg:p-12 flex flex-col justify-center">
              <div className="max-w-4xl mx-auto w-full space-y-12">
                {/* 题目显示 */}
                <div className="text-center">
                  <QuestionDisplay
                    question={currentQuestion}
                    fontSize={ageGroupConfig.fontSize}
                    isShowResult={isShowResult}
                    userAnswer={userAnswer}
                    onAnswerChange={handleUpdateAnswer}
                  />
                </div>

                {/* 答题区域 */}
                <div className="text-center">
                  <AnswerInput
                    value={userAnswer}
                    onChange={handleUpdateAnswer}
                    onSubmit={handleSubmitAnswer}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
