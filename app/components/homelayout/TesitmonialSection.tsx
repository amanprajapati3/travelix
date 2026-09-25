"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Allura } from "next/font/google";
import {
  site,
  type TravelTestimonialData,
  type TravelTestimonialItem,
} from "@/data";
import ScrollReveal from "../shared/ScrollReveal";

// Initialize Allura font
const allura = Allura({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const testimonialData: TravelTestimonialData = site.testimonial;

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(2);
  const containerRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);

  // Handle responsive layout and number of dots
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerPage(1);
      } else {
        setCardsPerPage(2);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!testimonialData) return null;

  const { badge, title, tagline, testimonialItems } = testimonialData;
  const totalPages = Math.ceil(testimonialItems.length / cardsPerPage);

  const nextSlide = () => {
    const nextIndex = currentIndex + 1 >= totalPages ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
    scrollToIndex(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = currentIndex - 1 < 0 ? totalPages - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    scrollToIndex(prevIndex);
  };

  const scrollToIndex = (index: number) => {
    if (containerRef.current) {
      isProgrammaticScroll.current = true;
      const cardWidth =
        containerRef.current.querySelector(".testimonial-card")?.clientWidth || 0;
      const gap = 24; // tailwind gap-6 = 24px
      containerRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: "smooth",
      });
      setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 400);
    }
  };

  // Handle manual touch/mouse scroll to sync dots
  const handleScroll = () => {
    if (isProgrammaticScroll.current || !containerRef.current) return;
    const scrollLeft = containerRef.current.scrollLeft;
    const cardWidth =
      containerRef.current.querySelector(".testimonial-card")?.clientWidth || 0;
    const gap = 24;
    const newIndex = Math.round(scrollLeft / (cardWidth + gap));
    if (newIndex >= 0 && newIndex < totalPages && newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  return (
    <section className="relative w-full bg-black py-12 text-white overflow-hidden">
      {/* Background Map Image (Subtle) */}
      <div className="absolute left-0 md:top-32 h-[180px] w-[260px]">
        {" "}
        <Image
          src="/travel/world_map_transparent (2).png"
          alt="background map"
          width={260}
          height={180}
          sizes="260px"
          className="h-[180px] w-[260px] object-contain object-left-top"
        />{" "}
      </div>
      <div className="absolute bottom-0 right-0">
        <Image src="/travel/mountain_only_transparent.png" alt="" width={203} height={123} />
      </div>

      <div className="relative z-10 mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* HEADER SECTION */}
        <ScrollReveal className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-8" direction="up">
          <div className="text-center md:text-left max-w-xl mx-auto md:mx-0">
            {/* Badge */}
            {badge && (
              <span className="mb-2 inline-block text-[11px] font-medium uppercase tracking-[0.25em] text-white/60">
                {badge}
              </span>
            )}

            {/* Title */}
            <h2 className=" text-[clamp(2.5rem,4vw,2.5rem)] font-bold leading-tight tracking-wide">
              <span className="text-white">{title.normal}</span>{" "}
              <span className="text-amber-400">{title.highlighted}</span>
            </h2>
            <div className="bg-amber-500 h-1 mt-2 w-[80px]"></div>
          </div>

          {/* Right Side: Plane Trail & Tagline */}
          <div className="hidden sm:flex flex-col items-end gap-2 relative">
            <Image
              src="/travel/plane_trail_transparent.png"
              alt="plane trail"
              width={200}
              height={60}
              sizes="200px"
              className="absolute top-5 right-0 h-[60px] w-[200px] md:right-20 opacity-70"
            />
            {tagline && (
              <span
                className={`${allura.className} max-w-[200px] text-4xl text-amber-400 rotate-[-5deg] translate-x-4`}
              >
                {tagline}
              </span>
            )}
          </div>
        </ScrollReveal>

        {/* TESTIMONIAL CAROUSEL CONTAINER */}
        <div className="relative px-1">
          {/* Cards Viewport with Touch Scroll Enabled */}
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {testimonialItems.map((item, i) => (
              <div
                key={item.id}
                className="testimonial-card flex-shrink-0 w-full md:w-[calc(50%-12px)] mr-6 last:mr-0 snap-start"
              >
                <ScrollReveal direction="up" index={i} staggerChildren={0.1}>
                  <TestimonialCard item={item} />
                </ScrollReveal>
              </div>
            ))}
          </div>

          {/* Navigation Arrows (Desktop Only) */}
          <button
            onClick={prevSlide}
            className="hidden md:flex absolute left-0 lg:-left-16 top-1/2 -translate-y-1/2 h-12 w-12 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-all border border-white/10 z-20 cursor-pointer"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-amber-400" />
          </button>
          <button
            onClick={nextSlide}
            className="hidden md:flex absolute right-0 lg:-right-16 top-1/2 -translate-y-1/2 h-12 w-12 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-all border border-white/10 z-20 cursor-pointer"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="h-6 w-6 text-amber-400" />
          </button>
        </div>

        {/* DOT PAGINATION INDICATORS */}
        <div className="flex justify-center gap-3 mt-10">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                scrollToIndex(index);
              }}
              className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === index
                  ? "w-8 bg-amber-400"
                  : "w-3 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// INDIVIDUAL CARD COMPONENT
export function TestimonialCard({ item }: { item: TravelTestimonialItem }) {
  return (
    <div className="relative bg-white pt-8 px-8 rounded-3xl shadow-xl text-slate-800 h-full flex flex-col">
      {/* Yellow Vertical Line (Left) */}
      <div className="absolute left-5 top-10 bottom-10 w-1.5 bg-amber-400 rounded-r-full" />

      {/* Triangle notch connecting to line */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[12px] border-t-transparent border-l-[12px] border-l-amber-400 border-b-[12px] border-b-transparent" />

      {/* Top Section: Image and Name */}
      <div className="flex items-center gap-5 mb-6 pl-4">
        <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-amber-100 ring-4 ring-white">
          <Image
            src={item.image}
            alt={item.name}
            width={85}
            height={85}
            sizes="90px"
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="text-xl font-bold text-slate-950">{item.name}</h4>
          <p className="text-md text-slate-600">{item.role}</p>
        </div>

        {/* Large Quote Icon (Top Right) */}
        <div className="ml-auto hidden sm:block text-9xl absolute right-12 top-10 font-serif text-yellow-500 leading-none  select-none">
          ”
        </div>
      </div>

      {/* Quote Text */}
      <blockquote className="flex-grow -mt-4 pl-4 relative">
        <p className="text-lg  sm:min-h-[120px]  min-h-[217px] text-slate-700 font-semibold leading-relaxed ">
          {item.quote}
        </p>
      </blockquote>

      {/* Footer: Stars and Mountain SVG */}
      <div className="flex items-end justify-between -mt-3 pl-4 mb-8">
        {/* Stars */}
        {/* <div className="flex py-6 items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-6 w-6 ${
                i < item.rating
                  ? "fill-amber-400 text-amber-400"
                  : "text-slate-300"
              }`}
            />
          ))}
        </div> */}

        {/* Mountain Shape SVG (Bottom Right) */}
        <div className="absolute right-2 bottom-0 pt-3 text-amber-400">
         <Image src="/travel/yellow_triangle_transparent (1).png" alt="" width={183} sizes="183px" height={59} />
        </div>
      </div>
    </div>
  );
}