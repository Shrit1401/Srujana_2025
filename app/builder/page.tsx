"use client";

import { useState, useEffect } from "react";
import { SlideContent } from "../../lib/ppt/ppttypes";
import { useSlides } from "../../lib/ppt/hooks/useSlides";
import { useKeyboard } from "../../lib/ppt/hooks/useKeyboard";
import { useSettings } from "../../lib/ppt/hooks/useSettings";
import { useSlideThemes } from "../../lib/ppt/hooks/useSlideThemes";
import { usePresentation } from "../../lib/ppt/hooks/usePresentation";
import { createNewContent } from "../../lib/ppt/slideUtils";
import { Sidebar } from "../../components/ppt/Sidebar";
import { SlideViewer } from "../../components/ppt/SlideViewer";
import { Toolbar } from "../../components/ppt/Toolbar";
import { ControlButtons } from "../../components/ppt/ControlButtons";
import { FullscreenViewer } from "../../components/ppt/FullscreenViewer";
import { SettingsSidebar } from "../../components/ppt/SettingsSidebar";
import { ChatbotSidebar } from "../../components/ppt/ChatbotSidebar";

export default function SlideBuilder() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [editingContent, setEditingContent] = useState<SlideContent | null>(
    null
  );
  const [showToolbar, setShowToolbar] = useState(true);
  const [rightSidebar, setRightSidebar] = useState<
    "settings" | "chatbot" | null
  >("settings");

  const { settings, updateTheme, toggleSettings, resetTheme } = useSettings();
  const {
    isSaving,
    saveMessage,
    shareableUrl,
    savePresentation,
    loadPresentation,
    copyShareableUrl,
    getPresentationIdFromUrl,
  } = usePresentation();

  const {
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
  } = useSlides();

  const {
    currentSlideTheme,
    updateCurrentSlideTheme,
    resetCurrentSlideTheme,
    getSlideWithTheme,
  } = useSlideThemes(slides, selectedSlide);

  useKeyboard({
    nextSlide,
    prevSlide,
    setIsFullscreen,
    editingContent,
    removeTextElement,
    setEditingContent,
  });

  useEffect(() => {
    const presentationId = getPresentationIdFromUrl();
    if (presentationId) {
      loadPresentation(presentationId).then((data) => {
        if (data) {
          setSlides(data.slides);
          updateTheme(data.theme);
          setSelectedSlide(1);
        }
      });
    }
  }, []);

  const handleSavePresentation = () => {
    savePresentation(slides, settings.theme);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (isFullscreen) {
    return (
      <FullscreenViewer
        slides={slides.map(getSlideWithTheme)}
        selectedSlide={selectedSlide}
        onPrevSlide={prevSlide}
        onNextSlide={nextSlide}
        onToggleFullscreen={toggleFullscreen}
        theme={currentSlideTheme}
      />
    );
  }

  return (
    <div className="h-screen bg-white text-black flex">
      <Sidebar
        slides={slides}
        selectedSlide={selectedSlide}
        onSlideSelect={setSelectedSlide}
      />

      <div className="flex-1 flex">
        <SlideViewer
          slides={slides.map(getSlideWithTheme)}
          selectedSlide={selectedSlide}
          editingContent={editingContent}
          onStartEdit={setEditingContent}
          onUpdateContent={updateTextElement}
          onRemoveContent={removeTextElement}
          onStopEdit={() => setEditingContent(null)}
          theme={currentSlideTheme}
        />

        {rightSidebar === "settings" && (
          <SettingsSidebar
            theme={currentSlideTheme}
            onUpdateTheme={updateCurrentSlideTheme}
            onResetTheme={resetCurrentSlideTheme}
            onClose={() => setRightSidebar(null)}
          />
        )}
        {rightSidebar === "chatbot" && (
          <ChatbotSidebar
            onClose={() => setRightSidebar(null)}
            currentTheme={currentSlideTheme}
            existingSlides={slides}
            onSlidesGenerated={(newSlides, newTheme) => {
              setSlides(newSlides);
              updateTheme(newTheme);
              setSelectedSlide(1);
            }}
          />
        )}
      </div>

      <ControlButtons
        onPrevSlide={prevSlide}
        onNextSlide={nextSlide}
        onToggleFullscreen={toggleFullscreen}
        onToggleSettings={() =>
          setRightSidebar(rightSidebar === "settings" ? null : "settings")
        }
        onToggleChatbot={() =>
          setRightSidebar(rightSidebar === "chatbot" ? null : "chatbot")
        }
        rightSidebar={rightSidebar}
      />

      <div className="absolute bottom-6 left-6 text-sm text-muted-foreground">
        {selectedSlide} / {slides.length}
      </div>

      {saveMessage && (
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-card/90 backdrop-blur-sm rounded-lg px-4 py-3 border border-border max-w-md">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-card-foreground">{saveMessage}</span>
            {shareableUrl && (
              <button
                onClick={copyShareableUrl}
                className="text-xs bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-1 rounded transition-colors"
              >
                Copy Link
              </button>
            )}
          </div>
        </div>
      )}

      {showToolbar && (
        <Toolbar
          onAddTextElement={(type) => {
            // Create new content with current slide theme
            const newContent = createNewContent(type, {
              primaryColor: currentSlideTheme.primaryColor,
              textColor: currentSlideTheme.textColor,
              accentColor: currentSlideTheme.accentColor,
            });
            // Add the content to the current slide
            setSlides((prev) =>
              prev.map((slide) =>
                slide.id === selectedSlide
                  ? { ...slide, content: [...slide.content, newContent] }
                  : slide
              )
            );
          }}
          onAddNewSlide={addNewSlide}
          onDeleteSlide={deleteSlide}
          canDeleteSlide={slides.length > 1}
          onSavePresentation={handleSavePresentation}
          isSaving={isSaving}
        />
      )}
    </div>
  );
}
