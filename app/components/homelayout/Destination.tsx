"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { site as siteData, type TravelDestinationsData } from "@/data";
import ScrollReveal from "../shared/ScrollReveal";

const destinationsData: TravelDestinationsData = siteData.destinations;

export default function Destination() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const { badge, title, desc, viewAllLink, destinations = [] } =
    destinationsData ?? {};

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth =
        scrollContainerRef.current.querySelector(".destination-card")
          ?.clientWidth || 220;
      scrollContainerRef.current.scrollBy({
        left: -cardWidth - 20,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth =
        scrollContainerRef.current.querySelector(".destination-card")
          ?.clientWidth || 220;
      scrollContainerRef.current.scrollBy({
        left: cardWidth + 20,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeftPos = scrollContainerRef.current.scrollLeft;
      const container = scrollContainerRef.current;

      setIsAtStart(scrollLeftPos <= 5);
      setIsAtEnd(
        scrollLeftPos + container.clientWidth >= container.scrollWidth - 5,
      );

      const cards = container.querySelectorAll(".destination-card");
      if (cards.length > 0) {
        const cardWidth = (cards[0] as HTMLElement).offsetWidth + 20;
        const index = Math.round(scrollLeftPos / cardWidth);
        setActiveIndex(Math.max(0, Math.min(index, destinations.length - 1)));
      }
    }
  };

  useEffect(() => {
    handleScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!destinationsData) return null;

  return (
    <section className="relative w-full bg-[#05060a] py-16 text-white overflow-hidden">
      <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* HEADER SECTION */}
        <ScrollReveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-10 text-center lg:text-left" direction="up">
          <div className="max-w-2xl mx-auto lg:mx-0">
            {/* Badge */}
            {badge && (
              <span className="mb-2 inline-block text-[10px] font-medium uppercase tracking-[0.25em] text-white/75 sm:text-xs">
                {badge}
              </span>
            )}

            {/* Title with Airplane & Path */}
            <div className="relative flex items-center justify-center lg:justify-start mt-1">
              <h2 className="font-serif text-[clamp(2rem,3.5vw,2.5rem)] uppercase leading-tight tracking-wide">
                <span className="text-white">
                  {typeof title === "object" ? title.normal : "Popular"}
                </span>{" "}
                <span className="text-amber-400">
                  {typeof title === "object"
                    ? title.highlighted
                    : "Destinations"}
                </span>
              </h2>

              {/* Airplane & Dashed Path */}
              <Image
                src="/travel/aroplaneheading.png"
                alt=""
                width={128}
                height={96}
                 sizes="128px"
                className="hidden sm:block absolute left-full ml-0 top-1/2 -translate-y-1/2 w-32 h-auto"
              />
            </div>

            {/* Description */}
            {desc && (
              <p className="mt-0 text-md text-white max-w-lg mx-auto lg:mx-0">
                {desc}
              </p>
            )}
          </div>

          {/* View All Link */}
          <div className="mt-6 lg:mt-0 flex items-center justify-center lg:justify-end">
            {viewAllLink && (
              <Link
                href={viewAllLink.href || "#"}
                className="group flex items-center gap-2 text-sm font-semibold text-amber-400 transition-colors hover:text-amber-300"
              >
                <span>{viewAllLink.label}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </ScrollReveal>

        {/* CAROUSEL CONTAINER WITH OUTER ARROWS */}
        <div className="relative mx-auto w-full max-w-[1300px]">
          {/* Left Slider Arrow */}
          <button
            onClick={scrollLeft}
            disabled={isAtStart}
            className="hidden sm:flex absolute -left-10 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-transparent text-white transition-all hover:bg-amber-400 hover:text-black hover:border-amber-400 cursor-pointer shadow-lg disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-white disabled:hover:border-white/20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Right Slider Arrow */}
          <button
            onClick={scrollRight}
            disabled={isAtEnd}
            className="hidden sm:flex absolute -right-8 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-transparent text-white transition-all hover:bg-amber-400 hover:text-black hover:border-amber-400 cursor-pointer shadow-lg disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-white disabled:hover:border-white/20"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Scrollable Track */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {destinations.map((destination, i) => (
              <ScrollReveal
                key={destination.id}
                className="destination-card relative flex-shrink-0 snap-start w-full sm:w-[180px] h-[270px] rounded-3xl overflow-hidden group border border-white/10 shadow-2xl bg-gray-900"
                direction="up"
                index={i}
                staggerChildren={0.08}
              >
                <Link
                  href={destination.slug}
                  className="relative block h-full w-full"
                  aria-label={`View details for ${destination.name}`}
                >
                  {/* Destination Image - High quality rendering to eliminate blur */}
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    quality={100}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 16vw"
                    className=" transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05060a] via-[#05060a]/30 to-transparent" />

                  {/* Content at Bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex items-end justify-between z-10">
                    <div>
                      {/* Smaller Title Font */}
                      <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                        {destination.name}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-white/70 mt-0.5">
                        {destination.country}
                      </p>
                    </div>

                    {/* Circular Right Arrow Button */}
                    <span className="flex h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 items-center justify-center rounded-full bg-black text-yellow-400 shadow-md transition-transform duration-300 border border-white/15 group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-black group-hover:border-amber-400">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* MOBILE DOT INDICATORS */}
        <div className="flex justify-center gap-2 mt-6 sm:hidden">
          {destinations.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (scrollContainerRef.current) {
                  const cards =
                    scrollContainerRef.current.querySelectorAll(
                      ".destination-card",
                    );
                  const targetCard = cards[idx] as HTMLElement;
                  if (targetCard) {
                    scrollContainerRef.current.scrollTo({
                      left:
                        targetCard.offsetLeft -
                        scrollContainerRef.current.offsetLeft,
                      behavior: "smooth",
                    });
                  }
                }
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx ? "w-6 bg-amber-400" : "w-2 bg-white/30"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
