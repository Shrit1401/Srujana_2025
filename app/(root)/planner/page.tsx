"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import { generateWeeklyPlan, WeeklyPlan } from "@/lib/ai/planner.server";
import WeeklyTimetable from "@/components/WeeklyTimetable";
import { exportWeeklyPlanToPDF } from "@/lib/pdf-export";

const PlannerPage = () => {
  const { t } = useLanguage();
  const [syllabus, setSyllabus] = useState("");
  const [teachingDays, setTeachingDays] = useState("");
  const [holidays, setHolidays] = useState("");
  const [generatedPlan, setGeneratedPlan] = useState<WeeklyPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGeneratePlan = async () => {
    if (!syllabus.trim()) {
      setError("Please enter syllabus content");
      return;
    }

    const days = parseInt(teachingDays);
    if (!days || days < 1 || days > 7) {
      setError("Please enter a valid number of teaching days (1-7)");
      return;
    }

    setIsLoading(true);
    setError("");
    setGeneratedPlan(null);

    try {
      const result = await generateWeeklyPlan(syllabus, days, holidays);

      if (result.success && result.plan) {
        setGeneratedPlan(result.plan);
      } else {
        setError(result.error || "Failed to generate plan");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Error generating plan:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {!generatedPlan ? (
        <div className="max-w-2xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl heading font-bold text-primary mb-4">
              {t("autoPlanWeek")}
            </h1>
            <p className="text-lg text-gray-600">{t("generateWeeklyPlan")}</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-8">
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                {t("textbookSyllabus")}
              </label>
              <p className="text-sm text-gray-600 mb-3">
                {t("enterSyllabusContent")}
              </p>
              <textarea
                value={syllabus}
                onChange={(e) => setSyllabus(e.target.value)}
                placeholder={t("syllabusPlaceholder")}
                className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                {t("numberOfTeachingDays")}
              </label>
              <p className="text-sm text-gray-600 mb-3">{t("howManyDays")}</p>
              <input
                type="number"
                min="1"
                max="7"
                value={teachingDays}
                onChange={(e) => setTeachingDays(e.target.value)}
                placeholder={t("teachingDaysPlaceholder")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                {t("holidays")}
              </label>
              <p className="text-sm text-gray-600 mb-3">
                {t("specifyHolidays")}
              </p>
              <input
                type="text"
                value={holidays}
                onChange={(e) => setHolidays(e.target.value)}
                placeholder={t("holidaysPlaceholder")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={isLoading}
              />
            </div>

            <div className="pt-4">
              <Button
                onClick={handleGeneratePlan}
                className="w-full h-12 text-lg font-medium"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? t("generatingPlan") : t("generatePlan")}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="bg-gray-50 border-b">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {t("weeklyTeachingPlan")}
                  </h1>
                  <p className="text-gray-600">{t("generatedSuccessfully")}</p>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      if (generatedPlan) {
                        exportWeeklyPlanToPDF(generatedPlan);
                      }
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    📄 {t("exportPDF")}
                  </Button>
                  <Button
                    onClick={() => {
                      setGeneratedPlan(null);
                      setError("");
                    }}
                    variant="outline"
                  >
                    {t("generateNewPlan")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <WeeklyTimetable plan={generatedPlan} />
        </div>
      )}
    </div>
  );
};

export default PlannerPage;
