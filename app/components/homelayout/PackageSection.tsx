"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Calendar, Star } from "lucide-react";
import { site } from "@/data";
import type { TravelPackagesData } from "@/type/typeSection";
import { Roboto_Condensed } from "next/font/google";
import ScrollReveal from "../shared/ScrollReveal";

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const packagesData: TravelPackagesData = site.packages;

export default function PackageSection() {
  if (!packagesData) return null;

  const { badge, title, desc, button, packages } = packagesData;

  const handlePackageWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;

    const element = e.currentTarget;

    const atTop = element.scrollTop <= 0;
    const atBottom =
      Math.ceil(element.scrollTop + element.clientHeight) >=
      element.scrollHeight;

    if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) {
      return;
    }

    e.stopPropagation();
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#05060a] py-8 text-white">
      <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-10 xl:px-14">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-16">

          {/* LEFT SECTION */}
          <ScrollReveal
            className="w-full text-center md:mt-12 lg:sticky lg:top-24 lg:w-[38%] lg:self-start lg:text-left"
            direction="left"
          >
            {badge && (
              <span className="mb-0 inline-block text-[10px] font-medium uppercase tracking-[0.25em] text-white/75] sm:text-xs">
                {badge}
              </span>
            )}

            <h2 className="mt-1 text-[clamp(2.2rem,2vw,2.5rem)] font-semibold uppercase">
              <span className="text-white">{title.normal}</span>{" "}
              <span className="text-amber-400">{title.highlighted}</span>{" "}
              <span className="text-white">{title.normal2}</span>
            </h2>

            {desc && (
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-purple-300/30 sm:text-base md:max-w-[400px] lg:mx-0">
                {desc}
              </p>
            )}

            {button && (
              <div className="mt-6 flex justify-center lg:justify-start">
                <Link
                  href={button.href || "#"}
                  className="group inline-flex cursor-pointer items-center gap-4 rounded-full bg-[#f5b335] px-6 py-3 text-sm font-semibold text-black shadow-lg transition-all duration-300 hover:bg-[#e09f24]"
                >
                  <span>{button.label}</span>

                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </div>
            )}
          </ScrollReveal>

          {/* RIGHT PACKAGE CONTAINER */}
          <div
            onWheel={handlePackageWheel}
            className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2 lg:flex lg:h-[580px] lg:w-[58%] lg:flex-col lg:overflow-y-auto lg:pr-2 lg:[&::-webkit-scrollbar]:w-2 lg:[&::-webkit-scrollbar-thumb]:rounded-full lg:[&::-webkit-scrollbar-thumb]:bg-white/20 lg:[&::-webkit-scrollbar-track]:bg-transparent"
          >
            {packages.slice(0, 3).map((pkg, i) => (
              <ScrollReveal
                key={pkg.id}
                className="group relative flex w-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#111319] shadow-2xl transition-all duration-300 lg:flex-shrink-0"
                direction="up"
                index={i}
                staggerChildren={0.08}
              >
                {/* Package Image */}
                <div className="relative h-[240px] w-full overflow-hidden sm:h-[260px] lg:h-[320px]">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    quality={100}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 55vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Card Footer Content */}
                <div className="flex flex-col items-start justify-between gap-4 bg-[#27282c] p-4 sm:p-5 lg:flex-row lg:items-center lg:gap-5 lg:p-6">

                  {/* Location & Title */}
                  <div className="flex min-w-0 flex-col">
                    <div className="mb-1 flex items-center gap-1.5 text-xs text-white/70">
                      <MapPin className="h-4 w-4 flex-shrink-0 text-white" />
                      <span className="truncate">{pkg.location}</span>
                    </div>

                    <h3 className="truncate text-lg font-bold text-amber-400 sm:text-xl">
                      {pkg.title}
                    </h3>
                  </div>

                  {/* Duration */}
                  <div className="flex flex-shrink-0 items-center gap-2 rounded-2xl bg-[#f4f6f9] px-3 py-2.5 text-slate-900 sm:gap-3 sm:px-4 sm:py-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-transparent text-sky-600 sm:h-8 sm:w-8">
                      <Calendar className="h-4 w-4" />
                    </div>

                    <div className="flex flex-col">
                      <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 sm:text-[10px]">
                        Duration
                      </span>

                      <span className="whitespace-nowrap text-xs font-bold text-slate-900 sm:text-sm">
                        {pkg.duration}
                      </span>
                    </div>
                  </div>

                  {/* Rating & Price */}
                  <div className="flex w-full items-center justify-between gap-2 lg:w-auto lg:flex-col lg:items-end">
                    <div className="flex items-center gap-1 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-black shadow-md">
                      <Star className="h-3.5 w-3.5 fill-black" />
                      <span>{pkg.rating}</span>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-bold text-white sm:text-2xl">
                        ${pkg.price}
                      </span>

                      <span className="text-[11px] text-white/60">
                        {pkg.priceUnit}
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
