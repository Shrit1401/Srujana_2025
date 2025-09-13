"use client";

import React, { useState } from "react";
import {
  Camera,
  Upload,
  Check,
  FileText,
  Palette,
  StickyNote,
  Loader2,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import { generateWorksheet } from "@/lib/ai/lesson.server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const LessonPage = () => {
  const { t } = useLanguage();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [activities, setActivities] = useState({
    worksheet: true,
    drawing: false,
    notes: false,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedWorksheet, setGeneratedWorksheet] = useState<string | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [pdfSuccess, setPdfSuccess] = useState(false);

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

  const handleGenerate = async () => {
    if (!selectedFile) return;

    setIsGenerating(true);
    setError(null);
    setGeneratedWorksheet(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const result = await generateWorksheet(formData);

      if (result.success) {
        setGeneratedWorksheet(result.worksheet || null);
      } else {
        setError(result.error || "Unknown error occurred");
      }
    } catch (err) {
      setError("Failed to generate worksheet. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!generatedWorksheet) {
      setError("No worksheet content available for download.");
      return;
    }

    setIsGeneratingPDF(true);
    setError(null);
    setPdfSuccess(false);

    try {
      const tempContainer = document.createElement("div");
      tempContainer.style.cssText = `
        position: absolute;
        top: -9999px;
        left: -9999px;
        width: 800px;
        background: white;
        color: black;
        font-family: 'Arial', 'Helvetica', sans-serif;
        padding: 40px;
        line-height: 1.6;
        font-size: 14px;
        box-sizing: border-box;
      `;

      const htmlContent = generatedWorksheet
        .replace(
          /^# (.+)$/gm,
          '<h1 style="color: #3f51b5; font-size: 28px; font-weight: bold; margin: 30px 0 15px 0; border-bottom: 3px solid #3f51b5; padding-bottom: 8px; text-align: center;">$1</h1>'
        )
        .replace(
          /^## (.+)$/gm,
          '<h2 style="color: #3f51b5; font-size: 22px; font-weight: bold; margin: 25px 0 12px 0; border-left: 4px solid #3f51b5; padding-left: 15px;">$1</h2>'
        )
        .replace(
          /^### (.+)$/gm,
          '<h3 style="color: #3f51b5; font-size: 18px; font-weight: bold; margin: 20px 0 10px 0;">$1</h3>'
        )
        .replace(
          /^(\d+)\. (.+)$/gm,
          '<div style="margin: 12px 0; padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong style="color: #3f51b5; font-size: 16px;">$1. $2</strong></div>'
        )
        .replace(
          /Answer: __________ \(([^)]+)\)/g,
          '<div style="margin: 8px 0 20px 25px; color: #666; font-size: 14px; background: #f8f9fa; padding: 10px; border-radius: 4px;">Answer: __________ <span style="color: #3f51b5; font-weight: bold;">($1)</span></div>'
        )
        .replace(
          /\*\*(.+?)\*\*/g,
          '<strong style="color: #3f51b5; font-weight: bold;">$1</strong>'
        )
        .replace(
          /\*(.+?)\*/g,
          '<em style="color: #666; font-style: italic;">$1</em>'
        )
        .replace(/\n\n/g, "<br><br>")
        .replace(/\n/g, "<br>");

      tempContainer.innerHTML = htmlContent;
      document.body.appendChild(tempContainer);

      await new Promise((resolve) => setTimeout(resolve, 100));

      const canvas = await html2canvas(tempContainer, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        allowTaint: true,
        foreignObjectRendering: true,
        width: 800,
        height: tempContainer.scrollHeight,
        logging: false,
        imageTimeout: 15000,
        removeContainer: false,
        onclone: (clonedDoc) => {
          const clonedContainer = clonedDoc.querySelector("div");
          if (clonedContainer) {
            clonedContainer.style.position = "static";
            clonedContainer.style.top = "auto";
            clonedContainer.style.left = "auto";
          }
        },
      });

      document.body.removeChild(tempContainer);

      if (!canvas || canvas.width === 0 || canvas.height === 0) {
        throw new Error("Failed to capture worksheet content");
      }

      const imgData = canvas.toDataURL("image/png", 0.95);
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 10;
      const contentWidth = pageWidth - margin * 2;
      const contentHeight = pageHeight - margin * 2;

      const imgWidth = contentWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = margin;

      pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
      heightLeft -= contentHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight + margin;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
        heightLeft -= contentHeight;
      }

      const timestamp = new Date().toISOString().split("T")[0];
      const filename = `worksheet-${timestamp}.pdf`;

      pdf.save(filename);
      setPdfSuccess(true);
      setTimeout(() => setPdfSuccess(false), 3000);
    } catch (error) {
      console.error("Error generating PDF:", error);

      try {
        const fallbackPdf = new jsPDF("p", "mm", "a4");
        const pageWidth = 210;
        const margin = 20;
        const maxWidth = pageWidth - margin * 2;

        let yPosition = margin;
        const lineHeight = 7;

        const lines = generatedWorksheet.split("\n");

        fallbackPdf.setFontSize(16);
        fallbackPdf.setTextColor(63, 81, 181);

        for (const line of lines) {
          if (line.trim() === "") {
            yPosition += lineHeight;
            continue;
          }

          if (line.startsWith("# ")) {
            if (yPosition > 250) {
              fallbackPdf.addPage();
              yPosition = margin;
            }
            fallbackPdf.setFontSize(18);
            fallbackPdf.setTextColor(63, 81, 181);
            fallbackPdf.text(line.substring(2), margin, yPosition);
            yPosition += lineHeight * 2;
          } else if (line.startsWith("## ")) {
            if (yPosition > 250) {
              fallbackPdf.addPage();
              yPosition = margin;
            }
            fallbackPdf.setFontSize(14);
            fallbackPdf.setTextColor(63, 81, 181);
            fallbackPdf.text(line.substring(3), margin, yPosition);
            yPosition += lineHeight * 1.5;
          } else if (line.startsWith("### ")) {
            if (yPosition > 250) {
              fallbackPdf.addPage();
              yPosition = margin;
            }
            fallbackPdf.setFontSize(12);
            fallbackPdf.setTextColor(63, 81, 181);
            fallbackPdf.text(line.substring(4), margin, yPosition);
            yPosition += lineHeight * 1.2;
          } else {
            if (yPosition > 250) {
              fallbackPdf.addPage();
              yPosition = margin;
            }
            fallbackPdf.setFontSize(10);
            fallbackPdf.setTextColor(0, 0, 0);

            const text = line
              .replace(/\*\*(.+?)\*\*/g, "$1")
              .replace(/\*(.+?)\*/g, "$1");
            const splitText = fallbackPdf.splitTextToSize(text, maxWidth);

            for (const textLine of splitText) {
              if (yPosition > 250) {
                fallbackPdf.addPage();
                yPosition = margin;
              }
              fallbackPdf.text(textLine, margin, yPosition);
              yPosition += lineHeight;
            }
          }
        }

        const timestamp = new Date().toISOString().split("T")[0];
        const filename = `worksheet-${timestamp}.pdf`;
        fallbackPdf.save(filename);
        setPdfSuccess(true);
        setTimeout(() => setPdfSuccess(false), 3000);
      } catch (fallbackError) {
        console.error("Fallback PDF generation also failed:", fallbackError);
        const errorMessage =
          error instanceof Error
            ? `Failed to generate PDF: ${error.message}`
            : "Failed to generate PDF. Please try again.";
        setError(errorMessage);
      }
    } finally {
      setIsGeneratingPDF(false);
    }
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
          <p className="text-muted-foreground">
            For now it supports only English
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
                disabled={!selectedFile || isGenerating}
                className="w-full mt-8 bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  t("generateLessonKit")
                )}
              </Button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {pdfSuccess && (
          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-600">
              PDF generated and downloaded successfully!
            </p>
          </div>
        )}

        {generatedWorksheet && (
          <div className="mt-8 bg-card border border-border rounded-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-primary">
                  Generated Worksheet
                </h2>
              </div>
              <Button
                onClick={handleDownload}
                disabled={isGeneratingPDF}
                className="bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGeneratingPDF ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </>
                )}
              </Button>
            </div>
            <div
              id="worksheet-content"
              className="worksheet-content prose prose-lg max-w-none prose-headings:text-primary prose-headings:font-bold prose-p:text-foreground prose-li:text-foreground prose-strong:text-primary prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:pl-4 prose-blockquote:py-2 prose-blockquote:rounded-r"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-2xl font-bold text-primary mb-4 border-b-2 border-primary/20 pb-2">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-xl font-bold text-primary mb-3 mt-6">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg font-semibold text-primary mb-2 mt-4">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-3 text-foreground leading-relaxed">
                      {children}
                    </p>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside mb-4 space-y-2 ml-4">
                      {children}
                    </ol>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
                      {children}
                    </ul>
                  ),
                  li: ({ children }) => (
                    <li className="text-foreground leading-relaxed">
                      {children}
                    </li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary bg-primary/5 pl-4 py-2 rounded-r mb-4 italic">
                      {children}
                    </blockquote>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold text-primary">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-primary/80">{children}</em>
                  ),
                }}
              >
                {generatedWorksheet}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonPage;
