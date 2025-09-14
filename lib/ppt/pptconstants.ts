import { Slide } from "./ppttypes";

export const initialSlides: Slide[] = [
  {
    id: 1,
    title: "New Presentation",
    subtitle: "Click to edit",
    content: [],
  },
];

export const CONTENT_DEFAULTS = {
  title: {
    text: "New Title",
    y: 25,
    fontSize: 48,
    color: "#000000",
  },
  subtitle: {
    text: "New Subtitle",
    y: 45,
    fontSize: 24,
    color: "#333333",
  },
  text: {
    text: "New Text",
    y: 65,
    fontSize: 18,
    color: "#3e3e3e",
  },
} as const;

export const getContentDefaultsWithTheme = (
  primaryColor: string,
  textColor: string,
  accentColor: string
) => ({
  title: {
    text: "New Title",
    y: 25,
    fontSize: 48,
    color: textColor, // H1 Color (Titles)
  },
  subtitle: {
    text: "New Subtitle",
    y: 45,
    fontSize: 24,
    color: accentColor, // H3 Color (Subtitles)
  },
  text: {
    text: "New Text",
    y: 65,
    fontSize: 18,
    color: primaryColor, // H6 Color (Text)
  },
});

export const validateContentPosition = (content: any) => {
  const validatedContent = { ...content };

  // Ensure x is between 10 and 90 (with some margin from edges)
  validatedContent.x = Math.max(10, Math.min(90, content.x || 50));

  // Ensure y is between 15 and 85 (with proper margins)
  validatedContent.y = Math.max(15, Math.min(85, content.y || 50));

  // Ensure fontSize is reasonable
  validatedContent.fontSize = Math.max(
    12,
    Math.min(72, content.fontSize || 18)
  );

  return validatedContent;
};
