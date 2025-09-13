import React from "react";
import { Camera, Calendar, Presentation, Puzzle } from "lucide-react";

const DashboardPage = () => {
  const features = [
    {
      icon: Puzzle,
      title: "Class Sparks",
      description: "sparks curiosity in class",
      href: "/sparks",
    },
    {
      icon: Camera,
      title: "Photo-to-Lesson Kit",
      description: "Transform photos into lesson plans",
      href: "/lesson",
    },
    {
      icon: Calendar,
      title: "Weekly Planner",
      description: "Generate weekly schedules",
      href: "/planner",
    },
    {
      icon: Presentation,
      title: "AI Easy Slides",
      description: "Create presentations with ease using AI",
      href: "/slides",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <div className="text-left mb-16">
          <h1 className="text-6xl font-bold mb-2">
            Welcome, <span className="text-primary">Shrit</span>
          </h1>
          <p className="text-2xl text-muted-foreground">
            Here's what you can do today:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <a
                href={feature.href}
                key={index}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
