import { SlideContent as SlideContentType } from "../../lib/ppt/ppttypes";

interface SlideContentProps {
  content: SlideContentType;
  isEditing: boolean;
  onStartEdit: (content: SlideContentType) => void;
  onUpdate: (id: string, updates: Partial<SlideContentType>) => void;
  onRemove: (id: string) => void;
  onStopEdit: () => void;
}

export const SlideContent = ({
  content,
  isEditing,
  onStartEdit,
  onUpdate,
  onRemove,
  onStopEdit,
}: SlideContentProps) => {
  const handleClick = (e: React.MouseEvent) => {
    if (!isEditing) {
      e.preventDefault();
      onStartEdit(content);
    }
  };

  const getTextShadow = () => {
    const isLightBackground =
      content.color === "#ffffff" || content.color === "#f8f9fa";
    return isLightBackground
      ? "2px 2px 4px rgba(0,0,0,0.8)"
      : "1px 1px 2px rgba(255,255,255,0.3)";
  };

  return (
    <div
      className={`relative group slide-content-container ${
        isEditing ? "ring-2 ring-blue-500" : ""
      }`}
      style={{
        fontSize: `${content.fontSize}px`,
        color: content.color,
        textShadow: getTextShadow(),
        fontWeight:
          content.type === "title"
            ? "bold"
            : content.type === "subtitle"
            ? "600"
            : "normal",
        lineHeight: "1.2",
        wordWrap: "break-word",
        overflowWrap: "break-word",
      }}
    >
      {isEditing ? (
        <input
          type="text"
          value={content.text}
          onChange={(e) =>
            onUpdate(content.id, {
              text: e.target.value,
            })
          }
          className="bg-transparent border-none outline-none text-center w-full"
          style={{
            fontSize: `${content.fontSize}px`,
            color: content.color,
            textShadow: getTextShadow(),
            fontWeight:
              content.type === "title"
                ? "bold"
                : content.type === "subtitle"
                ? "600"
                : "normal",
          }}
          autoFocus
          onBlur={(e) => {
            if (e.relatedTarget?.closest(".slide-content-container")) {
              return;
            }
            onStopEdit();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "Escape") {
              onStopEdit();
            }
          }}
        />
      ) : (
        <div
          className="cursor-pointer hover:bg-white/10 px-3 py-2 rounded transition-colors"
          onClick={handleClick}
          style={{
            minHeight: `${Math.max(content.fontSize * 1.4, 24)}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {content.text}
        </div>
      )}
      {isEditing && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(content.id);
            onStopEdit();
          }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 z-10"
        >
          ×
        </button>
      )}
    </div>
  );
};
