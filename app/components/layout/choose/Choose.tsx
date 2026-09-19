"use client";

import React from "react";
import Image from "next/image";
import { Calendar, Building2, Compass, Headphones } from "lucide-react";
import Banner from "../../shared/Banner";
import ScrollReveal from "../../shared/ScrollReveal";
import { site } from "@/data";
import type { ChooseVariant } from "@/type/typeSection";

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "Calendar":
      return <Calendar className="h-7 w-7 text-white" />;
    case "Building2":
      return <Building2 className="h-7 w-7 text-white" />;
    case "Compass":
      return <Compass className="h-7 w-7 text-white" />;
    case "Headphones":
      return <Headphones className="h-7 w-7 text-white" />;
    default:
      return <Calendar className="h-7 w-7 text-white" />;
  }
};

interface ChooseProps {
  hideBanner?: boolean;
}

export default function Choose({ hideBanner = false }: ChooseProps) {
  const chooseData: ChooseVariant = site.whyChooseUs;

  if (!chooseData) return null;

  const { banner, badge, title, centerImage, brushFrame, items } = chooseData;

  const leftItems = items.slice(0, 2);
  const rightItems = items.slice(2, 4);

  return (
    <main className=" bg-[#000000] text-white">
      {!hideBanner && (
        <Banner
          title={banner.title}
          highlightedTitle={banner.highlightedTitle}
          backgroundImage={banner.backgroundImage}
          breadcrumbItems={banner.breadcrumbItems}
        />
      )}

      <section className="relative w-full overflow-hidden pt-8 md:pt-12">
        <div className="mx-auto max-w-[1300px]  px-4 sm:px-6 lg:px-10 xl:px-14">
          
          <ScrollReveal className="mb-10 flex flex-col items-center text-center md:mb-12" direction="up">
            {badge && (
              <span className="mb-2 inline-block text-xs font-medium uppercase tracking-[0.25em] text-amber-400">
                {badge}
              </span>
            )}

            <h2 className="mb-3 text-[clamp(2.2rem,4vw,4.5rem)] font-bold leading-tight tracking-wide">
              <span className="text-white">{title.normal}</span>{" "}
              <span className="text-amber-400">{title.highlighted}</span>
            </h2>

            <div className="mt-1 h-1 w-20 rounded-full bg-amber-400"></div>
          </ScrollReveal>

          <div className="relative grid grid-cols-1 items-center gap-8 md:px-16 lg:grid-cols-12 lg:gap-4">
            
            <ScrollReveal className="z-20 flex md:flex-col justify-center gap-10 md:gap-12 lg:col-span-3" direction="left">
              {leftItems.map((item) => (
                <div
                  key={item.id}
                  className="group flex flex-col items-center text-center lg:items-start lg:text-right"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-amber-400 bg-black/40 shadow-md transition-colors sm:h-16 sm:w-16">
                    {getIconComponent(item.icon)}
                  </div>

                  <h3 className="mb-2 font-serif text-lg font-bold text-amber-400 md:text-xl">
                    {item.title}
                  </h3>

                  <p className="max-w-[260px] md:text-left text-sm text-white">
                    {item.description}
                  </p>
                </div>
              ))}
            </ScrollReveal>

            <ScrollReveal className="relative flex justify-center lg:col-span-6 lg:my-0" direction="up">
              <div className="relative flex h-[380px] w-[280px] items-center justify-center sm:h-[360px] sm:w-[360px] md:h-[490px] md:w-[520px]">
                
                <div className="absolute inset-4 overflow-hidden rounded-2xl sm:inset-6">
                  <Image
                    src={centerImage}
                    alt="Traveler adventure"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="absolute inset-0 z-10 -top-16 pointer-events-none hidden sm:block">
                  <Image
                    src={brushFrame}
                    alt="Brush frame overlay"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

              </div>
            </ScrollReveal>

            <ScrollReveal className="z-20 flex md:flex-col justify-center gap-10 md:gap-12 lg:col-span-3" direction="right">
              {rightItems.map((item) => (
                <div
                  key={item.id}
                  className="group flex flex-col items-center text-center lg:items-start lg:text-left"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-amber-400 bg-black/40 shadow-md transition-colors sm:h-16 sm:w-16">
                    {getIconComponent(item.icon)}
                  </div>

                  <h3 className="mb-2 font-serif text-lg font-bold text-amber-400 md:text-xl">
                    {item.title}
                  </h3>

                  <p className="max-w-[260px] text-sm leading-relaxed text-white">
                    {item.description}
                  </p>
                </div>
              ))}
            </ScrollReveal>

          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:hidden">
            {items.map((item, i) => (
              <ScrollReveal
                key={item.id}
                className="flex flex-col items-center rounded-2xl border border-white/5 bg-slate-900/60 p-5 text-center"
                direction="up"
                index={i}
                staggerChildren={0.08}
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-amber-400/40 bg-black/40">
                  {getIconComponent(item.icon)}
                </div>

                <h3 className="mb-2 text-lg font-bold text-white">
                  {item.title}
                </h3>

                <p className="max-w-[260px] text-xs leading-relaxed text-slate-400 md:text-sm">
                  {item.description}
                </p>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}
