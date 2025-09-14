"use client";

import React from "react";
import { WeeklyPlan } from "@/lib/ai/planner.server";

interface WeeklyTimetableProps {
  plan: WeeklyPlan;
}

const WeeklyTimetable: React.FC<WeeklyTimetableProps> = ({ plan }) => {
  const getDayColor = (day: string) => {
    const colors = {
      Monday: "bg-blue-50 border-blue-200",
      Tuesday: "bg-green-50 border-green-200",
      Wednesday: "bg-yellow-50 border-yellow-200",
      Thursday: "bg-purple-50 border-purple-200",
      Friday: "bg-pink-50 border-pink-200",
      Saturday: "bg-indigo-50 border-indigo-200",
      Sunday: "bg-orange-50 border-orange-200",
    };
    return colors[day as keyof typeof colors] || "bg-gray-50 border-gray-200";
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Weekly Teaching Plan
        </h2>
        <p className="text-gray-600">Your personalized weekly schedule</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plan.days.map((day, dayIndex) => (
          <div
            key={dayIndex}
            className={`rounded-lg border-2 p-6 ${getDayColor(
              day.day
            )} shadow-sm`}
          >
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {day.day}
              </h3>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Topics to Teach:
                </h4>
                <div className="space-y-2">
                  {day.topics.map((topic, topicIndex) => (
                    <div
                      key={topicIndex}
                      className="px-3 py-2 bg-white rounded-lg border text-sm font-medium text-gray-700"
                    >
                      {topic}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Homework:
                </h4>
                <div className="px-3 py-2 bg-white rounded-lg border text-sm text-gray-700">
                  {day.homework}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Legend:</h4>
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Topics to Teach</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Homework Assignment</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyTimetable;
