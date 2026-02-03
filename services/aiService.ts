
import { GoogleGenAI, Type } from "@google/genai";

export const aiService = {
  /**
   * Checks similarity between user answer and correct answer using Gemini.
   * Optimized for Arabic: ignores hamzas, typos, and accepts synonyms.
   */
  checkSemanticSimilarity: async (userAnswer: string, correctAnswer: string): Promise<number> => {
    try {
      // Access the API key from environment variables (set in Vercel settings)
      const apiKey = process.env.API_KEY;
      
      if (!apiKey) {
        console.error("API_KEY is not defined in environment variables. Please check your deployment settings.");
        // Fallback: Simple normalization check if API key is missing
        return aiService.simpleNormalize(userAnswer) === aiService.simpleNormalize(correctAnswer) ? 100 : 0;
      }

      // Guideline: Create instance right before making an API call.
      const ai = new GoogleGenAI({ apiKey });
      
      const prompt = `
        بصفتك مصححاً لغوياً ذكياً لخبير في اللغة العربية، قارن بين إجابة الطالب والإجابة النموذجية.
        إجابة الطالب: "${userAnswer}"
        الإجابة النموذجية: "${correctAnswer}"
        
        تعليمات التصحيح الذكية:
        1. تجاهل تماماً فروقات الهمزات (أ، إ، آ، ا) والتاء المربوطة والهاء (ة، ه) والياء والألف المقصورة (ي، ى).
        2. اقبل المترادفات اللغوية (مثلاً لو الإجابة "رائد أعمال" والطالب كتب "رائد الاعمال" أو "مبتكر" اعتبرها صحيحة).
        3. تجاهل "ال" التعريف والمسافات الزائدة وعلامات الترقيم والحركات (التشكيل).
        4. إذا كان المعنى الجوهري للإجابة صحيحاً لغوياً، أعطِ درجة 100.
        5. يجب أن يكون الرد بتنسيق JSON فقط كالتالي: {"score": 0-100}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview', // Pro model for complex semantic understanding
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

      // Guideline: Access .text property directly.
      const text = response.text || '{"score": 0}';
      const result = JSON.parse(text);
      return result.score || 0;

    } catch (error: any) {
      console.error("AI Semantic Check failed:", error);
      
      // Handle the case where the entity was not found (invalid key / project)
      if (error.message?.includes("entity was not found")) {
        console.warn("API Key might be invalid or project is not found. Falling back to local check.");
      }

      // Fallback: Robust local normalization for Arabic
      return aiService.simpleNormalize(userAnswer) === aiService.simpleNormalize(correctAnswer) ? 100 : 0;
    }
  },

  /**
   * Local fallback to normalize Arabic strings for basic comparison
   */
  simpleNormalize: (str: string): string => {
    if (!str) return "";
    return str
      .replace(/[أإآ]/g, "ا")
      .replace(/ة/g, "ه")
      .replace(/ى/g, "ي")
      .replace(/[\u064B-\u0652]/g, "") // Remove Harakat (Tashkeel)
      .replace(/[^\u0621-\u064A\s]/g, "") // Keep only Arabic chars and spaces
      .replace(/\s+/g, "") // Remove all spaces
      .trim();
  }
};
