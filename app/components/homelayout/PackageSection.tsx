"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Calendar, Star } from "lucide-react";
import { site } from "@/data";
import type { TravelPackagesData } from "@/type/typeSection";
import { Roboto_Condensed } from "next/font/google";

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const packagesData: TravelPackagesData = site.packages;

export default function PackageSection() {
  if (!packagesData) return null;

  const { badge, title, desc, button, packages } = packagesData;

  return (
    <section className="relative w-full bg-[#05060a] py-8  text-white overflow-hidden">
      <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-10 xl:px-14">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-12 lg:gap-16">

          {/* LEFT SECTION */}
          <div className="w-full lg:w-[38%] lg:sticky md:mt-12 lg:top-24 text-center lg:text-left">
            {badge && (
              <span className="mb-0 inline-block text-[10px] sm:text-xs font-medium uppercase tracking-[0.25em] text-white/75">
                {badge}
              </span>
            )}

            <h2 className="text-[clamp(2.2rem,2vw,2.5rem)] uppercase font-semibold mt-1">
              <span className="text-white">{title.normal}</span>{" "}
              <span className="text-amber-400">{title.highlighted}</span>{" "}
              <span className="text-white">{title.normal2}</span>
            </h2>

            {desc && (
              <p className="mt-2 text-sm sm:text-base md:max-w-[400px] text-purple-300/30 max-w-md mx-auto lg:mx-0 leading-relaxed">
                {desc}
              </p>
            )}

            {button && (
              <div className="mt-6 flex justify-center lg:justify-start">
                <Link
                  href={button.href || "#"}
                  className="group inline-flex items-center gap-4 rounded-full bg-[#f5b335] px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#e09f24] shadow-lg cursor-pointer"
                >
                  <span>{button.label}</span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </div>
            )}
          </div>

          {/* RIGHT PACKAGE CONTAINER */}
          <div className="w-full lg:w-[58%] grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-col lg:h-[580px] lg:overflow-y-auto lg:pr-2 gap-6 lg:[&::-webkit-scrollbar]:w-2 lg:[&::-webkit-scrollbar-thumb]:bg-white/20 lg:[&::-webkit-scrollbar-thumb]:rounded-full lg:[&::-webkit-scrollbar-track]:bg-transparent">

            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="group relative flex flex-col w-full rounded-[28px] bg-[#111319] border border-white/10 overflow-hidden shadow-2xl transition-all duration-300 lg:flex-shrink-0"
              >
                {/* Package Image */}
                <div className="relative h-[240px] sm:h-[260px] lg:h-[320px] w-full overflow-hidden">
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
                <div className="p-4 sm:p-5 lg:p-6 flex flex-col sm:flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-5 bg-[#27282c]">

                  {/* Location & Title */}
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5 text-xs text-white/70 mb-1">
                      <MapPin className="h-4 w-4 text-white flex-shrink-0" />
                      <span className="truncate">{pkg.location}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-amber-400 truncate">
                      {pkg.title}
                    </h3>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-2 sm:gap-3 rounded-2xl bg-[#f4f6f9] px-3 sm:px-4 py-2.5 sm:py-3 text-slate-900 flex-shrink-0">
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-transparent text-sky-600">
                      <Calendar className="h-4 w-4" />
                    </div>

                    <div className="flex flex-col">
                      <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        Duration
                      </span>

                      <span className="text-xs sm:text-sm font-bold text-slate-900 whitespace-nowrap">
                        {pkg.duration}
                      </span>
                    </div>
                  </div>

                  {/* Rating & Price */}
                  <div className="flex items-center justify-between w-full lg:w-auto lg:flex-col lg:items-end gap-2">
                    <div className="flex items-center gap-1 rounded-full bg-amber-400 px-3 py-1 text-black font-bold text-xs shadow-md">
                      <Star className="h-3.5 w-3.5 fill-black" />
                      <span>{pkg.rating}</span>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-xl sm:text-2xl font-bold text-white">
                        ${pkg.price}
                      </span>

                      <span className="text-[11px] text-white/60">
                        {pkg.priceUnit}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}