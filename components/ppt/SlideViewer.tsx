import {
  Slide,
  SlideContent as SlideContentType,
  ThemeSettings,
} from "../../lib/ppt/ppttypes";
import { SlideContent } from "./SlideContent";

interface SlideViewerProps {
  slides: Slide[];
  selectedSlide: number;
  editingContent: SlideContentType | null;
  onStartEdit: (content: SlideContentType) => void;
  onUpdateContent: (id: string, updates: Partial<SlideContentType>) => void;
  onRemoveContent: (id: string) => void;
  onStopEdit: () => void;
  theme: ThemeSettings;
}

export const SlideViewer = ({
  slides,
  selectedSlide,
  editingContent,
  onStartEdit,
  onUpdateContent,
  onRemoveContent,
  onStopEdit,
  theme,
}: SlideViewerProps) => {
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
    <div className="flex-1 bg-background relative">
      {slides.map((slide) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            selectedSlide === slide.id ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative h-full" style={getSlideBackgroundStyle()}>
            <div className="absolute inset-0">
              {slide.content.length > 0 ? (
                slide.content
                  .sort((a, b) => a.y - b.y)
                  .map((content) => (
                    <div
                      key={content.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${content.x}%`,
                        top: `${content.y}%`,
                        minWidth: "200px",
                        maxWidth: "80%",
                        textAlign: "center",
                      }}
                    >
                      <SlideContent
                        content={content}
                        isEditing={editingContent?.id === content.id}
                        onStartEdit={onStartEdit}
                        onUpdate={onUpdateContent}
                        onRemove={onRemoveContent}
                        onStopEdit={onStopEdit}
                      />
                    </div>
                  ))
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-muted-foreground text-lg">
                    Click the toolbar below to add content
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
