"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const PlannerPage = () => {
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
            Auto-Plan My Week
          </h1>
          <p className="text-lg text-gray-600">
            Generate a weekly teaching plan from your syllabus or key topics.
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-2">
              Textbook Syllabus or Key Topics
            </label>
            <p className="text-sm text-gray-600 mb-3">
              Enter the syllabus content or a list of topics for the week.
            </p>
            <textarea
              value={syllabus}
              onChange={(e) => setSyllabus(e.target.value)}
              placeholder="e.g., Chapter 1: The Solar System, Chapter 2: Living Organisms, ..."
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-2">
              Number of Teaching Days
            </label>
            <p className="text-sm text-gray-600 mb-3">
              How many days will you be teaching this week?
            </p>
            <input
              type="text"
              value={teachingDays}
              onChange={(e) => setTeachingDays(e.target.value)}
              placeholder="e.g., 5"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-2">
              Holidays (Optional)
            </label>
            <p className="text-sm text-gray-600 mb-3">
              Specify any holidays this week.
            </p>
            <input
              type="text"
              value={holidays}
              onChange={(e) => setHolidays(e.target.value)}
              placeholder="e.g., Wednesday"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="pt-4">
            <Button
              onClick={handleGeneratePlan}
              className="w-full h-12 text-lg font-medium"
              size="lg"
            >
              Generate Plan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlannerPage;
