"use server";

import OpenAI from "openai";

const client = new OpenAI();

export async function generateWorksheet(formData: FormData) {
  try {
    const file = formData.get("file") as File;

    if (!file) {
      throw new Error("No file provided");
    }

    const buffer = await file.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");

    const response = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: 'Create an educational worksheet based on this image. Format the response as proper markdown with ONLY the following structure:\n\n# Worksheet Title\n\n## Instructions\nBrief instructions for students\n\n## Questions\n1. Question 1?\n   Answer: __________ (Correct Answer)\n\n2. Question 2?\n   Answer: __________ (Correct Answer)\n\n3. Question 3?\n   Answer: __________ (Correct Answer)\n\nGenerate at least 10 relevant questions based on the content in the image. Each question should:\n- Be numbered sequentially (1, 2, 3, etc.)\n- End with a question mark\n- Have a blank line for the answer with "Answer: __________"\n- Include the correct answer in parentheses after the blank line\n- Be properly aligned and formatted\n\nUse proper markdown formatting with headers and numbered lists. Ensure all questions are well-aligned and easy to read.',
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${file.type};base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 2000,
    });

    return {
      success: true,
      worksheet:
        response.choices[0]?.message?.content || "No worksheet generated",
    };
  } catch (error) {
    console.error("Error generating worksheet:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to generate worksheet",
    };
  }
}
