"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BadgeCheck, MoveUpRight } from "lucide-react";

const LandingPage = () => {
  return (
    <main className="min-h-screen bg-white text-black flex flex-col lg:flex-row">
      <div className="w-full lg:w-[50%] flex flex-col justify-center px-8 md:px-16 py-8 mt-8 lg:py-0">
        <div className="mb-8">
          <span className="text-3xl font-bold tracking-wide">Vidyapak.</span>
        </div>

        <div className="flex-1 flex flex-col justify-center space-y-8">
          <h3 className="text-lg font-semibold text-black">For Educators</h3>

          <h1 className="text-4xl md:text-5xl lg:text-6xl text-black leading-tight">
            Help Your Students <br />
            Engage <span className="font-black">3x</span> More <br />
            Efficiently
          </h1>

          <Link href="/dashboard">
            <Button className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 rounded-full text-lg font-medium flex items-center gap-2 w-fit">
              Try out now <MoveUpRight className="w-5 h-5" />
            </Button>
          </Link>

          <div className="flex items-center gap-2 text-sm font-medium">
            <BadgeCheck className="fill-black stroke-white" />
            Made for Srujana Hackathon
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[60%] relative h-96 lg:h-auto">
        <img
          src="https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="w-full h-full object-cover"
          alt="Classroom with teacher at chalkboard"
        />

        <div className="absolute top-8 right-8">
          <Link href="/dashboard">
            <Button className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2">
              Try out now <MoveUpRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
