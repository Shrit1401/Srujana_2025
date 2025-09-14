import { useState, useEffect } from "react";
import { ThemeSettings, AppSettings } from "../ppttypes";

const DEFAULT_THEME: ThemeSettings = {
  primaryColor: "#3b82f6",
  backgroundColor: "#ffffff",
  textColor: "#000000",
  accentColor: "#6b7280",
  gradientType: "solid",
  gradientDirection: "to bottom right",
  secondaryColor: "#1e40af",
};

const DEFAULT_SETTINGS: AppSettings = {
  theme: DEFAULT_THEME,
  showSettings: false,
};

export const useSettings = () => {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const savedSettings = localStorage.getItem("app-settings");
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
      } catch (error) {
        console.error("Failed to parse saved settings:", error);
      }
    }
  }, []);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem("app-settings", JSON.stringify(updated));
  };

  const updateTheme = (themeUpdates: Partial<ThemeSettings>) => {
    const updatedTheme = { ...settings.theme, ...themeUpdates };
    updateSettings({ theme: updatedTheme });
  };

  const toggleSettings = () => {
    updateSettings({ showSettings: !settings.showSettings });
  };

  const resetTheme = () => {
    updateSettings({ theme: DEFAULT_THEME });
  };

  return {
    settings,
    updateSettings,
    updateTheme,
    toggleSettings,
    resetTheme,
  };
};
