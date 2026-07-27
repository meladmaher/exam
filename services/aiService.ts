import { GoogleGenAI } from '@google/genai';

export const aiService = {
  /**
   * Main evaluation method for essay / fill-in-the-blank questions.
   * First tries Gemini 2.5 Flash if VITE_GEMINI_API_KEY is available.
   * Falls back to smart Arabic fuzzy & semantic matching algorithm if offline/no key.
   */
  evaluateAnswer: async (
    userAnswer: string,
    correctAnswer: string,
    questionText?: string
  ): Promise<boolean> => {
    if (!userAnswer || !userAnswer.trim()) return false;

    const trimmedUser = userAnswer.trim();
    const trimmedCorrect = correctAnswer.trim();

    // Fast check: exact or normalized exact match -> true instantly
    const normUser = aiService.simpleNormalize(trimmedUser);
    const normCorrect = aiService.simpleNormalize(trimmedCorrect);

    if (normUser === normCorrect && normUser.length > 0) {
      return true;
    }

    // Try Gemini AI evaluation if API key is provided
    const apiKey =
      (import.meta as any).env?.VITE_GEMINI_API_KEY ||
      (import.meta as any).env?.GEMINI_API_KEY ||
      (process as any).env?.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `أنت أستاذ ومصحح إلكتروني ذكي لمساعدة الطلاب في امتحانات اللغة العربية والمواد التعليمية.
السؤال: "${questionText || 'أكمل ما يلي / إجابة مقالية'}"
الإجابة النموذجية الصحيحة: "${trimmedCorrect}"
إجابة الطالب المدخلة: "${trimmedUser}"

المطلوب:
احكم هل إجابة الطالب صحيحة ومقبولة تعليمياً؟
شروط التقييم:
- تسامح مع الأخطاء الإملائية البسيطة (مثل: أ/إ/ا، ة/ه، ى/ي، الهمزات).
- تسامح مع اختلاف المسافات، علامات الترقيم، وإضافة أو حذف (الـ) التعريف.
- تسامح مع إعادة ترتيب الكلمات أو استخدام المرادفات اللغوية والمفاهيم المرادفة المؤدية لنفس المعنى المطلوب.
- إذا كانت الإجابة صحيحة أو تحتوي الأفكار والمعاني الأساسية المطلوبة، أجب بـ: CORRECT
- إذا كانت الإجابة خاطئة تماماً، أو تقدم معنى مختلفاً أو معاكساً، أو مجرد كلام عشوائي، أجب بـ: INCORRECT

رد بكلمة واحدة فقط: إما CORRECT أو INCORRECT`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });

        const text = response.text?.trim().toUpperCase() || '';
        if (text.includes('CORRECT') && !text.includes('INCORRECT')) {
          return true;
        } else if (text.includes('INCORRECT')) {
          return false;
        }
      } catch (err) {
        console.warn('Gemini API evaluation failed, falling back to local algorithm:', err);
      }
    }

    // Local Smart Fallback Algorithm
    const similarity = aiService.calculateSimilarity(normUser, normCorrect);

    // If similarity percentage is 68% or more
    if (similarity >= 68) return true;

    // Word inclusion check for Arabic answers
    const userWords = normUser.split(/\s+/).filter(w => w.length > 2);
    const correctWords = normCorrect.split(/\s+/).filter(w => w.length > 2);

    if (correctWords.length > 0) {
      let matchedCount = 0;
      for (const cw of correctWords) {
        if (userWords.some(uw => uw.includes(cw) || cw.includes(uw) || aiService.calculateSimilarity(uw, cw) >= 70)) {
          matchedCount++;
        }
      }
      const matchRatio = matchedCount / correctWords.length;
      if (matchRatio >= 0.7) return true;
    }

    return false;
  },

  /**
   * Compatibility wrapper returning score percentage (0-100)
   */
  checkSemanticSimilarity: async (userAnswer: string, correctAnswer: string, questionText?: string): Promise<number> => {
    const isCorrect = await aiService.evaluateAnswer(userAnswer, correctAnswer, questionText);
    return isCorrect ? 100 : 0;
  },

  /**
   * Arabic normalization logic:
   * 1. Replace أ إ آ with ا
   * 2. Replace ة with ه
   * 3. Replace ى with ي
   * 4. Remove diacritics, punctuation
   */
  simpleNormalize: (str: string): string => {
    if (!str) return '';
    return str
      .toLowerCase()
      .replace(/[أإآ]/g, 'ا')
      .replace(/ة/g, 'ه')
      .replace(/ى/g, 'ي')
      .replace(/[\u064B-\u0652]/g, '') // Tashkeel
      .replace(/[^\u0621-\u064A\s0-9a-zA-Z]/g, ' ') // Punctuation to space
      .replace(/\s+/g, ' ')
      .trim();
  },

  /**
   * Levenshtein Distance based similarity percentage
   */
  calculateSimilarity: (s1: string, s2: string): number => {
    const str1 = s1.replace(/\s+/g, '');
    const str2 = s2.replace(/\s+/g, '');
    const len1 = str1.length;
    const len2 = str2.length;
    const maxLen = Math.max(len1, len2);
    if (maxLen === 0) return 100;

    const matrix: number[][] = [];
    for (let i = 0; i <= len1; i++) matrix[i] = [i];
    for (let j = 0; j <= len2; j++) matrix[0][j] = j;

    for (let i = 1; i <= len1; i++) {
      for (let j = 1; j <= len2; j++) {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }

    const distance = matrix[len1][len2];
    return ((maxLen - distance) / maxLen) * 100;
  },
};
