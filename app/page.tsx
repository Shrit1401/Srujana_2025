"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <>
      <div className="absolute inset-0">
        <div id="movie-bg" />
      </div>
      <main className="relative min-h-screen overflow-hidden bg-white text-black">
        <div className="flex z-[3] justify-between px-4 md:px-10 h-[10vh] items-center relative">
          <div className="flex gap-2 items-center">
            <span className="text-3xl font-semibold tracking-wide">
              Vidyapak.
            </span>
          </div>

          <Link href="/dashboard">
            <Button>Get Started</Button>
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center h-[80vh] w-full mx-auto gap-6">
          <h1 className="text-6xl font-bold text-center mb-2">
            Helping Teachers Engage <br /> with Students
          </h1>
          <Link href="/dashboard">
            <Button className="px-8 py-3 text-lg rounded-full" size="lg">
              Start
            </Button>
          </Link>
        </div>
      </main>
    </>
  );
};

export default LandingPage;
