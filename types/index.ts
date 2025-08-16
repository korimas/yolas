// 年龄段枚举
export enum AgeGroup {
  PRESCHOOL = "3-5", // 学前班
  ELEMENTARY_LOW = "6-8", // 小学低年级  
  ELEMENTARY_HIGH = "9-12" // 小学高年级
}

// 运算类型
export enum OperationType {
  ADDITION = "addition",
  SUBTRACTION = "subtraction", 
  MULTIPLICATION = "multiplication",
  DIVISION = "division"
}

// 题目类型
export enum QuestionType {
  NUMERICAL = "numerical", // 数字计算
  VISUAL_COUNTING = "visual_counting", // 图形计数
  WORD_PROBLEM = "word_problem" // 应用题
}

// 数学题目接口
export interface MathQuestion {
  id: string;
  type: QuestionType;
  operation: OperationType;
  question: string;
  operand1: number;
  operand2?: number;
  correctAnswer: number;
  ageGroup: AgeGroup;
  difficulty: number; // 1-5难度等级
  visualElements?: VisualElement[]; // 用于图形计数题
}

// 图形元素接口
export interface VisualElement {
  type: 'circle' | 'square' | 'triangle' | 'star';
  color: string;
  count: number;
}

// 答题记录接口
export interface AnswerRecord {
  questionId: string;
  userAnswer: number;
  correctAnswer: number;
  isCorrect: boolean;
  timeSpent: number; // 毫秒
  timestamp: Date;
}

// 学习会话接口
export interface LearningSession {
  id: string;
  ageGroup: AgeGroup;
  startTime: Date;
  endTime?: Date;
  totalQuestions: number;
  correctAnswers: number;
  totalTime: number; // 毫秒
  answers: AnswerRecord[];
}

// 用户进度接口
export interface UserProgress {
  ageGroup: AgeGroup;
  currentLevel: number;
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  averageAccuracy: number;
  totalLearningTime: number; // 毫秒
  lastStudyDate: Date;
  sessions: LearningSession[];
  weakAreas: OperationType[]; // 需要加强的运算类型
}

// 难度配置接口
export interface DifficultyConfig {
  ageGroup: AgeGroup;
  maxNumber: number;
  availableOperations: OperationType[];
  questionTypes: QuestionType[];
  timeLimit?: number; // 可选的时间限制（秒）
}

// 学习统计接口
export interface LearningStats {
  todayQuestions: number;
  todayAccuracy: number;
  weeklyQuestions: number;
  weeklyAccuracy: number;
  totalQuestions: number;
  totalAccuracy: number;
  streakDays: number; // 连续学习天数
}

// 奖励系统接口
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  condition: {
    type: 'questions_count' | 'accuracy' | 'streak_days' | 'time_spent';
    threshold: number;
  };
}

// 主题配置接口
export interface ThemeConfig {
  ageGroup: AgeGroup;
  primaryColor: string;
  secondaryColor: string;
  fontSize: {
    small: string;
    medium: string;
    large: string;
  };
  buttonSize: {
    width: string;
    height: string;
  };
}
