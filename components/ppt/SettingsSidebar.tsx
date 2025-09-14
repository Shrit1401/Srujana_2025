import { Settings, Palette, RotateCcw, Layers } from "lucide-react";
import { ThemeSettings } from "../../lib/ppt/ppttypes";

interface SettingsSidebarProps {
  theme: ThemeSettings;
  onUpdateTheme: (updates: Partial<ThemeSettings>) => void;
  onResetTheme: () => void;
  onClose: () => void;
}

export const SettingsSidebar = ({
  theme,
  onUpdateTheme,
  onResetTheme,
  onClose,
}: SettingsSidebarProps) => {
  const colorPresets = [
    { name: "Blue", value: "#3b82f6" },
    { name: "Purple", value: "#8b5cf6" },
    { name: "Green", value: "#10b981" },
    { name: "Red", value: "#ef4444" },
    { name: "Orange", value: "#f97316" },
    { name: "Pink", value: "#ec4899" },
    { name: "Indigo", value: "#6366f1" },
    { name: "Teal", value: "#14b8a6" },
  ];

  return (
    <div className="w-72 bg-card/50 backdrop-blur-sm border-l border-border p-4 h-full overflow-y-auto">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <h2 className="text-sm font-medium text-card-foreground">
            Slide Theme
          </h2>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5">
              Background
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.backgroundColor}
                onChange={(e) =>
                  onUpdateTheme({ backgroundColor: e.target.value })
                }
                className="w-6 h-6 rounded cursor-pointer border-0"
              />
              <input
                type="text"
                value={theme.backgroundColor}
                onChange={(e) =>
                  onUpdateTheme({ backgroundColor: e.target.value })
                }
                className="flex-1 bg-input border border-border rounded px-2 py-1.5 text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:bg-input"
                placeholder="#000000"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1.5">
              H1 (Titles)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.textColor}
                onChange={(e) => onUpdateTheme({ textColor: e.target.value })}
                className="w-6 h-6 rounded cursor-pointer border-0"
              />
              <input
                type="text"
                value={theme.textColor}
                onChange={(e) => onUpdateTheme({ textColor: e.target.value })}
                className="flex-1 bg-input border border-border rounded px-2 py-1.5 text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:bg-input"
                placeholder="#ffffff"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1.5">
              H3 (Subtitles)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.accentColor}
                onChange={(e) => onUpdateTheme({ accentColor: e.target.value })}
                className="w-6 h-6 rounded cursor-pointer border-0"
              />
              <input
                type="text"
                value={theme.accentColor}
                onChange={(e) => onUpdateTheme({ accentColor: e.target.value })}
                className="flex-1 bg-input border border-border rounded px-2 py-1.5 text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:bg-input"
                placeholder="#6b7280"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1.5">
              H6 (Text)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.primaryColor}
                onChange={(e) =>
                  onUpdateTheme({ primaryColor: e.target.value })
                }
                className="w-6 h-6 rounded cursor-pointer border-0"
              />
              <input
                type="text"
                value={theme.primaryColor}
                onChange={(e) =>
                  onUpdateTheme({ primaryColor: e.target.value })
                }
                className="flex-1 bg-input border border-border rounded px-2 py-1.5 text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:bg-input"
                placeholder="#d1d5db"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1.5">
              Secondary
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.secondaryColor || "#1e40af"}
                onChange={(e) =>
                  onUpdateTheme({ secondaryColor: e.target.value })
                }
                className="w-6 h-6 rounded cursor-pointer border-0"
              />
              <input
                type="text"
                value={theme.secondaryColor || "#1e40af"}
                onChange={(e) =>
                  onUpdateTheme({ secondaryColor: e.target.value })
                }
                className="flex-1 bg-input border border-border rounded px-2 py-1.5 text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:bg-input"
                placeholder="#1e40af"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Layers className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-medium text-card-foreground">
            Background Style
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs text-muted-foreground mb-2">
              Background Type
            </label>
            <select
              value={theme.gradientType}
              onChange={(e) =>
                onUpdateTheme({
                  gradientType: e.target.value as "solid" | "linear" | "radial",
                })
              }
              className="w-full bg-input border border-border rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
            >
              <option value="solid">Solid Color</option>
              <option value="linear">Linear Gradient</option>
              <option value="radial">Radial Gradient</option>
            </select>
          </div>

          {theme.gradientType !== "solid" && (
            <div>
              <label className="block text-xs text-muted-foreground mb-2">
                Gradient Direction
              </label>
              <select
                value={theme.gradientDirection || "to bottom right"}
                onChange={(e) =>
                  onUpdateTheme({ gradientDirection: e.target.value })
                }
                className="w-full bg-input border border-border rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
              >
                <option value="to top">To Top</option>
                <option value="to bottom">To Bottom</option>
                <option value="to left">To Left</option>
                <option value="to right">To Right</option>
                <option value="to top left">To Top Left</option>
                <option value="to top right">To Top Right</option>
                <option value="to bottom left">To Bottom Left</option>
                <option value="to bottom right">To Bottom Right</option>
              </select>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-xs text-muted-foreground mb-2">Presets</h3>
        <div className="grid grid-cols-4 gap-1.5">
          {colorPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() =>
                onUpdateTheme({
                  primaryColor: preset.value,
                  textColor: "#ffffff",
                  accentColor: preset.value + "80",
                  secondaryColor: preset.value + "40",
                })
              }
              className="p-1.5 rounded border border-border hover:border-primary/50 transition-colors group"
              title={preset.name}
            >
              <div
                className="w-full h-4 rounded"
                style={{ backgroundColor: preset.value }}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-border">
        <button
          onClick={onResetTheme}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary hover:bg-secondary/80 border border-border rounded text-xs text-secondary-foreground hover:text-secondary-foreground transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>
    </div>
  );
};
