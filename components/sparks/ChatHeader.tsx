"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

const ChatHeader = () => {
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-3 p-4 border-b bg-card flex-shrink-0">
      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
        <Sparkles className="w-4 h-4 text-primary" />
      </div>
      <div>
        <h1 className="text-lg font-bold text-primary">{t("classSparks")}</h1>
        <p className="text-xs text-muted-foreground">
          {t("makeClassMoreClasssy")}
        </p>
      </div>
    </div>
  );
};

export default ChatHeader;
