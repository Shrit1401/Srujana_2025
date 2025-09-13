"use client";
import React from "react";
import { useLanguage } from "@/lib/language-context";

const SlidesPage = () => {
  const { t } = useLanguage();
  return <div>{t("aiEasySlides")}</div>;
};

export default SlidesPage;
