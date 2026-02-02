
import { GoogleGenAI, Type } from "@google/genai";

export const aiService = {
  /**
   * Checks similarity between user answer and correct answer using Gemini.
   * Optimized to ignore Arabic spelling mistakes and accept synonyms.
   */
  checkSemanticSimilarity: async (userAnswer: string, correctAnswer: string): Promise<number> => {
    try {
      // Create instance right before API call to ensure current API Key is used
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const prompt = `
        بصفتك مصححاً ذكياً، قارن بين إجابة الطالب والإجابة النموذجية باللغة العربية.
        إجابة الطالب: "${userAnswer}"
        الإجابة النموذجية: "${correctAnswer}"
        
        قواعد التصحيح:
        1. تغاضى تماماً عن الأخطاء الإملائية الشائعة (مثل: هـ بدل ة، ي بدل ى، أ/إ/ا بدل ا).
        2. اقبل المترادفات التي تعطي نفس المعنى الجوهري.
        3. تجاهل (ال) التعريف أو المسافات الزائدة.
        4. إذا كان المعنى صحيحاً بنسبة 80% فأكثر، أعطِ درجة 100.
        5. أرجع النتيجة بتنسيق JSON فقط: {"score": 0-100}.
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

      const jsonStr = response.text || '{"score": 0}';
      const result = JSON.parse(jsonStr);
      
      return result.score || 0;
    } catch (error) {
      console.error("AI Check failed, using fallback:", error);
      // Fallback normalization logic
      const normalize = (s: string) => s.replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').replace(/\s/g, '').toLowerCase();
      return normalize(userAnswer) === normalize(correctAnswer) ? 100 : 0;
    }
  }
};
