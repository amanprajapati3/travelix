"use client";

import React from "react";
import { FileText, Settings, Calendar, Plane } from "lucide-react";
import ScrollReveal from "../../shared/ScrollReveal";
import { site } from "@/data"; // Adjust import path to match your project
import type { TravelProcessData, TravelProcessItem } from "@/type/typeSection";

// Helper to map icon names to Lucide components
const getProcessIcon = (iconName: string) => {
  switch (iconName) {
    case "FileText":
      return <FileText className="h-8 w-8 sm:h-12 sm:w-12 text-white" />;
    case "Settings":
      return <Settings className="h-8 w-8 sm:h-12 sm:w-12 text-white" />;
    case "Calendar":
      return <Calendar className="h-8 w-8 sm:h-12 sm:w-12 text-white" />;
    case "Plane":
      return <Plane className="h-8 w-8 sm:h-12 sm:w-12 text-white" />;
    default:
      return <FileText className="h-8 w-8 sm:h-12 sm:w-12 text-white" />;
  }
};

export default function Process() {
  const processData: TravelProcessData = site.process;

  if (!processData) return null;

  const { badge, title, steps } = processData;

  return (
    <section className="relative w-full bg-[#05060a] pt-8 text-white overflow-hidden">
      <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-10 xl:px-14">
        
        {/* OUTER CARD CONTAINER (Matches the exact dark framed box in the design) */}
        <div className="relative bg-[#070a10] border border-slate-800/80 rounded-3xl p-6  shadow-2xl overflow-hidden">
          
          {/* HEADER SECTION */}
          <ScrollReveal className="flex flex-col items-center text-center mb-3" direction="up">
            {badge && (
              <span className="mb-3 inline-block text-sm sm:text-md font-semibold  tracking-[0.25em] text-amber-400">
                {badge}
              </span>
            )}
            <h2 className=" text-[clamp(2rem,3.5vw,2.2rem)] uppercase tracking-wide font-semibold mb-3 leading-tight">
              <span className="text-white">{title.normal}</span>{" "}
              <span className="text-amber-400">{title.highlighted}</span>
            </h2>
            {/* Yellow Underline Accent */}
            <div className="h-1.5 w-20 bg-amber-400 rounded-full mt-1"></div>
          </ScrollReveal>

          {/* STEPS LAYOUT CONTAINER */}
          <div className="relative">
        
            <div className="absolute top-[30px] left-[12%] right-[12%] hidden lg:flex justify-between items-center pointer-events-none z-0">
              {/* Curve 1: Between Step 1 and 2 (Dips down) */}
              <svg className="w-[35%] h-16 overflow-visible" viewBox="0 0 200 60" fill="none">
                <path d="M 0 30 Q 100 -20, 200 30" stroke="#facc15" strokeWidth="2.5" strokeDasharray="6 6" strokeLinecap="round" />
              </svg>
              {/* Curve 2: Between Step 2 and 3 (Arches up) */}
              <svg className="w-[40%] h-16 overflow-visible" viewBox="0 0 200 60" fill="none">
                <path d="M 0 30 Q 100 -20, 200 30" stroke="#facc15" strokeWidth="2.5" strokeDasharray="6 6" strokeLinecap="round" />
              </svg>
              {/* Curve 3: Between Step 3 and 4 (Dips down) */}
              <svg className="w-[35%] h-16 overflow-visible" viewBox="0 0 200 60" fill="none">
                <path d="M 0 30 Q 100 -20, 200 30" stroke="#facc15" strokeWidth="2.5" strokeDasharray="6 6" strokeLinecap="round" />
              </svg>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 relative z-10">
              {steps.map((step: TravelProcessItem, i) => (
                <ScrollReveal
                  key={step.id}
                  className="flex flex-col items-center  text-center md:text-left group"
                  direction="up"
                  index={i}
                  staggerChildren={0.1}
                >
                  {/* CIRCULAR ICON BADGE */}
                  <div className="relative flex items-center justify-center w-[96px] h-[96px] rounded-full border-2 border-amber-400 bg-[#0b0f17] shadow-xl mb-3 transition-transform duration-300 group-hover:scale-105">
                    <div className="absolute inset-1 rounded-full bg-black/60 flex items-center justify-center">
                      {getProcessIcon(step.icon)}
                    </div>
                  </div>

                  {/* CONTENT ROW: Large Number + Title & Description */}
                  <div className="flex gap-3.5 md:border-r-gray-800 md:border-r-1  sm:gap-4 w-full justify-center">
                    {/* Step Number */}
                    <span className="text-3xl h-fit pr-3 border-r-gray-800 border-r-1 sm:text-4xl font-extrabold text-amber-400 tracking-tighter leading-none shrink-0">
                      {step.stepNumber}
                    </span>

                    {/* Text Details */}
                    <div className="flex flex-col">
                      <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-slate-400 md:max-w-[160px] text-xs sm:text-sm leading-relaxed max-w-[220px]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}