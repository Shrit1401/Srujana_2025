import { Heading1, Heading3, Heading6, Save } from "lucide-react";
import { ContentType } from "../../lib/ppt/ppttypes";
import {
  TitleIcon,
  SubtitleIcon,
  TextIcon,
  PlusIcon,
  TrashIcon,
} from "./Icons";

interface ToolbarProps {
  onAddTextElement: (type: ContentType) => void;
  onAddNewSlide: () => void;
  onDeleteSlide: () => void;
  canDeleteSlide: boolean;
  onSavePresentation: () => void;
  isSaving?: boolean;
}

export const Toolbar = ({
  onAddTextElement,
  onAddNewSlide,
  onDeleteSlide,
  canDeleteSlide,
  onSavePresentation,
  isSaving = false,
}: ToolbarProps) => {
  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-full px-4 py-3 border border-border">
      <button
        onClick={() => onAddTextElement("title")}
        className="p-2 hover:bg-accent rounded-full transition-colors cursor-pointer text-foreground"
        title="Add Title"
      >
        <Heading1 />
      </button>

      <button
        onClick={() => onAddTextElement("subtitle")}
        className="p-2 hover:bg-accent rounded-full transition-colors cursor-pointer text-foreground"
        title="Add Subtitle"
      >
        <Heading3 />
      </button>

      <button
        onClick={() => onAddTextElement("text")}
        className="p-2 hover:bg-accent rounded-full transition-colors cursor-pointer text-foreground"
        title="Add Text"
      >
        <Heading6 />
      </button>

      <div className="w-px h-6 bg-border mx-2"></div>

      <button
        onClick={onAddNewSlide}
        className="p-2 hover:bg-accent rounded-full transition-colors cursor-pointer text-foreground"
        title="Add Slide"
      >
        <PlusIcon />
      </button>

      <button
        onClick={onDeleteSlide}
        className="p-2 hover:bg-accent rounded-full transition-colors text-foreground"
        title="Delete Slide"
        disabled={!canDeleteSlide}
      >
        <TrashIcon />
      </button>

      <div className="w-px h-6 bg-border mx-2"></div>

      <button
        onClick={onSavePresentation}
        disabled={isSaving}
        className="p-2 hover:bg-accent rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-foreground"
        title="Save & Share Presentation"
      >
        <Save className="w-4 h-4" />
      </button>
    </div>
  );
};
