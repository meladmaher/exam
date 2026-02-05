
import { UserStats, ExamResult, Question, Subject, Exam, SavedFolder, ExamSession } from '../types';
import { ETHICS_EXAM, ETHICS_FILL_EXAM } from '../constants';

const STATS_KEY = 'ai_exam_user_stats_v2';
const RESULTS_KEY = 'ai_exam_results_v2';
const FOLDERS_KEY = 'ai_exam_saved_folders_v2';
const CUSTOM_EXAMS_KEY = 'ai_exam_custom_exams_v2';
const SESSION_KEY = 'ai_exam_active_session';
const THEME_CONFIG_KEY = 'ai_exam_theme_config';

export const storageService = {
  getThemeConfig: () => {
    const saved = localStorage.getItem(THEME_CONFIG_KEY);
    return saved ? JSON.parse(saved) : { primary: '#6366f1', secondary: '#a855f7' };
  },
  
  saveThemeConfig: (config: {primary: string, secondary: string}) => {
    localStorage.setItem(THEME_CONFIG_KEY, JSON.stringify(config));
  },

  getCustomExams: (): Exam[] => {
    const saved = localStorage.getItem(CUSTOM_EXAMS_KEY);
    const exams = saved ? JSON.parse(saved) : [];
    // Return both requested exams if nothing is saved
    return exams.length === 0 ? [ETHICS_EXAM, ETHICS_FILL_EXAM] : exams;
  },

  addExam: (exam: Exam) => {
    const exams = storageService.getCustomExams();
    exams.push({ ...exam, active: true });
    localStorage.setItem(CUSTOM_EXAMS_KEY, JSON.stringify(exams));
  },

  updateExam: (updatedExam: Exam) => {
    const exams = storageService.getCustomExams();
    const index = exams.findIndex(e => e.id === updatedExam.id);
    if (index !== -1) {
      exams[index] = updatedExam;
      localStorage.setItem(CUSTOM_EXAMS_KEY, JSON.stringify(exams));
    }
  },

  deleteExam: (examId: string) => {
    const exams = storageService.getCustomExams().filter(e => e.id !== examId);
    localStorage.setItem(CUSTOM_EXAMS_KEY, JSON.stringify(exams));
  },

  saveSession: (session: ExamSession) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  },

  getActiveSession: (): ExamSession | null => {
    const saved = localStorage.getItem(SESSION_KEY);
    return saved ? JSON.parse(saved) : null;
  },

  clearSession: () => {
    localStorage.removeItem(SESSION_KEY);
  },

  getSavedFolders: (): SavedFolder[] => {
    const saved = localStorage.getItem(FOLDERS_KEY);
    let folders: SavedFolder[] = saved ? JSON.parse(saved) : [];
    if (!folders.some(f => f.isDefault)) {
      folders.unshift({ id: 'default_review', name: 'المراجعة العامة', icon: '📚', questions: [], isDefault: true });
      localStorage.setItem(FOLDERS_KEY, JSON.stringify(folders));
    }
    return folders;
  },

  addFolder: (name: string, icon: string) => {
    const folders = storageService.getSavedFolders();
    const newFolder = { id: Date.now().toString(), name, icon, questions: [] };
    folders.push(newFolder);
    localStorage.setItem(FOLDERS_KEY, JSON.stringify(folders));
    return newFolder;
  },

  deleteFolder: (id: string) => {
    const folders = storageService.getSavedFolders().filter(f => f.id !== id || f.isDefault);
    localStorage.setItem(FOLDERS_KEY, JSON.stringify(folders));
  },

  saveQuestionToFolder: (question: Question, folderId: string) => {
    const folders = storageService.getSavedFolders();
    const folder = folders.find(f => f.id === folderId);
    if (folder && !folder.questions.some(q => q.id === question.id)) {
      folder.questions.push(question);
      localStorage.setItem(FOLDERS_KEY, JSON.stringify(folders));
      return true;
    }
    return false;
  },

  removeQuestionFromFolder: (questionId: string, folderId: string) => {
    const folders = storageService.getSavedFolders();
    const folder = folders.find(f => f.id === folderId);
    if (folder) {
      folder.questions = folder.questions.filter(q => q.id !== questionId);
      localStorage.setItem(FOLDERS_KEY, JSON.stringify(folders));
    }
  },

  getStats: (): UserStats => {
    const saved = localStorage.getItem(STATS_KEY);
    if (saved) return JSON.parse(saved);
    return {
      examsTaken: 0,
      accuracyRate: 0,
      totalQuestionsAnswered: 0,
      correctAnswers: 0,
      starredQuestionIds: [],
      history: [],
      mistakesTracker: {}
    };
  },

  saveResult: (result: Omit<ExamResult, 'date'>) => {
    const stats = storageService.getStats();
    const date = Date.now();
    
    stats.examsTaken += 1;
    stats.totalQuestionsAnswered += result.answers.length;
    const correctInThisExam = result.answers.filter(a => a.isCorrect).length;
    stats.correctAnswers += correctInThisExam;
    stats.accuracyRate = Math.round((stats.correctAnswers / stats.totalQuestionsAnswered) * 100);
    
    stats.history.push({
      subjectId: result.subjectId,
      score: result.score,
      date
    });

    result.answers.forEach(ans => {
      if (!ans.isCorrect) {
        if (!stats.mistakesTracker[ans.questionId]) {
          stats.mistakesTracker[ans.questionId] = { count: 1, question: ans.questionData };
        } else {
          stats.mistakesTracker[ans.questionId].count += 1;
        }
      }
    });

    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    const results = storageService.getAllResults();
    results.push({ ...result, date });
    localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
  },

  getAllResults: (): ExamResult[] => {
    const saved = localStorage.getItem(RESULTS_KEY);
    return saved ? JSON.parse(saved) : [];
  }
};
