"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Hotel, ShieldCheck, Map } from "lucide-react";
import { Allura } from "next/font/google";
import { IoCarSportOutline } from "react-icons/io5";

import { site } from "@/data";
import type { TravelServicesData, TravelServiceItem } from "@/type/typeSection";

const allura = Allura({
  subsets: ["latin"],
  weight: "400",
});

const servicesData: TravelServicesData = site.services;

const getServiceIcon = (iconName: string) => {
  switch (iconName) {
    case "hotel":
      return <Hotel className="h-9 w-9 md:h-12 md:w-12 text-[#facc15]" />;
    case "shield-check":
      return <ShieldCheck className="h-9 w-9 md:h-12 md:w-12 text-[#facc15]" />;
    case "map":
      return <Map className="h-9 w-9 md:h-12 md:w-12 text-[#facc15]" />;
    case "car":
      return (
        <IoCarSportOutline className="h-9 w-9 md:h-12 md:w-12 text-[#facc15]" />
      );
    default:
      return <Hotel className="h-9 w-9 md:h-12 md:w-12 text-[#facc15]" />;
  }
};

export default function ServiceSection() {
  if (!servicesData) return null;

  const { badge, tagline, services } = servicesData;

  return (
    <section className="relative w-full bg-[#050811] py-8 md:py-12 text-white overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* HEADER SECTION */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-8 text-center lg:text-left">
          <div className="w-full">
            {badge && (
              <span className="mb-1 block text-[11px] font-bold uppercase tracking-[0.25em] text-gray-400">
                {badge}
              </span>
            )}

            <h2 className="text-3xl sm:text-4xl lg:text-[38px] font-bold tracking-tight flex gap-2 flex-wrap justify-center lg:justify-start leading-none">
              <span className="text-white">
                Our Travel
                <div className="w-[40px] h-[2px] mt-2 bg-amber-300 mx-auto lg:mx-0"></div>
              </span>

              <span className="relative inline-block text-[#facc15]">
                Services
              </span>
            </h2>
          </div>

          {/* Signature - Desktop Only */}
          {tagline && (
            <div className="hidden lg:flex mt-4 lg:mt-0 max-w-[240px] flex-col items-center lg:items-end">
              <div
                className={`${allura.className} text-3xl tracking-wide drop-shadow-md -rotate-12`}
              >
                <span className="text-white">Your Journey</span>

                <span className="relative block ml-8 mt-[-2px] text-[#facc15] rotate-[-5deg] whitespace-nowrap">
                  Our Passion
                  <svg
                    viewBox="0 0 220 35"
                    className="absolute right-0 top-[26px] w-[40px] h-[25px] pointer-events-none"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 12 C35 5, 70 8, 100 14 C130 20, 165 22, 214 10"
                      stroke="#facc15"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
          )}
        </div>

        
        <div className="hidden lg:grid lg:grid-cols-[26fr_48fr_26fr] gap-5 items-stretch">
          {/* Column 1: Left Tall Card (Hotels) */}
          <div className="flex flex-col h-full">
            {services[0] && <TallCard service={services[0]} />}
          </div>

          {/* Column 2: Center Stacked Wide Cards (Insurance & Tour Packages) */}
          <div className="flex flex-col gap-5 h-full justify-between">
            {services[1] && <CenterLandscapeCard service={services[1]} />}
            {services[2] && <CenterLandscapeCard service={services[2]} />}
          </div>

          {/* Column 3: Right Tall Card (Airport Transport) */}
          <div className="flex flex-col h-full">
            {services[3] && <TallCard service={services[3]} />}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:hidden">
          {services.map((service) => (
            <TabletMobileCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
function TallCard({ service }: { service: TravelServiceItem }) {
  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-[#090d18] border border-white/10 overflow-hidden shadow-2xl h-[440px] w-full">
      {/* Background Image & Bottom Gradient */}
      <div className="absolute inset-0 z-0">
        <Image
          src={service.image}
          alt={service.title}
          fill
          quality={100}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#37393f] via-transparent to-transparent" />
      </div>

      {/* Top Badge & Icon */}
      <div className="relative z-10 p-5 flex flex-col items-start gap-1.5">
        <div className="flex h-12 w-12 items-center  ">
          {getServiceIcon(service.iconName)}
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">
          {service.badge}
        </span>
        <div className="h-[2px] w-[30px] bg-amber-400"></div>
      </div>

      {/* Bottom Text Content */}
      <div className="relative z-10 p-5 flex flex-col items-start">
        <h3 className="text-xl md:text-2xl max-w-[170px]  font-bold leading-tight mb-2 tracking-wide">
          <span className="text-white block">{service.title}</span>
          <span className="text-[#facc15] block">
            {service.highlightedTitle}
          </span>
        </h3>
        {service.description && (
          <p className="text-[13px]  max-w-[180px] text-gray-100 mb-4 leading-relaxed max-w-[95%]">
            {service.description}
          </p>
        )}
        {service.button && (
          <Link
            href={service.button.href || "#"}
            className="group/btn inline-flex items-center gap-2 rounded-full bg-[#facc15] px-6 py-3 text-[13px] font-bold text-black transition-all duration-300 hover:bg-[#eab308] shadow-md"
          >
            <span>{service.button.label}</span>
            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
        )}
      </div>
    </div>
  );
}

{
  /* CENTER LANDSCAPE CARD (WIDE & FULL BACKGROUND IMAGE WITH LEFT GRADIENT) */
}
function CenterLandscapeCard({ service }: { service: TravelServiceItem }) {
  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-[#090d18] border border-white/10 overflow-hidden shadow-2xl h-[210px] w-full p-5">
      {/* Background Image across FULL card width */}
      <div className="absolute inset-0 z-0">
        <Image
          src={service.image}
          alt={service.title}
          fill
          quality={100}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Gradient fade strictly from the left, keeping image vivid on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070b14]  to-transparent" />
      </div>

      {/* Top Icon & Badge Header */}
      <div className="relative z-10 p-0 flex flex-col items-start gap-1.5">
        <div className="flex h-9 w-12 items-center  ">
          {getServiceIcon(service.iconName)}
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">
          {service.badge}
        </span>
        <div className="h-[2px] w-[30px] bg-amber-400"></div>
      </div>

      {/* Title */}
      <div className="relative  z-10">
        <h3 className="text-xl font-bold leading-tight tracking-wide">
          <span className="text-white block">{service.title}</span>
          <span className="text-[#facc15] block">
            {service.highlightedTitle}
          </span>
        </h3>
      </div>

      {/* Bottom Content Row: Left Paragraph, Right Floating Button */}
      <div className="relative z-10 flex items-end justify-between gap-4">
        {service.description ? (
          <p className="text-[13px]  max-w-[200px] text-gray-300 leading-snug max-w-[280px]">
            {service.description}
          </p>
        ) : (
          <div />
        )}

        {service.button && (
          <Link
            href={service.button.href || "#"}
            className="group/btn shrink-0 inline-flex items-center gap-2 rounded-full bg-[#facc15] px-6 py-3 text-[13px] font-bold text-black transition-all duration-300 hover:bg-[#eab308] shadow-lg backdrop-blur-sm"
          >
            <span>{service.button.label}</span>
            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
        )}
      </div>
    </div>
  );
}

{
  /* TABLET (2 CARDS/ROW) & MOBILE (1 CARD/ROW) CARD */
}
function TabletMobileCard({ service }: { service: TravelServiceItem }) {
  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-[#090d18] border border-white/10 overflow-hidden shadow-2xl h-[420px] w-full">
      <div className="absolute inset-0 z-0">
        <Image
          src={service.image}
          alt={service.title}
          fill
          quality={100}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/60 to-transparent" />
      </div>

      {/* Top Icon & Badge */}
      <div className="relative z-10 p-5 flex flex-col items-start gap-1.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black/40 backdrop-blur-md border border-white/10">
          {getServiceIcon(service.iconName)}
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">
          {service.badge}
        </span>
      </div>

      {/* Bottom Text Content */}
      <div className="relative z-10 p-5 flex flex-col items-start">
        <h3 className="text-xl font-bold leading-tight mb-2 tracking-wide">
          <span className="text-white block">{service.title}</span>
          <span className="text-[#facc15] block">
            {service.highlightedTitle}
          </span>
        </h3>
        {service.description && (
          <p className="text-[11px] text-gray-300 mb-4 leading-relaxed">
            {service.description}
          </p>
        )}
        {service.button && (
          <Link
            href={service.button.href || "#"}
            className="group/btn inline-flex items-center gap-2 rounded-full bg-[#facc15] px-4 py-2 text-[11px] font-bold text-black transition-all duration-300 hover:bg-[#eab308] shadow-md"
          >
            <span>{service.button.label}</span>
            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
        )}
      </div>
    </div>
  );
}
