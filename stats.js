
export const statsManager = {
    getSubjectData(subjectId) {
        const data = localStorage.getItem(`exam_stats_${subjectId}`);
        return data ? JSON.parse(data) : {
            examsTaken: 0,
            accuracy: 0,
            totalScore: 0,
            wrongQuestions: [],
            stars: []
        };
    },

    saveExamResult(subjectId, score, answers) {
        const stats = this.getSubjectData(subjectId);
        
        // Update basic counts
        stats.examsTaken += 1;
        stats.totalScore += score;
        stats.accuracy = Math.round(stats.totalScore / stats.examsTaken);

        // Update frequently wrong questions
        answers.forEach(ans => {
            if (!ans.isCorrect) {
                const existing = stats.wrongQuestions.find(q => q.id === ans.id);
                if (existing) {
                    existing.count += 1;
                } else {
                    stats.wrongQuestions.push({ id: ans.id, text: ans.text, count: 1 });
                }
            }
        });

        // Sort wrong questions by frequency
        stats.wrongQuestions.sort((a, b) => b.count - a.count);

        localStorage.setItem(`exam_stats_${subjectId}`, JSON.stringify(stats));
    },

    toggleStar(subjectId, questionId) {
        const stats = this.getSubjectData(subjectId);
        if (stats.stars.includes(questionId)) {
            stats.stars = stats.stars.filter(id => id !== questionId);
        } else {
            stats.stars.push(questionId);
        }
        localStorage.setItem(`exam_stats_${subjectId}`, JSON.stringify(stats));
        return stats.stars.includes(questionId);
    },

    isStarred(subjectId, questionId) {
        const stats = this.getSubjectData(subjectId);
        return stats.stars.includes(questionId);
    },

    getGlobalStats() {
        // Mocking or aggregating logic here
        return {
            accuracy: 85 // Placeholder
        };
    }
};
