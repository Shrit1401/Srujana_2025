"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BadgeCheck,
  ChevronDownIcon,
  GlobeIcon,
  MoveUpRight,
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

  return (
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
          className="w-full h-full object-cover"
          alt="Classroom with teacher at chalkboard"
        />

        <div className="absolute top-8 right-8 flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="rounded-full">
              <Button variant="outline" size="sm">
                <GlobeIcon className="h-4 w-4" />
                <span className="text-md">{t("language")}</span>
                <ChevronDownIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {Object.entries(availableLanguages).map(([code, language]) => (
                <DropdownMenuItem
                  key={code}
                  onClick={() =>
                    setLanguage(code as keyof typeof availableLanguages)
                  }
                  className={currentLanguage === code ? "bg-blue-50" : ""}
                >
                  {language.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/dashboard">
            <Button className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2">
              {t("tryNow")} <MoveUpRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
