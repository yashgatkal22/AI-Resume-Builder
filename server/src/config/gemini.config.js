import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL_NAME = "gemini-3.5-flash-lite";

const generateContent = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    const message = error.message || 'Unknown Gemini API error';
    const statusCode = Number(error.status)
      || (/\b429\b|RESOURCE_EXHAUSTED/i.test(message) ? 429 : undefined);
    const apiError = new Error(`Gemini API failed: ${message}`, { cause: error });
    if (statusCode) apiError.statusCode = statusCode;
    throw apiError;
  }
};

export { ai, MODEL_NAME, generateContent };