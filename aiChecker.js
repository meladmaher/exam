
export const aiChecker = {
    /**
     * Local Arabic Normalization logic
     */
    normalize(str) {
        if (!str) return '';
        return str
            .toLowerCase()
            .replace(/[أإآ]/g, 'ا')
            .replace(/ة/g, 'ه')
            .replace(/ى/g, 'ي')
            .replace(/ال/g, '') // Remove Al
            .replace(/[\u064B-\u0652]/g, "") // Diacritics
            .replace(/[^\u0621-\u064A\s0-9a-zA-Z]/g, '') // Punctuation
            .replace(/\s+/g, "") // Spaces
            .trim();
    },

    /**
     * Levenshtein similarity algorithm
     */
    getSimilarity(s1, s2) {
        const len1 = s1.length;
        const len2 = s2.length;
        const maxLen = Math.max(len1, len2);
        if (maxLen === 0) return 100;

        const matrix = [];
        for (let i = 0; i <= len1; i++) matrix[i] = [i];
        for (let j = 0; j <= len2; j++) matrix[0][j] = j;

        for (let i = 1; i <= len1; i++) {
            for (let j = 1; j <= len2; j++) {
                const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j - 1] + cost
                );
            }
        }
        return ((maxLen - matrix[len1][len2]) / maxLen) * 100;
    },

    async checkAnswer(userAnswer, correctAnswer) {
        if (!userAnswer || userAnswer.trim() === '') return { score: 0, isCorrect: false };

        const nUser = this.normalize(userAnswer);
        const nCorrect = this.normalize(correctAnswer);

        if (nUser === nCorrect) {
            return { score: 100, isCorrect: true };
        }

        const score = this.getSimilarity(nUser, nCorrect);
        return {
            score: Math.round(score),
            isCorrect: score >= 70 // 70% threshold as requested
        };
    }
};
