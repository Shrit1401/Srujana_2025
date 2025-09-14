import { useState, useEffect } from "react";
import { ThemeSettings, Slide } from "../ppttypes";

const DEFAULT_THEME: ThemeSettings = {
  primaryColor: "#3b82f6",
  backgroundColor: "#ffffff",
  textColor: "#000000",
  accentColor: "#6b7280",
  gradientType: "solid",
  gradientDirection: "to bottom right",
  secondaryColor: "#1e40af",
};

export const useSlideThemes = (slides: Slide[], selectedSlide: number) => {
  const [slideThemes, setSlideThemes] = useState<Record<number, ThemeSettings>>(
    {}
  );

  useEffect(() => {
    const savedThemes = localStorage.getItem("slide-themes");
    if (savedThemes) {
      try {
        const parsed = JSON.parse(savedThemes);
        setSlideThemes(parsed);
      } catch (error) {
        console.error("Failed to parse saved slide themes:", error);
      }
    }
  }, []);

  const getCurrentSlideTheme = (): ThemeSettings => {
    return slideThemes[selectedSlide] || DEFAULT_THEME;
  };

  const updateCurrentSlideTheme = (themeUpdates: Partial<ThemeSettings>) => {
    const currentTheme = getCurrentSlideTheme();
    const updatedTheme = { ...currentTheme, ...themeUpdates };

    const newSlideThemes = {
      ...slideThemes,
      [selectedSlide]: updatedTheme,
    };

    setSlideThemes(newSlideThemes);
    localStorage.setItem("slide-themes", JSON.stringify(newSlideThemes));
  };

  const resetCurrentSlideTheme = () => {
    const newSlideThemes = {
      ...slideThemes,
      [selectedSlide]: DEFAULT_THEME,
    };

    setSlideThemes(newSlideThemes);
    localStorage.setItem("slide-themes", JSON.stringify(newSlideThemes));
  };

  const getSlideWithTheme = (slide: Slide): Slide => {
    const theme = slideThemes[slide.id] || DEFAULT_THEME;
    return { ...slide, theme };
  };

  return {
    currentSlideTheme: getCurrentSlideTheme(),
    updateCurrentSlideTheme,
    resetCurrentSlideTheme,
    getSlideWithTheme,
  };
};
