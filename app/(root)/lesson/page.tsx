"use client";

import React, { useState } from "react";
import {
  Camera,
  Upload,
  Check,
  FileText,
  Palette,
  StickyNote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

const LessonPage = () => {
  const { t } = useLanguage();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [activities, setActivities] = useState({
    worksheet: true,
    drawing: false,
    notes: false,
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const toggleActivity = (activity: keyof typeof activities) => {
    setActivities((prev) => ({
      ...prev,
      [activity]: !prev[activity],
    }));
  };

  const handleGenerate = () => {
    console.log("Generating lesson kit with:", { selectedFile, activities });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            {t("photoToLesson")}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t("clickPhotoTextbook")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
                dragActive
                  ? "border-primary bg-primary/5"
                  : selectedFile
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/30 hover:border-primary/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
                id="photo-upload"
              />

              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Camera className="w-8 h-8 text-primary" />
                </div>

                {selectedFile ? (
                  <div className="space-y-2">
                    <p className="text-lg font-medium text-primary">
                      {selectedFile.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-lg font-medium">
                      {t("clickUploadPhoto")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t("supportsFormats")}
                    </p>
                  </div>
                )}

                <Button
                  onClick={() =>
                    document.getElementById("photo-upload")?.click()
                  }
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {selectedFile ? t("changePhoto") : t("takePhoto")}
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold text-primary mb-2">
                {t("configureLessonKit")}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t("selectActivities")}
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleActivity("worksheet")}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      activities.worksheet
                        ? "bg-primary border-primary"
                        : "border-muted-foreground/30 hover:border-primary/50"
                    }`}
                  >
                    {activities.worksheet && (
                      <Check className="w-3 h-3 text-primary-foreground" />
                    )}
                  </button>
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="font-medium">{t("worksheet")}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleActivity("drawing")}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      activities.drawing
                        ? "bg-primary border-primary"
                        : "border-muted-foreground/30 hover:border-primary/50"
                    }`}
                  >
                    {activities.drawing && (
                      <Check className="w-3 h-3 text-primary-foreground" />
                    )}
                  </button>
                  <Palette className="w-5 h-5 text-primary" />
                  <span className="font-medium">{t("drawingActivity")}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleActivity("notes")}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      activities.notes
                        ? "bg-primary border-primary"
                        : "border-muted-foreground/30 hover:border-primary/50"
                    }`}
                  >
                    {activities.notes && (
                      <Check className="w-3 h-3 text-primary-foreground" />
                    )}
                  </button>
                  <StickyNote className="w-5 h-5 text-primary" />
                  <span className="font-medium">{t("notes")}</span>
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={!selectedFile}
                className="w-full mt-8 bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t("generateLessonKit")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
