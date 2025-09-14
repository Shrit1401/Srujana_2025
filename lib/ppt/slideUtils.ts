import PptxGenJS from "pptxgenjs";
import { Slide, SlideContent, ContentType } from "./ppttypes";
import { CONTENT_DEFAULTS, getContentDefaultsWithTheme } from "./pptconstants";

export const createNewContent = (
  type: ContentType,
  themeColors?: { primaryColor: string; textColor: string; accentColor: string }
): SlideContent => {
  const defaults = themeColors
    ? getContentDefaultsWithTheme(
        themeColors.primaryColor,
        themeColors.textColor,
        themeColors.accentColor
      )[type]
    : CONTENT_DEFAULTS[type];
  return {
    id: `${type}-${Date.now()}-${Math.random()}`,
    type,
    text: defaults.text,
    x: 50,
    y: defaults.y,
    fontSize: defaults.fontSize,
    color: defaults.color,
  };
};

export const createNewSlide = (
  maxId: number,
  themeColors?: { primaryColor: string; textColor: string; accentColor: string }
): Slide => {
  return {
    id: maxId + 1,
    title: "New Slide",
    subtitle: "Subtitle",
    content: [
      createNewContent("title", themeColors),
      createNewContent("subtitle", themeColors),
    ],
  };
};

export const exportToPPTX = async (slides: Slide[]): Promise<void> => {
  const pptx = new PptxGenJS();

  slides.forEach((slide) => {
    const slideObj = pptx.addSlide();
    slideObj.background = { fill: "000000" };

    slide.content.forEach((content) => {
      slideObj.addText(content.text, {
        x: content.x,
        y: content.y,
        w: "80%",
        h: "10%",
        fontSize: content.fontSize,
        color: content.color,
        align: "center",
        fontFace: "Arial",
      });
    });
  });

  await pptx.writeFile({ fileName: "presentation.pptx" });
};
