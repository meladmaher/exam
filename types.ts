
export type QuestionType = 'multiple-choice' | 'true-false' | 'fill-in-the-blank';

export interface Question {
  id: string;
  type: QuestionType;
  questionText: { ar: string; en: string };
  options?: { ar: string; en: string }[];
  correctAnswer: string;
  explanation?: { ar: string; en: string };
  subjectId?: string; // Added for starred exam reference
}

export interface Exam {
  id: string;
  subjectId: string;
  title: { ar: string; en: string };
  questions: Question[];
}

export interface Subject {
  id: string;
  name: { ar: string; en: string };
  icon: string;
  color: string;
}

export interface UserStats {
  examsTaken: number;
  accuracyRate: number;
  totalQuestionsAnswered: number;
  correctAnswers: number;
  starredQuestionIds: string[]; // List of IDs for starred questions
  subjectProgress: Record<string, {
    examsCount: number;
    accuracy: number;
    lastScore: number;
  }>;
}

export interface ExamResult {
  examId: string;
  subjectId: string;
  score: number;
  timeSpent: number;
  date: number; // Timestamp
  answers: {
    questionId: string;
    userAnswer: string;
    isCorrect: boolean;
    similarityScore?: number;
  }[];
}
