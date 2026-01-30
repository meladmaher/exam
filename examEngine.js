
import { aiChecker } from './aiChecker.js';
import { statsManager } from './stats.js';

export class ExamEngine {
    constructor(subjectId, examData, lang = 'ar') {
        this.subjectId = subjectId;
        this.data = examData;
        this.lang = lang;
        this.currentIndex = 0;
        this.userAnswers = {};
        this.startTime = Date.now();
        this.isFinished = false;
        this.resultsCache = {}; // Cache results from immediate feedback
    }

    get currentQuestion() {
        return this.data.questions[this.currentIndex];
    }

    get progress() {
        return Math.round(((this.currentIndex + 1) / this.data.questions.length) * 100);
    }

    setAnswer(answer) {
        this.userAnswers[this.currentIndex] = answer;
    }

    next() {
        if (this.currentIndex < this.data.questions.length - 1) {
            this.currentIndex++;
            return true;
        }
        return false;
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            return true;
        }
        return false;
    }

    async calculateResults() {
        const results = [];
        let correctCount = 0;

        for (let i = 0; i < this.data.questions.length; i++) {
            const q = this.data.questions[i];
            const uAns = this.userAnswers[i] !== undefined ? this.userAnswers[i] : "";
            let isCorrect = false;

            // Simple immediate matching check
            if (q.type === 'fill-in-the-blank') {
                const check = await aiChecker.checkAnswer(uAns, q.correctAnswer, this.lang);
                isCorrect = check.isCorrect;
            } else {
                isCorrect = String(uAns) === String(q.correctAnswer);
            }

            if (isCorrect) correctCount++;
            results.push({
                id: q.id,
                text: q.questionText[this.lang],
                userAnswer: q.type === 'multiple-choice' || q.type === 'true-false' 
                    ? (q.options ? q.options[uAns]?.[this.lang] : uAns)
                    : uAns,
                correctAnswer: q.type === 'multiple-choice' || q.type === 'true-false'
                    ? (q.options ? q.options[q.correctAnswer]?.[this.lang] : q.correctAnswer)
                    : q.correctAnswer,
                isCorrect: isCorrect,
                type: q.type
            });
        }

        const score = Math.round((correctCount / this.data.questions.length) * 100);
        const timeSpent = Math.floor((Date.now() - this.startTime) / 1000);

        statsManager.saveExamResult(this.subjectId, score, results);

        return {
            score,
            timeSpent,
            correctCount,
            wrongCount: this.data.questions.length - correctCount,
            review: results
        };
    }
}
