"use client";

import React from "react";
import Banner from "../../shared/Banner";
import ScrollReveal from "../../shared/ScrollReveal";
import { type TravelLegalData } from "@/data";

interface LegalProps {
  data: TravelLegalData;
}

export default function Legal({ data }: LegalProps) {
  if (!data) return null;

  return (
    <main className="min-h-screen bg-[#011014] text-white font-sans overflow-hidden">
      {/* 1. TOP BANNER */}
      {data.banner && (
        <Banner
          title={data.banner.title}
          highlightedTitle={data.banner.highlightedTitle}
          backgroundImage={data.banner.backgroundImage}
          breadcrumbItems={data.banner.breadcrumbItems as any}
        />
      )}

      {/* 2. LEGAL CONTENT SECTION */}
      <section className="relative w-full py-8 md:py-12 px-4 sm:px-6 lg:px-12 xl:px-20 max-w-[1400px] mx-auto">
        {/* Main Title & Last Updated */}
        <ScrollReveal className="mb-10  " direction="up">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wide mb-3">
            {data.title}
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm font-medium">
            {data.lastUpdated}
          </p>
        </ScrollReveal>

        {/* Section List */}
        <ScrollReveal className="flex flex-col gap-8 md:ml-20 sm:gap-10" direction="up">
          {data.sections.map((item) => (
            <div key={item.id} className="flex flex-col gap-3">
              {/* Heading */}
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-amber-400 leading-snug flex items-center gap-2">
                {item.number && <span>{item.number}</span>}
                <span>{item.heading}</span>
              </h2>

              {/* Description */}
              {item.description && (
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              )}

              {/* Bullets List */}
              {item.bullets && item.bullets.length > 0 && (
                <ul className="flex flex-col gap-2.5 my-1 pl-1">
                  {item.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                      <span className="h-2 w-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Footer Text */}
              {item.footerText && (
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mt-1">
                  {item.footerText}
                </p>
              )}

              {/* Email Contact Link */}
              {item.contactEmail && (
                <p className="text-xs sm:text-sm text-slate-300 font-medium">
                  Email:{" "}
                  <a
                    href={`mailto:${item.contactEmail}`}
                    className="text-amber-400 hover:underline font-semibold"
                  >
                    {item.contactEmail}
                  </a>
                </p>
              )}
            </div>
          ))}
        </ScrollReveal>
      </section>
    </main>
  );
}