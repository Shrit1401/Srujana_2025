"use client";
import React, { useState, useEffect } from "react";
import { Camera, Calendar, Presentation, Puzzle } from "lucide-react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useLanguage } from "@/lib/language-context";

const DashboardPage = () => {
  const { t } = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const FEATURES = [
    {
      icon: Puzzle,
      title: t("classSparks"),
      description: t("sparksCuriosity"),
      href: "/sparks",
    },
    {
      icon: Camera,
      title: t("photoToLesson"),
      description: t("transformPhotos"),
      href: "/lesson",
    },
    {
      icon: Calendar,
      title: t("weeklyPlanner"),
      description: t("generateSchedules"),
      href: "/planner",
    },
    {
      icon: Presentation,
      title: t("aiEasySlides"),
      description: t("createPresentations"),
      href: "/slides",
    },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t("loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <div className="text-left mb-16">
          {user ? (
            <>
              <h1 className="text-6xl font-bold mb-2">
                {t("welcome")},{" "}
                <span className="text-primary">
                  {user.displayName || "User"}
                </span>
              </h1>
              <p className="text-2xl text-muted-foreground mb-4">
                {t("heresWhat")}
              </p>
            </>
          ) : (
            <>
              <h1 className="text-6xl font-bold mb-2">
                {t("welcomeTo")} <span className="text-primary">Vidyapak</span>
              </h1>
              <p className="text-2xl text-muted-foreground mb-4">
                {t("signInToAccess")}
              </p>
              <button
                onClick={handleSignIn}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors duration-300 flex items-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {t("signInWithGoogle")}
              </button>
            </>
          )}
        </div>

        {user && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {FEATURES.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <a
                  href={feature.href}
                  key={index}
                  className="group relative bg-gradient-to-br from-card to-card/80 border border-border/50 rounded-2xl p-8 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 cursor-pointer overflow-hidden backdrop-blur-sm"
                  style={{
                    transform: "translateY(0)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-8px) scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                  <div className="relative flex flex-col items-center text-center">
                    <div className="">
                      <IconComponent className="w-10 h-10 text-primary" />
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                      {feature.description}
                    </p>

                    <div className="mt-4 w-0 group-hover:w-12 h-0.5 bg-gradient-to-r from-primary to-primary/50 transition-all duration-500 rounded-full"></div>
                  </div>

                  <div className="absolute top-4 right-4 w-2 h-2 bg-primary/30 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100"></div>
                  <div className="absolute bottom-4 left-4 w-1 h-1 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200"></div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
