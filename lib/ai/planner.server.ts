"use server";

import OpenAI from "openai";

const client = new OpenAI();

export interface WeeklyPlan {
  days: {
    day: string;
    topics: string[];
    homework: string;
  }[];
}

export async function generateWeeklyPlan(
  syllabus: string,
  teachingDays: number,
  holidays: string = ""
) {
  try {
    if (!syllabus.trim()) {
      throw new Error("Syllabus content is required");
    }

    if (!teachingDays || teachingDays < 1 || teachingDays > 7) {
      throw new Error("Teaching days must be between 1 and 7");
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: `Create a detailed weekly teaching plan based on the following information:

Syllabus/Topics: ${syllabus}
Number of teaching days: ${teachingDays}
Holidays: ${holidays || "None specified"}

Please generate a structured weekly plan with the following format:

Return ONLY a valid JSON object with this exact structure:
{
  "days": [
    {
      "day": "Monday",
      "topics": ["Topic 1", "Topic 2"],
      "homework": "Complete exercises 1-5 from textbook page 25"
    }
  ]
}

Guidelines:
- Create exactly ${teachingDays} teaching days
- Skip holidays if mentioned (${holidays})
- Distribute syllabus topics evenly across teaching days
- For each day, list 2-3 main topics to cover
- Provide specific homework assignment for each day
- Make homework age-appropriate for primary students
- Ensure topics are logically sequenced
- Keep homework simple and clear

Return ONLY the JSON object, no additional text.`,
        },
      ],
      max_tokens: 3000,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No plan generated");
    }

    try {
      let jsonContent = content.trim();

      if (jsonContent.startsWith("```json")) {
        jsonContent = jsonContent
          .replace(/^```json\s*/, "")
          .replace(/\s*```$/, "");
      } else if (jsonContent.startsWith("```")) {
        jsonContent = jsonContent.replace(/^```\s*/, "").replace(/\s*```$/, "");
      }

      const plan = JSON.parse(jsonContent) as WeeklyPlan;
      return {
        success: true,
        plan,
      };
    } catch (parseError) {
      console.error("Error parsing plan JSON:", parseError);
      console.error("Raw content:", content);
      throw new Error("Failed to parse generated plan");
    }
  } catch (error) {
    console.error("Error generating weekly plan:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to generate plan",
    };
  }
}
