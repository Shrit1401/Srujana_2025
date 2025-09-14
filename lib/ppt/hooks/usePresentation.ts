import { useState, useEffect } from "react";
import { Slide, ThemeSettings } from "../ppttypes";
import { presentationService } from "../presentationService";

export const usePresentation = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [shareableUrl, setShareableUrl] = useState<string | null>(null);

  const savePresentation = async (slides: Slide[], theme: ThemeSettings) => {
    setIsSaving(true);
    setSaveMessage(null);
    setShareableUrl(null);

    try {
      const result = await presentationService.savePresentation(slides, theme);
      setShareableUrl(result.url);
      setSaveMessage("Presentation saved successfully!");

      setTimeout(() => {
        setSaveMessage(null);
      }, 3000);
    } catch (error) {
      setSaveMessage(
        error instanceof Error ? error.message : "Failed to save presentation"
      );
      setTimeout(() => {
        setSaveMessage(null);
      }, 5000);
    } finally {
      setIsSaving(false);
    }
  };

  const loadPresentation = async (
    id: string
  ): Promise<{ slides: Slide[]; theme: ThemeSettings } | null> => {
    try {
      const result = await presentationService.loadPresentation(id);
      return result;
    } catch (error) {
      console.error("Failed to load presentation:", error);
      return null;
    }
  };

  const copyShareableUrl = async () => {
    if (shareableUrl && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareableUrl);
        setSaveMessage("Link copied to clipboard!");
        setTimeout(() => {
          setSaveMessage(null);
        }, 2000);
      } catch (error) {
        console.error("Failed to copy to clipboard:", error);
      }
    }
  };

  const getPresentationIdFromUrl = () => {
    return presentationService.extractPresentationIdFromUrl();
  };

  return {
    isSaving,
    saveMessage,
    shareableUrl,
    savePresentation,
    loadPresentation,
    copyShareableUrl,
    getPresentationIdFromUrl,
  };
};
