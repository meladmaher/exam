
import { GoogleGenAI, Type } from "@google/genai";

export const aiService = {
  /**
   * Checks similarity between user answer and correct answer using Gemini.
   * Optimized for Arabic linguistic nuances.
   */
  checkSemanticSimilarity: async (userAnswer: string, correctAnswer: string): Promise<number> => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        قم بمقارنة الجملتين التاليتين من حيث المعنى (Semantic Similarity) باللغة العربية.
        إجابة المستخدم: "${userAnswer}"
        الإجابة الصحيحة النموذجية: "${correctAnswer}"
        
        قواعد التقييم:
        1. تجاهل التشكيل والهمزات (أ، إ، آ، ا) والتاء المربوطة (ة، هـ).
        2. إذا كانت الإجابة تعطي نفس المعنى المقصود حتى لو بكلمات مختلفة، أعطِ درجة عالية.
        3. تجاهل الأخطاء الإملائية البسيطة التي لا تغير المعنى.
        4. أرجع النتيجة ككائن JSON فقط يحتوي على حقل 'score' بقيمة من 0 إلى 100.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
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

      const result = JSON.parse(response.text || '{"score": 0}');
      return result.score || 0;
    } catch (error) {
      console.error("AI Check failed:", error);
      return userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase() ? 100 : 0;
    }
  }
};
