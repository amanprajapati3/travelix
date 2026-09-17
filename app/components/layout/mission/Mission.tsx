"use client";

import React from "react";
import Image from "next/image";
import {
  Eye,
  UsersRound,
  ShieldCheck,
  Globe2,
  Leaf,
  Users2,
} from "lucide-react";
import { RiTargetFill } from "react-icons/ri";
import { RiPlaneLine } from "react-icons/ri";

import Banner from "../../shared/Banner"; // Adjust path to your reusable Banner component
import CtaBanner from "../../shared/CtaBanner";
import Stats from "../../shared/Stats";
import { site } from "@/data";
import type { TravelMissionData } from "@/type/typeSection";

/**
 * Large, high-contrast feature icons.
 * Sized up and given a bolder stroke so they read as the visual anchor
 * of each circle instead of a small centered glyph.
 */
const getFeatureIcon = (iconName: string) => {
  const commonProps = {
    className: "h-10 w-10 sm:h-12 sm:w-12 text-amber-400",
    strokeWidth: 1.75,
  };

  switch (iconName) {
    case "Users":
      return <UsersRound {...commonProps} />;
    case "ShieldCheck":
      return <ShieldCheck {...commonProps} />;
    case "Globe":
      return <Globe2 {...commonProps} />;
    case "Leaf":
      return <Leaf {...commonProps} />;
    case "Users2":
      return <Users2 {...commonProps} />;
    case "PlaneTakeoff":
      return <RiPlaneLine {...commonProps} />;
    default:
      return <UsersRound {...commonProps} />;
  }
};

/**
 * Large badge icon for the two section headers (Target / Eye).
 * Sized to sit beside the badge label + title as one visual block,
 * matching the reference layout (icon spans roughly the height of
 * the label + first title line together).
 */
const SectionBadgeIcon = ({ icon: Icon }: { icon: React.ElementType }) => (
  <div className="relative h-16 w-16 sm:h-[4.75rem] sm:w-[4.75rem] shrink-0 rounded-full border-2 border-amber-400/60 flex items-center justify-center bg-[#0b0f17] shadow-[0_0_25px_-5px_rgba(251,191,36,0.45)]">
    <Icon className="h-7 w-7 sm:h-12 sm:w-12 text-amber-400" />
  </div>
);

/**
 * Header row used at the top of both the Mission and Vision columns:
 * a large circular icon sits to the left of the stacked
 * eyebrow label + title, exactly like the reference layout.
 */
const SectionHeader = ({
  icon,
  eyebrow,
  titleNormal,
  titleHighlighted,
  showPlane = false,
}: {
  icon: React.ElementType;
  eyebrow: string;
  titleNormal: string;
  titleHighlighted: string;
  showPlane?: boolean;
}) => (
  <div className="relative mb-6">
    {showPlane && (
      <div className="absolute -top-7 -right-20 hidden sm:block w-[200px] h-[200px] opacity-90 pointer-events-none">
        <Image
          src="/travel/plane_loop_transparent.png"
          alt=""
          fill
          className="object-contain"
          aria-hidden
        />
      </div>
    )}
    <div className="flex  gap-5">
      <SectionBadgeIcon icon={icon} />
      <div>
        <span className="block text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-amber-400 mb-2">
          {eyebrow}
        </span>
        <h2 className=" text-[clamp(2rem,3.4vw,2.4rem)] font-bold leading-[1.05] tracking-wide">
          <span className="text-white">{titleNormal}</span>{" "}
          <span className="text-amber-400">{titleHighlighted}</span>
        </h2>
      </div>
    </div>
  </div>
);

