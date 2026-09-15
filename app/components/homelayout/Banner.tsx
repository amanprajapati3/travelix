"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, X } from "lucide-react";
import { IoAirplane } from "react-icons/io5";
import { site as siteData } from "@/data";
import type { TravelBannerData } from "@/type/typeSection";
import { Allura } from "next/font/google";

const allura = Allura({
  subsets: ["latin"],
  weight: "400",
});

const bannerData: TravelBannerData = siteData.banner;

export default function Banner() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  if (!bannerData) return null;

  const {
    badge,
    title,
    highlightedTitle,
    titleLine2,
    desc,
    buttons,
    mainImage,
    caption,
    polaroidImages,
  } = bannerData;

  const captionWords = caption ? caption.trim().split(/\s+/) : [];

  const captionLines: string[] =
    captionWords.length >= 3
      ? [
          captionWords[0],
          captionWords[1],
          captionWords.slice(2).join(" "),
        ]
      : captionWords.length === 2
      ? captionWords
      : [caption || ""];

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-[#05060a] text-white">
      {/* BACKGROUND IMAGE */}
      {mainImage?.src && (
        <Image
          src={mainImage.src}
          alt={mainImage.alt || "Hero Banner"}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 z-0 object-cover object-center"
        />
      )}

      {/* BRUSH OVERLAY */}
      <Image
        src="/travel/banner.png"
        alt="Brush Overlay Border"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 z-10 pointer-events-none object-cover"
      />

      {/* MAIN CONTENT */}
      <div className="relative z-30 mx-auto flex h-full w-full max-w-[1440px] items-center px-4 sm:px-6 lg:px-10 xl:px-14">
        <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-12 lg:gap-0">
          
          {/* LEFT SIDE */}
          <div className="relative z-40 flex md:mt-24 mt-28 flex-col items-start justify-center text-left lg:col-span-5 lg:pl-10">
            {/* Badge */}
            {badge && (
              <span className="mb-2 text-[10px] font-medium uppercase tracking-[0.25em] text-white/70 sm:mb-3 sm:text-xs">
                {badge}
              </span>
            )}

            {/* Heading */}
            <h1 className="font-serif text-[clamp(2.3rem,5vw,4rem)] uppercase leading-[0.92]">
              <span className="block text-white">{title}</span>
              <span className="my-1 block text-amber-300">{highlightedTitle}</span>
              <span className="block text-white">{titleLine2}</span>
            </h1>

            {/* Description */}
            {desc && (
              <p className="mt-3 max-w-md text-sm font-normal leading-relaxed text-white sm:text-base">
                {desc}
              </p>
            )}

            {/* Buttons */}
            {buttons && buttons.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-3 sm:mt-5 sm:gap-5">
                {buttons.map((btn, index) => {
                  if (btn.variant === "play") {
                    return (
                      <button
                        key={index}
                        onClick={() => setIsVideoOpen(true)}
                        className="group flex items-center gap-2.5 text-white transition-all duration-300 hover:text-amber-300 cursor-pointer bg-transparent border-none p-0"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-lg transition-transform duration-300 group-hover:scale-110 sm:h-11 sm:w-11">
                          <Play className="h-4 w-4 fill-black translate-x-0.5 sm:h-5 sm:w-5" />
                        </span>
                        <span className="text-xs font-semibold tracking-wide sm:text-sm">
                          {btn.label}
                        </span>
                      </button>
                    );
                  }

                  return (
                    <Link
                      key={index}
                      href={btn.href || "#"}
                      className="flex items-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-xs font-bold text-black shadow-lg transition-all duration-300 hover:bg-amber-300 hover:shadow-[0_6px_25px_rgba(251,191,36,0.4)] sm:px-6 sm:py-3 sm:text-sm"
                    >
                      <span>{btn.label}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="relative flex min-h-0 items-center justify-end lg:col-span-7 lg:h-full">
            
            {/* SCRIPT CAPTION */}
            {captionLines.length > 0 && (
              <div className="pointer-events-none absolute bottom-[0%] left-[64%] hidden sm:block z-30 select-none -rotate-12 md:left-[8%] sm:left-[56%] lg:bottom-[0%]">
                {captionLines.map((line, i) => (
                  <span
                    key={i}
                    className={`${allura.className} block text-3xl leading-[0.9] tracking-wide sm:text-4xl lg:text-6xl ${
                      i === captionLines.length - 1 ? "text-amber-400" : "text-white"
                    }`}
                  >
                    {line}
                  </span>
                ))}

                <svg
                  viewBox="0 0 220 28"
                  className="mt-1 h-4 w-32 sm:h-5 sm:w-48"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M10 20C55 7 105 8 155 2C177 0 194 0 216 1"
                    stroke="#F5B800"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M35 26C78 15 125 10 185 4"
                    stroke="#F5B800"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            )}

            {/* AIRPLANE PATH */}
            <div className="pointer-events-none absolute inset-0 z-30 hidden sm:block">
              <svg className="h-full w-full" viewBox="0 0 600 500" fill="none">
                <path
                  d="M340 320 C 420 260, 460 340, 520 220"
                  stroke="rgba(255,255,255,0.45)"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
              </svg>

              <div className="absolute left-[86%] top-[36%] -translate-x-1/2 -translate-y-1/2 rotate-[-35deg] text-white">
                <IoAirplane className="h-6 w-6" />
              </div>
            </div>

            {/* POLAROID CARDS */}
            {polaroidImages && polaroidImages.length > 0 && (
              <div className="absolute hidden sm:block md:top-[45%] z-40 h-[200px] w-[195px] -translate-y-1/2 sm:right-2 md:h-[300px] md:w-[200px] lg:right-2 xl:right-4">
                {polaroidImages.map((polaroid, index) => {
                  const positionStyles = [
                    "top-0 right-2 rotate-[6deg] shadow-md shadow-black z-10",
                    "top-[100px] right-10 -rotate-[9deg] shadow-md shadow-black -z-20 sm:top-[92px] sm:right-8 lg:top-[150px]",
                    "top-[156px] right-0 rotate-[6deg] shadow-md shadow-black z-30 sm:top-[194px] lg:top-[305px]",
                  ];

                  return (
                    <div
                      key={index}
                      className={`absolute w-[145px] rounded-sm bg-white p-1 text-black shadow-2xl transition-all duration-300 hover:z-50 hover:rotate-0 hover:scale-105 sm:w-[140px] ${positionStyles[index] || ""}`}
                    >
                      {/* Pin */}
                      <div className="absolute -top-2 left-1/2 z-40 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white bg-blue-600 shadow-md" />

                      {/* Image */}
                      <div className="relative h-[82px] w-full overflow-hidden bg-gray-100 sm:h-[96px] lg:h-[108px] xl:h-[115px]">
                        <Image
                          src={polaroid.src}
                          alt={polaroid.label || "Polaroid photo"}
                          fill
                          sizes="205px"
                          className="object-cover"
                        />
                      </div>

                      {/* Card Name */}
                      <div className="text-center">
                        <span className={`${allura.className} text-lg text-gray-900 font-semibold sm:text-xl lg:text-2xl`}>
                          {polaroid.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* YOUTUBE VIDEO MODAL DIALOGUE */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6 md:p-8 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10">
            {/* Close Button */}
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-3 right-3 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white hover:bg-amber-400 hover:text-black transition-all duration-300 shadow-md cursor-pointer"
              aria-label="Close video modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Embedded YouTube Video */}
            <iframe
              src="https://www.youtube.com/embed/-pc8cTYXnYs?autoplay=1"
              title="YouTube video player"
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}