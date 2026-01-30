
import { GoogleGenAI, Type } from "@google/genai";

export const aiChecker = {
    async checkAnswer(userAnswer, correctAnswer, lang = 'ar') {
        if (!userAnswer || userAnswer.trim() === '') return { score: 0, isCorrect: false };

        // Normalize Arabic (Simple local check first)
        const normalize = (str) => {
            if (!str) return '';
            return str.replace(/[أإآ]/g, 'ا')
                      .replace(/ة/g, 'ه')
                      .replace(/[^\u0621-\u064A\s0-9a-zA-Z]/g, '')
                      .trim()
                      .toLowerCase();
        };

        if (normalize(userAnswer) === normalize(correctAnswer)) {
            return { score: 100, isCorrect: true };
        }

        // Deep Semantic Check using Gemini
        try {
            // Guideline: Create instance right before API call.
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `Compare these two ${lang === 'ar' ? 'Arabic' : 'English'} phrases for semantic similarity:
            Phrase 1: "${userAnswer}"
            Phrase 2: "${correctAnswer}"
            
            Rules:
            1. Return a similarity score from 0 to 100.
            2. Ignore spelling mistakes or dialect differences.
            3. Return only valid JSON.`;

            const response = await ai.models.generateContent({
                model: "gemini-3-pro-preview", // Use Pro for complex semantic tasks.
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            score: { type: Type.NUMBER, description: "Similarity score 0-100" }
                        },
                        required: ["score"]
                    }
                }
            });

            // Guideline: Access text property directly.
            const result = JSON.parse(response.text);
            const score = result.score || 0;
            return {
                score: score,
                isCorrect: score >= 70
            };
        } catch (error) {
            console.error("AI Check Failed:", error);
            // Fallback to normalized exact match
            return { score: 0, isCorrect: normalize(userAnswer) === normalize(correctAnswer) };
        }
    }
};
