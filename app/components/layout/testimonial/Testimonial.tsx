"use client";

import React from "react";
import Banner from "../../shared/Banner";
import { Allura } from "next/font/google";
import { site } from "@/data";
import { TestimonialCard } from "../../homelayout/TesitmonialSection";
import type { TravelTestimonialData } from "@/type/typeSection";
import CtaBanner from "../../shared/CtaBanner";
import Stats from "../../shared/Stats";

const allura = Allura({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const testimonialData: TravelTestimonialData = site.testimonial;

export default function Testimonial() {
  if (!testimonialData) return null;

  const { banner, badge, title, tagline, testimonialItems } = testimonialData;

  return (
    <main className="min-h-screen bg-[#011014] text-white overflow-hidden">
      {/* REUSABLE BANNER */}
      {banner && (
        <Banner
          title={banner.title}
          highlightedTitle={banner.highlightedTitle}
          backgroundImage={banner.backgroundImage}
          breadcrumbItems={banner.breadcrumbItems}
        />
      )}

      {/* TESTIMONIALS GRID SECTION */}
      <section className="relative w-full py-8 md:py-12 text-white overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute bottom-0 right-0 pointer-events-none opacity-40">
          <img src="/travel/mountain_only_transparent.png" alt="" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-10 xl:px-14">
          {/* HEADER SECTION */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
            <div className="text-center md:text-left">
              {badge && (
                <span className="mb-2 inline-block text-[11px] font-medium uppercase tracking-[0.25em] text-white/60">
                  {badge}
                </span>
              )}
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-wide">
                <span className="text-white">{title.normal}</span>{" "}
                <span className="text-amber-400">{title.highlighted}</span>
              </h2>
              <div className="bg-amber-500 h-1 mt-2 w-[80px] mx-auto md:mx-0"></div>
            </div>
            {tagline && (
              <span
                className={`${allura.className} max-w-[220px] text-4xl text-amber-400 rotate-[-5deg] text-center md:text-right`}
              >
                {tagline}
              </span>
            )}
          </div>

          {/* TESTIMONIALS GRID (2 per row desktop & tablet, 1 per row mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonialItems.map((item) => (
              <TestimonialCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
      <CtaBanner/>
      <Stats/>
    </main>
  );
}