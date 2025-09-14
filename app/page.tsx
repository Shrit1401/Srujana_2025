"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

import {
  BadgeCheck,
  ChevronDownIcon,
  GlobeIcon,
  MoveUpRight,
  Puzzle,
  Camera,
  Calendar,
  Presentation,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/lib/language-context";
import Image from "next/image";
import textLogo from "@/public/textlogo.png";

const LandingPage = () => {
  const { t, setLanguage, availableLanguages, currentLanguage } = useLanguage();

  const FEATURES = [
    {
      icon: Puzzle,
      title: t("classSparks"),
      description: t("sparksCuriosity"),
    },
    {
      icon: Camera,
      title: t("photoToLesson"),
      description: t("transformPhotos"),
    },
    {
      icon: Calendar,
      title: t("weeklyPlanner"),
      description: t("generateSchedules"),
    },
    {
      icon: Presentation,
      title: t("aiEasySlides"),
      description: t("createPresentations"),
    },
  ];

  return (
    <>
      <main className="min-h-screen bg-white text-black flex flex-col lg:flex-row">
        <div className="w-full lg:w-[50%] flex flex-col justify-center px-8 md:px-16 py-8 mt-8 lg:py-0">
          <div className="mb-8">
            <Image
              src={textLogo}
              alt="Vidyapak Logo"
              width={120}
              height={120}
              className="mr-2"
            />
          </div>

          <div className="flex-1 flex flex-col justify-center space-y-8">
            <h3 className="text-lg font-semibold text-black tracking-widest">
              {t("forEducators")}
            </h3>

            <h1 className="text-4xl md:text-5xl lg:text-6xl text-black leading-tight">
              {t("mainHeading")
                .split(" ")
                .map((word, index) => (
                  <React.Fragment key={index}>
                    {word === "3x" ? (
                      <span className="font-black">3x</span>
                    ) : (
                      word
                    )}
                    {index < t("mainHeading").split(" ").length - 1 && " "}
                    {(index === 2 || index === 5) && <br />}
                  </React.Fragment>
                ))}
            </h1>

            <Link href="/dashboard">
              <Button className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 rounded-full text-lg font-medium flex items-center gap-2 w-fit">
                {t("tryNow")} <MoveUpRight className="w-5 h-5" />
              </Button>
            </Link>

            <div className="flex items-center gap-2 text-sm font-medium">
              <BadgeCheck className="fill-black stroke-white" />
              {t("madeFor")}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[60%] relative h-96 lg:h-auto">
          <img
            src="https://image.lexica.art/full_webp/1cdb19e6-7ac7-4ca1-967f-9d48d4fe3952"
            className="w-full h-full object-cover rounded-bl-xl"
            alt="Classroom with teacher at chalkboard"
          />

          <div className="absolute bottom-4 right-4 bg-blue-900 text-white px-3 py-1 rounded-full text-sm font-medium">
            ✨✨ Platform for Teachers
          </div>

          <div className="absolute top-8 right-8 flex flex-col items-end gap-2">
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="rounded-full">
                  <Button variant="outline" size="sm">
                    <GlobeIcon className="h-4 w-4" />
                    <span className="text-md">{t("language")}</span>
                    <ChevronDownIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {Object.entries(availableLanguages).map(
                    ([code, language]) => (
                      <DropdownMenuItem
                        key={code}
                        onClick={() =>
                          setLanguage(code as keyof typeof availableLanguages)
                        }
                        className={currentLanguage === code ? "bg-blue-50" : ""}
                      >
                        {language.name}
                      </DropdownMenuItem>
                    )
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="/dashboard">
                <Button className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2">
                  {t("tryNow")} <MoveUpRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <section className="w-full bg-white py-16 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              {t("makeClassMoreClasssy")}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover powerful AI tools designed specifically for educators to
              enhance teaching and student engagement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Link
                  href="/dashboard"
                  key={index}
                  className="group relative bg-gradient-to-br from-white to-gray-50 border border-gray-200/50 rounded-2xl p-8 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 cursor-pointer overflow-hidden backdrop-blur-sm"
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
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                  <div className="relative flex flex-col items-center text-center">
                    <div className="mb-4">
                      <IconComponent className="w-10 h-10 text-blue-900" />
                    </div>

                    <h3 className="text-xl font-bold text-black mb-3 group-hover:text-blue-900 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                      {feature.description}
                    </p>

                    <div className="mt-4 w-0 group-hover:w-12 h-0.5 bg-gradient-to-r from-blue-900 to-blue-900/50 transition-all duration-500 rounded-full"></div>
                  </div>

                  <div className="absolute top-4 right-4 w-2 h-2 bg-blue-900/30 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100"></div>
                  <div className="absolute bottom-4 left-4 w-1 h-1 bg-blue-900/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200"></div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default LandingPage;
