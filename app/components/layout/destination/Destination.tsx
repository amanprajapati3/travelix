"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Calendar, ArrowRight } from "lucide-react";
import Banner from "../../shared/Banner";
import ScrollReveal from "../../shared/ScrollReveal";
import CtaBanner from "../../shared/CtaBanner";
import { site, type TravelDestinationsData, type TravelDestinationItem } from "@/data";

export default function Destination() {
  const destinationData: TravelDestinationsData = site.destinations;

  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");

  // Filter states
  const [filteredDomestic, setFilteredDomestic] = useState<
    TravelDestinationItem[]
  >(destinationData.domesticDestinations);
  const [filteredInternational, setFilteredInternational] = useState<
    TravelDestinationItem[]
  >(destinationData.destinations);

  // Mobile slider state (active card index per section)
  const [domesticActiveIndex, setDomesticActiveIndex] = useState(0);
  const [intlActiveIndex, setIntlActiveIndex] = useState(0);

  const domesticScrollRef = useRef<HTMLDivElement>(null);
  const intlScrollRef = useRef<HTMLDivElement>(null);

  if (!destinationData) return null;

  const handleSearch = () => {
    const filterItems = (items: TravelDestinationItem[]) => {
      return items.filter((item) => {
        const matchesType =
          selectedType === "All Types" ||
          item.type?.toLowerCase() === selectedType.toLowerCase() ||
          (selectedType === "Domestic" && item.country === "India") ||
          (selectedType === "International" && item.country !== "India");

        const matchesRegion =
          selectedRegion === "All Regions" ||
          item.region?.toLowerCase() === selectedRegion.toLowerCase();

        return matchesType && matchesRegion;
      });
    };

    setFilteredDomestic(filterItems(destinationData.domesticDestinations));
    setFilteredInternational(filterItems(destinationData.destinations));
  };

  const scrollToCard = (index: number, isDomestic: boolean) => {
    if (isDomestic) {
      setDomesticActiveIndex(index);
      if (domesticScrollRef.current) {
        const cardWidth = domesticScrollRef.current.offsetWidth;
        domesticScrollRef.current.scrollTo({
          left: cardWidth * index,
          behavior: "smooth",
        });
      }
    } else {
      setIntlActiveIndex(index);
      if (intlScrollRef.current) {
        const cardWidth = intlScrollRef.current.offsetWidth;
        intlScrollRef.current.scrollTo({
          left: cardWidth * index,
          behavior: "smooth",
        });
      }
    }
  };

  const renderDestinationCard = (dest: TravelDestinationItem, index: number = 0) => (
    <ScrollReveal
      key={dest.id}
      className="group relative h-[280px] rounded-[24px] overflow-hidden border border-amber-400/20 shadow-xl flex flex-col justify-end  transition-all duration-300 hover:border-amber-400 shrink-0 w-full sm:w-auto"
      direction="up"
      index={index}
      staggerChildren={0.06}
    >
      {/* Background Image */}
      <Image
        src={dest.image}
        alt={dest.name}
        fill
        sizes="100%"
        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
      />

      {/* Dark gradient overlay */}

      {/* Top Location Pin Badge */}
      <div className="absolute top-4 left-4 h-10 w-10 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/30 flex items-center justify-center text-white">
        <MapPin className="h-6 w-6" />
      </div>

      {/* Bottom Content */}
      <div className="relative bg-[#001B24] opacity-95 px-3 py-2 z-10 flex items-end justify-between w-full">
        <div>
          <h3 className=" text-md font-bold text-white">{dest.name}</h3>
          {dest.tags && (
            <p className="text-xs text-slate-300/90 font-medium tracking-wide">
              {dest.tags.join(" · ")}
            </p>
          )}
        </div>

        {/* Circular Arrow Button */}
            {/* <Link
            href={dest.slug}
            className="h-7 w-7 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform shrink-0"
            aria-label={`View ${dest.name}`}
            >
            <ArrowRight className="h-5 w-5 stroke-[2.5]" />
            </Link> */}
      </div>
    </ScrollReveal>
  );

  return (
    <main className="min-h-screen bg-[#011014] text-white overflow-hidden">
      {/* 1. BANNER */}
      {destinationData.banner && (
        <Banner
          title={destinationData.banner.title}
          highlightedTitle={destinationData.banner.highlightedTitle}
          backgroundImage={destinationData.banner.backgroundImage}
          breadcrumbItems={destinationData.banner.breadcrumbItems}
        />
      )}

      {/* 2. SEARCH FILTER BAR SECTION */}
      <section className="relative z-20 max-w-[1200px] mx-auto px-4 py-8 md:py-12 mb-0">
        <ScrollReveal className="flex flex-col sm:flex-row gap-4 sm:gap-20 items-stretch" direction="up">
          {/* Dropdowns row — stays side-by-side even on mobile */}
          <div className="flex flex-row gap-3 sm:gap-4 flex-1">
            {/* Dropdown 1: Destination Type */}
            <div className="relative flex-1">
              <MapPin className="absolute  left-3 sm:left-4  top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-amber-400 pointer-events-none" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full  bg-[#001B24] border-2 border-blue-400/30 rounded-xl pl-9 sm:pl-12 pr-8 sm:pr-10 py-3 sm:py-3.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-amber-400 appearance-none cursor-pointer truncate"
              >
                {destinationData.searchFilter?.destinationTypes.map(
                  (type, idx) => (
                    <option
                      key={idx}
                      value={type}
                      className="bg-[#001B24] text-white"
                    >
                      {type}
                    </option>
                  ),
                )}
              </select>
              <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 pointer-events-none text-amber-400 text-xs">
                ▼
              </span>
            </div>

            {/* Dropdown 2: Region */}
            <div className="relative flex-1">
              <Calendar className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-amber-400 pointer-events-none" />
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full bg-[#001B24] border-2 border-blue-400/30 rounded-xl pl-9 sm:pl-12 pr-8 sm:pr-10 py-3 sm:py-3.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-amber-400 appearance-none cursor-pointer truncate"
              >
                {destinationData.searchFilter?.regions.map((region, idx) => (
                  <option
                    key={idx}
                    value={region}
                    className="bg-[#090d16] text-white"
                  >
                    {region}
                  </option>
                ))}
              </select>
              <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 pointer-events-none text-amber-400 text-xs">
                ▼
              </span>
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="w-full sm:w-auto bg-amber-300 hover:bg-amber-300 text-slate-950 font-bold py-3.5 px-6 sm:px-8 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all shrink-0 whitespace-nowrap"
          >
            <Search className="h-4 w-4 stroke-[2.5]" />
            <span>Search Destinations</span>
          </button>
        </ScrollReveal>
      </section>

      {/* 3. POPULAR DOMESTIC DESTINATIONS SECTION */}
      <section className="relative w-full">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 xl:px-14">
          {/* Section Header */}
          <ScrollReveal className="flex  flex-col sm:flex-row sm:items-end justify-between mb-4 gap-4" direction="up">
            <div className="flex gap-5 justify-between">
              {/* <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-[2px] bg-amber-400" />
                <span className="text-xs font-bold uppercase tracking-[0.255em] text-amber-400">
                  {destinationData.badge}
                </span>
              </div> */}
              <h2 className="text-lg sm:2xl md:text-3xl items-center gap-2 flex font-bold tracking-wide">
                <span className="w-[40px] h-1 rounded-full bg-amber-400"></span>{" "}
                <span className="text-white">
                  {destinationData.domesticSection.title.normal}
                </span>{" "}
                <span className="text-amber-400">
                  {destinationData.domesticSection.title.highlighted}
                </span>
              </h2>
            </div>
            <div className="flex gap-5">
              <p className="text-slate-200  md:max-w-[430px] text-xs font-semibold mt-1 max-w-xl">
                {destinationData.domesticSection.description}
              </p>
              {/* <Link
                href={destinationData.viewAllLink.href}
                className="self-start sm:self-auto border-2 border-amber-400 hover:border-amber-400 text-white hover:text-amber-400 px-7 py-3 rounded-xl text-xs font-semibold tracking-wider transition-all"
              >
                {destinationData.viewAllLink.label}
              </Link> */}
            </div>
          </ScrollReveal>

          {/* Desktop & Tablet Grid / Mobile Slider */}
          <div className="relative">
            {/* Desktop / Tablet Grid (Hidden on mobile) */}
            <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5  gap-6">
              {filteredDomestic.map((dest, i) => renderDestinationCard(dest, i))}
            </div>

            {/* Mobile Slider (Visible only on mobile) */}
            <div className="sm:hidden">
              <div
                ref={domesticScrollRef}
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 pb-4"
                style={{ scrollbarWidth: "none" }}
              >
                {filteredDomestic.map((dest, i) => (
                  <div key={dest.id} className="min-w-full snap-center">
                    {renderDestinationCard(dest, i)}
                  </div>
                ))}
              </div>

              {/* Mobile Dots Navigation */}
              <div className="flex justify-center items-center gap-2 mt-4">
                {filteredDomestic.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToCard(idx, true)}
                    className={`h-2 rounded-full transition-all ${
                      domesticActiveIndex === idx
                        ? "w-6 bg-amber-400"
                        : "w-2 bg-white/30"
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. POPULAR INTERNATIONAL DESTINATIONS SECTION */}
      <section className="relative w-full py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 xl:px-14">
          {/* Section Header */}
          <ScrollReveal className="flex  flex-col sm:flex-row sm:items-end justify-between mb-4 gap-4" direction="up">
            <div className="flex gap-5 justify-between">
              {/* <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-[2px] bg-amber-400" />
                <span className="text-xs font-bold uppercase tracking-[0.255em] text-amber-400">
                  {destinationData.badge}
                </span>
              </div> */}
              <h2 className="text-lg sm:text-xl md:text-3xl items-center gap-2 flex font-bold tracking-wide">
                <span className="w-[40px] h-1 rounded-full bg-amber-400"></span>{" "}
                <span className="text-white">
                  {destinationData.internationalSection.title.normal}
                </span>{" "}
                <span className="text-amber-400">
                  {destinationData.internationalSection.title.highlighted}
                </span>
              </h2>
            </div>
            <div className="flex gap-5">
              <p className="text-slate-200  md:max-w-[430px] text-xs font-semibold mt-1 max-w-xl">
                {destinationData.internationalSection.description}
              </p>
              {/* <Link
                href={destinationData.viewAllLink.href}
                className="self-start sm:self-auto border-2 border-amber-400 hover:border-amber-400 text-white hover:text-amber-400 px-7 py-3 rounded-xl text-xs font-semibold tracking-wider transition-all"
              >
                {destinationData.viewAllLink.label}
              </Link> */}
            </div>
          </ScrollReveal>

          {/* Desktop & Tablet Grid / Mobile Slider */}
          <div className="relative">
            {/* Desktop / Tablet Grid (Hidden on mobile) */}
            <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5  gap-6">
              {filteredInternational.map((dest, i) => renderDestinationCard(dest, i))}
            </div>

            {/* Mobile Slider (Visible only on mobile) */}
            <div className="sm:hidden">
              <div
                ref={intlScrollRef}
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 pb-4"
                style={{ scrollbarWidth: "none" }}
              >
                {filteredInternational.map((dest, i) => (
                  <div key={dest.id} className="min-w-full snap-center">
                    {renderDestinationCard(dest, i)}
                  </div>
                ))}
              </div>

              {/* Mobile Dots Navigation */}
              <div className="flex justify-center items-center gap-2 mt-4">
                {filteredInternational.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToCard(idx, false)}
                    className={`h-2 rounded-full transition-all ${
                      intlActiveIndex === idx
                        ? "w-6 bg-amber-400"
                        : "w-2 bg-white/30"
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA BANNER */}
      <CtaBanner />
    </main>
  );
}
