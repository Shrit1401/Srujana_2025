import { Slide } from "../../lib/ppt/ppttypes";

interface SidebarProps {
  slides: Slide[];
  selectedSlide: number;
  onSlideSelect: (id: number) => void;
}

export const Sidebar = ({
  slides,
  selectedSlide,
  onSlideSelect,
}: SidebarProps) => {
  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border p-4">
      <div className="mb-6">
        <h2 className="text-sm font-medium text-sidebar-foreground mb-4">
          Slides
        </h2>
        <div className="space-y-1 overflow-y-auto max-h-[calc(100vh-50px)]">
          {slides.map((slide) => (
            <button
              key={slide.id}
              onClick={() => onSlideSelect(slide.id)}
              className={`w-full text-left p-3 rounded-lg transition-all ${
                selectedSlide === slide.id
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              <div className="text-xs text-muted-foreground mb-1">
                Slide {slide.id}
              </div>
              <div className="text-sm font-medium">{slide.title}</div>
              <div className="text-xs text-muted-foreground">
                {slide.subtitle}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
