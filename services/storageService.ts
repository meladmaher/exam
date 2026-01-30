
import { UserStats, ExamResult, Question } from '../types';

const STATS_KEY = 'ai_exam_user_stats';
const RESULTS_KEY = 'ai_exam_results';
const STARRED_DATA_KEY = 'ai_exam_starred_data'; // Store the question objects themselves for easy retrieval

export const storageService = {
  getStats: (): UserStats => {
    const saved = localStorage.getItem(STATS_KEY);
    if (saved) return JSON.parse(saved);
    return {
      examsTaken: 0,
      accuracyRate: 0,
      totalQuestionsAnswered: 0,
      correctAnswers: 0,
      starredQuestionIds: [],
      subjectProgress: {}
    };
  },

  getAllResults: (): ExamResult[] => {
    const saved = localStorage.getItem(RESULTS_KEY);
    return saved ? JSON.parse(saved) : [];
  },

  getStarredQuestions: (): Question[] => {
    const saved = localStorage.getItem(STARRED_DATA_KEY);
    return saved ? JSON.parse(saved) : [];
  },

  toggleStar: (question: Question) => {
    const stats = storageService.getStats();
    let starredData = storageService.getStarredQuestions();
    
    const isStarred = stats.starredQuestionIds.includes(question.id);
    
    if (isStarred) {
      stats.starredQuestionIds = stats.starredQuestionIds.filter(id => id !== question.id);
      starredData = starredData.filter(q => q.id !== question.id);
    } else {
      stats.starredQuestionIds.push(question.id);
      starredData.push(question);
    }

    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    localStorage.setItem(STARRED_DATA_KEY, JSON.stringify(starredData));
    return !isStarred;
  },

  deleteResult: (timestamp: number) => {
    let results = storageService.getAllResults();
    results = results.filter(r => r.date !== timestamp);
    localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
    storageService.rebuildStats(results);
  },

  rebuildStats: (results: ExamResult[]) => {
    const currentStats = storageService.getStats();
    const stats: UserStats = {
      examsTaken: results.length,
      accuracyRate: 0,
      totalQuestionsAnswered: 0,
      correctAnswers: 0,
      starredQuestionIds: currentStats.starredQuestionIds,
      subjectProgress: {}
    };

    results.forEach(res => {
      stats.totalQuestionsAnswered += res.answers.length;
      stats.correctAnswers += res.answers.filter(a => a.isCorrect).length;
      
      const subId = res.subjectId;
      if (!stats.subjectProgress[subId]) {
        stats.subjectProgress[subId] = { examsCount: 0, accuracy: 0, lastScore: 0 };
      }
      
      const sub = stats.subjectProgress[subId];
      sub.examsCount += 1;
      sub.lastScore = res.score;
      sub.accuracy = Math.round(((sub.accuracy * (sub.examsCount - 1)) + res.score) / sub.examsCount);
    });

    if (stats.totalQuestionsAnswered > 0) {
      stats.accuracyRate = Math.round((stats.correctAnswers / stats.totalQuestionsAnswered) * 100);
    }

    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  },

  saveResult: (result: Omit<ExamResult, 'date'>) => {
    const fullResult: ExamResult = {
      ...result,
      date: Date.now()
    };

    const results = storageService.getAllResults();
    results.push(fullResult);
    localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
    storageService.rebuildStats(results);
  }
};
