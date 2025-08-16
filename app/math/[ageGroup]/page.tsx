'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { AgeGroup, MathQuestion, AnswerRecord, LearningSession } from '@/types';
import { QuestionGenerator } from '@/lib/questionGenerator';
import { StorageManager } from '@/lib/storage';
import QuestionDisplay from '../../../components/QuestionDisplay';
import AnswerInput from '../../../components/AnswerInput';
import ProgressBar from '../../../components/ProgressBar';
import StatsPanel from '../../../components/StatsPanel';


export default function MathPracticePage() {
  const params = useParams();
  const router = useRouter();
  const ageGroup = params.ageGroup as AgeGroup;

  // 状态管理
  const [questions, setQuestions] = useState<MathQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);

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
        fontSize: 'text-4xl',
        buttonSize: 'text-2xl px-8 py-4'
      },
      [AgeGroup.ELEMENTARY_LOW]: {
        title: '小学低年级练习', 
        totalQuestions: 15,
        fontSize: 'text-3xl',
        buttonSize: 'text-xl px-6 py-3'
      },
      [AgeGroup.ELEMENTARY_HIGH]: {
        title: '小学高年级练习',
        totalQuestions: 20,
        fontSize: 'text-2xl',
        buttonSize: 'text-lg px-6 py-2'
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
      answers: []
    };
    setSession(newSession);
  }, [ageGroup, ageGroupConfig.totalQuestions]);

  // 初始化
  useEffect(() => {
    if (isValidAgeGroup) {
      generateQuestions();
    }
  }, [isValidAgeGroup, generateQuestions]);

  // 提交答案
  const handleSubmitAnswer = useCallback(() => {
    if (!currentQuestion || userAnswer.trim() === '' || isAnswered) return;

    const numericAnswer = parseInt(userAnswer);
    const isCorrect = numericAnswer === currentQuestion.correctAnswer;
    const timeSpent = new Date().getTime() - questionStartTime.getTime();

    const newAnswerRecord: AnswerRecord = {
      questionId: currentQuestion.id,
      userAnswer: numericAnswer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
      timeSpent,
      timestamp: new Date()
    };

    setAnswers(prev => [...prev, newAnswerRecord]);
    setIsAnswered(true);

    // 自动进入下一题
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setUserAnswer('');
        setIsAnswered(false);
        setQuestionStartTime(new Date());
      } else {
        // 完成所有题目
        completeSession();
      }
    }, 1500);
  }, [currentQuestion, userAnswer, isAnswered, questionStartTime, currentQuestionIndex, questions.length]);

  // 完成学习会话
  const completeSession = useCallback(() => {
    if (!session) return;

    const endTime = new Date();
    const totalTime = endTime.getTime() - startTime.getTime();
    const correctAnswers = answers.filter(a => a.isCorrect).length;

    const completedSession: LearningSession = {
      ...session,
      endTime,
      totalTime,
      correctAnswers,
      answers
    };

    // 保存到本地存储
    StorageManager.saveSession(completedSession);

    // 跳转到结果页面
    router.push(`/math/${ageGroup}/result?sessionId=${completedSession.id}`);
  }, [session, startTime, answers, router, ageGroup]);

  // 处理键盘输入
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !isAnswered) {
        handleSubmitAnswer();
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [handleSubmitAnswer, isAnswered]);

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
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">正在生成题目...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">

      {/* 头部导航 */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link 
            href="/"
            className="text-gray-600 hover:text-gray-800 transition-colors text-sm"
          >
            ← 返回
          </Link>
          <h1 className="text-lg font-medium text-gray-800">{ageGroupConfig.title}</h1>
          <div className="text-sm text-gray-500">
            {currentQuestionIndex + 1} / {questions.length}
          </div>
        </div>
      </header>

      {/* 进度条 */}
      <div className="bg-white border-b border-gray-100 px-4 py-2">
        <ProgressBar 
          current={currentQuestionIndex + 1} 
          total={questions.length}
        />
      </div>

      {/* 主要内容 */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4 p-4 overflow-hidden">
        {/* 题目区域 */}
        <div className="lg:col-span-3 flex flex-col">
          <div className="bg-white border border-gray-200 rounded p-6 flex-1 flex flex-col justify-center space-y-12">
            <div>
              <QuestionDisplay 
                question={currentQuestion}
                fontSize={ageGroupConfig.fontSize}
                isAnswered={isAnswered}
                userAnswer={userAnswer}
                onAnswerChange={setUserAnswer}
                onSubmit={handleSubmitAnswer}
                disabled={isAnswered}
              />
            </div>
            
            <div>
              <AnswerInput
                value={userAnswer}
                onChange={setUserAnswer}
                onSubmit={handleSubmitAnswer}
                disabled={isAnswered}
                fontSize={ageGroupConfig.fontSize}
                buttonSize={ageGroupConfig.buttonSize}
                showResult={isAnswered}
                isCorrect={isAnswered ? parseInt(userAnswer) === currentQuestion?.correctAnswer : false}
                correctAnswer={currentQuestion?.correctAnswer}
              />
            </div>
          </div>
        </div>

        {/* 统计面板 */}
        <div className="lg:col-span-1">
          <StatsPanel 
            stats={stats}
            ageGroup={ageGroup}
            className="bg-white border border-gray-200 rounded p-4 h-full"
          />
        </div>
      </main>
    </div>
  );
}
