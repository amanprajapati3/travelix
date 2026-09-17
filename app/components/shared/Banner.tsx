"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BannerProps {
  title: string;
  highlightedTitle?: string;
  breadcrumbItems: BreadcrumbItem[];
  backgroundImage: string;
  className?: string;
}

export default function Banner({
  title,
  highlightedTitle,
  breadcrumbItems,
  backgroundImage,
  className = "",
}: BannerProps) {
  return (
    <div className={`relative w-full bg-black h-[320px] sm:h-[400px] md:h-[500px] overflow-hidden bg-slate-950 flex items-center ${className}`}>
      
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0 top-25">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          priority
          className="object-cover object-center brightness-[0.95]"
        />
        {/* Subtle dark gradient overlay to make text pop */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
      </div>

      {/* Right Side Plane Loop Graphic */}
      <div className="absolute right-0 top-20 h-full w-[300px]  pointer-events-none z-10 opacity-90 hidden sm:block">
        <Image
          src="/travel/plane_loop_transparent.png"
          alt="Plane flight path"
          fill
          className="object-contain object-right"
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 mx-auto max-w-[1300px] w-full px-4 sm:px-6 lg:px-10 xl:px-14 flex flex-col justify-center h-full md:pt-10 sm:pt-20 pt-28">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm sm:text-lg font-medium text-white mb-4 flex-wrap">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            return (
              <React.Fragment key={index}>
                {index === 0 ? (
                  <Link
                    href={item.href || "/"}
                    className="flex items-center gap-1.5 hover:text-amber-400 transition-colors text-white"
                  >
                    <Home className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                ) : item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-amber-400 transition-colors text-white"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-white/90">{item.label}</span>
                )}

                {!isLast && (
                  <ChevronRight className="h-6 w-6 text-amber-400 mx-0.5" />
                )}
              </React.Fragment>
            );
          })}
        </nav>

        {/* Title Section */}
        <div>
          <h1 className=" text-[clamp(2rem,5vw,3.5rem)] font-bold uppercase tracking-wide leading-none drop-shadow-md">
            <span className="text-white">{title}</span>{" "}
            {highlightedTitle && (
              <span className="text-amber-400">{highlightedTitle}</span>
            )}
          </h1>
          {/* Yellow Underline Accent */}
          <div className="h-1.5 w-16 sm:w-24 bg-amber-400 rounded-full mt-3 shadow-sm" />
        </div>

      </div>

      {/* Bottom Brush Design Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-[60px] sm:h-[90px] md:h-[120px] pointer-events-none z-30">
        <Image
          src="/travel/bottom_brush_transparent_exact.png"
          alt="Brush border overlay"
          fill
          className="object-cover object-bottom"
        />
      </div>

    </div>
  );
}