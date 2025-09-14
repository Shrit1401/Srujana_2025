import { Slide, ThemeSettings } from "../../lib/ppt/ppttypes";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "./Icons";

interface FullscreenViewerProps {
  slides: Slide[];
  selectedSlide: number;
  onPrevSlide: () => void;
  onNextSlide: () => void;
  onToggleFullscreen: () => void;
  theme: ThemeSettings;
}

export const FullscreenViewer = ({
  slides,
  selectedSlide,
  onPrevSlide,
  onNextSlide,
  onToggleFullscreen,
  theme,
}: FullscreenViewerProps) => {
  const getSlideBackgroundStyle = () => {
    switch (theme.gradientType) {
      case "linear":
        return {
          background: `linear-gradient(${
            theme.gradientDirection || "to bottom right"
          }, ${theme.backgroundColor}, ${
            theme.secondaryColor || theme.primaryColor
          })`,
        };
      case "radial":
        return {
          background: `radial-gradient(circle, ${theme.backgroundColor}, ${
            theme.secondaryColor || theme.primaryColor
          })`,
        };
      default:
        return {
          backgroundColor: theme.backgroundColor,
        };
    }
  };

  return (
    <div className="h-screen bg-background text-foreground relative">
      {slides.map((slide) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            selectedSlide === slide.id ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative h-full" style={getSlideBackgroundStyle()}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                {slide.content.length > 0 ? (
                  slide.content.map((content) => (
                    <div
                      key={content.id}
                      className="mb-4"
                      style={{
                        fontSize: `${content.fontSize * 0.8}px`,
                        color: content.color,
                      }}
                    >
                      {content.text}
                    </div>
                  ))
                ) : (
                  <div className="text-muted-foreground text-lg">
                    Click the toolbar below to add content
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-card/50 backdrop-blur-sm rounded-full px-6 py-3">
        <button
          onClick={onPrevSlide}
          className="p-2 hover:bg-accent rounded-full transition-colors text-foreground"
        >
          <ChevronLeftIcon />
        </button>
        <span className="text-sm text-muted-foreground px-4">
          {selectedSlide} / {slides.length}
        </span>
        <button
          onClick={onNextSlide}
          className="p-2 hover:bg-accent rounded-full transition-colors text-foreground"
        >
          <ChevronRightIcon />
        </button>
      </div>

      <button
        onClick={onToggleFullscreen}
        className="absolute top-6 right-6 p-2 hover:bg-accent rounded-full transition-colors text-foreground"
      >
        <CloseIcon />
      </button>
    </div>
  );
};