/** One large feature circle + label, used in both Mission and Vision rows */
const FeatureCircle = ({
  icon,
  title,
}: {
  icon: string;
  title: string;
}) => (
  <div className="flex flex-col items-center text-center group">
    <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full flex items-center justify-center mb-4 bg-[#0b0f17] border-2 border-amber-400/60 group-hover:border-amber-400 group-hover:shadow-[0_0_0_1px_rgba(251,191,36,0.15),0_22px_50px_-10px_rgba(251,191,36,0.55)] group-hover:-translate-y-1 transition-all duration-300"
    >
      {/* soft inner glow */}
      <div className="absolute inset-0 rounded-full bg-amber-400/[0.06]" />
      {getFeatureIcon(icon)}
    </div>
    <span className="text-base  font-bold text-white tracking-wide max-w-[9rem] leading-snug">
      {title}
    </span>
  </div>
);

/**
 * Tilted photo card:
 * a solid amber card sits behind the photo, offset and counter-rotated,
 * so it reads as a crisp colored edge peeking out — not a blurred glow.
 */
const TiltedPhotoCard = ({
  image,
  alt,
  rotate = "-rotate-2",
  amberRotate = "-rotate-6",
  amberPosition = "-right-3 -top-3 -bottom-3 -left-0",
}: {
  image: string;
  alt: string;
  rotate?: string;
  amberRotate?: string;
  amberPosition?: string;
}) => (
  <div className="relative w-full max-w-[520px]">
    {/* Amber backing card */}
    <div
      className={`absolute ${amberPosition} rounded-[36px] bg-gradient-to-br from-amber-300 to-amber-500 ${amberRotate} shadow-xl`}
    />
    {/* Photo card */}
    <div
      className={`relative w-full aspect-[16/11] rounded-[32px] overflow-hidden border-2 border-amber-400/40 shadow-2xl transform ${rotate} bg-slate-900`}
    >
      <Image src={image} alt={alt} fill className="object-cover object-center" />
      {/* subtle bottom gradient so any overlaid text stays legible */}
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
    </div>
  </div>
);

export default function Mission() {
  const missionData: TravelMissionData = site.mission;

  if (!missionData) return null;

  const { banner, missionSection, visionSection } = missionData;

  return (
    <main className="min-h-screen bg-[#011014] text-white overflow-hidden">
      {/* Google Font Import for Allura script font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Allura&display=swap');
        
        .font-allura {
          font-family: 'Allura', cursive, serif;
        }
      `}</style>

      {/* 1. REUSABLE BANNER */}
      <Banner
        title={banner.title}
        highlightedTitle={banner.highlightedTitle}
        backgroundImage={banner.backgroundImage}
        breadcrumbItems={banner.breadcrumbItems}
      />

      {/* 2. OUR MISSION SECTION */}
      <section className="relative w-full py-8 md:py-12">
        <div className="mx-auto  max-w-[1300px] px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-center">
            {/* LEFT: Tilted Image with Amber Backing & Brush Badge */}
            <div className="lg:col-span-6 relative flex justify-center pb-10 order-2 lg:order-1">
              <TiltedPhotoCard
                image={missionSection.image}
                alt={missionSection.title.normal}
                rotate="lg:rotate-2"
                amberRotate="rotate-3"
                amberPosition="-right-4 -top-4 -bottom-4 -left-1"
              />

              {/* Yellow Brush Badge Overlay with Text using Allura font */}
              <div className="absolute bottom-28 left-0 sm:-left-16 z-20 w-[190px] sm:w-[225px] h-[110px] pointer-events-none drop-shadow-2xl">
                <div className="relative w-[240px] h-[135px] sm:w-[280px] sm:h-[155px]">
                  <Image
                    src="/travel/yellow_brush_stroke_transparent.png"
                    alt="Brush stroke background"
                    fill
                    className="object-contain "
                  />
                  <span
                    className="absolute inset-0 flex flex-col items-center justify-center font-allura font-normal text-xl sm:text-3xl leading-[0.9] transform -rotate-3 text-slate-950 text-center px-4"
                  >
                    Travel
                    <br />
                    Create
                    <br />
                    Belong
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT: Content & Large Feature Circles */}
            <div className="lg:col-span-6 flex flex-col order-1 lg:order-2">
              <SectionHeader
                icon={RiTargetFill}
                eyebrow={missionSection.badge}
                titleNormal={missionSection.title.normal}
                titleHighlighted={missionSection.title.highlighted}
                showPlane
              />

              <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-10 max-w-[600px]">
                {missionSection.description}
              </p>

              {/* Three Large Feature Circles Row */}
              <div className="grid grid-cols-3 gap-6  ">
                {missionSection.features.map((feature) => (
                  <FeatureCircle key={feature.id} icon={feature.icon} title={feature.title} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR VISION SECTION */}
      <section className="relative border-t-2  w-full py-16 bg-[#070a10]/60  border-white/5">
        <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-center">
            {/* LEFT: Content & Large Feature Circles */}
            <div className="lg:col-span-6 flex flex-col order-1 lg:order-1">
              <SectionHeader
                icon={Eye}
                eyebrow={visionSection.badge}
                titleNormal={visionSection.title.normal}
                titleHighlighted={visionSection.title.highlighted}
              />

              <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-10 max-w-[600px]">
                {visionSection.description}
              </p>

              {/* Three Large Feature Circles Row */}
              <div className="grid grid-cols-3 gap-6  border-white/10">
                {visionSection.features.map((feature) => (
                  <FeatureCircle key={feature.id} icon={feature.icon} title={feature.title} />
                ))}
              </div>
            </div>

            {/* RIGHT: Tilted Image with Script Text Directly On The Photo (no brush bg) */}
            <div className="lg:col-span-6 relative flex justify-center pb-10 order-2 lg:order-2">
              <TiltedPhotoCard
                image={visionSection.image}
                alt={visionSection.title.normal}
                rotate="lg:-rotate-2"
                amberRotate="-rotate-6"
                amberPosition="-left-4 -top-4 -bottom-4 -right-1"
              />

              {/* Script text overlaid directly on the image, left-aligned, transparent bg using Allura font */}
              <div className="absolute bottom-20 left-6 sm:left-28 md:left-12 -rotate-6 z-20 pointer-events-none  max-w-[140px]">
                <p
                  className="font-allura font-normal text-white text-3xl sm:text-4xl leading-[1.05] drop-shadow-[0_3px_10px_rgba(0,0,0,0.85)]"
                >
                  New Places
                  <br />
                  Brighter
                  <br />
                  Perspectives
                </p>
                <span className="block mt-2 h-[3px] w-16 bg-amber-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. REUSABLE CTA BANNER */}
      <CtaBanner />

      {/* 5. REUSABLE STATS */}
      <Stats />
    </main>
  );
}