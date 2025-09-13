"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

const PlannerPage = () => {
  const { t } = useLanguage();
  const [syllabus, setSyllabus] = useState("");
  const [teachingDays, setTeachingDays] = useState("");
  const [holidays, setHolidays] = useState("");

  const handleGeneratePlan = () => {
    console.log("Generating plan with:", { syllabus, teachingDays, holidays });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t("autoPlanWeek")}
          </h1>
          <p className="text-lg text-gray-600">{t("generateWeeklyPlan")}</p>
        </div>

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
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-2">
              {t("numberOfTeachingDays")}
            </label>
            <p className="text-sm text-gray-600 mb-3">{t("howManyDays")}</p>
            <input
              type="text"
              value={teachingDays}
              onChange={(e) => setTeachingDays(e.target.value)}
              placeholder={t("teachingDaysPlaceholder")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-2">
              {t("holidays")}
            </label>
            <p className="text-sm text-gray-600 mb-3">{t("specifyHolidays")}</p>
            <input
              type="text"
              value={holidays}
              onChange={(e) => setHolidays(e.target.value)}
              placeholder={t("holidaysPlaceholder")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="pt-4">
            <Button
              onClick={handleGeneratePlan}
              className="w-full h-12 text-lg font-medium"
              size="lg"
            >
              {t("generatePlan")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlannerPage;
