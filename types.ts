
export type QuestionType = 'multiple-choice' | 'true-false' | 'fill-in-the-blank';

export interface Question {
  id: string;
  type: QuestionType;
  questionText: { ar: string; en: string };
  options?: { ar: string; en: string }[];
  correctAnswer: string;
  explanation?: { ar: string; en: string };
  subjectId?: string;
}

export interface Exam {
  id: string;
  subjectId: string;
  title: { ar: string; en: string };
  questions: Question[];
  thumbnail?: string;
  active: boolean;
}

export interface Subject {
  id: string;
  name: { ar: string; en: string };
  icon: string;
  color: string;
  custom?: boolean;
}

export interface SavedFolder {
  id: string;
  name: string;
  icon: string;
  questions: Question[];
  isDefault?: boolean;
}

export interface ExamSession {
  exam: Exam;
  currentIndex: number;
  userAnswers: Record<string, string>;
  feedback: Record<string, { isCorrect: boolean, isChecked: boolean }>;
  startTime: number;
}

export interface UserStats {
  examsTaken: number;
  accuracyRate: number;
  totalQuestionsAnswered: number;
  correctAnswers: number;
  starredQuestionIds: string[];
  history: {
    subjectId: string;
    score: number;
    date: number;
  }[];
  mistakesTracker: Record<string, {
    count: number;
    question: Question;
  }>;
}

export interface ExamResult {
  examId: string;
  subjectId: string;
  score: number;
  timeSpent: number;
  date: number;
  answers: {
    questionId: string;
    questionData: Question;
    userAnswer: string;
    isCorrect: boolean;
  }[];
}
