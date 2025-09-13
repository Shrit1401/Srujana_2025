"use client";
import React from "react";
import { useLanguage } from "@/lib/language-context";

const TranslationNote: React.FC = () => {
  const { currentLanguage, t } = useLanguage();

  if (currentLanguage === "en") {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <p className="text-xs text-black font-medium">{t("translationNote")}</p>
    </div>
  );
};

export default TranslationNote;
