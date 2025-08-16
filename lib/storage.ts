import { LearningSession, UserProgress, AgeGroup } from '@/types';

export class StorageManager {
  private static readonly SESSIONS_KEY = 'learning_sessions';
  private static readonly PROGRESS_KEY = 'user_progress';

  /**
   * 保存学习会话
   */
  static saveSession(session: LearningSession): void {
    try {
      const sessions = this.getSessions();
      sessions.push(session);
      localStorage.setItem(this.SESSIONS_KEY, JSON.stringify(sessions));
      
      // 同时更新用户进度
      this.updateProgress(session);
    } catch (error) {
      console.error('Error saving session:', error);
    }
  }

  /**
   * 获取所有学习会话
   */
  static getSessions(): LearningSession[] {
    try {
      const sessionsData = localStorage.getItem(this.SESSIONS_KEY);
      return sessionsData ? JSON.parse(sessionsData) : [];
    } catch (error) {
      console.error('Error loading sessions:', error);
      return [];
    }
  }

  /**
   * 根据ID获取特定会话
   */
  static getSession(sessionId: string): LearningSession | null {
    try {
      const sessions = this.getSessions();
      return sessions.find(session => session.id === sessionId) || null;
    } catch (error) {
      console.error('Error finding session:', error);
      return null;
    }
  }

  /**
   * 更新用户进度
   */
  private static updateProgress(session: LearningSession): void {
    try {
      const progress = this.getProgress(session.ageGroup);
      
      // 更新统计信息
      progress.totalQuestionsAnswered += session.totalQuestions;
      progress.totalCorrectAnswers += session.correctAnswers;
      progress.averageAccuracy = (progress.totalCorrectAnswers / progress.totalQuestionsAnswered) * 100;
      progress.totalLearningTime += session.totalTime;
      progress.lastStudyDate = session.endTime || new Date();
      progress.sessions.push(session);

      // 保存更新后的进度
      this.saveProgress(session.ageGroup, progress);
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  }

  /**
   * 获取用户进度
   */
  static getProgress(ageGroup: AgeGroup): UserProgress {
    try {
      const progressData = localStorage.getItem(`${this.PROGRESS_KEY}_${ageGroup}`);
      if (progressData) {
        const progress = JSON.parse(progressData);
        // 确保日期对象正确转换
        progress.lastStudyDate = new Date(progress.lastStudyDate);
        progress.sessions = progress.sessions.map((session: any) => ({
          ...session,
          startTime: new Date(session.startTime),
          endTime: session.endTime ? new Date(session.endTime) : undefined
        }));
        return progress;
      }
      
      // 返回默认进度
      return {
        ageGroup,
        currentLevel: 1,
        totalQuestionsAnswered: 0,
        totalCorrectAnswers: 0,
        averageAccuracy: 0,
        totalLearningTime: 0,
        lastStudyDate: new Date(),
        sessions: [],
        weakAreas: []
      };
    } catch (error) {
      console.error('Error loading progress:', error);
      return {
        ageGroup,
        currentLevel: 1,
        totalQuestionsAnswered: 0,
        totalCorrectAnswers: 0,
        averageAccuracy: 0,
        totalLearningTime: 0,
        lastStudyDate: new Date(),
        sessions: [],
        weakAreas: []
      };
    }
  }

  /**
   * 保存用户进度
   */
  static saveProgress(ageGroup: AgeGroup, progress: UserProgress): void {
    try {
      localStorage.setItem(`${this.PROGRESS_KEY}_${ageGroup}`, JSON.stringify(progress));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }

  /**
   * 获取学习统计
   */
  static getLearningStats(ageGroup: AgeGroup) {
    const progress = this.getProgress(ageGroup);
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    // 今日统计
    const todaySessions = progress.sessions.filter(session => 
      session.startTime >= todayStart
    );
    const todayQuestions = todaySessions.reduce((sum, session) => sum + session.totalQuestions, 0);
    const todayCorrect = todaySessions.reduce((sum, session) => sum + session.correctAnswers, 0);
    const todayAccuracy = todayQuestions > 0 ? (todayCorrect / todayQuestions) * 100 : 0;

    // 本周统计
    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const weekSessions = progress.sessions.filter(session => 
      session.startTime >= weekStart
    );
    const weeklyQuestions = weekSessions.reduce((sum, session) => sum + session.totalQuestions, 0);
    const weeklyCorrect = weekSessions.reduce((sum, session) => sum + session.correctAnswers, 0);
    const weeklyAccuracy = weeklyQuestions > 0 ? (weeklyCorrect / weeklyQuestions) * 100 : 0;

    // 连续学习天数
    let streakDays = 0;
    const sortedSessions = progress.sessions
      .sort((a, b) => b.startTime.getTime() - a.startTime.getTime());
    
    let currentDate = new Date(todayStart);
    for (const session of sortedSessions) {
      const sessionDate = new Date(session.startTime.getFullYear(), 
        session.startTime.getMonth(), session.startTime.getDate());
      
      if (sessionDate.getTime() === currentDate.getTime()) {
        streakDays++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else if (sessionDate.getTime() < currentDate.getTime()) {
        break;
      }
    }

    return {
      todayQuestions,
      todayAccuracy,
      weeklyQuestions,
      weeklyAccuracy,
      totalQuestions: progress.totalQuestionsAnswered,
      totalAccuracy: progress.averageAccuracy,
      streakDays
    };
  }

  /**
   * 清空所有数据
   */
  static clearAllData(): void {
    try {
      Object.values(AgeGroup).forEach(ageGroup => {
        localStorage.removeItem(`${this.PROGRESS_KEY}_${ageGroup}`);
      });
      localStorage.removeItem(this.SESSIONS_KEY);
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  }

  /**
   * 导出数据
   */
  static exportData(): string {
    try {
      const data = {
        sessions: this.getSessions(),
        progress: Object.values(AgeGroup).reduce((acc, ageGroup) => {
          acc[ageGroup] = this.getProgress(ageGroup);
          return acc;
        }, {} as Record<AgeGroup, UserProgress>)
      };
      return JSON.stringify(data, null, 2);
    } catch (error) {
      console.error('Error exporting data:', error);
      return '';
    }
  }

  /**
   * 导入数据
   */
  static importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      
      // 验证数据格式
      if (!data.sessions || !data.progress) {
        throw new Error('Invalid data format');
      }

      // 导入会话数据
      localStorage.setItem(this.SESSIONS_KEY, JSON.stringify(data.sessions));

      // 导入进度数据
      Object.entries(data.progress).forEach(([ageGroup, progress]) => {
        localStorage.setItem(`${this.PROGRESS_KEY}_${ageGroup}`, JSON.stringify(progress));
      });

      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }
}
