"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Allura } from "next/font/google";
import { site, type TravelOpportunityData } from "@/data";
import ScrollReveal from "../shared/ScrollReveal";

const allura = Allura({
  subsets: ["latin"],
  weight: "400",
});

const opportunityData: TravelOpportunityData = site.opportunity;

export default function ExploreSection({ hideButton = false }: { hideButton?: boolean }) {
  if (!opportunityData) return null;

  const {
    smallCaption,
    sideImage,
    statBadge,
    badge,
    title,
    desc,
    subheading,
    bulletPoints,
    avatars,
    button,
  } = opportunityData;

  return (
    <section className="relative w-full bg-[#080c14] py-8  md:py-12 text-white overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        {/* MOBILE & TABLET HEADER (Shown above the image on screens smaller than LG) */}
        <ScrollReveal className="flex lg:hidden flex-col items-center text-center mb-8" direction="up">
          {badge && (
            <span
              className={`${allura.className} text-3xl sm:text-4xl text-[#facc15] mb-2`}
            >
              {badge}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            <span>{title.normal} </span>
            <span>{title.normal2} </span>
            <span
              className={`${allura.className} text-[#facc15] text-4xl sm:text-5xl font-normal inline-block mx-1`}
            >
              {title.highlighted}
            </span>
            <span> {title.normal3}</span>
          </h2>
        </ScrollReveal>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1  lg:grid-cols-2 gap-12 lg:gap-16 items-end">
          {/* LEFT COLUMN: IMAGE, BRUSH STAMP, STATS & DOTTED LINE */}
          <ScrollReveal className="flex  flex-col justify-end h-full" direction="left">
            {/* Image Container with Yellow Brush Stamp */}
            <div className="relative w-full rounded-2xl shadow-2xl h-[380px] sm:h-[430px]">
              <Image
                src={sideImage.src}
                alt={sideImage.alt}
                fill
                quality={100}
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover rounded-2xl"
              />

              {/* Yellow Tilted Brush Badge (Top-Left) */}
              {smallCaption && (
                <div className="absolute -top-5 -left-10  z-20">
                  <div className="relative inline-flex items-center justify-center">
                    {/* Brush Image Background */}
                    <Image
                      src="/travel/brush_bg_only.png"
                      alt=""
                      width={280}
                      height={161}
                      sizes="(min-width: 640px) 220px, 180px"
                      className="w-[180px] sm:w-[220px] h-auto object-contain brightness-90"
                    />

                    {/* Caption Text centered directly ON TOP of the image */}
                    <span
                      className={`${allura.className} absolute max-w-[120px] -mt-6 -rotate-[30deg] z-10 text-2xl sm:text-3xl font-extrabold text-black leading-none `}
                    >
                      {smallCaption}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Stats & Dotted Line */}
            <div className="mt-6 flex flex-col items-center  text-center lg:text-left">
              <div className="flex flex-wrap  items-center justify-center lg:justify-start gap-1.5 text-base sm:text-2xl font-semibold">
                <span className="text-[#facc15] font-black">
                  {statBadge.number}
                </span>
                <span className="text-white/70">{statBadge.label}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">{statBadge.subLabel}</p>

              {/* Dotted Separation Line */}
              <div className="w-full mt-6 border-b border-dotted border-gray-700/80" />
            </div>
          </ScrollReveal>

          {/* RIGHT COLUMN: HEADING, DESCRIPTION, BULLETS, AVATARS & BUTTON */}
          <ScrollReveal className="flex  flex-col justify-end h-full" direction="right">
            {/* DESKTOP HEADER (Hidden on Mobile & Tablet) */}
            <div className="hidden lg:flex flex-col items-start mb-6">
              {badge && (
                <span
                  className={`${allura.className} text-3xl sm:text-4xl text-[#facc15] mb-1`}
                >
                  {badge}
                </span>
              )}
              <h2 className="text-4xl md:max-w-[450px]  lg:text-[44px] font-bold tracking-tight leading-[1.15]">
                <span>{title.normal} </span>
                <span>{title.normal2} </span>
                <span
                  className={`${allura.className} text-[#facc15] text-5xl font-normal inline-block mx-1`}
                >
                  {title.highlighted}
                </span>
                <span> {title.normal3}</span>
              </h2>
            </div>

            {/* Paragraph Description */}
            <p className="text-md md:text-lg text-gray-400 mb-6 text-center lg:text-left">
              {desc}
            </p>

            {/* Subheading */}
            {subheading && (
              <h3 className="text-md md:text-lg font-semibold text-[#facc15] mb-4 text-center lg:text-left">
                {subheading}
              </h3>
            )}

            {/* Bullet Points with Yellow Chevron Icons */}
            <div className="flex flex-col gap-3 mb-8">
              {bulletPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 justify-center lg:justify-start"
                >
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#facc15] text-black">
                    <ChevronRight className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <span className="text-md md:text-lg  text-gray-200">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            {/* BOTTOM ALIGNED ROW: Overlapping Avatars + Read More Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between md:pr-28 gap-6 pt-2">
              {/* Overlapping Avatar Stack */}
              <div className="flex items-center -space-x-2 overflow-hidden">
                {avatars.map((avatar, idx) => (
                  <div
                    key={idx}
                    className="relative inline-block h-10 w-10 rounded-full ring-2 ring-[#080c14] overflow-hidden bg-gray-800"
                  >
                    <Image
                      src={avatar}
                      alt={`Traveler ${idx + 1}`}
                      width={40}
                      height={40}
                      sizes="40px"
                      className="h-10 w-10 object-cover"
                    />
                  </div>
                ))}
                {/* Yellow Plus Avatar Badge */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#facc15] text-black font-bold text-sm ring-2 ring-[#080c14] z-10">
                  +
                </div>
              </div>

              {/* Read More Button with Circle Arrow */}
              {button && !hideButton && (
                <Link
                  href={button.href || "#"}
                  className="group inline-flex items-center gap-3 rounded-full bg-[#facc15] pl-6 pr-2 py-2 text-sm font-bold text-black transition-all duration-300 hover:bg-[#eab308] shadow-lg"
                >
                  <span>{button.label}</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:translate-x-0.5">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
