"use server";

import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
const model = "gemini-1.5-flash";

export const sendSpark = async (message: string) => {
  try {
    if (!message || message.trim().length === 0) {
      return {
        success: false,
        message:
          "Please provide a valid message to get help with your teaching needs.",
      };
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not configured");
      return {
        success: false,
        message: "AI service is currently unavailable. Please try again later.",
      };
    }

    const response = await ai.models.generateContent({
      model: model,
      contents: `
      You are an AI teaching assistant called "Class Sparks" designed to help educators create engaging and interactive learning experiences. 

Your role is to:
- Provide creative teaching ideas and lesson plans
- Suggest interactive activities and experiments
- Help with classroom management strategies
- Offer innovative approaches to make learning fun
- Support teachers in sparking curiosity in their students

User message: ${message}

Please provide a helpful, engaging, and practical response that will assist the teacher in their classroom. Keep your response conversational, encouraging, and focused on actionable teaching strategies.
      `,
    });

    if (!response || !response.text) {
      return {
        success: false,
        message:
          "I received an empty response. Could you please rephrase your question?",
      };
    }

    return {
      success: true,
      message: response.text,
    };
  } catch (error) {
    console.error("Error generating AI response:", error);

    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        return {
          success: false,
          message: "AI service authentication failed. Please contact support.",
        };
      }
      if (error.message.includes("quota") || error.message.includes("limit")) {
        return {
          success: false,
          message:
            "AI service is temporarily unavailable due to high usage. Please try again in a few minutes.",
        };
      }
      if (
        error.message.includes("network") ||
        error.message.includes("timeout")
      ) {
        return {
          success: false,
          message:
            "Network connection issue. Please check your internet connection and try again.",
        };
      }
    }

    return {
      success: false,
      message:
        "I'm sorry, I'm having trouble processing your request right now. Please try again in a moment.",
    };
  }
};
