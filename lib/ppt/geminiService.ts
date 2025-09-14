import { GoogleGenerativeAI } from "@google/generative-ai";
import { Slide, SlideContent, ThemeSettings } from "./ppttypes";
import { validateContentPosition } from "./pptconstants";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  slideData?: {
    slides: Slide[];
    theme: ThemeSettings;
  };
}

export interface SlideGenerationRequest {
  prompt: string;
  currentTheme: ThemeSettings;
  existingSlides: Slide[];
  slideCount?: number;
}

export class GeminiService {
  private model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  async generateSlides(request: SlideGenerationRequest): Promise<{
    slides: Slide[];
    theme: ThemeSettings;
    response: string;
  }> {
    const { prompt, currentTheme, existingSlides, slideCount = 5 } = request;
    console.log("GeminiService generating slides with count:", slideCount);

    const systemPrompt = `You are an AI teaching assistant that helps educators create engaging lesson presentations. You should:

1. Analyze the teacher's request and create educational slides appropriate for classroom use
2. Use the existing theme settings when possible
3. Generate slides with proper content structure and excellent visibility
4. Focus on educational content that promotes learning and student engagement
5. Create ${slideCount} slides total
6. Return a JSON response with the slide data

Current theme settings:
- Background: ${currentTheme.backgroundColor}
- Primary text color (H6/Text): ${currentTheme.textColor}
- Accent color (H3/Subtitles): ${currentTheme.accentColor}
- Secondary color: ${currentTheme.secondaryColor || "#1e40af"}
- Gradient type: ${currentTheme.gradientType}
- Gradient direction: ${currentTheme.gradientDirection || "to bottom right"}

Existing slides: ${existingSlides.length} slides

Please create slides based on the user's request. Return your response in this exact JSON format:
{
  "slides": [
    {
      "id": 1,
      "title": "Slide Title",
      "subtitle": "Slide Subtitle",
      "content": [
        {
          "id": "unique-id-1",
          "type": "title",
          "text": "Main Title",
          "x": 50,
          "y": 25,
          "fontSize": 48,
          "color": "${currentTheme.textColor}"
        },
        {
          "id": "unique-id-2",
          "type": "subtitle",
          "text": "Subtitle Text",
          "x": 50,
          "y": 45,
          "fontSize": 24,
          "color": "${currentTheme.accentColor}"
        },
        {
          "id": "unique-id-3",
          "type": "text",
          "text": "Body text content",
          "x": 50,
          "y": 65,
          "fontSize": 18,
          "color": "${currentTheme.textColor}"
        }
      ]
    }
  ],
  "theme": {
    "primaryColor": "${currentTheme.textColor}",
    "backgroundColor": "${currentTheme.backgroundColor}",
    "textColor": "${currentTheme.textColor}",
    "accentColor": "${currentTheme.accentColor}",
    "gradientType": "${currentTheme.gradientType}",
    "gradientDirection": "${
      currentTheme.gradientDirection || "to bottom right"
    }",
    "secondaryColor": "${currentTheme.secondaryColor || "#1e40af"}"
  },
  "response": "Your explanation of what you created"
}

CRITICAL POSITIONING GUIDELINES FOR VISIBILITY:
- x: 50 = center horizontally (always use 50 for centered content)
- y: 15-25 = top area (titles only)
- y: 35-45 = upper-middle (subtitles)
- y: 55-75 = middle area (body text)
- y: 80-90 = bottom area (call-to-action or final points)

SPACING RULES:
- Each content item needs at least 15% vertical spacing
- Never place content at y: 0-10 or y: 90-100 (too close to edges)
- Maximum 3-4 content items per slide for readability
- Use consistent spacing: title at y:25, subtitle at y:45, text at y:65

FONT SIZE GUIDELINES:
- title: 48px (main headings) - use sparingly, max 1 per slide
- subtitle: 24px (section headings) - max 1 per slide
- text: 18px (body content) - can have multiple but space them properly

CONTENT STRUCTURE RULES FOR TEACHERS:
- Keep text concise and scannable for students
- Use bullet points or short phrases for body text
- Avoid long paragraphs that overwhelm students
- Make titles clear and educational
- Include learning objectives, key concepts, examples, and summaries
- Use age-appropriate language and concepts
- Ensure each slide has a clear educational purpose

EDUCATIONAL SLIDE TYPES TO INCLUDE:
- Title slide with lesson topic
- Learning objectives or goals
- Key concepts and definitions
- Examples and illustrations
- Practice problems or activities
- Summary and review
- Next steps or homework

COLOR CONTRAST RULES:
- Always use the provided theme colors
- title: use textColor (${currentTheme.textColor})
- subtitle: use accentColor (${currentTheme.accentColor})
- text: use textColor (${currentTheme.textColor})

Create exactly ${slideCount} educational slides that are engaging, informative, and suitable for classroom teaching. Focus on clarity, visual hierarchy, and student learning.`;

    try {
      const result = await this.model.generateContent(
        systemPrompt + "\n\nUser request: " + prompt
      );
      const response = await result.response;
      const text = response.text();

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No valid JSON found in response");
      }

      const parsedData = JSON.parse(jsonMatch[0]);

      // Validate and fix content positioning
      const validatedSlides = (parsedData.slides || []).map((slide: Slide) => ({
        ...slide,
        content: slide.content.map((content: SlideContent) =>
          validateContentPosition(content)
        ),
      }));

      return {
        slides: validatedSlides,
        theme: parsedData.theme || currentTheme,
        response: parsedData.response || "Slides generated successfully!",
      };
    } catch (error) {
      console.error("Error generating slides:", error);
      throw new Error("Failed to generate slides. Please try again.");
    }
  }

  async generateResponse(
    message: string,
    context: string = ""
  ): Promise<string> {
    const prompt = `You are a helpful AI teaching assistant for an educational presentation tool. ${context}

Teacher message: ${message}

Provide a helpful response focused on education and teaching. If the teacher wants to create slides, suggest they be more specific about the subject, grade level, and learning objectives. Offer educational tips and best practices for creating engaging lesson presentations.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Error generating response:", error);
      return "I apologize, but I encountered an error. Please try again.";
    }
  }
}

export const geminiService = new GeminiService();
