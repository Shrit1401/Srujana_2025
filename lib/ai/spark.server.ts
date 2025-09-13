"use server";

import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
const model = "gemini-1.5-flash";

export async function streamSpark(
  message: string,
  language: string,
  name: string
) {
  try {
    if (!message || message.trim().length === 0) {
      return [
        {
          success: false,
          message:
            "Please provide a valid message to get help with your teaching needs.",
          isStreaming: false,
        },
      ];
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not configured");
      return [
        {
          success: false,
          message:
            "AI service is currently unavailable. Please try again later.",
          isStreaming: false,
        },
      ];
    }

    const stream = await ai.models.generateContentStream({
      model: model,
      contents: `
      You are an AI teaching assistant called "Class Sparks" designed to help educators create engaging and interactive learning experiences. 

      Your role is to:
      - Suggest different activities, stories, riddles, and other ways to spark curiosity in students, tailored to the teacher's own language
      - If the teacher specifically asks about sparking curiosity, focus on giving them simple activities they can use directly with kids to help create engaging moments
      - Suggest interactive activities and experiments
      - Help with classroom management strategies
      - Offer innovative approaches to make learning fun
      - Support teachers in sparking curiosity in their students

      Teacher's name: ${name}
      Preferred language: ${language}

      User message: ${message}

      
      Please provide a helpful, engaging, and practical response that will assist the teacher in their classroom. Keep your response conversational, encouraging, and focused on actionable teaching strategies.
      `,
    });

    let fullResponse = "";
    const chunks: Array<{
      success: boolean;
      message: string;
      isStreaming: boolean;
    }> = [];

    for await (const chunk of stream) {
      if (chunk.text) {
        fullResponse += chunk.text;
        chunks.push({
          success: true,
          message: chunk.text,
          isStreaming: true,
        });
      }
    }

    return chunks;
  } catch (error) {
    console.error("Error generating streaming AI response:", error);

    let errorMessage =
      "I'm sorry, I'm having trouble processing your request right now. Please try again in a moment.";

    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        errorMessage =
          "AI service authentication failed. Please contact support.";
      } else if (
        error.message.includes("quota") ||
        error.message.includes("limit")
      ) {
        errorMessage =
          "AI service is temporarily unavailable due to high usage. Please try again in a few minutes.";
      } else if (
        error.message.includes("network") ||
        error.message.includes("timeout")
      ) {
        errorMessage =
          "Network connection issue. Please check your internet connection and try again.";
      }
    }

    return [
      {
        success: false,
        message: errorMessage,
        isStreaming: false,
      },
    ];
  }
}
