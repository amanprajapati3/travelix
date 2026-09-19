"use client";

import Link from "next/link";
import Image from "next/image";
import { Home, ArrowRight } from "lucide-react";
import ScrollReveal from "./components/shared/ScrollReveal";
import { site } from "@/data";
import type { TravelNotFoundData } from "@/type/typeSection";

export default function NotFound() {
  const data: TravelNotFoundData = site.notFound;

  if (!data) return null;

  return (
    <main className="relative min-h-screen w-full bg-[#0a1118] text-white flex items-center overflow-hidden font-sans">
      {/* BACKGROUND IMAGE (MOUNTAIN & TRAVELER WITH SIGNPOSTS) */}
      <div className="absolute inset-0 z-0 top-30">
        <Image
          src={data.backgroundImage || "/travel/404-bg.jpg"}
          alt="404 Mountain Background"
          fill
          priority
          className=" object-center"
        />
        {/* Dark Vignette Overlay for Crisp Contrast */}
      </div>

      {/* FLYING PAPER AIRPLANE WITH DOTTED LOOP TRAIL */}
      <div className="absolute top-12 left-1/2 sm:left-1/2 lg:left-[55%] -translate-x-1/2 z-10 pointer-events-none hidden md:block">
        <svg
          className="w-48 lg:w-64 h-24 text-amber-400 stroke-amber-400"
          viewBox="0 0 200 100"
          fill="none"
        >
          <path
            d="M 10 80 Q 80 10 120 40 T 170 20"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray="6 6"
          />
          <polygon points="175,12 185,25 168,22" fill="#f59e0b" />
        </svg>
      </div>

      {/* CONTENT CONTAINER */}
      <div className="relative z-10 w-full max-w-[1320px] mx-auto px-6 sm:px-10 mt-30 lg:px-24 py-16">
        <ScrollReveal className="max-w-2xl" direction="up">
          {/* Eyebrow */}
          <p className="text-amber-400 font-extrabold text-sm sm:text-base tracking-widest uppercase ">
            {data.eyebrow}
          </p>

          {/* CUSTOM 404 GRAPHIC WITH MOUNTAIN INSIDE '0' AND CLOUDS OVERLAY */}
          <div className="relative inline-flex items-center my-2 select-none">
            {/* Left Cloud Graphic Accent */}
            <div className="absolute -left-16 bottom-0 z-20  text-slate-500/80">
              <svg className="w-28 h-14 fill-current" viewBox="0 0 100 50">
                <path d="M 10 40 Q 25 15 45 30 Q 65 10 85 40 Z" />
              </svg>
            </div>

            {/* The "4" Number */}
            <span className="font-extrabold text-7xl sm:text-9xl md:text-[140px] text-white tracking-tighter leading-none drop-shadow-lg">
              4
            </span>

            {/* The "0" Yellow Circular Ring with Mountain & Birds Inside */}
            <div className="relative mx-1 sm:mx-2 w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full border-[8px] sm:border-[12px] md:border-[14px] border-amber-400 bg-[#07131d] flex items-center justify-center shadow-2xl overflow-hidden shrink-0">
              {/* Inner Mountain & Birds Illustration */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Birds */}
                <svg className="absolute top-3 w-8 h-4 text-amber-300 fill-current opacity-90" viewBox="0 0 50 25">
                  <path d="M 5 15 Q 15 5 25 15 Q 35 5 45 15" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>

                {/* Mountain Peaks SVG */}
                <svg className="w-12 h-10 sm:w-16 sm:h-12 md:w-20 md:h-16 text-white fill-current mt-3" viewBox="0 0 100 80">
                  <polygon points="50,15 85,75 15,75" />
                  <polygon points="30,35 60,75 0,75" opacity="0.8" />
                  {/* Snowcaps */}
                  <polygon points="50,15 57,28 50,25 43,28" fill="#f59e0b" />
                </svg>
              </div>
            </div>

            {/* The Right "4" Number */}
            <span className="font-extrabold text-7xl sm:text-9xl md:text-[140px] text-white tracking-tighter leading-none drop-shadow-lg">
              4
            </span>

            {/* Right Cloud Graphic Accent */}
            <div className="absolute -right-16 bottom-4 z-20 opacity-80 text-slate-500/80">
              <svg className="w-28 h-14 fill-current" viewBox="0 0 100 50">
                <path d="M 10 40 Q 30 10 60 25 Q 80 15 90 40 Z" />
              </svg>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight">
            <span className="text-white">{data.title.normal}</span>{" "}
            <span className="text-amber-400">{data.title.highlighted}</span>
          </h1>

          {/* Description */}
          <p className="text-white text-sm md:text-base leading-relaxed mb-8 max-w-lg font-normal">
            {data.description}
          </p>

          {/* CTA Action Button */}
          <Link
            href={data.button.href || "/"}
            className="inline-flex items-center gap-3 bg-amber-300 hover:bg-amber-300 text-slate-950 font-bold py-3.5 px-7 rounded-full shadow-xl hover:scale-105 transition-all duration-300 text-xs sm:text-sm"
          >
            <Home className="h-5 w-5 fill-current" />
            <span>{data.button.label}</span>
            <ArrowRight className="h-6 w-6" />
          </Link>
        </ScrollReveal>
      </div>
    </main>
  );
}