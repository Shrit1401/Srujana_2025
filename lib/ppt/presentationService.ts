import { Slide, ThemeSettings } from "./ppttypes";

interface SaveResponse {
  id: string;
  url: string;
  message: string;
}

interface LoadResponse {
  slides: Slide[];
  theme: ThemeSettings;
}

export const presentationService = {
  async savePresentation(
    slides: Slide[],
    theme: ThemeSettings
  ): Promise<SaveResponse> {
    const response = await fetch("/api/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slides, theme }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to save presentation");
    }

    return response.json();
  },

  async loadPresentation(id: string): Promise<LoadResponse> {
    const response = await fetch(`/api/save?id=${id}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to load presentation");
    }

    return response.json();
  },

  generateShareableUrl(id: string): string {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/?presentation=${id}`;
    }
    return "";
  },

  extractPresentationIdFromUrl(): string | null {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get("presentation");
    }
    return null;
  },
};
