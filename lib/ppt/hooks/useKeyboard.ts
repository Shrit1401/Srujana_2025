import { useEffect } from "react";
import { SlideContent } from "../ppttypes";

interface UseKeyboardProps {
  nextSlide: () => void;
  prevSlide: () => void;
  setIsFullscreen: (value: boolean) => void;
  editingContent: SlideContent | null;
  removeTextElement: (id: string) => void;
  setEditingContent: (content: SlideContent | null) => void;
}

export const useKeyboard = ({
  nextSlide,
  prevSlide,
  setIsFullscreen,
  editingContent,
  removeTextElement,
  setEditingContent,
}: UseKeyboardProps) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "Escape") setIsFullscreen(false);
      if (e.key === "Delete" && editingContent) {
        removeTextElement(editingContent.id);
        setEditingContent(null);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [
    nextSlide,
    prevSlide,
    setIsFullscreen,
    editingContent,
    removeTextElement,
    setEditingContent,
  ]);
};
