import { useState } from "react";
import { Slide, SlideContent, ContentType } from "../ppttypes";
import { initialSlides } from "../pptconstants";
import { createNewContent, createNewSlide } from "../slideUtils";

export const useSlides = (themeColors?: {
  primaryColor: string;
  textColor: string;
  accentColor: string;
}) => {
  const [slides, setSlides] = useState<Slide[]>(initialSlides);
  const [selectedSlide, setSelectedSlide] = useState(1);

  const currentSlide = slides.find((slide) => slide.id === selectedSlide);

  const nextSlide = () => {
    setSelectedSlide((prev) => (prev < slides.length ? prev + 1 : 1));
  };

  const prevSlide = () => {
    setSelectedSlide((prev) => (prev > 1 ? prev - 1 : slides.length));
  };

  const addTextElement = (type: ContentType) => {
    const newContent = createNewContent(type, themeColors);
    setSlides((prev) =>
      prev.map((slide) =>
        slide.id === selectedSlide
          ? { ...slide, content: [...slide.content, newContent] }
          : slide
      )
    );
  };

  const removeTextElement = (contentId: string) => {
    setSlides((prev) =>
      prev.map((slide) =>
        slide.id === selectedSlide
          ? {
              ...slide,
              content: slide.content.filter((c) => c.id !== contentId),
            }
          : slide
      )
    );
  };

  const updateTextElement = (
    contentId: string,
    updates: Partial<SlideContent>
  ) => {
    setSlides((prev) =>
      prev.map((slide) =>
        slide.id === selectedSlide
          ? {
              ...slide,
              content: slide.content.map((c) =>
                c.id === contentId ? { ...c, ...updates } : c
              ),
            }
          : slide
      )
    );
  };

  const addNewSlide = () => {
    const maxId = Math.max(...slides.map((slide) => slide.id), 0);
    const newSlide = createNewSlide(maxId, themeColors);
    setSlides((prev) => [...prev, newSlide]);
    setSelectedSlide(newSlide.id);
  };

  const deleteSlide = () => {
    if (slides.length > 1) {
      setSlides((prev) => prev.filter((slide) => slide.id !== selectedSlide));
      setSelectedSlide((prev) => (prev > 1 ? prev - 1 : 1));
    }
  };

  return {
    slides,
    selectedSlide,
    currentSlide,
    setSelectedSlide,
    setSlides,
    nextSlide,
    prevSlide,
    addTextElement,
    removeTextElement,
    updateTextElement,
    addNewSlide,
    deleteSlide,
  };
};
