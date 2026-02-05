
export const aiService = {
  /**
   * Checks similarity between user answer and correct answer using a local smart algorithm.
   * Optimized for Arabic: ignores hamzas, typos, and accepts synonyms based on distance.
   */
  checkSemanticSimilarity: async (userAnswer: string, correctAnswer: string): Promise<number> => {
    const nUser = aiService.simpleNormalize(userAnswer);
    const nCorrect = aiService.simpleNormalize(correctAnswer);

    // If identical after normalization, return 100
    if (nUser === nCorrect) return 100;

    // Calculate similarity percentage using Levenshtein distance
    return aiService.calculateSimilarity(nUser, nCorrect);
  },

  /**
   * Arabic normalization logic:
   * 1. Replace أ إ آ with ا
   * 2. Replace ة with ه
   * 3. Replace ى with ي
   * 4. Remove definite article "ال"
   * 5. Remove diacritics, punctuation, and spaces
   */
  simpleNormalize: (str: string): string => {
    if (!str) return "";
    return str
      .toLowerCase()
      .replace(/[أإآ]/g, "ا")
      .replace(/ة/g, "ه")
      .replace(/ى/g, "ي")
      .replace(/ال/g, "") // Remove 'Al' definite article
      .replace(/[\u064B-\u0652]/g, "") // Remove Harakat (Tashkeel)
      .replace(/[^\u0621-\u064A\s0-9a-zA-Z]/g, "") // Remove punctuation
      .replace(/\s+/g, "") // Remove all spaces
      .trim();
  },

  /**
   * Levenshtein Distance based similarity percentage
   */
  calculateSimilarity: (s1: string, s2: string): number => {
    const len1 = s1.length;
    const len2 = s2.length;
    const maxLen = Math.max(len1, len2);
    if (maxLen === 0) return 100;

    const matrix: number[][] = [];
    for (let i = 0; i <= len1; i++) matrix[i] = [i];
    for (let j = 0; j <= len2; j++) matrix[0][j] = j;

    for (let i = 1; i <= len1; i++) {
      for (let j = 1; j <= len2; j++) {
        const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,      // deletion
          matrix[i][j - 1] + 1,      // insertion
          matrix[i - 1][j - 1] + cost // substitution
        );
      }
    }

    const distance = matrix[len1][len2];
    return ((maxLen - distance) / maxLen) * 100;
  }
};
