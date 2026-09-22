"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { site } from "@/data";
import type { TravelCtaBannerData, TravelCtaStat } from "@/type/typeSection";
import ScrollReveal from "./ScrollReveal";

// Animated Counter Hook
function AnimatedCounter({ value, duration = 1800 }: { value: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/,/g, ""), 10) || 0;
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * numericValue));

            if (progress < 1) {
              animationFrameId = requestAnimationFrame(step);
            }
          };

          animationFrameId = requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) observer.observe(elementRef.current);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [numericValue, duration]);

  return <span ref={elementRef}>{count.toLocaleString()}</span>;
}

// Saved PNG icons
const getStatIcon = (iconName: string) => {
  const icons: Record<string, string> = {
    hiking: "/icons/1.png",
    "badge-check": "/icons/icon_1.png",
    compass: "/icons/icon_2.png",
    award: "/icons/icon_3.png",
  };

  return icons[iconName] || "/icons/icon_3.png";
};

export default function Stats() {
  const ctaData: TravelCtaBannerData = site.ctaBanner;
  if (!ctaData || !ctaData.stats) return null;

  return (
    <section className="relative w-full overflow-hidden bg-[#050811] pt-0 pb-16 text-white">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/travel/2.jpg"
          alt="Stats Background"
          fill
          quality={100}
          className="object-cover object-top opacity-30"
        />
        {/* Dark overlay: 90% black to make image subtle */}
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* Main Content (Elevated above background layers) */}
      <div className="relative mt-10 md:mt-16 z-10 mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {ctaData.stats.map((stat: TravelCtaStat, i) => (
            <ScrollReveal
              key={stat.id}
              className="relative flex items-center justify-between rounded-xl border border-white/10 bg-[#080808] px-6 py-5 shadow-xl transition-all duration-300 hover:border-[#facc15]/30"
              direction="up"
              index={i}
              staggerChildren={0.1}
            >
              {/* Left Side Image Icon */}
              <div className="flex shrink-0 items-center justify-center p-2">
                <Image
                  src={getStatIcon(stat.iconName)}
                  alt=""
                  width={80}
                  height={80}
                  sizes="80px"
                  className="h-20 w-20 object-contain"
                />
              </div>

              {/* Right Side Stat Details */}
              <div className="flex flex-col items-center text-center">
                {/* Number */}
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#facc15] tracking-tight">
                  <AnimatedCounter value={stat.number} />
                  {stat.suffix && <span>{stat.suffix}</span>}
                </div>

                {/* Two Dotted Lines */}
                <div className="w-16 my-1.5 flex flex-col gap-[3px] items-end">
                  <div className="w-full border-b border-dotted border-white" />
                  <div className="w-full border-b border-dotted border-white" />
                </div>

                {/* Stat Label */}
                <span className="text-md font-semibold text-gray-300 whitespace-nowrap">
                  {stat.label}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}