
import { GoogleGenAI, Type } from "@google/genai";

export const aiService = {
  /**
   * Checks similarity between user answer and correct answer using Gemini.
   * Only used for fill-in-the-blank questions.
   */
  checkSemanticSimilarity: async (userAnswer: string, correctAnswer: string): Promise<number> => {
    try {
      // Guideline: Always use process.env.API_KEY directly and create new instance for freshness.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        Compare these two Arabic phrases for semantic similarity.
        User Answer: "${userAnswer}"
        Correct Answer: "${correctAnswer}"
        
        Rules:
        1. Ignore Arabic tashkeel (diacritics).
        2. Normalize alef (أ, إ, آ to ا) and taa marbuta (ة to ه).
        3. If they mean the same thing, return a high score.
        4. Return ONLY a JSON object with a 'score' property between 0 and 100.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview', // Complex text task involving semantic reasoning.
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER, description: "Similarity score from 0 to 100" }
            },
            required: ["score"]
          }
        }
      });

      // Guideline: Access text property directly.
      const result = JSON.parse(response.text || '{"score": 0}');
      return result.score || 0;
    } catch (error) {
      console.error("AI Check failed:", error);
      // Fallback simple match if API fails.
      return userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase() ? 100 : 0;
    }
  }
};
