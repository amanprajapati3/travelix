"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/data";
import type { TravelCtaBannerData } from "@/type/typeSection";
import ScrollReveal from "./ScrollReveal";

export default function CtaBanner() {
  const ctaData: TravelCtaBannerData = site.ctaBanner;
  if (!ctaData) return null;

  const { badge, title, desc, button, bgImageUrl } = ctaData;

  return (
    <section className="relative w-full bg-[#050811] py-8 text-white">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* MAIN CONTAINER WITH THIN GOLDEN/AMBER BORDER */}
        <ScrollReveal className="relative w-full overflow-hidden rounded-2xl border border-[#facc15]/30 bg-[#080d1a] shadow-2xl min-h-[150px] flex items-center" direction="up">
          
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={bgImageUrl}
              alt="CTA Background"
              fill
              quality={100}
              className="object-cover object-right lg:object-center"
            />

           
            <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/90 to-transparent lg:bg-gradient-to-r lg:from-[#050811] lg:via-[#050811]/95 lg:to-transparent z-10" />
          </div>
          <div className="absolute  right-[14%]">
             <img src="/travel/plane_trail_transparent.png" alt="" />
          </div>

          {/* CTA CONTENT WRAPPER */}
          <div className="relative  z-20 w-full px-6 sm:px-8 lg:px-10 py-6 flex flex-col lg:flex-row items-center lg:items-center justify-between text-center lg:text-left gap-6">
            
            {/* Left Content Area (Max 50% on Desktop) */}
            <div className="max-w-full  lg:max-w-[50%] flex flex-col items-center lg:items-start">
              {badge && (
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-gray-300">
                  {badge}
                </span>
              )}

              {/* Title with Underline */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                {title.normal && <span>{title.normal} </span>}
                <span className="relative inline-block text-[#facc15]">
                  {title.highlighted}
                  <span className="absolute left-0 -bottom-1 h-[3px] w-[50px] bg-[#facc15] rounded-full" />
                </span>
                {title.normal2 && <span className="text-white"> {title.normal2}</span>}
              </h2>

              {/* Description */}
              {desc && (
                <p className="mt-3 text-md text-gray-300 leading-relaxed max-w-lg">
                  {desc}
                </p>
              )}
            </div>

            {/* Right Action Button */}
            {button && (
              <div className="shrink-0">
                <Link
                  href={button.href || "#"}
                  className="group inline-flex items-center gap-3 rounded-full bg-[#facc15] pl-6 pr-2 py-2 text-xs sm:text-sm font-extrabold text-black transition-all duration-300 hover:bg-[#eab308] shadow-xl"
                >
                  <span className="tracking-wider">{button.label}</span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-[#facc15] transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              </div>
            )}

          </div>

        </ScrollReveal>
      </div>
    </section>
  );
}