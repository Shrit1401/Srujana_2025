import { NextRequest, NextResponse } from "next/server";
import { geminiService } from "../../../lib/ppt/geminiService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, prompt, currentTheme, existingSlides, slideCount } = body;

    if (type === "generateSlides") {
      console.log("API received slideCount:", slideCount);
      const result = await geminiService.generateSlides({
        prompt,
        currentTheme,
        existingSlides,
        slideCount: slideCount || 5,
      });

      return NextResponse.json(result);
    } else if (type === "chat") {
      const response = await geminiService.generateResponse(prompt);
      return NextResponse.json({ response });
    }

    return NextResponse.json(
      { error: "Invalid request type" },
      { status: 400 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
