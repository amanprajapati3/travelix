"use client";

import React from "react";
import Image from "next/image";
import Banner from "../../shared/Banner";
import ScrollReveal from "../../shared/ScrollReveal";
import { site } from "@/data";
import type { TravelAwardsData } from "@/type/typeSection";
import CtaBanner from "../../shared/CtaBanner";
import Stats from "../../shared/Stats";

export default function Award() {
  const awardData: TravelAwardsData = site.awards;

  if (!awardData) return null;

  const { banner, achievementsSection, certificationsSection } = awardData;

  return (
    <main className="min-h-screen bg-[#011014] text-white overflow-hidden">
      
      {/* 1. REUSABLE BANNER */}
      <Banner
        title={banner.title}
        highlightedTitle={banner.highlightedTitle}
        backgroundImage={banner.backgroundImage}
        breadcrumbItems={banner.breadcrumbItems}
      />

      {/* 2. OUR ACHIEVEMENTS & AWARDS SECTION */}
      <section className="relative w-full py-8 md:py-12">
        <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-10 xl:px-14">
          
          {/* Section Header */}
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-5" direction="up">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-400 mb-0 block">
              {achievementsSection.badge}
            </span>
            <h2 className=" text-[clamp(2.2rem,4vw,2.7rem)] font-bold leading-tight tracking-wide mb-2">
              <span className="text-white">{achievementsSection.title.normal}</span>{" "}
              <span className="text-amber-400">{achievementsSection.title.highlighted}</span>
            </h2>
            <div className="bg-amber-500 h-1 my-3 w-[80px] mx-auto"></div>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              {achievementsSection.description}
            </p>
          </ScrollReveal>

          {/* Awards 4-Column Grid matching the precise card design */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {achievementsSection.items.map((award, i) => (
              <ScrollReveal
                key={award.id}
                className="group relative bg-[#070b14] border border-amber-400/20 rounded-[24px] p-2 flex flex-col md:flex-col lg:flex-row items-center text-center md:text-center lg:text-left gap-1 shadow-xl hover:border-amber-400/50 transition-all duration-300"
                direction="up"
                index={i}
                staggerChildren={0.08}
              >
                {/* Left Side: Award Trophy / Graphic Container */}
                <div className="relative w-[140px] h-[180px]  shrink-0 flex items-center justify-center">
                  <div className="absolute inset-0 bg-amber-400/5 rounded-2xl blur-md group-hover:bg-amber-400/10 transition-colors" />
                  <Image
                    src={award.image}
                    alt={award.title}
                    fill
                    className="object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.6)] transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Right Side: Content (Badge, Title, Divider Line, Description) */}
                <div className="flex flex-col items-center md:items-center lg:items-start w-full">
                  {/* Badge Category */}
                  <span className="text-[11px] font-bold  tracking-wider text-amber-400 mb-1">
                    {award.badgeTitle}
                  </span>

                  {/* Award Title */}
                  <h3 className=" text-[11px] font-bold text-white/90 mb-2 leading-snug">
                    {award.title}
                  </h3>

                  {/* Horizontal Yellow Divider Line */}
                  <div className="w-10 h-[2px] bg-amber-400 my-1.5" />

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    {award.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* 3. OUR CERTIFICATIONS SECTION */}
      <section className="relative w-full py-8 bg-[#011014] border-t border-white/5">
        <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-10 xl:px-14">
          
          {/* Section Header */}
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-5" direction="up">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-400 mb-0 block">
              {certificationsSection.badge}
            </span>
            <h2 className="text-[clamp(2.2rem,4vw,2.7rem)] font-bold leading-tight tracking-wide mb-2">
              <span className="text-white">{certificationsSection.title.normal}</span>{" "}
              <span className="text-amber-400">{certificationsSection.title.highlighted}</span>
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              {certificationsSection.description}
            </p>
          </ScrollReveal>

          {/* Certifications 5-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {certificationsSection.items.map((cert, i) => (
              <ScrollReveal
                key={cert.id}
                className="group relative bg-[#0f0f0f] border border-gray-600 rounded-[15px] py-3 px-5 flex flex-col items-center text-center shadow-xl hover:border-amber-400 transition-all duration-300"
                direction="up"
                index={i}
                staggerChildren={0.08}
              >
                {/* Certificate Frame/Logo Container */}
                <div className="relative w-full aspect-[4/3] mb-3 rounded-xl overflow-hidden border border-amber-400/20 bg-black/40 flex items-center justify-center p-3">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-contain p-2 filter drop-shadow group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Certificate Title */}
                <h3 className=" text-md font-bold text-white tracking-wide mb-0">
                  {cert.title}
                </h3>

                {/* Certificate Subtitle */}
                <span className="text-xs text-slate-300 font-medium leading-snug">
                  {cert.subtitle}
                </span>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>
     <CtaBanner/>
     <Stats/>
    </main>
  );
}