import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FullscreenIcon,
  SettingsIcon,
  ChatIcon,
} from "./Icons";

interface ControlButtonsProps {
  onPrevSlide: () => void;
  onNextSlide: () => void;
  onToggleFullscreen: () => void;
  onToggleSettings: () => void;
  onToggleChatbot: () => void;
  rightSidebar: "settings" | "chatbot" | null;
}

export const ControlButtons = ({
  onPrevSlide,
  onNextSlide,
  onToggleFullscreen,
  onToggleSettings,
  onToggleChatbot,
  rightSidebar,
}: ControlButtonsProps) => {
  const hasRightSidebar = rightSidebar !== null;

  return (
    <div
      className={`absolute top-6 flex items-center gap-2 ${
        hasRightSidebar ? "right-96" : "right-6"
      }`}
    >
      <button
        onClick={onPrevSlide}
        className="p-2 hover:bg-accent rounded-full transition-colors text-foreground"
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </button>
      <button
        onClick={onNextSlide}
        className="p-2 hover:bg-accent rounded-full transition-colors text-foreground"
      >
        <ChevronRightIcon className="w-5 h-5" />
      </button>
      <button
        onClick={onToggleFullscreen}
        className="p-2 hover:bg-accent rounded-full transition-colors text-foreground"
      >
        <FullscreenIcon />
      </button>
      <div className="w-px h-6 bg-border mx-1"></div>
      <button
        onClick={onToggleSettings}
        className={`p-2 rounded-full transition-colors ${
          rightSidebar === "settings"
            ? "bg-primary/20 text-primary"
            : "hover:bg-accent text-muted-foreground"
        }`}
        title="Settings"
      >
        <SettingsIcon className="w-5 h-5" />
      </button>
      <button
        onClick={onToggleChatbot}
        className={`p-2 rounded-full transition-colors ${
          rightSidebar === "chatbot"
            ? "bg-primary/20 text-primary"
            : "hover:bg-accent text-muted-foreground"
        }`}
        title="AI Assistant"
      >
        <ChatIcon className="w-5 h-5" />
      </button>
    </div>
  );
};
