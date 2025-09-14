"use client";
import React from "react";
import { useLanguage } from "@/lib/language-context";
import { ExternalLink, Sparkles } from "lucide-react";

const SlidesPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="group relative bg-gradient-to-br from-card to-card/80 border border-border/50 rounded-3xl p-12 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 cursor-pointer overflow-hidden backdrop-blur-sm text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

          <div className="relative">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
            </div>

            <h1 className="text-4xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300 heading">
              {t("aiEasySlides")}
            </h1>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
              {t("createPresentations")}
            </p>

            <div className="space-y-4">
              <p className="text-sm text-muted-foreground/70 mb-6">
                Visit our AI-powered site builder to create stunning
                presentations with ease
              </p>

              <a
                href="/builder"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
              >
                <span>Visit AI Slide Builder</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="mt-8 w-0 group-hover:w-24 h-0.5 bg-gradient-to-r from-primary to-primary/50 transition-all duration-500 rounded-full mx-auto"></div>
          </div>

          <div className="absolute top-6 right-6 w-2 h-2 bg-primary/30 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100"></div>
          <div className="absolute bottom-6 left-6 w-1 h-1 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default SlidesPage;
