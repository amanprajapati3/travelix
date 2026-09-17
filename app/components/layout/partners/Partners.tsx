"use client";

import React from "react";
import Image from "next/image";
import { Caveat } from "next/font/google";
import { Handshake, Globe, ShieldCheck, Users, Plane } from "lucide-react";
import Banner from "../../shared/Banner";
import { site } from "@/data";
import type { TravelPartnersData } from "@/type/typeSection";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Partners() {
  const partnersData: TravelPartnersData = site.partners;

  if (!partnersData) return null;

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Handshake":
        return <Handshake className="h-8 w-8 text-amber-400" />;
      case "Globe":
        return <Globe className="h-8 w-8 text-amber-400" />;
      case "ShieldCheck":
        return <ShieldCheck className="h-8 w-8 text-amber-400" />;
      case "Users":
        return <Users className="h-8 w-8 text-amber-400" />;
      default:
        return <Globe className="h-8 w-8 text-amber-400" />;
    }
  };

  return (
    <main className="min-h-screen bg-[#011014] text-white overflow-hidden font-sans">
      {/* 1. TOP BANNER */}
      {partnersData.banner && (
        <Banner
          title={partnersData.banner.title}
          highlightedTitle={partnersData.banner.highlightedTitle}
          backgroundImage={partnersData.banner.backgroundImage}
          breadcrumbItems={partnersData.banner.breadcrumbItems as any}
        />
      )}

      {/* 2. MAIN PARTNERS SECTION */}
      <section className="relative w-full pt-12 pb-0 px-4 sm:px-6 lg:px-10 xl:px-14 max-w-[1400px] mx-auto">
        {/* Map Background Accent Overlay */}
        <div className="absolute  ">
          <Image
            src={partnersData.images.partnersMap}
            alt="World Map Overlay"
            fill
            className=""
          />
        </div>
        <div className="hidden sm:block absolute right-5 w-[230px]">
          <img src="/travel/plane_loop_transparent.png" alt="" />
        </div>

        {/* HEADER SECTION WITH CAVEAT SCRIPT ACCENT */}
        <div className="relative z-10 mb-8 text-center max-w-3xl mx-auto">
          {/* Eyebrow */}
          <p className="text-amber-400 font-bold text-md tracking-widest uppercase mb-0">
            {partnersData.header.eyebrow}
          </p>

          {/* Title */}
          <h2 className=" text-3xl sm:text-4xl md:text-7xl font-bold tracking-wide mb-1">
            <span className="text-white">
              {partnersData.header.title.normal}
            </span>{" "}
            <span className="text-amber-300">
              {partnersData.header.title.highlighted}
            </span>
          </h2>
          <div className="mx-auto bg-amber-300 w-[90px] h-1 my-2"></div>

          {/* Subtitle */}
          <p className="text-white text-md leading-relaxed max-w-2xl mx-auto">
            {partnersData.header.subtitle}
          </p>

          {/* Right Signature Script Text with Airplane Trail */}
          <div className="hidden lg:flex absolute -right-20 top-4 flex-col items-center pointer-events-none transform rotate-6">
            <p
              className={`${caveat.className} max-w-[120px] -rotate-[30deg] text-xl sm:text-3xl font-extrabold text-white tracking-wide leading-snug`}
            >
              {partnersData.scriptTexts.topRight}
            </p>
            <div className="w-full h-1 ml-14 -rotate-[30deg] bg-gradient-to-r from-amber-400 via-amber-300 to-transparent rounded-full mt-1 border-b-2 border-amber-400 border-dashed" />
          </div>
        </div>

        {/* 3. PARTNERS LOGO GRID (6x4 Cards Layout) */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 sm:gap-5 mb-16">
          {partnersData.partners.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-4 sm:p-6 h-20 sm:h-24 flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-slate-200 group cursor-pointer"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {item.logo ? (
                  <Image
                    src={item.logo}
                    alt={item.name}
                    width={130}
                    height={50}
                    className="sm:h-24 h-20 w-auto object-contain transition-all duration-300 "
                  />
                ) : (
                  <span className="font-bold text-slate-800 text-sm sm:text-base text-center">
                    {item.name}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 4. FEATURES BAR (4 Items Below Grid) */}
        <div className="relative z-10 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-4">
          {partnersData.features.map((feature) => (
            <div
              key={feature.id}
              className="flex border-r border-gray-800  gap-4"
            >
              <div className="h-16 w-16  rounded-full border-2 border-amber-400/80 bg-[#00171f] flex items-center justify-center shrink-0 shadow-md">
                {renderIcon(feature.icon)}
              </div>
              <div className=" pr-10">
                <h4 className="font-semibold text-white text-md leading-snug">
                  {feature.title}
                </h4>
                <p className="text-white text-sm mt-0.5">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 5. SIGNATURE SCRIPT TEXTS & CITY SILHOUETTE */}
        <div className="relative w-full  pb-8  min-h-[220px] flex items-end justify-between">
          {/* Left Signature Script Text */}
          <div className="relative z-20 transform -rotate-6 mb-8">
            <p
              className={`${caveat.className} max-w-[149px] -rotate-[30deg] text-xl sm:text-2xl font-extrabold text-white tracking-wide leading-snug`}
            >
              {partnersData.scriptTexts.bottomLeft}
            </p>
            <div className="w-full h-1 ml-5 -rotate-[30deg] bg-gradient-to-r from-amber-400 via-amber-300 to-transparent rounded-full mt-1 border-b-2 border-amber-400 border-dashed" />

            {/* <div className="w-32 h-0.5 bg-amber-400 border-b border-amber-400 border-dashed mt-1" /> */}
          </div>

          {/* Right Signature Script Text with Airplane */}
          <div className="relative z-20 text-right transform rotate-6 mb-8">
            <p
              className={`${caveat.className} max-w-[120px] -rotate-[30deg] text-xl sm:text-2xl font-extrabold text-white tracking-wide leading-snug`}
            >
              {partnersData.scriptTexts.bottomRight}
            </p>
            <div className="w-full h-1 ml-8 -rotate-[30deg] bg-gradient-to-r from-amber-400 via-amber-300 to-transparent rounded-full mt-1 border-b-2 border-amber-400 border-dashed" />

            {/* <div className="flex items-center justify-end gap-1 mt-1">
              <div className="w-28 h-0.5 bg-amber-400 border-b border-amber-400 border-dashed" />
              <Plane className="h-4 w-4 text-amber-400 transform -rotate-12" />
            </div> */}
          </div>

          {/* City Skyline Background Image Silhouette */}
          <div className="absolute bottom-0 left-0 right-0 h-40 sm:h-52 pointer-events-none z-10 overflow-hidden">
            <Image
              src={partnersData.images.citySilhouette}
              alt="City Skyline Silhouette"
              fill
              className="object-cover object-bottom"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
